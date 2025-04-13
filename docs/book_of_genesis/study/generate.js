// C:\bible\docs\book_of_genesis\study\generate.js

const fs = require("fs");
const path = require("path");

// 원본 md 파일들이 들어 있는 폴더
const sourceDir = path.join(__dirname, "all");

// 출력 파일 경로
const outputFile = path.join(__dirname, "full.md");

let combinedContent = "# 전체 보기\n\n";

// .md 파일을 숫자 순서대로 정렬해서 가져오기
const mdFiles = fs.readdirSync(sourceDir)
  .filter(file => file.endsWith(".md"))
  .sort((a, b) => {
    const getNumber = (filename) => parseInt(filename.match(/\d+/)?.[0] || "0");
    return getNumber(a) - getNumber(b);
  });

mdFiles.forEach((file) => {
  const filePath = path.join(sourceDir, file);
  const content = fs.readFileSync(filePath, "utf8");
  combinedContent += `---\n\n## ${file.replace(".md", "")}\n\n${content}\n\n`;
});

fs.writeFileSync(outputFile, combinedContent, "utf8");
console.log(`✅ full.md 생성 완료! (${mdFiles.length}개 파일 합침)`);
