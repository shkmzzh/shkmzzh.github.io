import React, { ReactNode } from 'react';
import Header from '@/components/Header';

export default function Container({ children }: { children?: ReactNode }) {
  return (
    <section className="max-w-content min-w-content min-h-screen mx-auto px-3">
      <Header></Header>
      {children}
    </section>
  );
}
