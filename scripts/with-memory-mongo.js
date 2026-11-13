const { spawn } = require('node:child_process');
const path = require('node:path');

const { MongoMemoryServer } = require('mongodb-memory-server');

const { seedMemoryMongo } = require('./seed-memory-mongo');

const nextBin = require.resolve('next/dist/bin/next');
const nextArgs = process.argv.slice(2);
const dbName = process.env.MONGO_MEMORY_DB_NAME || process.env.MONGO_DB || 'lf-demo';

let child;
let mongoServer;
let shuttingDown = false;

const signalExitCodes = {
  SIGINT: 130,
  SIGTERM: 143
};

async function stopAndExit(exitCode = 0, signal) {
  if (shuttingDown) {
    return;
  }

  shuttingDown = true;

  if (child && !child.killed) {
    child.kill(signal || 'SIGTERM');
  }

  if (mongoServer) {
    await mongoServer.stop();
    console.log('[memory-mongo] Stopped MongoDB memory server');
  }

  process.exit(signal ? signalExitCodes[signal] || 1 : exitCode);
}

async function main() {
  mongoServer = await MongoMemoryServer.create({
    instance: {
      dbName
    }
  });

  const mongoUrl = mongoServer.getUri();
  console.log(`[memory-mongo] Started MongoDB memory server at ${mongoUrl}`);

  await seedMemoryMongo(mongoUrl);

  child = spawn(process.execPath, [nextBin, ...nextArgs], {
    cwd: path.resolve(__dirname, '..'),
    env: {
      ...process.env,
      MONGO_URL: mongoUrl
    },
    stdio: 'inherit'
  });

  child.on('exit', async (code, signal) => {
    await stopAndExit(code ?? 0, signal);
  });
}

process.on('SIGINT', () => {
  void stopAndExit(0, 'SIGINT');
});

process.on('SIGTERM', () => {
  void stopAndExit(0, 'SIGTERM');
});

main().catch((error) => {
  console.error('[memory-mongo] Failed to start MongoDB memory server', error);
  process.exit(1);
});
