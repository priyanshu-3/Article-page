export interface Author {
  id?: string;
  name: string;
  avatarUrl?: string;
}

export interface Article {
  id: string;
  title: string;
  author: Author | string;
  publishDate: string;
  readingTime: string;
  excerpt: string;
  body: string;
  slug?: string;
  publishedAt?: string;
  content?: string;
  isPublished?: boolean;
  status?: 'published' | 'draft';
}

export type CreateArticleInput = Omit<Article, 'id'> & { id?: string };
