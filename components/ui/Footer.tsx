import Link from "next/link";
import { Mail } from "lucide-react";
import { AUTHOR, EMAIL, RESUME_FILENAME, RESUME_PATH, ROLE, SITE_NAME, SOCIALS } from "@/lib/site";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-space-bg/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          {/* Brand */}
          <div>
            <Link href="/" className="group inline-block">
              <span className="text-xl font-bold tracking-tighter bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                {SITE_NAME}
              </span>
            </Link>
            <p className="mt-1 text-sm text-white/50 max-w-[240px]">
              {ROLE} exploring the unknown of AI.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <div className="text-xs uppercase tracking-[3px] text-white/40 mb-3 font-medium">
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
            <div className="text-xs uppercase tracking-[3px] text-white/40 mb-3 font-medium">
              Connect
            </div>
            <div className="flex flex-col gap-2 text-sm">
              {[SOCIALS.github, SOCIALS.linkedin, SOCIALS.x].map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/70 hover:text-cyan-400 transition-colors"
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </a>
              ))}
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-2 text-white/70 hover:text-cyan-400 transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>Email</span>
              </a>
            </div>
          </div>

          {/* Download CV */}
          <div className="md:text-right">
            <a
              href={RESUME_PATH}
              download={RESUME_FILENAME}
              className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:border-cyan-400/50 hover:bg-cyan-400/10 hover:text-cyan-400 transition-all"
            >
              Download CV (PDF)
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 pt-3 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-white/40">
          <div>
            © {currentYear} {AUTHOR}. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            Crafted with curiosity and a lot of coffee.
          </div>
        </div>
      </div>
    </footer>
  );
}
