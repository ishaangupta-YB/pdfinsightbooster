
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, FileText, Search, BarChart, Zap, FilePlus2, CheckCircle, ChevronRight } from "lucide-react";
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

  const customers = [
    "Acme, Inc.", "TechCorp", "Global Solutions", "InnovateX", "DataSphere", "NextGen Systems"
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 md:pt-28 flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,215,0,0.15),_transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(255,215,0,0.1),_transparent_60%)]"></div>
          {/* Animated circles */}
          <div className="absolute top-1/4 right-1/3 w-72 h-72 bg-primary/5 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl opacity-70 animate-pulse delay-1000"></div>
        </div>
        
        <div className="container px-4 md:px-6 flex flex-col items-center text-center space-y-10 py-10 md:py-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4 max-w-3xl"
          >
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-primary/10 text-primary mb-2 shadow-sm backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
              Enterprise-Grade PDF Extraction
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Transform <span className="relative inline-block">
                <span className="text-primary">PDF Documents</span>
                <span className="absolute bottom-1 left-0 w-full h-[6px] bg-primary/20 rounded-full"></span>
              </span> into Structured Data
            </h1>
            <p className="text-xl text-muted-foreground md:text-2xl max-w-[700px] mx-auto">
              Extract precisely what you need from any PDF using natural language queries
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 w-full max-w-md"
          >
            <Button asChild size="lg" className="min-w-[160px] shadow-md hover:shadow-lg transition-all">
              <Link to="/dashboard">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="shadow-sm hover:shadow-md transition-all">
              <Link to="#how-it-works">
                How it Works
              </Link>
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="w-full max-w-3xl text-center"
          >
            <p className="text-sm text-muted-foreground mb-3">Trusted by innovative teams at</p>
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
              {customers.map((customer, i) => (
                <span 
                  key={i}
                  className="text-sm md:text-base font-medium text-muted-foreground/80"
                >
                  {customer}
                </span>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative w-full max-w-5xl mt-8 rounded-2xl overflow-hidden border shadow-lg bg-card"
          >
            <div className="w-full rounded-t-2xl h-10 bg-muted flex items-center px-4 space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
              <div className="ml-4 text-xs text-muted-foreground">PDF Insight Extraction</div>
            </div>
            <div className="relative">
              <img
                src="https://placehold.co/1200x675/e6e6e6/cccccc?text=PDF+Insight+Dashboard"
                alt="PDF Insight Dashboard Preview"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80"></div>
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
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-muted mb-2">
              Features
            </div>
            <h2 className="text-3xl font-bold tracking-tight mb-4">Enterprise-Grade Capabilities</h2>
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
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-muted mb-2">
              Process
            </div>
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
                <div className="glass-card p-6 rounded-xl h-full flex flex-col backdrop-blur-sm bg-card/50 shadow-sm border">
                  <div className="text-5xl font-bold text-primary/20 mb-4">{item.step}</div>
                  <h3 className="text-xl font-medium mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 text-muted-foreground/30 z-10">
                    <ChevronRight className="h-8 w-8" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-muted mb-4">
                Benefits
              </div>
              <h2 className="text-3xl font-bold tracking-tight mb-6">
                Unlock the value hidden in your PDF documents
              </h2>
              <div className="space-y-4">
                {[
                  "Save hours of manual data extraction work",
                  "Ensure data accuracy with AI-powered extraction",
                  "Process documents in bulk efficiently",
                  "Get structured data ready for your workflows",
                  "Extract specific information with natural language"
                ].map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <p className="text-foreground">{benefit}</p>
                  </div>
                ))}
              </div>
              <Button asChild className="mt-8 shadow-md">
                <Link to="/dashboard">
                  Try it now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative rounded-xl overflow-hidden shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-overlay"></div>
                <img
                  src="https://placehold.co/600x400/e6e6e6/cccccc?text=Data+Extraction+Visualization"
                  alt="Data Extraction Process"
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 mb-10">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl bg-muted/30 p-8 md:p-12 relative overflow-hidden border"
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
              <Button asChild size="lg" className="shadow-md hover:shadow-lg transition-all">
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
