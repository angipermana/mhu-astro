import fs from 'fs';
import path from 'path';

const posts = JSON.parse(fs.readFileSync('./src/mhu_posts.json', 'utf8'));

const outDir = './src/content/blog';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

posts.forEach(post => {
  const title = post.post_title.replace(/"/g, '\\"');
  const date = new Date(post.post_date).toISOString();
  // Strip out multiple newlines and normalize some HTML, or just keep it as raw HTML
  // Astro markdown can render HTML. However, creating a clean frontmatter is key.
  
  const content = `---
title: "${title}"
description: "${title}"
pubDate: '${date}'
---

${post.post_content}
`;
  
  fs.writeFileSync(path.join(outDir, `${post.post_name}.md`), content);
});

console.log(`Imported ${posts.length} posts!`);
