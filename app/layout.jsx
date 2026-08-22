import Link from 'next/link';
import './globals.css';
import { ArticleProvider } from './context/ArticleContext';

export const metadata = { 
  title: 'Field Notes',
  description: 'A responsive long-form publication layout with persistent header navigation.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ArticleProvider>
          <header className="site-header">
            <div className="header-container">
              <Link href="/" className="site-brand">
                Field Notes
              </Link>
              <nav className="site-nav">
                <Link href="/">Home</Link>
                <Link href="/publish">Publish</Link>
              </nav>
            </div>
          </header>
          <main className="main-container">
            {children}
          </main>
        </ArticleProvider>
      </body>
    </html>
  );
}
