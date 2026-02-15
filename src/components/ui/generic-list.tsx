import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GenericListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  keyExtractor: (item: T, index: number) => string;
  className?: string;
  itemClassName?: string;
  emptyMessage?: string;
}

export function GenericList<T>({
  items,
  renderItem,
  keyExtractor,
  className,
  itemClassName,
  emptyMessage = "NO_DATA",
}: GenericListProps<T>): ReactNode {
  if (items.length === 0) {
    return (
      <p className="font-mono text-xs text-content-faint uppercase tracking-widest">
        {emptyMessage}
      </p>
    );
  }

  return (
    <ul className={cn(className)}>
      {items.map((item, index) => (
        <li key={keyExtractor(item, index)} className={cn(itemClassName)}>
          {renderItem(item, index)}
        </li>
      ))}
    </ul>
  );
}