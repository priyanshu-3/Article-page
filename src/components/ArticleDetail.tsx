import React from 'react';
import { mockArticles } from '../data/articles';

interface ArticleDetailProps {
  articleId: string;
  onBack?: () => void;
}

export const ArticleDetail: React.FC<ArticleDetailProps> = ({ articleId, onBack }) => {
  const article = mockArticles.find((a) => a.id === articleId);

  if (!article) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Article Not Found</h2>
        <p className="text-gray-600 mb-8">
          The article you are looking for does not exist or may have been removed.
        </p>
        <button
          onClick={onBack}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <article className="max-w-2xl mx-auto px-4 py-8 sm:py-12 lg:py-16">
      <div className="mb-8">
        <button
          onClick={onBack}
          className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500 mb-6 transition-colors"
        >
          <svg
            className="mr-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Home
        </button>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4 leading-tight">
          {article.title}
        </h1>

        <div className="flex flex-wrap items-center text-sm text-gray-500 gap-x-4 gap-y-2 border-b border-gray-200 pb-6">
          <span className="font-medium text-gray-900">{article.author}</span>
          <span className="hidden sm:inline text-gray-300">•</span>
          <time dateTime={article.publishDate}>
            {new Date(article.publishDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          <span className="hidden sm:inline text-gray-300">•</span>
          <span>{article.readingTime}</span>
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
