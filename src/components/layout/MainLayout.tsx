// src/components/layout/MainLayout.tsx
'use client';

import { ReactNode, useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { cn } from '@/lib/utils';

export function MainLayout({ children }: { children: ReactNode }) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <>
      <div className="flex h-fix overflow-hidden bg-background">
        {/* Mobile Sidebar Overlay */}
        {isMobileSidebarOpen && (
          <div 
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
        )}
        
        {/* Sidebar */}
        <div className={cn(
          'fixed md:relative z-50 transition-transform duration-300 ease-in-out',
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}>
          <Sidebar />
        </div>

        <div className="flex flex-1 flex-col overflow-hidden">
          <Header onMobileMenuClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)} />
          <main className="flex-1 overflow-auto p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}