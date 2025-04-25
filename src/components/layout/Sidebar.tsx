// src/components/layout/Sidebar.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Upload, 
  MessageSquare, 
  History, 
  Settings, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navigationItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Import', href: '/import', icon: Upload },
  { name: 'Chat', href: '/chat', icon: MessageSquare },
  { name: 'History', href: '/history', icon: History },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <div
      className={cn(
        'group h-auto flex-shrink-0 border-r bg-background transition-all duration-300 ease-in-out',
        'w-full md:w-64',
        collapsed && 'md:w-16'
      )}
    >
      <div className="flex h-full flex-col justify-between">
        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <div className="flex items-center justify-between">
              {!collapsed && (
                <h2 className="text-lg font-semibold tracking-tight">
                  RAG & LangChain App
                </h2>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCollapsed(!collapsed)}
                className="hidden md:flex h-8 w-8"
              >
                {collapsed ? (
                  <ChevronRight className="h-4 w-4" />
                ) : (
                  <ChevronLeft className="h-4 w-4" />
                )}
                <span className="sr-only">
                  {collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                </span>
              </Button>
            </div>
          </div>
          <div className="px-3">
            <div className="space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center rounded-md px-3 py-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                    'md:py-2',
                    pathname === item.href
                      ? 'bg-accent text-accent-foreground'
                      : 'text-muted-foreground',
                    collapsed && 'md:justify-center md:px-2'
                  )}
                >
                  <item.icon className={cn('h-5 w-5', !collapsed && 'md:mr-2')} />
                  {!collapsed && <span>{item.name}</span>}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}