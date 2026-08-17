const fs = require('fs');
const path = require('path');

const envDir = path.join(__dirname, 'src', 'environments');

if (!fs.existsSync(envDir)) {
  fs.mkdirSync(envDir, { recursive: true });
}

const content = `export const environment = {
  production: true,
  githubToken: '${process.env.GITHUB_TOKEN || ''}',
};
`;

fs.writeFileSync(path.join(envDir, 'environment.prod.ts'), content);
console.log('environment.prod.ts generated successfully');
