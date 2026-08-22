"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Article } from '../../src/types/article';

const defaultArticles: Article[] = [
  {
    id: 'welcome-to-field-notes',
    slug: 'welcome-to-field-notes',
    title: 'Welcome to Field Notes',
    author: 'Editorial',
    publishedAt: '2025-03-30T00:00:00.000Z',
    readingTime: '5 min read',
    excerpt: 'Field Notes is designed for thoughtful, long-form reading and writing. Our focus is on editorial presentation, typography, and content clarity across all devices.',
    content: `Field Notes is a dedicated space for long-form reading, reflection, and thoughtful writing. Designed with clarity and readability across all screens and devices.\n\nEditorial Focus\nGood layout typography respects the reader. High-contrast body typography paired with structured headings creates an effortless reading experience.\n\n"Typography is the craft of endowing human language with a durable visual form."\n\nUse the navigation bar above to view published content or navigate to the Publish page to draft new entries.`,
    status: 'published'
  }
];

interface ArticleContextType {
  articles: Article[];
  addArticle: (article: Article) => void;
  isLoaded: boolean;
}

const ArticleContext = createContext<ArticleContextType | undefined>(undefined);

export function ArticleProvider({ children }: { children: React.ReactNode }) {
  const [articles, setArticles] = useState<Article[]>(defaultArticles);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('field_notes_articles');
    if (stored) {
      try {
        setArticles(JSON.parse(stored));
      } catch (e) {
        // fallback
      }
    }
    setIsLoaded(true);
  }, []);

  const addArticle = (article: Article) => {
    const updated = [article, ...articles];
    setArticles(updated);
    localStorage.setItem('field_notes_articles', JSON.stringify(updated));
  };

  return (
    <ArticleContext.Provider value={{ articles, addArticle, isLoaded }}>
      {children}
    </ArticleContext.Provider>
  );
}

export function useArticles() {
  const context = useContext(ArticleContext);
  if (context === undefined) {
    throw new Error('useArticles must be used within an ArticleProvider');
  }
  return context;
}
