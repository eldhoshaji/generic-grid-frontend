'use client';

import Tabs from '@/components/Layout/Tab';
import { useParams } from 'next/navigation';
import React from 'react';
import Link from 'next/link';

const tabs = [
  { name: 'Users', href: '/users' },
  { name: 'Products', href: '/products' },
  { name: 'Price Comparison', href: '/product_price_comparison' },
];

export default function PagesLayout({ children }: { children: React.ReactNode }) {

  const { resource } = useParams();

  // Custom function to render conditions above the table based on the resource type
  const renderConditions = () => {
    if (resource === 'users') {
      return (
        <div>
          <h3 className="font-bold mb-2">Conditions</h3>
          <p>Rows are highlighted based on the age of the user:</p>
          <ul>
            <li>1. Green for users with age &lt;= 50</li>
            <li>2. Red for users with age &gt; 50</li>
          </ul>
        </div>
      );
    }
    if (resource === 'products') {
      return (
        <div>
          <h3 className="font-bold mb-2">Conditions</h3>
          <p>Rows are highlighted based on the product&apos;s purchase date:</p>
          <ul>
            <li>Red for products purchased before 2025</li>
          </ul>
          <p>Each product also contains a custom link and tags for category.</p>
        </div>
      );
    }
    if (resource === 'product_price_comparison') {
      return (
        <div>
          <h3 className="font-bold mb-2">Conditions</h3>
          <p>This table compares product prices over the last 10 years with a heatmap effect based on price trends.</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <main className="p-8">
      <div className='flex justify-between'>
        <Tabs tabs={tabs} />
        <Link href="/sample-grid" className="px-4 py-2 rounded text-sm font-medium bg-blue-200 cursor-pointer">
            Sample Grid
        </Link>
      </div>
      <div className="mt-6">{renderConditions()}</div>
      <div className="mt-6">{children}</div>
    </main>
  );
}
