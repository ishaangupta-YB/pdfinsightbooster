
import { useState } from "react";
import { Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface QueryInputProps {
  onSubmit: (query: string) => void;
  isProcessing?: boolean;
  className?: string;
}

export function QueryInput({ onSubmit, isProcessing = false, className }: QueryInputProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const examples = [
    "Extract invoice number, date, total amount, and vendor information",
    "Find all employee names, positions, and departments from this org chart",
    "Extract all tables with financial data and calculate the quarterly totals",
    "Identify all legal clauses related to termination in this contract"
  ];

  const handleSubmit = () => {
    if (query.trim()) {
      onSubmit(query);
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div
        className={cn(
          "relative border rounded-lg transition-all duration-200 ease-smooth",
          isFocused ? "ring-2 ring-primary/20 border-primary" : "border-border"
        )}
      >
        <Textarea
          placeholder="Describe what information you want to extract from the PDFs..."
          className={cn(
            "min-h-[120px] resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0",
            isProcessing && "opacity-70 pointer-events-none"
          )}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={isProcessing}
        />
        <div className="absolute bottom-3 right-3 flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            className="h-9 px-2.5"
            onClick={() => setQuery("")}
            disabled={isProcessing || !query}
          >
            Clear
          </Button>
          <Button
            size="sm"
            className="h-9"
            onClick={handleSubmit}
            disabled={isProcessing || !query.trim()}
          >
            {isProcessing ? (
              <div className="flex items-center">
                <div className="h-4 w-4 border-t-2 border-r-2 border-white rounded-full animate-spin mr-2" />
                Processing...
              </div>
            ) : (
              <>
                <Search className="h-4 w-4 mr-2" />
                Extract
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-1.5">
          <Sparkles className="h-4 w-4 text-primary" />
          <h4 className="text-sm font-medium">Example queries</h4>
        </div>
        <div className="flex flex-wrap gap-2">
          {examples.map((example, i) => (
            <button
              key={i}
              className="text-xs bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground px-2.5 py-1.5 rounded-md transition-colors"
              onClick={() => setQuery(example)}
              disabled={isProcessing}
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
