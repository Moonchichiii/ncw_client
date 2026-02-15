import { Github, Linkedin, type LucideIcon } from "lucide-react";

export interface SocialLinkData {
  icon: LucideIcon;
  title: string;
  label: string;
  href: string;
}

export const SOCIAL_LINKS: SocialLinkData[] = [
  {
    icon: Linkedin,
    title: "LinkedIn",
    label: "PROFESSIONAL",
    href: "https://www.linkedin.com/in/mats-gustafsson-a57643103/",
  },
  {
    icon: Github,
    title: "GitHub",
    label: "REPOSITORY",
    href: "https://github.com/Moonchichiii",
  },
];

export const CONTACT_EMAIL = "contact@nordiccodeworks.com";