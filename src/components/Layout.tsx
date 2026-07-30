import React, { ReactNode } from 'react';
import Header from '@/components/Header';

export default function Container({ children }: { children?: ReactNode }) {
  return (
    <section className="site-shell max-w-content min-w-content min-h-screen mx-auto px-4 sm:px-6 lg:px-8">
      <Header></Header>
      {children}
    </section>
  );
}
