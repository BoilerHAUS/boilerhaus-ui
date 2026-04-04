import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind classes safely.
 * clsx handles conditionals; twMerge resolves conflicting Tailwind utilities
 * (e.g. bg-signal + bg-void → bg-void wins, not both).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
