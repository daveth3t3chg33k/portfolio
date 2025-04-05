'use client';

import Link from 'next/link';

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-grid">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl animate-blob" />
        <div className="absolute top-2/3 right-1/4 w-80 h-80 bg-secondary/10 rounded-full filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-accent/10 rounded-full filter blur-3xl animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="h-px w-10 bg-primary"></div>
              <span className="text-primary font-mono text-sm tracking-wider">HELLO, MY NAME IS</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              <span className="block">Dave Kamirah</span>
              <span className="text-gradient">AKA CodeSavant</span>
            </h1>
            
            <p className="text-lg text-muted md:text-xl max-w-lg">
              I build exceptional digital experiences with modern technologies. Specializing in MERN stack, ML, and Web3.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link 
                href="#projects" 
                className="btn bg-primary text-black hover:bg-primary/90"
              >
                View Projects
              </Link>
              <Link 
                href="#contact" 
                className="btn border border-primary text-primary hover:bg-primary/10"
              >
                Contact Me
              </Link>
            </div>
            
            <div className="pt-6 flex gap-6">
              <a 
                href="https://github.com/daveth3t3chg33k" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </a>
              <a 
                href="https://linkedin.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a 
                href="https://twitter.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted hover:text-foreground transition-colors"
                aria-label="Twitter"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </a>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 border border-primary/30 rounded-full blur-sm opacity-70"></div>
            <div className="absolute inset-2 border border-primary/20 rounded-full blur-sm opacity-50 animate-pulse"></div>
            <div className="relative aspect-square overflow-hidden rounded-full border-2 border-primary/50 glow">
              <div className="bg-gradient-to-br from-primary/20 to-secondary/20 absolute inset-0"></div>
              <div className="flex items-center justify-center h-full text-6xl font-bold text-gradient">
                DK
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-xs font-mono text-muted mb-2">Scroll</span>
        <svg width="20" height="30" viewBox="0 0 20 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="1" width="18" height="28" rx="9" stroke="currentColor" strokeWidth="1" />
          <circle cx="10" cy="10" r="3" fill="currentColor" className="animate-pulse" />
        </svg>
      </div>
    </section>
  );
} 