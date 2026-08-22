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
      excerpt: 'Excerpt 1',
      body: 'Body 1'
    },
    {
      id: '2',
      title: 'Newer Article',
      author: 'Author B',
      publishDate: '2023-06-01T00:00:00Z',
      readingTime: '5 min read',
      excerpt: 'Excerpt 2',
      body: 'Body 2'
    }
  ];

  beforeEach(() => {
    store = new ArticleStore(sampleArticles);
  });

  it('should retrieve all articles sorted with most recent first', () => {
    const articles = store.getAllArticles();
    expect(articles).toHaveLength(2);
    expect(articles[0].id).toBe('2');
    expect(articles[1].id).toBe('1');
  });

  it('should fetch a single article by id', () => {
    const article = store.getArticleById('1');
    expect(article).toBeDefined();
    expect(article?.title).toBe('Older Article');
  });

  it('should return undefined when fetching non-existent article id', () => {
    const article = store.getArticleById('non-existent');
    expect(article).toBeUndefined();
  });

  it('should add a new article to dataset', () => {
    const newArt = store.addArticle({
      title: 'Brand New Article',
      author: 'Author C',
      publishDate: '2023-12-01T00:00:00Z',
      readingTime: '2 min read',
      excerpt: 'Excerpt 3',
      body: 'Body 3'
    });

    expect(newArt.id).toBeDefined();

    const articles = store.getAllArticles();
    expect(articles).toHaveLength(3);
    expect(articles[0].id).toBe(newArt.id);
  });
});
