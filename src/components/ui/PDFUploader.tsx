
import { useState, useRef, DragEvent, ChangeEvent } from "react";
import { FileUp, File, X, Link as LinkIcon, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface PDFFile {
  id: string;
  name: string;
  size: number;
  file: File | string;
  type: 'file' | 'link';
  url?: string;
}

interface PDFUploaderProps {
  onFilesChange: (files: PDFFile[]) => void;
  files: PDFFile[];
  maxFiles?: number;
  maxSizeMB?: number;
}

export function PDFUploader({ 
  onFilesChange,
  files,
  maxFiles = 10,
  maxSizeMB = 20 
}: PDFUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const processFiles = (fileList: FileList) => {
    const newFiles: PDFFile[] = [];
    const errors: string[] = [];
    
    Array.from(fileList).forEach(file => {
      // Check if it's a PDF
      if (file.type !== 'application/pdf') {
        errors.push(`${file.name} is not a PDF file.`);
        return;
      }
      
      // Check file size
      if (file.size > maxSizeMB * 1024 * 1024) {
        errors.push(`${file.name} exceeds the ${maxSizeMB}MB limit.`);
        return;
      }
      
      newFiles.push({
        id: crypto.randomUUID(),
        name: file.name,
        size: file.size,
        file: file,
        type: 'file'
      });
    });
    
    if (errors.length > 0) {
      errors.forEach(error => toast.error(error));
    }
    
    if (newFiles.length > 0) {
      if (files.length + newFiles.length > maxFiles) {
        toast.error(`You can only upload up to ${maxFiles} files.`);
        const spaceLeft = Math.max(0, maxFiles - files.length);
        onFilesChange([...files, ...newFiles.slice(0, spaceLeft)]);
      } else {
        onFilesChange([...files, ...newFiles]);
        toast.success(`Added ${newFiles.length} file${newFiles.length > 1 ? 's' : ''}.`);
      }
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  const handleRemoveFile = (id: string) => {
    onFilesChange(files.filter(file => file.id !== id));
    toast.success('File removed.');
  };

  const handleAddURL = () => {
    if (!urlInput.trim()) {
      toast.error('Please enter a valid URL.');
      return;
    }
    
    // Check if it's a valid URL
    try {
      new URL(urlInput);
    } catch {
      toast.error('Please enter a valid URL.');
      return;
    }
    
    // Check if it's a PDF URL (just a simple extension check)
    if (!urlInput.toLowerCase().endsWith('.pdf')) {
      toast.warning('URL does not point to a PDF file. It may not work as expected.');
    }
    
    const newFile: PDFFile = {
      id: crypto.randomUUID(),
      name: urlInput.split('/').pop() || 'PDF Document',
      size: 0,
      file: urlInput,
      type: 'link',
      url: urlInput
    };
    
    onFilesChange([...files, newFile]);
    setUrlInput('');
    setShowUrlInput(false);
    toast.success('URL added.');
  };

  const formatSize = (size: number) => {
    if (size === 0) return 'Unknown size';
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-4">
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ease-smooth",
          isDragging 
            ? "border-primary bg-primary/5 scale-[1.01]" 
            : "border-border hover:border-primary/50 hover:bg-muted/50"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="rounded-full bg-muted p-3">
            <FileUp className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-medium text-lg mt-2">Upload PDF Documents</h3>
          <p className="text-sm text-muted-foreground max-w-md">
            Drag and drop your PDF files here, or click to browse your files.
            <br />Maximum size: {maxSizeMB}MB per file.
          </p>
          
          <div className="flex flex-wrap gap-2 mt-4">
            <Button 
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              className="mt-2"
            >
              <Plus className="h-4 w-4 mr-2" />
              Select Files
            </Button>
            
            <Button
              onClick={() => setShowUrlInput(!showUrlInput)}
              variant="outline"
              className="mt-2"
            >
              <LinkIcon className="h-4 w-4 mr-2" />
              Add URL
            </Button>
          </div>
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInputChange}
            accept="application/pdf"
            multiple
            className="hidden"
          />
        </div>
      </div>
      
      {showUrlInput && (
        <div className="flex items-center gap-2 animate-fade-in">
          <Input
            type="url"
            placeholder="Enter PDF URL (e.g., https://example.com/document.pdf)"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleAddURL}>Add</Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setShowUrlInput(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      {files.length > 0 && (
        <div className="mt-6 space-y-3 animate-fade-in">
          <h4 className="font-medium">Uploaded Files ({files.length}/{maxFiles})</h4>
          <ul className="space-y-2">
            {files.map((file) => (
              <li 
                key={file.id}
                className="flex items-center justify-between p-3 rounded-md bg-muted/50 border text-sm animate-scale-in"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-background p-1.5">
                    {file.type === 'file' ? (
                      <File className="h-4 w-4 text-primary" />
                    ) : (
                      <LinkIcon className="h-4 w-4 text-primary" />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium truncate max-w-[200px] md:max-w-[300px]">
                      {file.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {file.type === 'file' 
                        ? formatSize(file.size)
                        : 'URL Link'
                      }
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => handleRemoveFile(file.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
