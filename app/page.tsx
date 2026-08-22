"use client";

import Link from 'next/link';
import { useArticles } from './context/ArticleContext';

export default function HomePage() {
  const { articles } = useArticles();

  return (
    <div className="home-container">
      <section className="hero-section">
        <header className="article-header">
          <div className="metadata">
            <span>Editorial</span>
            <span>Field Notes</span>
          </div>
          <h1>Welcome to Field Notes</h1>
        </header>
        <p>
          Field Notes is a dedicated space for long-form reading, reflection, and thoughtful writing. Designed with clarity and readability across all screens and devices.
        </p>
      </section>

      <section className="articles-feed">
        <h2 className="feed-title">Recent Articles</h2>
        {articles.length === 0 ? (
          <div className="empty-state">
            <p>No articles published yet.</p>
            <Link href="/publish" className="btn">Publish your first article</Link>
          </div>
        ) : (
          <div className="articles-list">
            {articles.map((article) => {
              const articleUrl = `/article/${article.slug || article.id}`;
              const formattedDate = article.publishedAt 
                ? new Date(article.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })
                : 'Draft';

              const authorName = typeof article.author === 'string' 
                ? article.author 
                : article.author?.name || 'Anonymous';

              return (
                <article key={article.id} className="article-card">
                  <Link href={articleUrl} className="article-card-link">
                    <div className="article-card-content">
                      <h3 className="article-title">{article.title}</h3>
                      <p className="article-excerpt">{article.excerpt}</p>
                      <div className="article-meta">
                        <span className="article-author">By {authorName}</span>
                        <span className="meta-separator" aria-hidden="true">•</span>
                        <time dateTime={article.publishedAt} className="article-date">
                          {formattedDate}
                        </time>
                        <span className="meta-separator" aria-hidden="true">•</span>
                        <span className="article-reading-time">{article.readingTime}</span>
                      </div>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
