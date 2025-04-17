// src/components/features/FileUploader.tsx
'use client';

import React, { useState, useRef } from 'react';
import { Upload, X, FileText, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import Image from 'next/image';

interface FileWithPreview {
  id: string;
  file: File;
  preview?: string;
  progress: number;
  status: 'uploading' | 'processing' | 'complete' | 'error';
}

export function FileUploader() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const processFile = (file: File) => {
    const id = `file-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    const preview = file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined;

    const newFile: FileWithPreview = {
      id,
      file,
      preview,
      progress: 0,
      status: 'uploading'
    };

    setFiles(prev => [...prev, newFile]);

    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      if (progress <= 100) {
        setFiles(prev =>
          prev.map(f => f.id === id ? { ...f, progress } : f)
        );
      } else {
        clearInterval(interval);
        // Simulate processing (indexing)
        setFiles(prev =>
          prev.map(f => f.id === id ? { ...f, status: 'processing' } : f)
        );
        // Simulate completion
        setTimeout(() => {
          setFiles(prev =>
            prev.map(f => f.id === id ? { ...f, status: 'complete' } : f)
          );
          toast.success(`File "${file.name}" uploaded and indexed successfully`);
        }, 2000);
      }
    }, 300);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files.length) {
      Array.from(e.dataTransfer.files).forEach(processFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      Array.from(e.target.files).forEach(processFile);
    }
  };

  const handleSelectClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = (id: string) => {
    setFiles(prev => {
      const toRemove = prev.find(f => f.id === id);
      if (toRemove?.preview) URL.revokeObjectURL(toRemove.preview);
      return prev.filter(f => f.id !== id);
    });
  };

  const getFileIcon = (f: FileWithPreview) => {
    const { file, preview } = f;
    if (file.type.startsWith('image/') && preview) {
      return (
        <Image
          src={preview}
          alt={file.name}
          width={40}
          height={40}
          className="h-10 w-10 rounded object-cover"
        />
      );
    }
    if (file.type === 'application/pdf') {
      return <FileText className="h-10 w-10 text-red-500" />;
    }
    return <FileText className="h-10 w-10 text-blue-500" />;
  };

  const getStatusIcon = (f: FileWithPreview) => {
    switch (f.status) {
      case 'complete':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'processing':
        return (
          <div className="h-5 w-5 rounded-full border-2 border-t-transparent border-blue-500 animate-spin" />
        );
      case 'error':
        return <X className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      <div
        className={cn(
          'border-2 border-dashed rounded-lg p-6 text-center transition-colors',
          isDragging
            ? 'border-primary bg-primary/5'
            : 'border-muted-foreground/20 hover:border-primary/50'
        )}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.txt,.md,.csv,image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <div className="flex flex-col items-center space-y-4">
          <Upload className="h-10 w-10 text-muted-foreground" />
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Drag & drop files here</h3>
            <p className="text-sm text-muted-foreground">or</p>
            <Button variant="outline" onClick={handleSelectClick}>
              Select Files
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Supports PDF, DOC, DOCX, TXT, MD, CSV, images
          </p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="mt-6 space-y-4">
          <h4 className="text-sm font-medium">Files</h4>
          <AnimatePresence>
            {files.map(f => (
              <motion.div
                key={f.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-between rounded-md border p-3"
              >
                <div className="flex items-center space-x-3">
                  {getFileIcon(f)}
                  <div>
                    <p className="text-sm font-medium line-clamp-1">
                      {f.file.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {(f.file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  {f.status === 'uploading' && (
                    <div className="w-24">
                      <div className="h-1.5 w-full rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary transition-all"
                          style={{ width: `${f.progress}%` }}
                        />
                      </div>
                      <p className="mt-1 text-xs text-right">
                        {f.progress}%
                      </p>
                    </div>
                  )}
                  {getStatusIcon(f)}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveFile(f.id)}
                    className="h-7 w-7 rounded-full"
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Remove file</span>
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
