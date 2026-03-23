// src/lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
// cn() merges Tailwind classes cleanly — handles conditional classes
// Usage: cn('base-class', condition && 'conditional-class', className)
export function cn(...inputs: ClassValue[]) {
 return twMerge(clsx(inputs))
}
// Format a date string for blog posts: '2025-01-15' -> 'January 15, 2025'
export function formatDate(dateString: string): string {
 return new Date(dateString).toLocaleDateString('en-GB', {
 year: 'numeric', month: 'long', day: 'numeric',
 })
}
// Truncate text for preview cards
export function truncate(str: string, maxLength: number): string {
 if (str.length <= maxLength) return str
 return str.slice(0, maxLength).trimEnd() + '...'
}
