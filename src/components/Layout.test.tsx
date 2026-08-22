import React from 'react';
import { render, screen } from '@testing-library/react';
import { Layout } from './Layout';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('Layout Component', () => {
  test('renders the navigation links and children content', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );

    // Check that logo/brand is rendered
    expect(screen.getByText('ArticleHub')).toBeInTheDocument();

    // Check that Home and Publish links are rendered
    const homeLink = screen.getByRole('link', { name: /home/i });
    const publishLink = screen.getByRole('link', { name: /publish/i });

    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');

    expect(publishLink).toBeInTheDocument();
    expect(publishLink).toHaveAttribute('href', '/publish');

    // Check that children content is rendered
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  test('applies active styles based on currentPath', () => {
    const { rerender } = render(
      <Layout currentPath="/">
        <div>Test Content</div>
      </Layout>
    );

    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toHaveAttribute('aria-current', 'page');

    rerender(
      <Layout currentPath="/publish">
        <div>Test Content</div>
      </Layout>
    );

    const publishLink = screen.getByRole('link', { name: /publish/i });
    expect(publishLink).toHaveAttribute('aria-current', 'page');
  });
});
