'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/80 backdrop-blur-md py-3 shadow-lg'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link 
            href="#home" 
            className="text-2xl font-bold tracking-tight"
          >
            <span className="text-gradient">DEV</span>
            <span>.PORTFOLIO</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm tracking-wide font-medium hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <div
              className={`w-6 h-0.5 bg-foreground transition-all ${
                isMenuOpen ? 'transform rotate-45 translate-y-2' : ''
              }`}
            />
            <div
              className={`w-6 h-0.5 bg-foreground transition-opacity ${
                isMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <div
              className={`w-6 h-0.5 bg-foreground transition-all ${
                isMenuOpen ? 'transform -rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden absolute w-full bg-card border-t border-border transition-all duration-300 ${
          isMenuOpen ? 'max-h-96 border-opacity-100 py-4' : 'max-h-0 overflow-hidden border-opacity-0'
        }`}
      >
        <nav className="flex flex-col container mx-auto px-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="py-3 text-sm tracking-wide font-medium hover:text-primary border-b border-border/30 last:border-0"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
} 