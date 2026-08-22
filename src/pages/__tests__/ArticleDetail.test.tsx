import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import ArticleDetail from '../ArticleDetail';
import { ArticleProvider } from '../../context/ArticleContext';
import { Article } from '../../types/article';

const sampleArticles: Article[] = [
  {
    id: '1',
    title: 'The Art of Writing Clean Code',
    author: {
      id: 'author-1',
      name: 'Jane Doe',
      avatarUrl: 'https://example.com/avatar1.jpg',
    },
    publishDate: '2023-10-15T10:00:00Z',
    readingTime: '5 min read',
    excerpt: 'Discover key principles and practices for writing maintainable and scalable code.',
    body: 'Clean code is simple, direct, and readable.\n\nWriting clean code requires discipline and adherence to best practices standard across modern software development.',
  },
  {
    id: '2',
    title: 'Designing Accessible Web Applications',
    author: 'John Smith',
    publishDate: '2023-10-20T14:30:00Z',
    readingTime: '8 min read',
    excerpt: 'Learn how to build inclusive web interfaces that everyone can use effectively.',
    body: 'Accessibility is not an afterthought; it is a fundamental aspect of user interface design.',
  },
];

const renderWithProviders = (ui: React.ReactElement, initialArticles = sampleArticles) => {
  return render(
    <ArticleProvider initialArticles={initialArticles}>
      <BrowserRouter>{ui}</BrowserRouter>
    </ArticleProvider>
  );
};

describe('ArticleDetail Component', () => {
  test('renders full article details when a valid ID is passed as a prop', () => {
    renderWithProviders(<ArticleDetail id="1" />);

    expect(screen.getByText('The Art of Writing Clean Code')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('5 min read')).toBeInTheDocument();
    expect(screen.getByText('Clean code is simple, direct, and readable.')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Writing clean code requires discipline and adherence to best practices standard across modern software development.'
      )
    ).toBeInTheDocument();

    // Check for avatar image
    const avatarImg = screen.getByAltText('Jane Doe');
    expect(avatarImg).toBeInTheDocument();
    expect(avatarImg).toHaveAttribute('src', 'https://example.com/avatar1.jpg');

    // Check for back to home link
    const backLink = screen.getByRole('link', { name: /back to home/i });
    expect(backLink).toBeInTheDocument();
    expect(backLink).toHaveAttribute('href', '/');
  });

  test('renders full article details with string author', () => {
    renderWithProviders(<ArticleDetail id="2" />);

    expect(screen.getByText('Designing Accessible Web Applications')).toBeInTheDocument();
    expect(screen.getByText('John Smith')).toBeInTheDocument();
    expect(screen.getByText('8 min read')).toBeInTheDocument();
    expect(
      screen.getByText('Accessibility is not an afterthought; it is a fundamental aspect of user interface design.')
    ).toBeInTheDocument();
  });

  test('renders article details using route params', () => {
    render(
      <ArticleProvider initialArticles={sampleArticles}>
        <MemoryRouter initialEntries={['/article/1']}>
          <Routes>
            <Route path="/article/:id" element={<ArticleDetail />} />
          </Routes>
        </MemoryRouter>
      </ArticleProvider>
    );

    expect(screen.getByText('The Art of Writing Clean Code')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
  });

  test('shows "Article not found" message when article ID does not exist', () => {
    renderWithProviders(<ArticleDetail id="999" />);

    expect(screen.getByText('Article not found')).toBeInTheDocument();
    expect(screen.getByText(/the article you are looking for does not exist/i)).toBeInTheDocument();

    const backLink = screen.getByRole('link', { name: /back to home/i });
    expect(backLink).toBeInTheDocument();
    expect(backLink).toHaveAttribute('href', '/');
  });

  test('shows "Article not found" message when no ID is provided', () => {
    renderWithProviders(<ArticleDetail />);

    expect(screen.getByText('Article not found')).toBeInTheDocument();
  });
});
