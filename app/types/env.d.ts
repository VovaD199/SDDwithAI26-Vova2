namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    MONGO_MEMORY_DB_NAME?: string;
    MONGO_URL?: string;
  }
}
