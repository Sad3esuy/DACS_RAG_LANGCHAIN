// src/app/chat/page.tsx
import { ChatInterface } from '@/components/features/ChatInterface';
import { MainLayout } from '@/components/layout/MainLayout';

export default function ChatPage() {
  return (
    <MainLayout>
      <div className="flex h-[calc(100vh-120px)] flex-col">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Chat</h1>
        <div className="flex-1 overflow-hidden rounded-md border">
          <ChatInterface />
        </div>
      </div>
    </MainLayout>
  );
}