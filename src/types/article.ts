export interface Article {
  id: string;
  title: string;
  author: string;
  publishDate: string;
  readingTime: string;
  excerpt: string;
  body: string;
}

export type CreateArticleInput = Omit<Article, 'id'> & { id?: string };
