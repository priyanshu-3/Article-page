import { Article, CreateArticleInput } from '../types/article';
import { mockArticles } from '../data/mockArticles';

export class ArticleStore {
  private articles: Article[];

  constructor(initialArticles: Article[] = mockArticles) {
    this.articles = [...initialArticles];
  }

  /**
   * Retrieve all articles sorted with most recent publishDate first.
   */
  public getAllArticles(): Article[] {
    return [...this.articles].sort((a, b) => {
      const dateA = new Date(a.publishDate || a.publishedAt || 0).getTime();
      const dateB = new Date(b.publishDate || b.publishedAt || 0).getTime();
      return dateB - dateA;
    });
  }

  public getArticles(): Article[] {
    return this.getAllArticles();
  }

  /**
   * Fetch a single article by ID.
   */
  public getArticleById(id: string): Article | undefined {
    return this.articles.find((article) => article.id === id);
  }

  public getArticle(id: string): Article | undefined {
    return this.getArticleById(id);
  }

  /**
   * Add a new article to the dataset.
   * Auto-generates an ID if missing and returns the created Article.
   */
  public addArticle(articleInput: CreateArticleInput): Article {
    const id =
      articleInput.id ||
      `article-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    const publishDate =
      articleInput.publishDate || articleInput.publishedAt || new Date().toISOString();
    const body = articleInput.body ?? articleInput.content ?? '';
    const content = articleInput.content ?? body;
    const publishedAt = articleInput.publishedAt || publishDate;

    const newArticle: Article = {
      ...articleInput,
      id,
      title: articleInput.title || 'Untitled Article',
      author: articleInput.author || 'Anonymous',
      publishDate,
      publishedAt,
      readingTime: articleInput.readingTime || '1 min read',
      excerpt: articleInput.excerpt || '',
      body,
      content,
    };

    this.articles.unshift(newArticle);
    return newArticle;
  }

  /**
   * Reset store to initial articles.
   */
  public reset(initialArticles: Article[] = mockArticles): void {
    this.articles = [...initialArticles];
  }
}

export const articleStore = new ArticleStore();
