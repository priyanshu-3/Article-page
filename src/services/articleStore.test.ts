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
      readingTime: '3 min read',
      excerpt: 'Older excerpt',
      body: 'Older body content',
    },
    {
      id: '2',
      title: 'Newer Article',
      author: 'Author B',
      publishDate: '2023-06-01T00:00:00Z',
      readingTime: '5 min read',
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

  test('getArticleById returns single article by id or undefined if missing', () => {
    const found = store.getArticleById('1');
    expect(found).toBeDefined();
    expect(found?.title).toBe('Older Article');

    const notFound = store.getArticleById('non-existent');
    expect(notFound).toBeUndefined();
  });

  test('addArticle auto-generates id if omitted and returns created article', () => {
    const newArticleData = {
      title: 'Newly Created Article',
      author: 'Author C',
      publishDate: '2023-12-01T00:00:00Z',
      readingTime: '4 min read',
      excerpt: 'Newly created excerpt',
      body: 'Newly created body',
    };

    const newArt = store.addArticle(newArticleData);

    expect(newArt).toBeDefined();
    expect(newArt.id).toBeDefined();
    expect(typeof newArt.id).toBe('string');
    expect(newArt.title).toBe('Newly Created Article');

    const all = store.getAllArticles();
    expect(all).toHaveLength(3);
    expect(all[0].id).toBe(newArt.id);
  });

  test('addArticle uses supplied id if provided', () => {
    const newArticleData = {
      id: 'custom-id-100',
      title: 'Custom ID Article',
      author: 'Author D',
      publishDate: '2023-12-05T00:00:00Z',
      readingTime: '2 min read',
      excerpt: 'Custom excerpt',
      body: 'Custom body',
    };

    const newArt = store.addArticle(newArticleData);

    expect(newArt.id).toBe('custom-id-100');
    const fetched = store.getArticleById('custom-id-100');
    expect(fetched).toBeDefined();
    expect(fetched?.title).toBe('Custom ID Article');
  });
});
