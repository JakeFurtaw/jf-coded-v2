import Link from "next/link";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { Mail } from "lucide-react";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#0a0a0f]/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="group inline-block">
              <span className="text-xl font-bold tracking-tighter bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                JFCoded
              </span>
            </Link>
            <p className="mt-2 text-sm text-white/50 max-w-[240px]">
              Machine Learning Engineer exploring the unknown of AI.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <div className="text-xs uppercase tracking-[3px] text-white/40 mb-4 font-medium">
              Navigate
            </div>
            <ul className="space-y-2 text-sm">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-cyan-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <div className="text-xs uppercase tracking-[3px] text-white/40 mb-4 font-medium">
              Connect
            </div>
            <div className="flex flex-col gap-2.5 text-sm">
              <a
                href="https://github.com/JakeFurtaw"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/70 hover:text-cyan-400 transition-colors group"
              >
                <FaGithub className="h-4 w-4" />
                <span>GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/jacob-furtaw"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/70 hover:text-cyan-400 transition-colors group"
              >
                <FaLinkedin className="h-4 w-4" />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://x.com/JFurtaw97"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/70 hover:text-cyan-400 transition-colors group"
              >
                <FaXTwitter className="h-4 w-4" />
                <span>X / Twitter</span>
              </a>
              <a
                href="mailto:jfurtaw97@gmail.com"
                className="flex items-center gap-2 text-white/70 hover:text-cyan-400 transition-colors group"
              >
                <Mail className="h-4 w-4" />
                <span>Email</span>
              </a>
            </div>
          </div>

          {/* Download CV */}
          <div className="md:text-right">
            <a
              href="/Jacob_Furtaw_Resume.pdf"
              download="Jacob_Furtaw_Resume.pdf"
              className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-medium text-white hover:border-cyan-400/50 hover:bg-cyan-400/10 hover:text-cyan-400 transition-all"
            >
              Download CV (PDF)
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-white/40">
          <div>
            © {currentYear} Jacob Furtaw. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            Crafted with curiosity and a lot of coffee.
          </div>
        </div>
      </div>
    </footer>
  );
}
