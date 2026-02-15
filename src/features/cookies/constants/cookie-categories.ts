import { Shield, User, BarChart3, Target, type LucideIcon } from "lucide-react";
import type { CookieCategory } from "@/features/cookies/hooks/use-cookie-consent";

export interface CookieCategoryConfig {
  id: CookieCategory;
  name: string;
  description: string;
  icon: LucideIcon;
  required: boolean;
  examples: string[];
}

export const COOKIE_CATEGORIES: CookieCategoryConfig[] = [
  {
    id: "necessary",
    name: "Necessary",
    description:
      "Essential for the website to function properly. Cannot be disabled.",
    icon: Shield,
    required: true,
    examples: [
      "Session management",
      "Security",
      "Basic functionality",
    ],
  },
  {
    id: "preferences",
    name: "Preferences",
    description:
      "Remember your settings and preferences for a better experience.",
    icon: User,
    required: false,
    examples: [
      "Theme selection",
      "Language preferences",
      "Layout settings",
    ],
  },
  {
    id: "analytics",
    name: "Analytics",
    description:
      "Help us understand how visitors interact with our website.",
    icon: BarChart3,
    required: false,
    examples: [
      "Google Analytics",
      "Performance monitoring",
      "Usage statistics",
    ],
  },
  {
    id: "marketing",
    name: "Marketing",
    description:
      "Used to deliver personalized ads and measure campaign effectiveness.",
    icon: Target,
    required: false,
    examples: [
      "Social media pixels",
      "Advertising tracking",
      "Retargeting",
    ],
  },
];