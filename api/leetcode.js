const https = require('https');

const QUERY = `
  query getUserData($username: String!) {
    matchedUser(username: $username) {
      profile { ranking }
      submitStats {
        acSubmissionNum { difficulty count submissions }
      }
      userCalendar {
        submissionCalendar
        streak
        totalActiveDays
      }
    }
  }
`;

function post(body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const req = https.request(
      {
        hostname: 'leetcode.com',
        path: '/graphql',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(data),
          'Referer': 'https://leetcode.com',
          'User-Agent': 'Mozilla/5.0',
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

  try {
    const result = await post({ query: QUERY, variables: { username } });
    const user = result?.data?.matchedUser;
    if (!user) { res.status(404).json({ error: 'User not found' }); return; }

    const acNums = user.submitStats?.acSubmissionNum ?? [];
    const all    = acNums.find((e) => e.difficulty === 'All') ?? { count: 0, submissions: 0 };
    const easy   = acNums.find((e) => e.difficulty === 'Easy')   ?? { count: 0 };
    const medium = acNums.find((e) => e.difficulty === 'Medium') ?? { count: 0 };
    const hard   = acNums.find((e) => e.difficulty === 'Hard')   ?? { count: 0 };

    const cal = user.userCalendar ?? {};

    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    res.status(200).json({
      totalSolved:        all.count,
      easySolved:         easy.count,
      mediumSolved:       medium.count,
      hardSolved:         hard.count,
      acceptanceRate:     all.submissions > 0
        ? Math.round((all.count / all.submissions) * 100)
        : 0,
      ranking:            user.profile?.ranking ?? 0,
      activeDays:         cal.totalActiveDays   ?? 0,
      streak:             cal.streak            ?? 0,
      submissionCalendar: JSON.parse(cal.submissionCalendar ?? '{}'),
    });
  } catch (err) {
    res.status(502).json({ error: 'Failed to fetch from LeetCode', detail: err.message });
  }
};
