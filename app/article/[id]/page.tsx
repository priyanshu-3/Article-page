"use client";

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useArticles } from '../../context/ArticleContext';

export default function ArticleDetailPage() {
  const params = useParams();
  const idOrSlug = params?.id as string;
  const { articles, isLoaded } = useArticles();

  if (!isLoaded) {
    return (
      <div className="loading-container">
        <p>Loading article...</p>
      </div>
    ); 
  }

  const article = articles.find(
    (a) => a.id === idOrSlug || a.slug === idOrSlug
  );

  if (!article) {
    return (
      <div className="error-container">
        <h1>Article Not Found</h1>
        <p>The article you are looking for does not exist or has been removed.</p>
        <Link href="/" className="back-link">
          Back to Home
        </Link>
      </div>
    );
  }

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
    <article className="article-detail">
      <header className="article-header">
        <div className="metadata">
          <span>Editorial</span>
          <span>{formattedDate}</span>
          <span>{article.readingTime}</span>
        </div>
        <h1>{article.title}</h1>
        <div className="author-info">
          <span>By {authorName}</span>
        </div>
      </header>
      <section className="article-content">
        {article.content?.split('\n\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        )) || <p>{article.excerpt}</p>}
      </section>
      <footer className="article-footer">
        <Link href="/" className="back-link">
          ← Back to Home
        </Link>
      </footer>
    </article>
  );
}
