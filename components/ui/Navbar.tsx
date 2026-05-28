"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, Rocket, Home, FileText, FolderOpen, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/resume", label: "Resume", icon: FileText },
  { href: "/projects", label: "Projects", icon: FolderOpen },
  { href: "/contact", label: "Contact", icon: Mail },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <Rocket className="w-8 h-8 text-cyan-400 group-hover:rotate-12 transition-transform" />
            <div className="absolute -inset-1 bg-cyan-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity" />
          </div>
          <div>
            <span className="text-2xl font-bold tracking-tighter bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              JFCoded
            </span>
            <p className="text-[10px] text-cyan-400/70 -mt-1 tracking-[3px]">EXPLORING THE UNKNOWN OF AI</p>
          </div>
        </Link>

        {/* Desktop Navigation - Modernized */}
        <div className="hidden md:flex items-center gap-9 text-sm font-medium tracking-tight">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative transition-all duration-200 ${
                  isActive 
                    ? "text-cyan-400" 
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
                <span 
                  className={`absolute -bottom-1 left-0 h-px bg-gradient-to-r from-cyan-400 to-cyan-400 transition-all duration-300 ${
                    isActive 
                      ? "w-full" 
                      : "w-0 group-hover:w-full"
                  }`} 
                />
              </Link>
            );
          })}

          <Button 
            asChild 
            variant="outline" 
            className="ml-3 border-cyan-400/50 hover:border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all"
          >
            <a href="/Jacob_Furtaw_Resume.pdf" download="Jacob_Furtaw_Resume.pdf">
              Download CV
            </a>
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-cyan-400">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="glass border-white/10 w-80 p-0">
            <div className="flex flex-col h-full pt-16 pb-8 px-6">
              {/* Navigation Links */}
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  const Icon = link.icon;

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`group flex items-center gap-4 rounded-xl px-4 py-4 text-lg font-medium tracking-tight transition-all duration-200 ${
                        isActive 
                          ? "bg-white/5 text-cyan-400" 
                          : "text-white/80 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <div className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                        isActive 
                          ? "bg-cyan-400/10 text-cyan-400" 
                          : "bg-white/5 text-white/60 group-hover:bg-white/10 group-hover:text-white/80"
                      }`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <span>{link.label}</span>
                      
                      {/* Active indicator bar */}
                      {isActive && (
                        <div className="ml-auto h-1.5 w-1.5 rounded-full bg-cyan-400" />
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* Action Section */}
              <div className="mt-auto pt-8 border-t border-white/10">
                <Button 
                  asChild 
                  className="w-full bg-cyan-400 text-black hover:bg-cyan-300 font-medium h-12 text-base"
                >
                  <a 
                    href="/Jacob_Furtaw_Resume.pdf" 
                    download="Jacob_Furtaw_Resume.pdf"
                    onClick={() => setIsOpen(false)}
                  >
                    Download CV
                  </a>
                </Button>
                <p className="text-center text-[10px] text-white/40 mt-4 tracking-[2px]">
                  PDF • 1 PAGE
                </p>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}