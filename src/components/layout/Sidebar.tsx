'use client';

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

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export function Sidebar({ collapsed, onToggleCollapse }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className="flex h-full flex-col justify-between"
    >
      <div className="space-y-4 py-4">
        <div className="px-3 py-2 flex items-center justify-between">
        {!collapsed && (
  <Link href="/" className="flex items-center space-x-2 px-2 py-1 group">
    {/* Bạn có thể thay bằng logo SVG nếu có */}
    <div
      className="
        text-xl font-extrabold 
        bg-clip-text text-transparent 
        bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
        transition-transform duration-300 ease-in-out
        group-hover:scale-105
      "
    >
      RAG&nbsp;&amp;&nbsp;LangChain
    </div>
  </Link>
)}

          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            className="hidden md:flex h-8 w-8"
          >
            {collapsed
              ? <ChevronRight className="h-4 w-4" />
              : <ChevronLeft  className="h-4 w-4" />}
            <span className="sr-only">
              {collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            </span>
          </Button>
        </div>
        <nav className="px-3 space-y-1">
          {navigationItems.map(item => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center rounded-md px-3 py-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                pathname === item.href
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground',
                collapsed && 'justify-center px-2'
              )}
            >
              <item.icon className={cn('h-5 w-5', !collapsed && 'mr-2')} />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
