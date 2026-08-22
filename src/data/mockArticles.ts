import { Article } from '../types/article';

export const MOCK_ARTICLES: Article[] = [
  {
    id: '1',
    title: 'Getting Started with Field Notes',
    author: 'Sarah Jenkins',
    publishDate: '2023-10-01T08:00:00Z',
    readingTime: '3 min read',
    excerpt: 'Welcome to Field Notes, a lightweight article management and publishing platform.',
    body: 'Field Notes is designed to give writers and developers a clean, uncluttered interface for creating and reading articles...'
  },
  {
    id: '2',
    title: 'Designing for Readability and Performance',
    author: 'Marcus Vance',
    publishDate: '2023-11-15T12:30:00Z',
    readingTime: '5 min read',
    excerpt: 'How thoughtful UI choices and clean state management elevate user experience.',
    body: 'When building modern web applications, speed and clarity are paramount...'
  },
  {
    id: '3',
    title: 'Effective In-Memory State Architecture',
    author: 'Elena Rostova',
    publishDate: '2023-12-20T16:45:00Z',
    readingTime: '4 min read',
    excerpt: 'Exploring patterns for local state management in modern JavaScript/TypeScript applications.',
    body: 'Managing application state cleanly without unnecessary dependencies keeps codebases agile and fast...'
  }
];
