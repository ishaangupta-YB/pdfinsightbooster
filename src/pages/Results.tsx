
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ResultsView } from "@/components/ui/ResultsView";
import { toast } from "sonner";

// Mock data for demonstration
const mockExtractedData = {
  invoiceNumber: "INV-2023-001",
  date: "2023-04-15",
  dueDate: "2023-05-15",
  totalAmount: "$1,250.00",
  vendor: {
    name: "Acme Corporation",
    address: "123 Business Ave, Suite 100, San Francisco, CA 94107",
    phone: "(415) 555-1234",
    email: "billing@acmecorp.com"
  },
  lineItems: [
    {
      description: "Professional Services",
      quantity: 5,
      unitPrice: "$200.00",
      amount: "$1,000.00"
    },
    {
      description: "Software License",
      quantity: 1,
      unitPrice: "$250.00",
      amount: "$250.00"
    }
  ]
};

// Define the result item interface
interface ResultItem {
  id: string;
  fileName: string;
  fileType: 'file' | 'link';
  fileUrl?: string;
  fileObj?: File | string;
  extractedData: Record<string, any>;
}

const Results = () => {
  const [query, setQuery] = useState<string>("");
  const [files, setFiles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [results, setResults] = useState<ResultItem[]>([]);
  const [combinedResult, setCombinedResult] = useState<Record<string, any>>({});
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the query and files from session storage
    const savedQuery = sessionStorage.getItem("pdf_extraction_query");
    const savedFiles = sessionStorage.getItem("pdf_extraction_files");
    
    if (!savedQuery || !savedFiles) {
      // If there's no data, redirect to the dashboard
      toast.error("No extraction data found. Please start a new extraction.");
      navigate("/dashboard");
      return;
    }
    
    setQuery(savedQuery);
    setFiles(JSON.parse(savedFiles));
    
    // Simulate API call to get results
    setTimeout(() => {
      // Generate mock results for each file
      const mockResults = JSON.parse(savedFiles).map((file: any) => ({
        id: file.id,
        fileName: file.name,
        fileType: file.type,
        fileUrl: file.url,
        fileObj: file.file,
        extractedData: {
          ...mockExtractedData,
          // Add some variation to the mock data
          invoiceNumber: `INV-${Math.floor(Math.random() * 10000)}`,
          date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString().split('T')[0],
          totalAmount: `$${(Math.random() * 2000).toFixed(2)}`
        }
      }));
      
      setResults(mockResults);
      setCombinedResult(mockExtractedData); // In a real app, this would be an aggregated result
      setIsLoading(false);
    }, 2000);
  }, [navigate]);

  const handleNewExtraction = () => {
    navigate("/dashboard");
  };

  const handleShare = () => {
    // In a real app, this could generate a shareable link
    toast.success("Share feature is not implemented in this demo", {
      description: "This would generate a shareable link to these results."
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container max-w-6xl px-4 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Extraction Results</h1>
            <p className="text-muted-foreground">
              View the structured data extracted from your documents
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={handleNewExtraction}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              New Extraction
            </Button>
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Share Results
            </Button>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ResultsView
            query={query}
            combinedResult={combinedResult}
            individualResults={results}
            isLoading={isLoading}
          />
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Results;
