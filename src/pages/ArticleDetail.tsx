import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useArticleStore } from '../context/ArticleContext';

interface ArticleDetailProps {
  id?: string;
}

export const ArticleDetail: React.FC<ArticleDetailProps> = ({ id: propId }) => {
  const { id: paramId } = useParams<{ id: string }>();
  const articleId = propId || paramId;

  const { getArticleById } = useArticleStore();
  const article = articleId ? getArticleById(articleId) : undefined;

  if (!articleId || !article) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Article not found</h1>
        <p className="text-gray-600 mb-8">
          The article you are looking for does not exist or has been removed.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  const authorName = typeof article.author === 'string' ? article.author : article.author?.name || 'Unknown Author';
  const authorAvatar = typeof article.author === 'object' ? article.author?.avatarUrl : undefined;

  // Format date nicely if possible
  const formattedDate = (() => {
    try {
      return new Date(article.publishDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (e) {
      return article.publishDate;
    }
  })();

  return (
    <article className="max-w-2xl mx-auto px-4 py-8 md:py-12">
      <div className="mb-8">
        <Link
          to="/"
          className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500 mb-6 transition-colors"
        >
          &larr; Back to Home
        </Link>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 mb-4 leading-tight">
          {article.title}
        </h1>
        <div className="flex items-center space-x-4 text-gray-500 text-sm">
          {authorAvatar && (
            <img
              src={authorAvatar}
              alt={authorName}
              className="w-10 h-10 rounded-full object-cover"
            />
          )}
          <div>
            <p className="font-semibold text-gray-900">{authorName}</p>
            <div className="flex items-center space-x-2 mt-0.5">
              <span>{formattedDate}</span>
              <span>&bull;</span>
              <span>{article.readingTime}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="prose prose-indigo max-w-none text-gray-800 leading-relaxed space-y-6 text-lg">
        {article.body.split('\n\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
};

export default ArticleDetail;
