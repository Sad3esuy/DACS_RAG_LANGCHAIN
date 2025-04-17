// src/components/features/ChatInterface.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, ChevronDown, ChevronUp, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  sources?: Source[];
}

interface Source {
  id: string;
  title: string;
  content: string;
  relevance: number; // 0-100
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [expandedSources, setExpandedSources] = useState<Record<string, boolean>>({});
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '0px';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${scrollHeight}px`;
    }
  }, [inputValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim() || isProcessing) return;
    
    // Add user message
    const userMessage: Message = {
      id: `msg-${Date.now()}-user`,
      content: inputValue.trim(),
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      // Mock sources
      const mockSources: Source[] = [
        {
          id: `source-${Date.now()}-1`,
          title: 'Document 1',
          content: 'This is a relevant excerpt from Document 1 that provides information related to the query. It contains key data points and explanations that the answer is based on.',
          relevance: 95
        },
        {
          id: `source-${Date.now()}-2`,
          title: 'Document 2',
          content: 'Another relevant excerpt from Document 2 with additional context and supporting information for the answer provided.',
          relevance: 82
        }
      ];
      
// Add assistant response
const assistantMessage: Message = {
    id: `msg-${Date.now()}-assistant`,
    content: `Here's a response to your question "${userMessage.content}". This is a simulated response that would normally come from your RAG system using LangChain. The response would be based on the documents in your knowledge base and would include citations to the relevant sources.`,
    sender: 'assistant',
    timestamp: new Date(),
    sources: mockSources
  };
  
  setMessages((prev) => [...prev, assistantMessage]);
  setIsProcessing(false);
}, 1500);
};

const toggleSourceExpansion = (messageId: string) => {
setExpandedSources((prev) => ({
  ...prev,
  [messageId]: !prev[messageId]
}));
};

return (
<div className="flex h-full flex-col">
  <div className="flex-1 overflow-y-auto p-4 space-y-6">
    {messages.length === 0 ? (
      <div className="flex h-full flex-col items-center justify-center text-center">
        <div className="rounded-full bg-primary/10 p-4">
          <User className="h-8 w-8 text-primary" />
        </div>
        <h3 className="mt-4 text-lg font-medium">Start a conversation</h3>
        <p className="mt-2 text-sm text-muted-foreground max-w-sm">
          Ask questions about your documents and get answers with citations.
        </p>
      </div>
    ) : (
      messages.map((message) => (
        <div
          key={message.id}
          className={cn(
            "flex",
            message.sender === 'user' ? "justify-end" : "justify-start"
          )}
        >
          <div
            className={cn(
              "max-w-[80%] rounded-lg px-4 py-3",
              message.sender === 'user'
                ? "bg-primary text-primary-foreground"
                : "bg-muted"
            )}
          >
            <div className="space-y-2">
              <p>{message.content}</p>
              <p className="text-xs opacity-70">
                {message.timestamp.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>

            {message.sources && message.sources.length > 0 && (
              <div className="mt-3 pt-3 border-t border-primary/20">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-between p-0 h-6 text-xs font-medium"
                  onClick={() => toggleSourceExpansion(message.id)}
                >
                  <span>Sources ({message.sources.length})</span>
                  {expandedSources[message.id] ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
                
                <AnimatePresence>
                  {expandedSources[message.id] && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-2 space-y-2">
                        {message.sources.map((source) => (
                          <div
                            key={source.id}
                            className="rounded border bg-background p-2 text-xs"
                          >
                            <div className="font-medium">{source.title}</div>
                            <p className="mt-1 line-clamp-3">{source.content}</p>
                            <div className="mt-1 flex items-center">
                              <div className="h-1 flex-1 rounded-full bg-muted">
                                <div
                                  className="h-full rounded-full bg-primary"
                                  style={{ width: `${source.relevance}%` }}
                                />
                              </div>
                              <span className="ml-2 text-xs">{source.relevance}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      ))
    )}
    <div ref={messagesEndRef} />
  </div>

  <div className="border-t p-4">
    <form onSubmit={handleSubmit} className="flex items-end gap-2">
      <div className="relative flex-1">
        <textarea
          ref={textareaRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..."
          className="flex w-full rounded-md border border-input bg-background p-3 pr-12 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-h-[200px] min-h-[44px] resize-none"
          rows={1}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
        <Button
          type="submit"
          size="icon"
          disabled={!inputValue.trim() || isProcessing}
          className="absolute bottom-1 right-1 h-8 w-8"
        >
          <Send className="h-4 w-4" />
          <span className="sr-only">Send message</span>
        </Button>
      </div>
    </form>
    <p className="mt-2 text-xs text-center text-muted-foreground">
      Powered by LangChain and Vector Database
    </p>
  </div>
</div>
);
}