import clsx, { ClassValue } from 'clsx';

/**
 * Utility function to merge class names using clsx
 * This is commonly referred to as "cn" in many codebases
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}