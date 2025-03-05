
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, FileText, Search, BarChart, Zap, FilePlus2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const Index = () => {
  const features = [
    {
      icon: <FilePlus2 className="h-5 w-5 text-primary" />,
      title: "Flexible PDF Upload",
      description:
        "Upload multiple PDFs or provide links to online documents - process one or many files at once."
    },
    {
      icon: <Search className="h-5 w-5 text-primary" />,
      title: "Natural Language Queries",
      description:
        "Simply describe what information you need in plain language - no complex configurations needed."
    },
    {
      icon: <BarChart className="h-5 w-5 text-primary" />,
      title: "Structured Data Extraction",
      description:
        "Get perfectly structured data in JSON format, ready to use in your applications."
    },
    {
      icon: <Zap className="h-5 w-5 text-primary" />,
      title: "Powered by Gemini 2.0",
      description:
        "Leverage the power of Gemini 2.0 for exceptional accuracy in document analysis and data extraction."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 md:pt-32 flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,215,0,0.1),_transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(255,215,0,0.05),_transparent_60%)]"></div>
        </div>
        
        <div className="container px-4 md:px-6 flex flex-col items-center text-center space-y-10 py-10 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4 max-w-3xl"
          >
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-muted/80 text-muted-foreground mb-2">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
              Introducing PDF Insight Extraction
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Transform PDF Documents into <span className="text-primary">Structured Data</span>
            </h1>
            <p className="text-xl text-muted-foreground md:text-2xl max-w-[700px] mx-auto">
              Extract precisely what you need from any PDF using natural language queries
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button asChild size="lg" className="min-w-[160px]">
              <Link to="/dashboard">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="#how-it-works">
                How it Works
              </Link>
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative w-full max-w-5xl mt-8 rounded-2xl overflow-hidden border shadow-lg"
          >
            <div className="w-full rounded-t-2xl h-10 bg-muted flex items-center px-4 space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
              <div className="ml-4 text-xs text-muted-foreground">PDF Insight Extraction</div>
            </div>
            <div className="bg-card">
              <img
                src="https://placehold.co/1200x675/e6e6e6/cccccc?text=PDF+Insight+Dashboard"
                alt="PDF Insight Dashboard Preview"
                className="w-full h-auto"
              />
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 md:py-24" id="features">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl font-bold tracking-tight mb-4">Powerful Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our intelligent PDF extraction system combines ease of use with powerful capabilities
            </p>
          </motion.div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex flex-col p-6 bg-card rounded-xl border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="rounded-full w-10 h-10 flex items-center justify-center bg-primary/10 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* How it Works Section */}
      <section className="py-16 md:py-24 bg-muted/30" id="how-it-works">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl font-bold tracking-tight mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A simple three-step process to extract valuable insights from your PDF documents
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                step: "01",
                title: "Upload Documents",
                description: "Upload your PDFs or provide links to online documents. We support batch processing for efficiency."
              },
              {
                step: "02",
                title: "Define Your Query",
                description: "Tell us what information you need in natural language. Our system dynamically creates extraction schema."
              },
              {
                step: "03",
                title: "Review Results",
                description: "Receive structured data extracted from your documents, ready to view, export, or integrate."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="relative"
              >
                <div className="glass-card p-6 rounded-xl h-full flex flex-col">
                  <div className="text-5xl font-bold text-primary/20 mb-4">{item.step}</div>
                  <h3 className="text-xl font-medium mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 text-muted-foreground/30">
                    <ArrowRight className="h-8 w-8" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl bg-muted p-8 md:p-12 relative overflow-hidden border"
          >
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_right,_rgba(255,215,0,0.15),_transparent_70%)]"></div>
            
            <div className="max-w-2xl">
              <div className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-primary/10 text-primary mb-4">
                <FileText className="h-4 w-4 mr-2" />
                PDF Insight Extraction
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to extract insights from your documents?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Start transforming your PDFs into structured, actionable data today.
              </p>
              <Button asChild size="lg">
                <Link to="/dashboard">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
