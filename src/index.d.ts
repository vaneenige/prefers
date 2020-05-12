export function prefers(property: 'color-scheme'): 'light' | 'dark' | 'no-preference';

export function prefers(
  property: 'color-scheme',
  value: 'light' | 'dark' | 'no-preference',
  fallback?: boolean
): boolean;

export function setPrefers(
  property: 'color-scheme',
  value: 'light' | 'dark' | 'no-preference' | false
): void;

export function prefers(property: 'reduced-motion'): boolean;

export function setPrefers(
  property: 'reduced-motion',
  value: 'reduce' | 'no-preference' | false
): void;
