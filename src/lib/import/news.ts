import fm from 'front-matter';
import type { Post, FrontMatter } from '$lib/types';

let getAllNewsCache: Post[] | null = null;

export async function getAllNews(): Promise<Post[]> {
  // クライアントサイドでは空配列
  if (typeof window !== 'undefined') {
    return [];
  }
  
  if (getAllNewsCache) {
    return getAllNewsCache;
  }
  
  const postsModules = import.meta.glob('/static/tests/news/*.md', { 
    eager: true, 
    as: 'raw' 
  });
  
  const posts = Object.entries(postsModules)
    .map(([path, rawContent]) => {
      const { attributes, body } = fm<FrontMatter>(rawContent as string);
      const slug = path.split('/').pop()?.replace('.md', '') || '';
      
      // attributesがundefinedでないことを確認
      if (!attributes) {
        console.error(`Frontmatter not found in ${path}`);
        return null;
      }
      
      return {
        slug,
        title: attributes.title,
        date: attributes.date,
        category: attributes.category,
        content: body,
        thumbicon: attributes.thumbicon,
        thumbnail: attributes.thumbnail,
        edited: attributes.edited,
      } as Post;
    })
    .filter((post): post is Post => post !== null)  // nullを除去
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  getAllNewsCache = posts;
  return posts;
}

// 個別記事を取得する関数
export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const posts = await getAllNews();
  return posts.find(post => post.slug === slug);
}