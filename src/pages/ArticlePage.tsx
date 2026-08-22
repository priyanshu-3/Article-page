import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useArticleStore } from '../context/ArticleContext';
import { EmptyState } from '../components/EmptyState';
import { formatDate, getAuthorName } from '../utils/formatters';
import { Article } from '../types/article';
import './ArticlePage.css';

export const ArticlePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const store = useArticleStore();

  const article: Article | undefined = React.useMemo(() => {
    if (!id) return undefined;

    if (typeof store.getArticleById === 'function') {
      const found = store.getArticleById(id);
      if (found) return found;
    }
    if (typeof store.getArticleBySlug === 'function') {
      const found = store.getArticleBySlug(id);
      if (found) return found;
    }
    if (typeof store.getArticle === 'function') {
      const found = store.getArticle(id);
      if (found) return found;
    }
    const published = store.getPublishedArticles ? store.getPublishedArticles() : [];
    const foundInPublished = published.find(
      (a: Article) => a.id === id || a.slug === id
    );
    if (foundInPublished) return foundInPublished;

    const all = store.articles || [];
    return all.find((a: Article) => a.id === id || a.slug === id);
  }, [id, store]);

  if (!article) {
    return (
      <main className="article-page missing-article">
        <nav className="article-nav" aria-label="Breadcrumb">
          <Link to="/" className="back-link">
            ← Back to Home
          </Link>
        </nav>
        <EmptyState
          title="Article Not Found"
          description="The article you are looking for does not exist or may have been removed."
          actionText="Return to Home"
          actionUrl="/"
        />
      </main>
    );
  }

  const formattedDate = formatDate(article.publishedAt);
  const authorName = getAuthorName(article.author);
  const contentText = article.content || article.excerpt;
  const paragraphs = contentText ? contentText.split('\n\n').filter(Boolean) : [];

  return (
    <main className="article-page" data-testid="article-detail">
      <nav className="article-nav" aria-label="Breadcrumb">
        <Link to="/" className="back-link" aria-label="Return to Home page">
          ← Back to Articles
        </Link>
      </nav>

      <article className="article-container">
        <header className="article-header">
          <h1 className="article-title">{article.title}</h1>
          <div className="article-meta">
            <span className="article-author">By {authorName}</span>
            <span className="meta-separator" aria-hidden="true">
              •
            </span>
            <time dateTime={article.publishedAt} className="article-date">
              {formattedDate}
            </time>
            <span className="meta-separator" aria-hidden="true">
              •
            </span>
            <span className="article-reading-time">{article.readingTime}</span>
          </div>
        </header>

        <section className="article-body">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="article-paragraph">
              {paragraph}
            </p>
          ))}
        </section>
      </article>
    </main>
  );
};

export default ArticlePage;
