import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function get(context) {
  const postsDirectory = path.join(process.cwd(), 'src/pages/rss-share');
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    return {
      ...data,
      url: `/rss-share/${filename.replace(/\.md$/, '')}`
    };
  });

  // 按日期排序
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  return new Response(JSON.stringify(posts.slice(0, 5)), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
