'use client';

import { ReactNode, useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { cn } from '@/lib/utils';

export function MainLayout({ children }: { children: ReactNode }) {
  // Quản lý collapsed tại layout để tính margin cho content
  const [collapsed, setCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Sidebar width ở desktop
  const sidebarWidth = collapsed ? 'w-16' : 'w-64';
  // margin-left cho content ở desktop (md+)
  const contentMl = collapsed ? 'md:ml-16' : 'md:ml-64';

  return (
    <>
      <div className="flex h-screen overflow-hidden bg-background">
        {/* Mobile overlay */}
        {isMobileSidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
        )}

        {/* Sidebar (fixed so không scroll) */}
        <div
          className={cn(
            // fixed viewport, top-left
            'fixed top-0 left-0 h-screen z-50 bg-background border-r transition-all duration-300 ease-in-out',
            // width desktop
            sidebarWidth,
            // mobile slide
            isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          )}
        >
          {/* truyền prop để Sidebar biết collapsed hay không */}
          <Sidebar
            collapsed={collapsed}
            onToggleCollapse={() => setCollapsed(!collapsed)}
          />
        </div>

        {/* Main content */}
        <div className={cn(
            'flex flex-1 flex-col overflow-hidden',
            // margin-left trên md+ bằng width sidebar
            contentMl
          )}
        >
          <Header 
            onMobileMenuClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)} 
          />
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
