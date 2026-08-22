import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ArticleDetail } from './ArticleDetail';
import { mockArticles } from '../data/articles';

describe('ArticleDetail', () => {
  const mockOnBack = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the article details correctly when a valid ID is provided', () => {
    const article = mockArticles[0];
    render(<ArticleDetail articleId={article.id} onBack={mockOnBack} />);

    expect(screen.getByText(article.title)).toBeInTheDocument();
    expect(screen.getByText(article.author)).toBeInTheDocument();
    expect(screen.getByText(article.readingTime)).toBeInTheDocument();
    
    const paragraphs = article.body.split('\n\n');
    paragraphs.forEach((p) => {
      expect(screen.getByText(p)).toBeInTheDocument();
    });
  });

  it('calls onBack when the back button is clicked', () => {
    const article = mockArticles[0];
    render(<ArticleDetail articleId={article.id} onBack={mockOnBack} />);

    const backButton = screen.getByRole('button', { name: /back to home/i });
    fireEvent.click(backButton);

    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });

  it('renders "Article not found" message when an invalid ID is provided', () => {
    render(<ArticleDetail articleId="non-existent-id" onBack={mockOnBack} />);

    expect(screen.getByText('Article Not Found')).toBeInTheDocument();
    expect(screen.getByText(/the article you are looking for does not exist/i)).toBeInTheDocument();

    const backButton = screen.getByRole('button', { name: /back to home/i });
    fireEvent.click(backButton);
    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });
});
