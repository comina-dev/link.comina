export interface FrontMatter{
    title: string;
    date: string;
    category: string;
    tags: string | string[];//配列対応
    body: string;
    /* 必須ではない */
    thumbicon?: string;
    thumbnail?: string;
    edited?: number;
}

export interface Post extends Omit<FrontMatter, 'tags'> {
  tags: string[];
  slug: string;
  content: string;
}