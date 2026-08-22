import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useArticleStore } from '../context/ArticleContext';
import './ArticlePage.css';

export const ArticlePage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const articleStore = useArticleStore();

  const article = id
    ? articleStore.getArticleById
      ? articleStore.getArticleById(id)
      : articleStore.articles?.find((a) => a.id === id || a.slug === id)
    : undefined;

  if (!article) {
    return (
      <main className="article-page missing-article" data-testid="missing-article">
        <nav className="back-nav">
          <Link to="/" className="back-link">
            ← Back to Home
          </Link>
        </nav>
        <div className="missing-article-container">
          <h2>Article Not Found</h2>
          <p>The article you are looking for does not exist or may have been removed.</p>
          <Link to="/" className="btn-home">
            Return to Home
          </Link>
        </div>
      </main>
    );
  }

  const authorName =
    typeof article.author === 'string'
      ? article.author
      : article.author?.name || 'Anonymous';

  const bodyText = article.content || article.excerpt || '';

  return (
    <main className="article-page">
      <nav className="back-nav">
        <Link to="/" className="back-link">
          ← Back to Home
        </Link>
      </nav>

      <article className="article-detail">
        <header className="article-header">
          <h1 className="article-title">{article.title}</h1>
          <div className="article-meta">
            <span className="article-author">By {authorName}</span>
            {article.publishedAt && (
              <>
                <span className="meta-separator">•</span>
                <time className="article-date" dateTime={article.publishedAt}>
                  {article.publishedAt}
                </time>
              </>
            )}
            {article.readingTime && (
              <>
                <span className="meta-separator">•</span>
                <span className="article-reading-time">{article.readingTime}</span>
              </>
            )}
          </div>
        </header>

        <section className="article-content">
          {bodyText.split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </section>
      </article>
    </main>
  );
};

export default ArticlePage;
