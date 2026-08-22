import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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
    const homeLinks = screen.getAllByRole('link', { name: /home/i });
    const publishLinks = screen.getAllByRole('link', { name: /publish/i });

    expect(homeLinks[0]).toBeInTheDocument();
    expect(homeLinks[0]).toHaveAttribute('href', '/');

    expect(publishLinks[0]).toBeInTheDocument();
    expect(publishLinks[0]).toHaveAttribute('href', '/publish');

    // Check that children content is rendered
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  test('applies active styles based on currentPath', () => {
    const { rerender } = render(
      <Layout currentPath="/">
        <div>Test Content</div>
      </Layout>
    );

    const homeLinks = screen.getAllByRole('link', { name: /home/i });
    expect(homeLinks[0]).toHaveAttribute('aria-current', 'page');

    rerender(
      <Layout currentPath="/publish">
        <div>Test Content</div>
      </Layout>
    );

    const publishLinks = screen.getAllByRole('link', { name: /publish/i });
    expect(publishLinks[0]).toHaveAttribute('aria-current', 'page');
  });

  test('toggles mobile navigation menu when button is clicked', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );

    // Mobile menu should not be visible initially
    expect(screen.queryByLabelText(/mobile navigation/i)).not.toBeInTheDocument();

    // Find and click the toggle button
    const toggleButton = screen.getByRole('button', { name: /toggle navigation menu/i });
    expect(toggleButton).toBeInTheDocument();
    
    fireEvent.click(toggleButton);

    // Mobile menu should now be visible
    const mobileNav = screen.getByLabelText(/mobile navigation/i);
    expect(mobileNav).toBeInTheDocument();

    // Click again to close
    fireEvent.click(toggleButton);
    expect(screen.queryByLabelText(/mobile navigation/i)).not.toBeInTheDocument();
  });
});
