const fs = require('fs');
const yaml = require('js-yaml');
const matter = require('gray-matter');

const filePath = 'c:\\CODE\\GITHUB\\portfolio\\data\\projects\\2026-04-wordle-oxford.md';
try {
  const content = fs.readFileSync(filePath, 'utf8');
  const parsed = matter(content);
  console.log('YAML is valid');
} catch (e) {
  console.error('YAML error:');
  console.error(e.message);
  if (e.mark) {
    console.error(`Error at line ${e.mark.line + 1}, column ${e.mark.column + 1}`);
  }
}
