const https = require('https');

const QUERY = `
  query($username: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $username) {
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

function fetchRange(token, username, from, to) {
  return post(token, { query: QUERY, variables: { username, from, to } });
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  const username = (req.query.username || '').trim();
  if (!username) { res.status(400).json({ error: 'username required' }); return; }

  const token = process.env.GITHUB_TOKEN;
  if (!token) { res.status(500).json({ error: 'GITHUB_TOKEN not configured' }); return; }

  try {
    const now = new Date();
    // Rolling 365 days: today - 365 days → today
    // GitHub API caps contributionsCollection at 1 year per call.
    // If the 365-day window spans two calendar years, we need two calls.
    const todayISO = now.toISOString();
    const yearAgo = new Date(now);
    yearAgo.setFullYear(yearAgo.getFullYear() - 1);
    const yearAgoISO = yearAgo.toISOString();

    const currentYearStart = new Date(Date.UTC(now.getUTCFullYear(), 0, 1));
    const prevYearEnd = new Date(Date.UTC(now.getUTCFullYear(), 0, 1));
    prevYearEnd.setUTCMilliseconds(-1); // Dec 31 end of prev year

    // Always fetch two ranges and merge — handles cross-year boundary cleanly
    const [r1, r2] = await Promise.all([
      fetchRange(token, username, yearAgoISO, currentYearStart.toISOString()),
      fetchRange(token, username, currentYearStart.toISOString(), todayISO),
    ]);

    for (const r of [r1, r2]) {
      if (r.errors) {
        res.status(502).json({ error: 'GitHub API error', detail: r.errors });
        return;
      }
    }

    const col1 = r1.data?.user?.contributionsCollection;
    const col2 = r2.data?.user?.contributionsCollection;
    if (!col1 || !col2) { res.status(404).json({ error: 'User not found' }); return; }

    // Merge all days from both ranges into a single date→count map
    const dayMap = {};
    for (const col of [col1, col2]) {
      for (const week of col.contributionCalendar.weeks) {
        for (const day of week.contributionDays) {
          dayMap[day.date] = (dayMap[day.date] || 0) + day.contributionCount;
        }
      }
    }

    // Build a clean 53-week grid: start from Sunday on or before (today - 364 days)
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const start = new Date(today);
    start.setDate(start.getDate() - 364);
    start.setDate(start.getDate() - start.getDay()); // rewind to Sunday

    const weeks = [];
    let week = [];
    const d = new Date(start);
    while (d <= today) {
      const dateStr = d.toISOString().slice(0, 10);
      week.push({
        date: dateStr,
        contributionCount: dayMap[dateStr] || 0,
        weekday: d.getDay(),
      });
      if (week.length === 7) { weeks.push({ contributionDays: week }); week = []; }
      d.setDate(d.getDate() + 1);
    }
    if (week.length) weeks.push({ contributionDays: week });

    // Totals: sum current year only (matches GitHub profile display)
    const totalContributions =
      col2.contributionCalendar.totalContributions +
      (col2.restrictedContributionsCount || 0);

    const totalCommits  = col1.totalCommitContributions  + col2.totalCommitContributions;
    const totalPRs      = col1.totalPullRequestContributions + col2.totalPullRequestContributions;
    const totalIssues   = col1.totalIssueContributions   + col2.totalIssueContributions;

    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    res.status(200).json({ totalContributions, totalCommits, totalPRs, totalIssues, weeks });
  } catch (err) {
    res.status(502).json({ error: 'Failed to fetch from GitHub', detail: err.message });
  }
};
