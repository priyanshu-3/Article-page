import { Article } from '../types/article';

export const mockArticles: Article[] = [
  {
    id: '1',
    title: 'The Future of Web Development in 2024',
    author: 'Jane Doe',
    publishDate: '2024-03-15',
    readingTime: '5 min read',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac diam eget erat vulputate pretium. Mauris non sodales eros. Phasellus non elementum leo. Curabitur vel sem sit amet tellus sodales feugiat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam erat volutpat.\n\nIn hac habitasse platea dictumst. Etiam sit amet ex ac urna hendrerit feugiat. Duis sed nisl id leo pretium scelerisque. Nunc vitae ex ac magna convallis rhoncus. Cras sit amet nisl ac magna convallis rhoncus. Cras sit amet nisl ac magna convallis rhoncus.'
  },
  {
    id: '2',
    title: 'Mastering React Server Components',
    author: 'John Smith',
    publishDate: '2024-03-10',
    readingTime: '8 min read',
    body: 'React Server Components (RSC) represent a paradigm shift in how we build React applications. By running components on the server, we can reduce bundle sizes, improve initial load times, and simplify data fetching.\n\nIn this article, we will explore how RSCs work under the hood, how they differ from Client Components, and how you can start using them in your projects today.'
  }
];
