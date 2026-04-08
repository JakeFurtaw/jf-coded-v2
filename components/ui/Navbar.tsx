"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/resume", label: "Virtual Resume" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

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
            <p className="text-[10px] text-cyan-400/70 -mt-1 tracking-[3px]">EXPLORING THE UNKNOWN</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10 text-sm uppercase tracking-widest">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-cyan-400 transition-colors duration-200 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyan-400 group-hover:w-full transition-all" />
            </Link>
          ))}

          {/* Desktop */}
          <Button 
            asChild 
            variant="outline" 
            className="border-cyan-400/50 hover:border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all"
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
          <SheetContent side="right" className="glass border-white/10 w-80">
            <div className="flex flex-col gap-8 mt-12 text-lg">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="hover:text-cyan-400 transition-colors py-2 border-b border-white/10"
                >
                  {link.label}
                </Link>
              ))}
              <Button asChild className="mt-6 bg-cyan-400 text-black hover:bg-cyan-300">
                <a href="/Jacob_Furtaw_Resume.pdf" download="Jacob_Furtaw_Resume.pdf">
                  Download CV
                </a>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}