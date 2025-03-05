
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { File, X, Maximize2, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface PDFPreviewProps {
  file: {
    id: string;
    name: string;
    type: 'file' | 'link';
    url?: string;
    file?: File | string;
  };
  className?: string;
}

export function PDFPreview({ file, className }: PDFPreviewProps) {
  const [url, setUrl] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const getObjectURL = async () => {
    if (file.type === 'link' && file.url) {
      // Just use the URL directly
      setUrl(file.url);
    } else if (file.type === 'file' && file.file instanceof File) {
      // Create a URL from the File object
      const objectURL = URL.createObjectURL(file.file);
      setUrl(objectURL);
      return () => {
        URL.revokeObjectURL(objectURL);
      };
    }
  };

  const handleOpen = () => {
    getObjectURL();
    setIsOpen(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className={cn("h-8 w-8 rounded-full text-muted-foreground hover:text-primary transition-colors", className)}
          onClick={handleOpen}
          title={`Preview ${file.name}`}
        >
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] md:max-w-[800px] max-h-[90vh]">
        <div className="flex items-center justify-between">
          <DialogTitle className="truncate pr-8 text-base">{file.name}</DialogTitle>
          <DialogDescription className="truncate text-xs mt-0">
            {file.type === 'link' ? 'URL Link' : 'Uploaded File'}
          </DialogDescription>
        </div>
        <div className="mt-4 relative w-full h-[70vh] border rounded-md overflow-hidden bg-muted/30">
          {url ? (
            <iframe
              src={url}
              title={file.name}
              className="w-full h-full"
              style={{ border: "none" }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-muted-foreground text-sm">Loading preview...</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
