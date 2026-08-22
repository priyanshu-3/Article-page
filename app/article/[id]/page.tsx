'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ArticleDetailPage() {
  const params = useParams();
  const id = params?.id as string | undefined;

  if (!id) {
    return (
      <main className="article-page missing-article">
        <nav className="article-nav" aria-label="Breadcrumb">
          <Link href="/" className="back-link">
            ← Back to Home
          </Link>
        </nav>
        <div className="empty-state" data-testid="empty-state">
          <div className="empty-state-icon" aria-hidden="true">
            📝
          </div>
          <h2 className="empty-state-title">Article Not Found</h2>
          <p className="empty-state-description">
            The requested article could not be found.
          </p>
          <Link href="/" className="empty-state-action-btn">
            Return to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <article className="article-container">
      <nav className="article-nav" aria-label="Breadcrumb" style={{ marginBottom: '2rem' }}>
        <Link href="/" className="back-link">
          ← Back to Articles
        </Link>
      </nav>
      <header className="article-header">
        <div className="metadata">
          <span>Editorial</span>
          <span>Article #{id}</span>
        </div>
        <h1>Article Details</h1>
      </header>
      <section>
        <p>
          Viewing article content for ID: {id}.
        </p>
      </section>
    </article>
  );
}
