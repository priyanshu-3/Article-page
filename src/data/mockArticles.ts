import { Article } from '../types/article';

export const MOCK_ARTICLES: Article[] = [
  {
    id: '1',
    title: 'The Art of Minimalist Field Notes',
    author: 'Elena Rostova',
    publishDate: '2023-10-24T09:00:00Z',
    readingTime: '4 min read',
    excerpt: 'Discover how keeping concise daily observations can radically improve software architecture decisions.',
    body: 'Keeping field notes is an ancient practice refined by naturalists, explorers, and scientists. In modern software engineering, field notes serve as a lightweight log of system behaviors, architectural trade-offs, and unexpected bugs encountered during development.'
  },
  {
    id: '2',
    title: 'Building Resilient State Stores in TypeScript',
    author: 'Marcus Vance',
    publishDate: '2023-11-02T14:30:00Z',
    readingTime: '6 min read',
    excerpt: 'A deep dive into in-memory store designs with predictable sorting and data integrity.',
    body: 'State management does not always require heavy reactive frameworks. In many application boundaries, a clean, well-typed in-memory service provides superior performance and easier testability.'
  },
  {
    id: '3',
    title: 'Understanding Modern Web Performance',
    author: 'Sophia Chen',
    publishDate: '2023-09-15T11:15:00Z',
    readingTime: '8 min read',
    excerpt: 'Key strategies for optimizing frontend data flow and initial render times.',
    body: 'Performance is a feature. When designing data access patterns, minimizing synchronous transformations and providing fast lookup structures ensures a responsive user interface.'
  }
];
