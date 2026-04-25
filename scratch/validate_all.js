const fs = require('fs');
const matter = require('gray-matter');
const path = require('path');

const dirPath = 'c:\\CODE\\GITHUB\\portfolio\\data\\projects';
const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.md'));

files.forEach(file => {
  const filePath = path.join(dirPath, file);
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    matter(content);
    console.log(`${file}: VALID`);
  } catch (e) {
    console.error(`${file}: ERROR`);
    console.error(e.message);
    if (e.mark) {
      console.error(`  Error at line ${e.mark.line + 1}, column ${e.mark.column + 1}`);
    }
  }
});
