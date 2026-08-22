"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useArticles } from '../context/ArticleContext';
import { Article } from '../../src/types/article';

export default function PublishPage() {
  const router = useRouter();
  const { addArticle } = useArticles();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  const [errors, setErrors] = useState({
    title: '',
    author: '',
    content: '',
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (errors.title) {
      setErrors((prev) => ({ ...prev, title: '' }));
    }
  };

  const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthor(e.target.value);
    if (errors.author) {
      setErrors((prev) => ({ ...prev, author: '' }));
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    if (errors.content) {
      setErrors((prev) => ({ ...prev, content: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      title: title.trim() ? '' : 'Title is required.',
      author: author.trim() ? '' : 'Author/byline is required.',
      content: content.trim() ? '' : 'Article content is required.',
    };

    if (newErrors.title || newErrors.author || newErrors.content) {
      setErrors(newErrors);
      return;
    }

    // Compute reading time
    const wordsCount = content.trim().split(/\s+/).filter(Boolean).length;
    const readingTimeMinutes = Math.max(1, Math.round(wordsCount / 200));
    const readingTime = `${readingTimeMinutes} min read`;

    // Compute excerpt
    const cleanContent = content.trim();
    const excerpt = cleanContent.length > 150 
      ? cleanContent.substring(0, 150).trim() + '...' 
      : cleanContent;

    // Compute slug
    const baseSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    const slug = baseSlug || `article-${Date.now()}`;

    const id = Date.now().toString();

    const newArticle: Article = {
      id,
      slug,
      title: title.trim(),
      author: author.trim(),
      publishedAt: new Date().toISOString(),
      readingTime,
      excerpt,
      content: cleanContent,
      status: 'published',
    };

    addArticle(newArticle);
    router.push(`/article/${slug}`);
  };

  return (
    <section className="publish-section">
      <div className="metadata">
        <span>Draft</span>
      </div>
      <h1>Publish</h1>
      <p className="publish-subtitle">
        Draft and publish new long-form articles to Field Notes.
      </p>

      <form onSubmit={handleSubmit} className="publish-form" noValidate>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            className={errors.title ? 'input-error' : ''}
            placeholder="Enter article title..."
          />
          {errors.title && <span className="error-message">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="author">Author / Byline</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={handleAuthorChange}
            className={errors.author ? 'input-error' : ''}
            placeholder="Enter author name..."
          />
          {errors.author && <span className="error-message">{errors.author}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="content">Article Content</label>
          <textarea
            id="content"
            value={content}
            onChange={handleContentChange}
            className={errors.content ? 'input-error' : ''}
            rows={12}
            placeholder="Write your article content here..."
          />
          {errors.content && <span className="error-message">{errors.content}</span>}
        </div>

        <button type="submit" className="btn btn-primary">
          Publish Article
        </button>
      </form>
    </section>
  );
}
