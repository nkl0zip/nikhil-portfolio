const fs = require('fs');
const path = require('path');

const envDir = path.join(__dirname, 'src', 'environments');

if (!fs.existsSync(envDir)) {
  fs.mkdirSync(envDir, { recursive: true });
}

const token = process.env.GITHUB_TOKEN || '';

fs.writeFileSync(path.join(envDir, 'environment.ts'), `export const environment = {
  production: false,
  githubToken: '${token}',
};
`);

fs.writeFileSync(path.join(envDir, 'environment.prod.ts'), `export const environment = {
  production: true,
  githubToken: '${token}',
};
`);

console.log('environment files generated successfully');
