import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  currentPath?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentPath = '/' }) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col">
      {/* Persistent Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md support-backdrop-blur:bg-white/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo / Brand */}
            <div className="flex-shrink-0">
              <a href="/" className="flex items-center gap-2 font-semibold text-lg tracking-tight text-slate-900 hover:text-blue-600 transition-colors">
                <svg
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
                <span>ArticleHub</span>
              </a>
            </div>

            {/* Navigation Links */}
            <nav className="flex items-center space-x-1 sm:space-x-4" aria-label="Main Navigation">
              <a
                href="/"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPath === '/' || currentPath === '/home'
                    ? 'bg-slate-100 text-slate-900'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
                aria-current={currentPath === '/' || currentPath === '/home' ? 'page' : undefined}
              >
                Home
              </a>
              <a
                href="/publish"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPath === '/publish'
                    ? 'bg-slate-100 text-slate-900'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
                aria-current={currentPath === '/publish' ? 'page' : undefined}
              >
                Publish
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-fade-in">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} ArticleHub. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-slate-500">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
