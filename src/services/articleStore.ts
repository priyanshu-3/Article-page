import { Article, CreateArticleInput } from '../types/article';
import { MOCK_ARTICLES } from '../data/mockArticles';

export class ArticleStore {
  private articles: Article[];

  constructor(initialArticles: Article[] = MOCK_ARTICLES) {
    this.articles = [...initialArticles];
  }

  /**
   * Retrieves all articles sorted with most recent first.
   */
  public getAllArticles(): Article[] {
    return [...this.articles].sort(
      (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    );
  }

  /**
   * Fetches a single article by id.
   */
  public getArticleById(id: string): Article | undefined {
    return this.articles.find((article) => article.id === id);
  }

  /**
   * Adds a new article to the dataset.
   * Auto-generates an ID if not provided, adds it to the store, and returns the newly created article.
   */
  public addArticle(articleData: CreateArticleInput): Article {
    const id =
      articleData.id ||
      (typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `article_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`);

    const newArticle: Article = {
      ...articleData,
      id,
    };

    this.articles.push(newArticle);
    return newArticle;
  }

  /**
   * Resets store back to specified articles or default mock dataset.
   */
  public reset(articles: Article[] = MOCK_ARTICLES): void {
    this.articles = [...articles];
  }
}

export const articleStore = new ArticleStore();
