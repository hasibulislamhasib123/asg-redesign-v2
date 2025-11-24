import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ✅ এই ফাংশনটি যোগ করুন (এটি লোগোর পাথ ঠিক করবে)
export function getAssetPath(path: string) {
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${import.meta.env.BASE_URL}${cleanPath}`;
}