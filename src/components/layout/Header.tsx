// src/components/layout/Header.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Sun, Moon, ChevronDown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/contexts/ThemeContext';

interface HeaderProps {
  onMobileMenuClick: () => void;
}

export function Header({ onMobileMenuClick }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  // Breadcrumb generation
  const generateBreadcrumbs = () => {
    if (!pathname || pathname === '/') return [{ label: 'Dashboard', href: '/' }];
    
    const segments = pathname.split('/').filter(Boolean);
    let path = '';
    
    return [
      { label: 'Dashboard', href: '/' },
      ...segments.map(segment => {
        path += `/${segment}`;
        return {
          label: segment.charAt(0).toUpperCase() + segment.slice(1),
          href: path
        };
      })
    ];
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-lg md:text-xl font-bold">RAG & LangChain App</div>
          </Link>
          
          {/* Breadcrumbs - hidden on mobile */}
          <nav className="hidden md:flex items-center space-x-2">
            {breadcrumbs.map((crumb, index) => (
              <div key={crumb.href} className="flex items-center">
                {index > 0 && <ChevronDown className="h-4 w-4 mx-1 rotate-270" />}
                <Link 
                  href={crumb.href}
                  className={`text-sm ${
                    index === breadcrumbs.length - 1 
                      ? 'font-medium text-foreground' 
                      : 'text-muted-foreground'
                  }`}
                >
                  {crumb.label}
                </Link>
              </div>
            ))}
          </nav>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-9 w-9 rounded-full"
          >
            {theme === 'light' ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="/avatar.png" alt="Avatar" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onMobileMenuClick}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 top-16 z-50 bg-background md:hidden">
            <nav className="flex flex-col gap-4 p-4">
              <Link href="/" className="flex items-center py-2" onClick={() => setIsMobileMenuOpen(false)}>
                Dashboard
              </Link>
              <Link href="/import" className="flex items-center py-2" onClick={() => setIsMobileMenuOpen(false)}>
                Import
              </Link>
              <Link href="/chat" className="flex items-center py-2" onClick={() => setIsMobileMenuOpen(false)}>
                Chat
              </Link>
              <Link href="/history" className="flex items-center py-2" onClick={() => setIsMobileMenuOpen(false)}>
                History
              </Link>
              <Link href="/settings" className="flex items-center py-2" onClick={() => setIsMobileMenuOpen(false)}>
                Settings
              </Link>
              
              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <div className="flex items-center">
                  <Avatar className="h-9 w-9 mr-2">
                    <AvatarImage src="/avatar.png" alt="Avatar" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div>User</div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  className="h-9 w-9 rounded-full"
                >
                  {theme === 'light' ? (
                    <Moon className="h-4 w-4" />
                  ) : (
                    <Sun className="h-4 w-4" />
                  )}
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}