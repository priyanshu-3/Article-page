import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Article, CreateArticleInput } from '../types/article';
import { ArticleStore, articleStore as defaultStore } from '../services/articleStore';

interface ArticleContextType {
  articles: Article[];
  getPublishedArticles: () => Article[];
  getArticleById: (id: string) => Article | undefined;
  addArticle: (article: CreateArticleInput) => Article;
}

const ArticleContext = createContext<ArticleContextType | undefined>(undefined);

export const ArticleProvider: React.FC<{ children: ReactNode; initialArticles?: Article[] }> = ({
  children,
  initialArticles,
}) => {
  const [store] = useState(() => new ArticleStore(initialArticles));
  const [articles, setArticles] = useState<Article[]>(() => store.getAllArticles());

  const getPublishedArticles = (): Article[] => {
    return store
      .getAllArticles()
      .filter((article) => article.isPublished !== false && article.status !== 'draft');
  };

  const getArticleById = (id: string): Article | undefined => {
    return store.getArticleById(id);
  };

  const addArticle = (articleInput: CreateArticleInput): Article => {
    const newArt = store.addArticle(articleInput);
    setArticles(store.getAllArticles());
    return newArt;
  };

  return (
    <ArticleContext.Provider
      value={{ articles, getPublishedArticles, getArticleById, addArticle }}
    >
      {children}
    </ArticleContext.Provider>
  );
};

export const useArticleStore = (): ArticleContextType => {
  const context = useContext(ArticleContext);
  if (!context) {
    return {
      articles: defaultStore.getAllArticles(),
      getPublishedArticles: () => defaultStore.getAllArticles(),
      getArticleById: (id: string) => defaultStore.getArticleById(id),
      addArticle: (articleInput) => defaultStore.addArticle(articleInput),
    };
  }
  return context;
};
