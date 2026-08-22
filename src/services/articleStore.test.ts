import { ArticleStore } from './articleStore';
import { Article } from '../types/article';

describe('ArticleStore', () => {
  let store: ArticleStore;

  const sampleArticles: Article[] = [
    {
      id: '1',
      title: 'Older Article',
      author: 'Author A',
      publishDate: '2023-01-01T00:00:00Z',
      readingTime: '2 min read',
      excerpt: 'Older excerpt',
      body: 'Older body content',
    },
    {
      id: '2',
      title: 'Newer Article',
      author: 'Author B',
      publishDate: '2023-06-01T00:00:00Z',
      readingTime: '4 min read',
      excerpt: 'Newer excerpt',
      body: 'Newer body content',
    },
  ];

  beforeEach(() => {
    store = new ArticleStore(sampleArticles);
  });

  test('getAllArticles returns articles sorted with most recent first', () => {
    const articles = store.getAllArticles();
    expect(articles).toHaveLength(2);
    expect(articles[0].id).toBe('2');
    expect(articles[1].id).toBe('1');
  });

  test('getArticleById returns article when id exists', () => {
    const article = store.getArticleById('1');
    expect(article).toBeDefined();
    expect(article?.title).toBe('Older Article');
  });

  test('getArticleById returns undefined when id does not exist', () => {
    const article = store.getArticleById('999');
    expect(article).toBeUndefined();
  });

  test('addArticle returns created article and auto-generates ID when missing', () => {
    const newArticleInput = {
      title: 'Brand New Article',
      author: 'Author C',
      publishDate: '2023-12-01T00:00:00Z',
      readingTime: '5 min read',
      excerpt: 'Brand new excerpt',
      body: 'Brand new body content',
    };

    const newArt = store.addArticle(newArticleInput);

    expect(newArt).toBeDefined();
    expect(newArt.id).toBeDefined();
    expect(typeof newArt.id).toBe('string');
    expect(newArt.title).toBe('Brand New Article');

    const retrieved = store.getArticleById(newArt.id);
    expect(retrieved).toEqual(newArt);

    const allArticles = store.getAllArticles();
    expect(allArticles[0].id).toBe(newArt.id);
  });

  test('addArticle respects provided ID', () => {
    const customIdInput = {
      id: 'custom-123',
      title: 'Custom ID Article',
      author: 'Author D',
      publishDate: '2023-03-01T00:00:00Z',
      readingTime: '3 min read',
      excerpt: 'Custom excerpt',
      body: 'Custom body',
    };

    const newArt = store.addArticle(customIdInput);

    expect(newArt.id).toBe('custom-123');
    expect(store.getArticleById('custom-123')).toBeDefined();
  });
});
