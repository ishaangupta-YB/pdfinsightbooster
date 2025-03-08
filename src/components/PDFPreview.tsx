import { useState, useEffect } from "react";
import { Eye, Download, ZoomIn, ZoomOut, RotateCw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

import { Viewer, Worker, SpecialZoomLevel, ProgressBar } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { toolbarPlugin } from '@react-pdf-viewer/toolbar';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '@react-pdf-viewer/toolbar/lib/styles/index.css';

interface PDFPreviewProps {
  file?: {
    file: File | string;
    type: 'file' | 'link';
    name: string;
    url?: string;
  };
  className?: string;
}

export function PDFPreview({ file, className }: PDFPreviewProps) {
  const [open, setOpen] = useState(false);
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [zoom, setZoom] = useState<number | SpecialZoomLevel>(SpecialZoomLevel.PageFit);
//   const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [sheetHeight, setSheetHeight] = useState(95); // Default height percentage
  const { theme, resolvedTheme } = useTheme();

  // Create plugins
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    sidebarTabs: (defaultTabs) => [],
  });
  
  const toolbarPluginInstance = toolbarPlugin();

  const handleOpenPreview = async () => {
    if (!file) return;
    
    setIsLoading(true);
    setError(null);
    // setPdfBlob(null);

    try {
      // For File objects
      if (file.type === 'file' && file.file instanceof File) {
        const url = URL.createObjectURL(file.file);
        setObjectUrl(url);
      } 
      // For URL links
      else if (file.type === 'link' && file.url) {
        try {
          // Use a CORS proxy for external URLs
          const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(file.url)}`;
          
          // Fetch the PDF data from the URL via proxy
          const response = await fetch(proxyUrl, {
            method: 'GET',
            cache: 'no-cache',
          });
          
          if (!response.ok) {
            throw new Error(`Failed to fetch PDF: ${response.status} ${response.statusText}`);
          }
          
          const blob = await response.blob();
          const blobUrl = URL.createObjectURL(blob);
          setObjectUrl(blobUrl);
        } catch (fetchError) {
          console.error("Error fetching PDF:", fetchError);
          
          // Try using Google Docs Viewer as a fallback
          const googleDocsUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(file.url)}&embedded=true`;
          setObjectUrl(googleDocsUrl);
          setError("Using fallback viewer due to CORS restrictions. Some features may be limited.");
        }
      }
      
      setOpen(true);
    } catch (error) {
      console.error("Error preparing PDF preview:", error);
      setError(`Failed to prepare PDF for preview: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Clean up object URL when sheet closes
  const handleSheetChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
        setObjectUrl(null);
      }
    //   setPdfBlob(null);
      setError(null);
    }
  };

  // Get the PDF source for the viewer
  const getPdfSource = () => {
    return objectUrl || '';
  };

  // Get the URL for download
  const getPdfUrl = () => {
    if (file?.type === 'link' && file.url) {
      return file.url;
    }
    return objectUrl || '';
  };

  // Handle zoom in
  const handleZoomIn = () => {
    if (typeof zoom === 'number') {
      setZoom(zoom + 0.2);
    } else {
      setZoom(1.2);
    }
  };

  // Handle zoom out
  const handleZoomOut = () => {
    if (typeof zoom === 'number' && zoom > 0.4) {
      setZoom(zoom - 0.2);
    } else {
      setZoom(0.8);
    }
  };

  // Handle download
  const handleDownload = () => {
    const pdfUrl = getPdfUrl();
    if (!pdfUrl) return;

    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = file?.name || 'document.pdf';
    
    // For object URLs created from File objects
    if (file?.type === 'file') {
      link.click();
    } else {
      // For external URLs, we need to fetch the file first
      fetch(pdfUrl)
        .then(response => response.blob())
        .then(blob => {
          const url = window.URL.createObjectURL(blob);
          link.href = url;
          link.click();
          window.URL.revokeObjectURL(url);
        })
        .catch(err => {
          console.error('Error downloading PDF:', err);
          // Fallback to opening in a new tab
          window.open(pdfUrl, '_blank');
        });
    }
  };

  // Handle sheet resize
  const handleResize = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    const startY = e.clientY;
    const startHeight = sheetHeight;
    
    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaY = startY - moveEvent.clientY;
      const newHeight = Math.min(Math.max(startHeight + (deltaY / window.innerHeight) * 100, 30), 95);
      setSheetHeight(newHeight);
    };
    
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Reset zoom when opening a new PDF
  useEffect(() => {
    if (open) {
      setZoom(SpecialZoomLevel.PageFit);
    }
  }, [open]);
 
  const getPdfTheme = () => {
    return resolvedTheme === 'dark' ? 'dark' : 'light';
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className={cn("h-8 w-8 rounded-full text-muted-foreground hover:text-primary", className)}
        onClick={handleOpenPreview}
        title="Preview PDF"
        disabled={!file}
      >
        <Eye className="h-4 w-4" />
      </Button>

      <Sheet open={open} onOpenChange={handleSheetChange}>
        <SheetContent 
          side="bottom" 
          className={`h-[${sheetHeight}vh] max-h-[${sheetHeight}vh] p-0 overflow-hidden rounded-t-xl`}
          style={{ height: `${sheetHeight}vh`, maxHeight: `${sheetHeight}vh` }}
        >
          {/* Resizable handle */}
          <div 
            className="w-full h-2 bg-muted hover:bg-muted-foreground/20 cursor-ns-resize flex items-center justify-center"
            onMouseDown={handleResize}
          >
            <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
          </div>
          
          <div className="flex flex-col h-[calc(100%-8px)]">
            <SheetHeader className="p-4 pb-0 border-b relative">
              <div className="flex items-center justify-between pr-8">
                <SheetTitle className="text-xl truncate max-w-[70%]">
                  {file?.name || "PDF Preview"}
                </SheetTitle>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={handleZoomOut}
                    title="Zoom Out"
                  >
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={handleZoomIn}
                    title="Zoom In"
                  >
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={handleDownload}
                    title="Download"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Custom close button positioned absolutely */}
              <SheetClose className="absolute right-4 top-4 rounded-full p-0 h-8 w-8 flex items-center justify-center">
                <X className="h-4 w-4" />
              </SheetClose>
            </SheetHeader>
            
            <div className="flex-1 overflow-hidden">
              {isLoading && (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              )}
              
              {error && !isLoading && (
                <div className="flex flex-col items-center justify-center h-full text-destructive">
                  <p className="font-medium">Error</p>
                  <p className="text-sm mt-1">{error}</p>
                  {file?.type === 'link' && file.url && (
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => window.open(file.url, '_blank')}
                    >
                      Open in New Tab
                    </Button>
                  )}
                </div>
              )}
              
              {open && !isLoading && getPdfSource() && (
                <div className="w-full h-full bg-white">
                  {getPdfSource().includes('docs.google.com') ? (
                    <iframe
                      src={getPdfSource()}
                      className="w-full h-full"
                      title="PDF Preview"
                      sandbox="allow-scripts allow-same-origin allow-forms"
                      loading="lazy"
                    />
                  ) : (
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                      <div style={{ height: '100%' }}>
                        <Viewer
                          fileUrl={getPdfSource()}
                          defaultScale={zoom}
                          plugins={[defaultLayoutPluginInstance, toolbarPluginInstance]}
                          theme={getPdfTheme()}
                          renderLoader={(percentages) => (
                            <div className="flex items-center justify-center h-full">
                              <div className="w-1/2">
                                <ProgressBar progress={Math.round(percentages)} />
                                <p className="text-center mt-2">Loading PDF... {Math.round(percentages)}%</p>
                              </div>
                            </div>
                          )}
                          renderError={(error) => (
                            <div className="flex flex-col items-center justify-center h-full text-destructive">
                              <p className="font-medium">Failed to load PDF</p>
                              <p className="text-sm mt-1">{error.message}</p>
                              {file?.type === 'link' && file.url && (
                                <Button 
                                  variant="outline" 
                                  className="mt-4"
                                  onClick={() => window.open(file.url, '_blank')}
                                >
                                  Open in New Tab
                                </Button>
                              )}
                            </div>
                          )}
                          withCredentials={false}
                        />
                      </div>
                    </Worker>
                  )}
                </div>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
} 