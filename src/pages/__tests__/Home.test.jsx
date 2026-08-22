import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../Home';
import { mockArticles } from '../../data/mockArticles';

const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('Home Component', () => {
  test('renders the list of articles sorted by publish date (most recent first)', () => {
    renderWithRouter(<Home articles={mockArticles} />);

    // Check if titles are rendered
    expect(screen.getByText('The Future of Generative AI in Software Engineering')).toBeInTheDocument();
    expect(screen.getByText('Designing for the Modern Web: Typography and Space')).toBeInTheDocument();
    expect(screen.getByText('The Art of Writing Clean, Maintainable Code')).toBeInTheDocument();

    // Check if author and reading time are rendered
    expect(screen.getByText('By Marcus Chen')).toBeInTheDocument();
    expect(screen.getByText('12 min read')).toBeInTheDocument();

    // Verify sorting order (most recent first)
    // Dates: Nov 1 (AI), Oct 22 (Design), Oct 15 (Clean Code)
    const headings = screen.getAllByRole('heading', { level: 2 });
    expect(headings[0]).toHaveTextContent('The Future of Generative AI in Software Engineering');
    expect(headings[1]).toHaveTextContent('Designing for the Modern Web: Typography and Space');
    expect(headings[2]).toHaveTextContent('The Art of Writing Clean, Maintainable Code');
  });

  test('renders empty state when no articles are provided', () => {
    renderWithRouter(<Home articles={[]} />);

    expect(screen.getByText('No articles published yet')).toBeInTheDocument();
    expect(screen.getByText('Publish your first article')).toBeInTheDocument();
    expect(screen.queryByText('The Future of Generative AI in Software Engineering')).not.toBeInTheDocument();
  });
});
