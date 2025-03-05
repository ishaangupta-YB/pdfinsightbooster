
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FileText, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Check if user has scrolled
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-smooth",
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm border-b border-border/50"
          : "bg-transparent"
      )}
    >
      <div className="container flex items-center justify-between h-16 md:h-20 px-4 md:px-6">
        <Link
          to="/"
          className="flex items-center gap-2 font-medium text-lg transition-all hover:opacity-80"
        >
          <FileText className="h-6 w-6 text-primary" />
          <span className="font-medium">PDFInsight</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className={cn(
              "text-sm transition-colors hover:text-primary",
              location.pathname === "/" ? "text-primary font-medium" : "text-foreground/80"
            )}
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className={cn(
              "text-sm transition-colors hover:text-primary",
              location.pathname === "/dashboard" ? "text-primary font-medium" : "text-foreground/80"
            )}
          >
            Dashboard
          </Link>
          <Link
            to="/results"
            className={cn(
              "text-sm transition-colors hover:text-primary",
              location.pathname === "/results" ? "text-primary font-medium" : "text-foreground/80"
            )}
          >
            Results
          </Link>
          <ThemeToggle />
          <Button asChild size="sm" className="ml-4 shadow-md hover:shadow-lg transition-shadow">
            <Link to="/dashboard">Get Started</Link>
          </Button>
        </nav>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-sm border-b animate-slide-down">
          <nav className="container flex flex-col space-y-4 py-4 px-6">
            <Link
              to="/"
              className={cn(
                "py-2 text-sm transition-colors hover:text-primary",
                location.pathname === "/" ? "text-primary font-medium" : "text-foreground/80"
              )}
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className={cn(
                "py-2 text-sm transition-colors hover:text-primary",
                location.pathname === "/dashboard" ? "text-primary font-medium" : "text-foreground/80"
              )}
            >
              Dashboard
            </Link>
            <Link
              to="/results"
              className={cn(
                "py-2 text-sm transition-colors hover:text-primary",
                location.pathname === "/results" ? "text-primary font-medium" : "text-foreground/80"
              )}
            >
              Results
            </Link>
            <Button asChild size="sm" className="w-full mt-2 shadow-md">
              <Link to="/dashboard">Get Started</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
