
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PDFUploader } from "@/components/ui/PDFUploader";
import { QueryInput } from "@/components/ui/QueryInput";
import { toast } from "sonner";

// Define the PDF file interface
interface PDFFile {
  id: string;
  name: string;
  size: number;
  file: File | string;
  type: 'file' | 'link';
  url?: string;
}

const Dashboard = () => {
  const [files, setFiles] = useState<PDFFile[]>([]);
  const [query, setQuery] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleFilesChange = (newFiles: PDFFile[]) => {
    setFiles(newFiles);
  };

  const handleQuerySubmit = (userQuery: string) => {
    setQuery(userQuery);
    
    if (files.length === 0) {
      toast.error("Please upload at least one PDF file first");
      return;
    }
    
    // Start the processing
    setIsProcessing(true);
    
    // This would normally be an API call to the backend
    // For now, we'll simulate a delay and navigate to results
    setTimeout(() => {
      setIsProcessing(false);
      
      // Store the query and files in session storage for the results page
      sessionStorage.setItem("pdf_extraction_query", userQuery);
      sessionStorage.setItem("pdf_extraction_files", JSON.stringify(files));
      
      // Navigate to results page
      navigate("/results");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container max-w-5xl px-4 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-2 mb-8"
        >
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Upload your PDF documents and define your extraction query
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Left Column - File Upload */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-medium">Upload Documents</h2>
                <span className="text-sm text-muted-foreground">Step 1 of 2</span>
              </div>
              
              <PDFUploader
                files={files}
                onFilesChange={handleFilesChange}
                maxFiles={10}
                maxSizeMB={20}
              />
              
              {files.length > 0 && (
                <Alert variant="default" className="bg-muted/50 border-muted">
                  <AlertCircle className="h-4 w-4 text-primary" />
                  <AlertDescription>
                    {files.length} {files.length === 1 ? "file" : "files"} ready for processing.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </motion.div>
          
          {/* Right Column - Query Input */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-medium">Define Your Query</h2>
                <span className="text-sm text-muted-foreground">Step 2 of 2</span>
              </div>
              
              <QueryInput
                onSubmit={handleQuerySubmit}
                isProcessing={isProcessing}
              />
              
              <Alert variant="default" className="bg-muted/50 border-muted">
                <AlertCircle className="h-4 w-4 text-primary" />
                <AlertDescription>
                  Be specific about what data you want to extract for best results.
                </AlertDescription>
              </Alert>
            </div>
          </motion.div>
        </div>
        
        {/* Bottom Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 flex justify-center"
        >
          <Button
            size="lg"
            className="w-full max-w-md"
            disabled={files.length === 0 || !query || isProcessing}
            onClick={() => handleQuerySubmit(query)}
          >
            {isProcessing ? (
              <div className="flex items-center">
                <div className="h-4 w-4 border-t-2 border-r-2 border-current rounded-full animate-spin mr-2" />
                Processing...
              </div>
            ) : (
              <>
                Extract Data
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
