import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Article } from '../types/article';
import { mockArticles } from '../data/mockArticles';

export interface ArticleContextType {
  articles: Article[];
  getAllArticles: () => Article[];
  getPublishedArticles: () => Article[];
  getArticleById: (id: string) => Article | undefined;
  addArticle: (article: Article) => void;
}

const ArticleContext = createContext<ArticleContextType | undefined>(undefined);

export const ArticleProvider: React.FC<{
  children: ReactNode;
  initialArticles?: Article[];
}> = ({ children, initialArticles = mockArticles }) => {
  const [articles, setArticles] = useState<Article[]>(initialArticles);

  const getAllArticles = (): Article[] => {
    return [...articles].sort((a, b) => {
      const dateA = new Date(a.publishDate || a.publishedAt || 0).getTime();
      const dateB = new Date(b.publishDate || b.publishedAt || 0).getTime();
      return dateB - dateA;
    });
  };

  const getPublishedArticles = (): Article[] => {
    return articles
      .filter((article) => article.isPublished !== false && article.status !== 'draft')
      .sort((a, b) => {
        const dateA = new Date(a.publishDate || a.publishedAt || 0).getTime();
        const dateB = new Date(b.publishDate || b.publishedAt || 0).getTime();
        return dateB - dateA;
      });
  };

  const getArticleById = (id: string): Article | undefined => {
    return articles.find((article) => article.id === id);
  };

  const addArticle = (article: Article) => {
    const publishDate = article.publishDate || article.publishedAt || new Date().toISOString();
    const publishedAt = article.publishedAt || publishDate;
    const body = article.body || article.content || '';
    const content = article.content || body;

    const newArticle: Article = {
      ...article,
      publishDate,
      publishedAt,
      body,
      content,
    };

    setArticles((prev) => [newArticle, ...prev]);
  };

  return (
    <ArticleContext.Provider
      value={{
        articles,
        getAllArticles,
        getPublishedArticles,
        getArticleById,
        addArticle,
      }}
    >
      {children}
    </ArticleContext.Provider>
  );
};

export const useArticleStore = (): ArticleContextType => {
  const context = useContext(ArticleContext);
  if (!context) {
    return {
      articles: [],
      getAllArticles: () => [],
      getPublishedArticles: () => [],
      getArticleById: () => undefined,
      addArticle: () => {},
    };
  }
  return context;
};
