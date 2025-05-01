'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export type Tab = {
  name: string;
  href: string;
};

type TabsProps = {
  tabs: Tab[];
  className?: string;
};

const Tabs: React.FC<TabsProps> = ({ tabs, className = "" }) => {
  const pathname = usePathname();

  return (
    <div className={`flex space-x-4 ${className}`}>
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
              isActive
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {tab.name}
          </Link>
        );
      })}
    </div>
  );
};

export default Tabs;
