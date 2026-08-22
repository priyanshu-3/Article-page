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
  publishedAt?: string;
  readingTime: string;
  excerpt: string;
  body: string;
  content?: string;
  slug?: string;
  isPublished?: boolean;
  status?: 'published' | 'draft';
}
