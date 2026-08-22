import React from 'react';
import { Link } from 'react-router-dom';

// Helper to format date nicely
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export default function Home({ articles = [] }) {
  // Sort articles by publishDate in reverse chronological order (most recent first)
  const sortedArticles = [...articles].sort((a, b) => {
    return new Date(b.publishDate) - new Date(a.publishDate);
  });

  const hasArticles = sortedArticles.length > 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8 font-serif">
      {/* Header */}
      <header className="mb-16 border-b border-gray-100 pb-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-4 font-sans">
          The Editorial Journal
        </h1>
        <p className="text-lg text-gray-500 font-sans">
          Thoughtful perspectives, deep dives, and modern essays on technology, design, and culture.
        </p>
      </header>

      {/* Main Content */}
      <main>
        {hasArticles ? (
          <div className="space-y-16">
            {sortedArticles.map((article) => (
              <article key={article.id} className="group flex flex-col items-start">
                {/* Metadata */}
                <div className="flex items-center gap-x-3 text-sm text-gray-500 mb-3 font-sans">
                  <time dateTime={article.publishDate}>
                    {formatDate(article.publishDate)}
                  </time>
                  <span className="text-gray-300">•</span>
                  <span>{article.readingTime}</span>
                </div>

                {/* Title */}
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-200 mb-4 leading-tight">
                  <Link to={`/articles/${article.slug || article.id}`}>
                    {article.title}
                  </Link>
                </h2>

                {/* Excerpt */}
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-4 font-serif">
                  {article.excerpt}
                </p>

                {/* Author & Read More */}
                <div className="flex items-center justify-between w-full mt-2 pt-4 border-t border-gray-50">
                  <span className="text-sm font-medium text-gray-700 font-sans">
                    By {article.author}
                  </span>
                  <Link
                    to={`/articles/${article.slug || article.id}`}
                    className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 font-sans flex items-center gap-1 group-hover:underline"
                  >
                    Read article
                    <svg
                      className="w-4 h-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20 px-4 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
            <div className="max-w-md mx-auto">
              <svg
                className="mx-auto h-16 w-16 text-gray-400 mb-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-sans">No articles published yet</h3>
              <p className="text-gray-500 mb-8 font-sans">
                Welcome to your new publication! Start sharing your thoughts, stories, and ideas with the world.
              </p>
              <Link
                to="/write"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 font-sans shadow-sm"
              >
                Publish your first article
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
