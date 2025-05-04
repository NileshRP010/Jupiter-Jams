import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatViews(views: number): string {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M`;
  } else if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K`;
  } else {
    return views.toString();
  }
}

export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export function generateQRCodeUrl(path: string): string {
  const baseUrl = "https://api.qrserver.com/v1/create-qr-code/";
  const url = `https://jupiter.io/${path}`; // This would be the real Jupiter URL
  return `${baseUrl}?data=${encodeURIComponent(url)}&size=200x200&color=7C35D9`;
}

export function calculateProgress(completed: number, total: number): number {
  return (completed / total) * 100;
}

export function scrollToTop(): void {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
