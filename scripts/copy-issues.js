require('dotenv').config();

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const SOURCE_REPO = 'Liatoshynsky-Foundation/lf-client';
const TARGET_REPO = 'ba-training-2026-05/lf-client';

if (!GITHUB_TOKEN) {
  console.error('Error: GITHUB_TOKEN is not set in .env file or environment variables.');
  process.exit(1);
}

async function fetchAllIssues(repo) {
  let issues = [];
  let page = 1;
  while (true) {
    console.log(`Fetching issues from ${repo} (page ${page})...`);
    const response = await fetch(`https://api.github.com/repos/${repo}/issues?state=all&per_page=100&page=${page}`, {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Node.js Script'
      }
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to fetch issues from ${repo}: ${response.status} ${response.statusText}\n${error}`);
    }

    const data = await response.json();
    if (data.length === 0) break;
    
    const onlyIssues = data.filter(issue => !issue.pull_request);
    issues = issues.concat(onlyIssues);
    page++;
  }
  return issues;
}

async function createIssue(repo, issue) {
  console.log(`Creating issue: ${issue.title}...`);
  const response = await fetch(`https://api.github.com/repos/${repo}/issues`, {
    method: 'POST',
    headers: {
      'Authorization': `token ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Node.js Script',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: issue.title,
      body: issue.body,
      labels: issue.labels.map(l => l.name)
    })
  });

  if (!response.ok) {
    const error = await response.text();
    if (response.status === 403 && error.includes('rate limit')) {
      console.error('Rate limit hit. Please wait before running again.');
      process.exit(1);
    }
    console.error(`Failed to create issue "${issue.title}": ${response.status} ${response.statusText}\n${error}`);
    return null;
  }

  const data = await response.json();
  return data;
}

async function main() {
  try {
    const sourceIssues = await fetchAllIssues(SOURCE_REPO);
    console.log(`Found ${sourceIssues.length} issues in ${SOURCE_REPO}.`);

    const targetIssues = await fetchAllIssues(TARGET_REPO);
    const existingTitles = new Set(targetIssues.map(i => i.title));
    console.log(`Found ${targetIssues.length} existing issues in ${TARGET_REPO}.`);

    const issuesToCopy = sourceIssues.filter(i => !existingTitles.has(i.title));
    console.log(`Skipping ${sourceIssues.length - issuesToCopy.length} issues already present.`);
    console.log(`Will attempt to copy ${issuesToCopy.length} issues.`);

    // Sort to maintain original order as much as possible
    issuesToCopy.sort((a, b) => a.number - b.number);

    for (const issue of issuesToCopy) {
      await createIssue(TARGET_REPO, issue);
      // Increased delay to 2 seconds to be safer against secondary rate limits
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    console.log('Done!');
  } catch (error) {
    console.error('Migration failed:', error);
  }
}

main();
