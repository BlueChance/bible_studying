// docs/fulltext/generateFull.js

const fs = require("fs");
const path = require("path");

const chaptersDir = path.resolve(__dirname, "../book_of_genesis");  
const outputFile = path.resolve(__dirname, "../full.md");

let combinedContent = "# 전체 보기\n\n";

// .md 파일만 읽기 + 정렬
const chapterFiles = fs.readdirSync(chaptersDir)
  .filter((file) => file.endsWith(".md"))
  .sort(); // 이름순 정렬

chapterFiles.forEach((file) => {
  const filePath = path.join(chaptersDir, file);
  const content = fs.readFileSync(filePath, "utf8");
  combinedContent += `---\n\n## ${file.replace(".md", "")}\n\n${content}\n\n`;
});

fs.writeFileSync(outputFile, combinedContent, "utf8");
console.log(`✅ full.md 생성 완료! (${chapterFiles.length}개 파일 합침)`);
