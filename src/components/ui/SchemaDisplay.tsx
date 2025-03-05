
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Check, Code, FileJson } from "lucide-react";
import { toast } from "sonner";

interface SchemaDisplayProps {
  schema: any;
  generatedData?: any;
  className?: string;
}

export function SchemaDisplay({ schema, generatedData, className }: SchemaDisplayProps) {
  const [copied, setCopied] = useState<"schema" | "data" | null>(null);

  const handleCopy = (type: "schema" | "data", data: any) => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
    toast.success(`${type === "schema" ? "Schema" : "Generated JSON"} copied to clipboard`);
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Code className="h-4 w-4 text-primary" />
          Generated Schema & Data
        </CardTitle>
        <CardDescription>
          Dynamic JSON schema and extracted data based on your query
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <Tabs defaultValue="schema">
          <TabsList className="w-full">
            <TabsTrigger value="schema" className="flex items-center gap-1.5">
              <Code className="h-4 w-4" />
              Schema
            </TabsTrigger>
            <TabsTrigger value="data" className="flex items-center gap-1.5">
              <FileJson className="h-4 w-4" />
              JSON Data
            </TabsTrigger>
          </TabsList>
          <TabsContent value="schema" className="mt-4">
            <div className="relative rounded-md bg-muted/50 p-4 overflow-auto max-h-[300px]">
              <pre className="text-xs font-mono">
                {JSON.stringify(schema, null, 2)}
              </pre>
            </div>
          </TabsContent>
          <TabsContent value="data" className="mt-4">
            <div className="relative rounded-md bg-muted/50 p-4 overflow-auto max-h-[300px]">
              <pre className="text-xs font-mono">
                {JSON.stringify(generatedData || {}, null, 2)}
              </pre>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 pt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleCopy("schema", schema)}
          className="gap-1.5"
        >
          {copied === "schema" ? (
            <>
              <Check className="h-3.5 w-3.5" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              Copy Schema
            </>
          )}
        </Button>
        {generatedData && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleCopy("data", generatedData)}
            className="gap-1.5"
          >
            {copied === "data" ? (
              <>
                <Check className="h-3.5 w-3.5" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                Copy JSON
              </>
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
