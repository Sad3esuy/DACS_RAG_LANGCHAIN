// src/app/import/page.tsx
import { FileUploader } from '@/components/features/FileUploader';
import { DocumentTable } from '@/components/features/DocumentTable';
import { MainLayout } from '@/components/layout/MainLayout';

export default function ImportPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Import Documents</h1>
        <p className="text-muted-foreground">
          Upload documents to add them to your knowledge base. They will be processed and indexed automatically.
        </p>
        
        <div className="space-y-6">
          <FileUploader />
          
          <div className="pt-6 border-t">
            <h2 className="text-xl font-bold tracking-tight mb-4">Document Library</h2>
            <DocumentTable />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}