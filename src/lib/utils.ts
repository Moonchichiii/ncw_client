import clsx, { type ClassValue } from "clsx";
	
	/** Merge class names via clsx */
	export function cn(...inputs: ClassValue[]): string {
	  return clsx(inputs);
	}
