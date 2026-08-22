import { Article } from '../types/article';
import { mockArticles } from '../data/mockArticles';

export class ArticleStore {
  private articles: Article[];

  constructor(initialArticles: Article[] = mockArticles) {
    this.articles = [...initialArticles];
  }

  /**
   * Retrieve all articles sorted with most recent first.
   */
  getAllArticles(): Article[] {
    return [...this.articles].sort((a, b) => {
      const dateA = new Date(a.publishDate || a.publishedAt || 0).getTime();
      const dateB = new Date(b.publishDate || b.publishedAt || 0).getTime();
      return dateB - dateA;
    });
  }

  /**
   * Fetch a single article by ID.
   */
  getArticleById(id: string): Article | undefined {
    return this.articles.find((article) => article.id === id);
  }

  /**
   * Add a new article to the dataset.
   */
  addArticle(article: Article): void {
    const publishDate = article.publishDate || article.publishedAt || new Date().toISOString();
    const publishedAt = article.publishedAt || publishDate;
    const body = article.body || article.content || '';
    const content = article.content || body;

    const newArticle: Article = {
      ...article,
      publishDate,
      publishedAt,
      body,
      content,
    };

    this.articles.unshift(newArticle);
  }

  /**
   * Reset or replace the dataset in the store.
   */
  setArticles(articles: Article[]): void {
    this.articles = [...articles];
  }
}

export const articleStore = new ArticleStore();
