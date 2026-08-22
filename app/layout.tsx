import type { Metadata } from 'next';
import Layout from '@/components/Layout';
import './globals.css';

export const metadata: Metadata = {
  title: 'App',
  description: 'Application layout with persistent navigation',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
