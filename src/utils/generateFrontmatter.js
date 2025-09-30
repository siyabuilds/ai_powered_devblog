export const generateFrontmatter = (title, description) => {
  const dateObj = new Date();
  const options = { year: "numeric", month: "short", day: "numeric" };
  const date = dateObj.toLocaleDateString("en-US", options).replace(",", "");
  return `---
title: '${title}'
pubDate: '${date}'
description: '${description}'
---\n\n`;
};
