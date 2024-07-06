/** @jsxImportSource preact */
import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

const RecentPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('/api/recent-posts')
      .then(response => response.json())
      .then(data => setPosts(data.slice(0, 10))); // 只显示最近的10篇文章
  }, []);

  return (
    <div class="recent-posts">
      <h2>最近文章</h2>
      <ul>
        {posts.map(post => (
          <li key={post.url}>
            <a href={post.url}>{post.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentPosts;
