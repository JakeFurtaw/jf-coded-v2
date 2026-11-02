import type { Metadata } from "next";
import ResumeClient from "./resume-client";

export const metadata: Metadata = {
  title: "Resume",
  description: "Experience, skills, and education of Jacob Furtaw, Agentic AI Engineer.",
};

export default function ResumePage() {
  return <ResumeClient />;
}
