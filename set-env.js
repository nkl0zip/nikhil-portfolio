const fs = require('fs');
const path = require('path');

const envDir = path.join(__dirname, 'src', 'environments');

if (!fs.existsSync(envDir)) {
  fs.mkdirSync(envDir, { recursive: true });
}

const token = process.env.GITHUB_TOKEN || '';

const devContent = [
  'export const environment = {',
  '  production: false,',
  '  githubToken: \'' + token + '\',',
  '};',
  ''
].join('\n');

const prodContent = [
  'export const environment = {',
  '  production: true,',
  '  githubToken: \'' + token + '\',',
  '};',
  ''
].join('\n');

fs.writeFileSync(path.join(envDir, 'environment.ts'), devContent);
fs.writeFileSync(path.join(envDir, 'environment.prod.ts'), prodContent);

console.log('environment.ts generated successfully');
console.log('environment.prod.ts generated successfully');
