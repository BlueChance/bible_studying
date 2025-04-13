const fs = require("fs");
const path = require("path");

const chaptersDir = path.join(__dirname, "fulltext");
const outputFile = path.join(__dirname, "full.md");

let combinedContent = "# 전체 보기\n\n";

// 숫자 기준 정렬
const chapterFiles = fs.readdirSync(chaptersDir)
  .filter((file) => file.endsWith(".md"))
  .sort((a, b) => {
    const getNumber = (filename) => parseInt(filename.match(/\d+/)[0]);
    return getNumber(a) - getNumber(b);
  });

chapterFiles.forEach((file) => {
  const filePath = path.join(chaptersDir, file);
  const content = fs.readFileSync(filePath, "utf8");
  combinedContent += `---\n\n## ${file.replace(".md", "")}\n\n${content}\n\n`;
});

fs.writeFileSync(outputFile, combinedContent, "utf8");
console.log(`✅ full.md 생성 완료! (${chapterFiles.length}개 파일 합침)`);
