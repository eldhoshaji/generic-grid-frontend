// src/app/(pages)/layout.tsx
import Tabs from '@/components/Tab';
import React from 'react';

const tabs = [
  { name: 'Users', href: '/users' },
  { name: 'Products', href: '/products' },
  { name: 'Price Comparison', href: '/product_price_comparison' },
];

export default function PagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      <Tabs tabs={tabs} />
      <div className="mt-6">{children}</div>
    </main>
  );
}
