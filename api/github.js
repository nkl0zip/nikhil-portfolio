const https = require('https');

const QUERY = `
  query($from: DateTime!, $to: DateTime!) {
    viewer {
      contributionsCollection(from: $from, to: $to) {
        totalCommitContributions
        totalPullRequestContributions
        totalIssueContributions
        restrictedContributionsCount
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              weekday
            }
          }
        }
        commitContributionsByRepository(maxRepositories: 100) {
          contributions(first: 100) {
            nodes {
              occurredAt
              commitCount
            }
          }
        }
      }
    }
  }
`;

function post(token, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const req = https.request(
      {
        hostname: 'api.github.com',
        path: '/graphql',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(data),
          'Authorization': 'Bearer ' + token,
          'User-Agent': 'nikhil-portfolio',
        },
      },
      (res) => {
        let raw = '';
        res.on('data', (chunk) => (raw += chunk));
        res.on('end', () => {
          try { resolve(JSON.parse(raw)); }
          catch (e) { reject(e); }
        });
      }
    );
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

// Build YYYY-MM-DD from a Date using LOCAL date parts (avoids UTC timezone shift)
function localDateStr(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  const token = process.env.GITHUB_TOKEN;
  if (!token) { res.status(500).json({ error: 'GITHUB_TOKEN not configured' }); return; }

  try {
    const now = new Date();

    // Rolling 365-day window split at Jan 1 to stay within GitHub's 1-year-per-query cap
    const todayISO = now.toISOString();
    const yearAgo = new Date(now);
    yearAgo.setFullYear(yearAgo.getFullYear() - 1);
    const yearAgoISO = yearAgo.toISOString();
    const currentYearStartISO = new Date(Date.UTC(now.getUTCFullYear(), 0, 1)).toISOString();

    const [r1, r2] = await Promise.all([
      post(token, { query: QUERY, variables: { from: yearAgoISO, to: currentYearStartISO } }),
      post(token, { query: QUERY, variables: { from: currentYearStartISO, to: todayISO } }),
    ]);

    for (const r of [r1, r2]) {
      if (r.errors) {
        res.status(502).json({ error: 'GitHub API error', detail: r.errors });
        return;
      }
    }

    const col1 = r1.data?.viewer?.contributionsCollection;
    const col2 = r2.data?.viewer?.contributionsCollection;
    if (!col1 || !col2) { res.status(404).json({ error: 'Could not fetch contributions' }); return; }

    // Build date→count map from contributionCalendar (already deduped per day by GitHub)
    // These dates are strings like "2026-08-17" in the user's timezone as stored by GitHub
    const calMap = {};
    for (const col of [col1, col2]) {
      for (const week of col.contributionCalendar.weeks) {
        for (const day of week.contributionDays) {
          // Accumulate (ranges may overlap at boundary)
          calMap[day.date] = (calMap[day.date] || 0) + day.contributionCount;
        }
      }
    }

    // Also build from commitContributionsByRepository as a cross-check
    // occurredAt is ISO timestamp — slice to date part which GitHub stores in user's timezone
    const repoMap = {};
    for (const col of [col1, col2]) {
      for (const repo of col.commitContributionsByRepository) {
        for (const node of repo.contributions.nodes) {
          const date = node.occurredAt.slice(0, 10);
          repoMap[date] = (repoMap[date] || 0) + node.commitCount;
        }
      }
    }

    // Merge: use calMap as base (includes PRs, issues, repo creations),
    // but for any date where repoMap has commits not in calMap, add them
    const dayMap = Object.assign({}, calMap);
    for (const [date, count] of Object.entries(repoMap)) {
      if (!dayMap[date]) {
        dayMap[date] = count;
      }
    }

    // Build a clean 53-week Sunday-aligned grid for last 365 days
    // Use local date math to match GitHub's date strings
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const start = new Date(today);
    start.setDate(start.getDate() - 364);
    start.setDate(start.getDate() - start.getDay()); // rewind to nearest Sunday

    const weeks = [];
    let week = [];
    const d = new Date(start);

    while (d <= today) {
      const dateStr = localDateStr(d);
      week.push({
        date: dateStr,
        contributionCount: dayMap[dateStr] || 0,
        weekday: d.getDay(),
      });
      if (week.length === 7) {
        weeks.push({ contributionDays: week });
        week = [];
      }
      d.setDate(d.getDate() + 1);
    }
    if (week.length) weeks.push({ contributionDays: week });

    // Total = sum of all days in our 365-day window (most accurate)
    const totalContributions = Object.entries(dayMap)
      .filter(([date]) => date >= localDateStr(yearAgo) && date <= localDateStr(today))
      .reduce((s, [, v]) => s + v, 0);

    const totalCommits = col1.totalCommitContributions + col2.totalCommitContributions;
    const totalPRs = col1.totalPullRequestContributions + col2.totalPullRequestContributions;
    const totalIssues = col1.totalIssueContributions + col2.totalIssueContributions;

    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    res.status(200).json({ totalContributions, totalCommits, totalPRs, totalIssues, weeks });
  } catch (err) {
    res.status(502).json({ error: 'Failed to fetch from GitHub', detail: err.message });
  }
};
