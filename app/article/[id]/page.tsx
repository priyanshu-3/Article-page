'use client';

import React from 'react';
import Link from 'next/link';
import { useArticleStore } from '../../../src/context/ArticleContext';

interface ArticlePageProps {
  params: {
    id: string;
  };
}

export default function ArticleDetailPage({ params }: ArticlePageProps) {
  const resolvedParams = React.use ? (React.use(params as any) as { id: string }) : params;
  const id = resolvedParams?.id;

  let article;
  try {
    const store = useArticleStore();
    article = id
      ? store?.getArticleById
        ? store.getArticleById(id)
        : store?.articles?.find((a) => a.id === id || a.slug === id)
      : undefined;
  } catch (e) {
    article = undefined;
  }

  if (!article) {
    return (
      <main className="missing-article" data-testid="missing-article">
        <nav style={{ marginBottom: '1.5rem' }}>
          <Link href="/">← Back to Home</Link>
        </nav>
        <div className="missing-article-container">
          <h2>Article Not Found</h2>
          <p>The article you requested (ID: {id}) could not be found.</p>
          <Link href="/">Return to Home</Link>
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
    <article className="article-detail">
      <nav style={{ marginBottom: '1.5rem' }}>
        <Link href="/">← Back to Home</Link>
      </nav>

      <header className="article-header">
        <div className="metadata">
          <span>By {authorName}</span>
          {article.publishedAt && <span>{article.publishedAt}</span>}
          {article.readingTime && <span>{article.readingTime}</span>}
        </div>
        <h1>{article.title}</h1>
      </header>

      <section className="article-content">
        {bodyText.split('\n\n').map((paragraph: string, index: number) => (
          <p key={index}>{paragraph}</p>
        ))}
      </section>
    </article>
  );
}
