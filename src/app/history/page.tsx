'use client';

import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';

interface ChatHistory {
  id: string;
  query: string;
  response: string;
  timestamp: string;
  source: string;
}

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  // Mock data - replace with actual data from your backend
  const chatHistory: ChatHistory[] = [
    {
      id: '1',
      query: 'What is RAG?',
      response: 'RAG (Retrieval-Augmented Generation) is a technique that combines...',
      timestamp: '2024-04-25 10:00:00',
      source: 'Document 1'
    },
    // Add more mock data as needed
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Chat History</h1>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search history..."
                className="pl-8 pr-4 py-2 rounded-md border"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Conversations</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Query</TableHead>
                  <TableHead>Response</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Timestamp</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {chatHistory.map((chat) => (
                  <TableRow key={chat.id}>
                    <TableCell className="max-w-[200px] truncate">{chat.query}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{chat.response}</TableCell>
                    <TableCell>{chat.source}</TableCell>
                    <TableCell>{chat.timestamp}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
} 