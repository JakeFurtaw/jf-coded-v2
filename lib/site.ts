import type { IconType } from "react-icons";
import { FaDiscord, FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";

/** Site-wide identity, contact details, and links. Import from here instead of re-typing them. */
export const SITE_URL = "https://www.jfcoded.com";
export const SITE_NAME = "JFCoded";
export const AUTHOR = "Jacob Furtaw";
export const ROLE = "Agentic AI Engineer";
export const SITE_TITLE = `${AUTHOR} | ${ROLE}`;
export const SITE_DESCRIPTION = `${ROLE} | Building intelligent systems that explore the unknown`;
export const SITE_TAGLINE =
  "I build privacy-first AI agents — transparent, local, and reliable enough to use every day.";

export const EMAIL = "jfurtaw97@gmail.com";
export const PHONE_DISPLAY = "+1 (410) 533-7663";
export const LOCATION = "Baltimore, Maryland, USA";
export const X_HANDLE = "@JFurtaw97";

/** Downloadable resume (public/). */
export const RESUME_PATH = "/Jacob_Furtaw_Resume.pdf";
export const RESUME_FILENAME = "Jacob_Furtaw_Resume.pdf";

export interface SocialLink {
  label: string;
  href: string;
  icon: IconType;
}

/** Brand icons come from react-icons/fa6 (lucide is for UI icons). */
export const SOCIALS = {
  github: { label: "GitHub", href: "https://github.com/JakeFurtaw", icon: FaGithub },
  linkedin: { label: "LinkedIn", href: "https://www.linkedin.com/in/jacob-furtaw", icon: FaLinkedin },
  x: { label: "X / Twitter", href: `https://x.com/${X_HANDLE.slice(1)}`, icon: FaXTwitter },
  discord: { label: "Discord", href: "https://discord.com/users/jfurtaw", icon: FaDiscord },
} satisfies Record<string, SocialLink>;
