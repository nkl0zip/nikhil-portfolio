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
    // Match GitHub profile: Jan 1 of current year → today
    const from = new Date(Date.UTC(now.getUTCFullYear(), 0, 1)).toISOString();
    const to = now.toISOString();

    const result = await post(token, {
      query: QUERY,
      variables: { username, from, to },
    });

    if (result.errors) {
      res.status(502).json({ error: 'GitHub API error', detail: result.errors });
      return;
    }

    const col = result.data?.user?.contributionsCollection;
    if (!col) { res.status(404).json({ error: 'User not found' }); return; }

    const calendar = col.contributionCalendar;
    // totalContributions from API + restrictedContributionsCount = full count shown on profile
    const totalContributions = calendar.totalContributions + (col.restrictedContributionsCount || 0);

    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    res.status(200).json({
      totalContributions,
      totalCommits: col.totalCommitContributions,
      totalPRs: col.totalPullRequestContributions,
      totalIssues: col.totalIssueContributions,
      weeks: calendar.weeks,
    });
  } catch (err) {
    res.status(502).json({ error: 'Failed to fetch from GitHub', detail: err.message });
  }
};
