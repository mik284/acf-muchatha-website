"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Sermons', href: '/sermons' },
    { name: 'Events', href: '/events' },
    { name: 'Ministries', href: '/ministries' },
    { name: 'Give', href: '/give' },
    { name: 'Contact', href: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const getHeaderStyle = () => {
    if (isHomePage) {
      return scrolled ? 'scrolled' : 'home';
    }
    return 'default';
  };

  const headerStyle = getHeaderStyle();

  return (
    <header 
      className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${
        headerStyle === 'home' 
          ? 'text-white' 
          : 'text-foreground'
      }`}
    >
      {/* Background overlay with blur */}
      <div 
        className={`absolute inset-0 -z-10 backdrop-blur-sm transition-all duration-300 ${
          headerStyle === 'home' 
            ? scrolled 
              ? 'bg-background/90' 
              : 'bg-transparent'
            : 'bg-background/95'
        }`}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
              headerStyle === 'home' && !scrolled 
                ? 'bg-white/10 backdrop-blur-sm border border-white/20' 
                : 'bg-gradient-to-br from-primary to-primary/80'
            }`}>
              <Image
                src="/images/acf_logo.jpg"
                alt="ACF Muchatha Assembly Logo"
                width={48}
                height={48}
                className="rounded-full border-2 border-white/80"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <h1 className={`text-xl font-bold ${
                headerStyle === 'home' && !scrolled 
                  ? 'text-white' 
                  : 'bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80'
              }`}>
                ACF MUCHATHA
              </h1>
              <p className={`text-xs -mt-1 transition-colors duration-200 ${
                headerStyle === 'home' && !scrolled 
                  ? 'text-white/80' 
                  : 'text-muted-foreground'
              }`}>
                Living in God's Abundance
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link   
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 relative group ${
                    isActive
                      ? headerStyle === 'home' && !scrolled
                        ? 'text-white font-semibold' // Brighter white for homepage
                        : 'text-primary font-semibold' // Primary color for other pages
                      : headerStyle === 'home' && !scrolled 
                        ? 'text-white/80 hover:text-white' 
                        : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {link.name}
                  <span className={`absolute bottom-1.5 left-1/2 w-0 h-0.5 ${
                    headerStyle === 'home' && !scrolled ? 'bg-white' : 'bg-primary' // White underline on homepage, primary elsewhere
                  } transition-all duration-200 transform -translate-x-1/2 ${
                    isActive ? 'w-5' : 'group-hover:w-5'
                  }`} />
                </Link>
              );
            })}
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`rounded-full ${
                headerStyle === 'home' && !scrolled 
                  ? 'text-white hover:bg-white/10' 
                  : 'text-foreground hover:bg-accent/50'
              }`}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        <div 
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMenuOpen 
              ? 'max-h-96 opacity-100 py-4' 
              : 'max-h-0 opacity-0 py-0'
          }`}
        >
          <div className="flex flex-col space-y-2 mt-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-3 rounded-lg font-medium transition-colors flex items-center ${
                    isActive
                      ? 'bg-primary/10 text-primary font-semibold'
                      : headerStyle === 'home' && !scrolled
                      ? 'text-white/90 hover:bg-white/10'
                      : 'text-foreground/90 hover:bg-accent/50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                  {isActive && (
                    <span className="ml-2 w-1.5 h-1.5 rounded-full bg-primary" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
