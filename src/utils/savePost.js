import fs from "fs";
import path from "path";
import { generateFrontmatter } from "./generateFrontmatter.js";

export const savePost = (title, description, content) => {
  // Create filename from title
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, "-");

  const filename = `${slug}.md`;
  const folder = path.join(process.cwd(), "src", "content", "blog");
  const filePath = path.join(folder, filename);

  // Ensure posts directory exists
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }

  // Generate frontmatter and full content
  const frontmatter = generateFrontmatter(title, description);
  const fullContent = frontmatter + content;

  // Write to file
  fs.writeFileSync(filePath, fullContent, "utf-8");
  console.log(`Post saved to ${filePath}`);
  return filePath;
};
