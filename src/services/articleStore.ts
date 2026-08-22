import { Article, CreateArticleInput } from '../types/article';
import { MOCK_ARTICLES } from '../data/mockArticles';

export class ArticleStore {
  private articles: Map<string, Article> = new Map();

  constructor(initialArticles: Article[] = MOCK_ARTICLES) {
    this.seed(initialArticles);
  }

  /**
   * Seed or reseed the store with articles.
   */
  public seed(articles: Article[]): void {
    this.articles.clear();
    for (const article of articles) {
      this.articles.set(article.id, { ...article });
    }
  }

  /**
   * Retrieves all articles sorted with most recent first.
   */
  public getAllArticles(): Article[] {
    return Array.from(this.articles.values()).sort((a, b) => {
      const dateA = new Date(a.publishDate).getTime();
      const dateB = new Date(b.publishDate).getTime();
      return dateB - dateA;
    });
  }

  /**
   * Fetches a single article by its unique id.
   * Returns undefined if the article is not found.
   */
  public getArticleById(id: string): Article | undefined {
    const article = this.articles.get(id);
    return article ? { ...article } : undefined;
  }

  /**
   * Adds a new article to the store dataset.
   * Generates a unique ID if one is not provided.
   */
  public addArticle(articleInput: CreateArticleInput): Article {
    const id = articleInput.id || this.generateId();
    const newArticle: Article = {
      ...articleInput,
      id
    };
    this.articles.set(id, newArticle);
    return { ...newArticle };
  }

  /**
   * Clears all articles from the store.
   */
  public clear(): void {
    this.articles.clear();
  }

  private generateId(): string {
    return `art_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }
}

export const articleStore = new ArticleStore();
