import { memo } from "react";
import type { Project } from "@/types";
import {
  CardShell,
  CompactCard,
  HeroCard,
  WideCard,
} from "@/components/ui/project-card.parts";

interface ProjectCardProps {
  project: Project;
  variant?: "hero" | "compact" | "wide";
  index?: number;
  className?: string;
}

const ProjectCard = memo<ProjectCardProps>(
  ({ project, variant = "compact", index = 0, className = "" }) => {
    const num = String(index + 1).padStart(2, "0");

    if (variant === "hero") {
      return (
        <CardShell className={className}>
          <HeroCard project={project} num={num} />
        </CardShell>
      );
    }

    if (variant === "wide") {
      return (
        <CardShell
          className={className}
          extraClasses="grid grid-cols-1 md:grid-cols-2 hover:-translate-y-0.5"
        >
          <WideCard project={project} num={num} />
        </CardShell>
      );
    }

    return (
      <CardShell className={className} extraClasses="hover:-translate-y-0.5">
        <CompactCard project={project} num={num} />
      </CardShell>
    );
  },
);

ProjectCard.displayName = "ProjectCard";
export default ProjectCard;
