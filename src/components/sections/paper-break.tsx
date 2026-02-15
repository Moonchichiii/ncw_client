import { memo, type ReactNode } from "react";
import clsx from "clsx";

interface PaperBreakProps {
  children: ReactNode;
  className?: string;
}

const PaperBreak = memo<PaperBreakProps>(({ children, className }) => (
  <section className={clsx("section-paper py-24 sm:py-32", className)}>
    <div className="mx-auto max-w-300 px-5 sm:px-8">{children}</div>
  </section>
));

PaperBreak.displayName = "PaperBreak";
export default PaperBreak;
