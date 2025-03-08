
import { useState } from "react";
import { File, Download, Copy, Check, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { PDFPreview } from "./PDFPreview";

interface ResultItem {
  id: string;
  fileName: string;
  fileType: 'file' | 'link';
  fileUrl?: string;
  fileObj?: File | string;
  extractedData: Record<string, any>;
}

interface ResultsViewProps {
  query: string;
  combinedResult: Record<string, any>;
  individualResults: ResultItem[];
  isLoading?: boolean;
  className?: string;
}

export function ResultsView({ 
  query, 
  combinedResult, 
  individualResults, 
  isLoading = false, 
  className 
}: ResultsViewProps) {
  const [activeTab, setActiveTab] = useState("combined");
  const [selectedResult, setSelectedResult] = useState<ResultItem | null>(null);
  const [showJsonModal, setShowJsonModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyJson = (data: any) => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("JSON data copied to clipboard");
  };

  const handleViewJson = (data: ResultItem) => {
    setSelectedResult(data);
    setShowJsonModal(true);
  };

  const formatValue = (value: any): string => {
    if (value === null || value === undefined) return "N/A";
    if (typeof value === "object") {
      if (Array.isArray(value)) {
        return value.map(formatValue).join(", ");
      }
      return JSON.stringify(value);
    }
    return String(value);
  };

  const renderDataTable = (data: Record<string, any>) => (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr>
            <th className="text-left py-2 px-4 bg-muted font-medium text-muted-foreground">Field</th>
            <th className="text-left py-2 px-4 bg-muted font-medium text-muted-foreground">Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([key, value]) => (
            <tr key={key} className="border-b border-border/50 hover:bg-muted/40 transition-colors">
              <td className="py-2 px-4 align-top font-medium">{key}</td>
              <td className="py-2 px-4 align-top whitespace-pre-wrap break-words">{formatValue(value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  if (isLoading) {
    return (
      <div className={cn("flex items-center justify-center py-16", className)}>
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-muted/30">
            <div className="h-8 w-8 border-t-2 border-r-2 border-primary rounded-full animate-spin" />
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">Processing your documents</h3>
            <p className="text-sm text-muted-foreground">
              We're extracting the requested information from your PDFs.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      <div className="space-y-2">
        <h2 className="text-xl font-medium">Extraction Results</h2>
        <p className="text-muted-foreground text-sm">
          {query}
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="combined">Combined Results</TabsTrigger>
          <TabsTrigger value="individual">Individual Documents ({individualResults.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="combined" className="mt-4 animate-fade-in">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Combined Data</CardTitle>
              <CardDescription>
                Aggregated information from all documents based on your query
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderDataTable(combinedResult)}
            </CardContent>
            <CardFooter className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" size="sm" onClick={() => handleCopyJson(combinedResult)}>
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy JSON
                  </>
                )}
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="individual" className="mt-4 space-y-4 animate-fade-in">
          {individualResults.map((result) => (
            <Card key={result.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <File className="h-4 w-4 text-primary" />
                      <span className="truncate">{result.fileName}</span>
                    </CardTitle>
                    <CardDescription>
                      {result.fileType === 'link' ? 'URL Document' : 'Uploaded File'}
                    </CardDescription>
                  </div>
                  <PDFPreview
                    file={{
                      id: result.id,
                      name: result.fileName,
                      type: result.fileType,
                      url: result.fileUrl,
                      file: result.fileObj
                    }}
                  />
                </div>
              </CardHeader>
              <CardContent>
                {renderDataTable(result.extractedData)}
              </CardContent>
              <CardFooter className="flex justify-end gap-2 pt-4 border-t">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleViewJson(result)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View JSON
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleCopyJson(result.extractedData)}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy JSON
                </Button>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* JSON View Modal */}
      <Dialog open={showJsonModal} onOpenChange={setShowJsonModal}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>
              {selectedResult?.fileName} - JSON Data
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 relative w-full max-h-[600px] overflow-auto bg-muted/30 rounded-md">
            <pre className="p-4 text-xs font-mono">
              {selectedResult ? JSON.stringify(selectedResult.extractedData, null, 2) : ''}
            </pre>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => selectedResult && handleCopyJson(selectedResult.extractedData)}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy JSON
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
