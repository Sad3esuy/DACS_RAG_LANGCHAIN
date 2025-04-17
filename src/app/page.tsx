// src/app/page.tsx
import { Dashboard } from '@/components/features/Dashboard';
import { MainLayout } from '@/components/layout/MainLayout';

export default function DashboardPage() {
  return (
    <MainLayout>
      <Dashboard />
    </MainLayout>
  );
}