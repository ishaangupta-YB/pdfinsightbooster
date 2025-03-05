
import { FileText } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t bg-background py-10">
      <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-2">
          <Link to="/" className="flex items-center gap-2 font-medium">
            <FileText className="h-5 w-5 text-primary" />
            <span className="font-medium">PDFInsight</span>
          </Link>
          <p className="text-sm text-muted-foreground mt-2">
            Extract structured insights from PDF documents with ease and precision.
          </p>
        </div>

        <div className="grid gap-2">
          <h3 className="text-sm font-medium">Product</h3>
          <nav className="flex flex-col gap-2">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Dashboard
            </Link>
            <Link to="/results" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Results
            </Link>
          </nav>
        </div>

        <div className="grid gap-2">
          <h3 className="text-sm font-medium">Support</h3>
          <nav className="flex flex-col gap-2">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Documentation
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              API Reference
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Status
            </a>
          </nav>
        </div>

        <div className="grid gap-2">
          <h3 className="text-sm font-medium">Legal</h3>
          <nav className="flex flex-col gap-2">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Cookies
            </a>
          </nav>
        </div>
      </div>
      <div className="container border-t mt-8 pt-6">
        <p className="text-xs text-muted-foreground text-center">
          © {currentYear} PDFInsight. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
