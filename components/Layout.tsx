import { ReactNode } from 'react';
import { Layout } from '../src/components/Layout';

interface LayoutProps {
  children: ReactNode;
}

export default function DefaultLayout({ children }: LayoutProps) {
  return <Layout>{children}</Layout>;
}
