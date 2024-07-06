import rss from '@astrojs/rss';
import sanitizeHtml from 'sanitize-html';

export function GET(context) {
  const postImportResult = import.meta.glob('./rss-share/*.md', { eager: true });
  const posts = Object.values(postImportResult);
  return rss({
    title: '春风少年兄',
    description: '你在世纪大道东门。 ',
    site: context.site,
    stylesheet: '/rss/pretty-feed-v3.xsl',
    items: posts.map((post) => ({
      link: post.url,
      content: sanitizeHtml(post.compiledContent(), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
        allowedAttributes: {
          ...sanitizeHtml.defaults.allowedAttributes,
          img: ['src', 'alt', 'title', 'width', 'height'], // 允许img标签的这些属性
        },
      }),
      ...post.frontmatter,
    })),
  });
}
