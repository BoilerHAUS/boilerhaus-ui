import { useEffect, useState } from 'react'
import { cn } from '../../lib/cn'

/* ----------------------------------------------------------
   Types
   ---------------------------------------------------------- */

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'bh-theme'

/* ----------------------------------------------------------
   Helpers
   ---------------------------------------------------------- */

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyTheme(theme: Theme): void {
  document.documentElement.setAttribute('data-theme', theme)
}

/* ----------------------------------------------------------
   useTheme hook
   Reads from localStorage + prefers-color-scheme on first mount,
   writes data-theme attribute to <html>, and persists changes.

   Note: if you render multiple ThemeToggles in one page, their
   React state diverges on toggle — use a shared context instead.
   ---------------------------------------------------------- */

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>('light')

  useEffect(() => {
    const initial = getInitialTheme()
    setThemeState(initial)
    applyTheme(initial)
  }, [])

  const setTheme = (next: Theme): void => {
    localStorage.setItem(STORAGE_KEY, next)
    applyTheme(next)
    setThemeState(next)
  }

  const toggle = (): void => setTheme(theme === 'light' ? 'dark' : 'light')

  return { theme, setTheme, toggle }
}

/* ----------------------------------------------------------
   Icons
   ---------------------------------------------------------- */

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.42 1.42M11.53 11.53l1.42 1.42M3.05 12.95l1.42-1.42M11.53 4.47l1.42-1.42"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M13.5 9.5A6 6 0 0 1 6.5 2.5a6 6 0 1 0 7 7Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/* ----------------------------------------------------------
   ThemeToggle
   Icon button that switches between light and dark mode.
   Persists preference to localStorage and applies data-theme
   attribute to <html>.

   @example
   // In PageShellTopbar
   <ThemeToggle />
   ---------------------------------------------------------- */

export interface ThemeToggleProps {
  className?: string
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggle } = useTheme()

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      className={cn(
        'bh-theme-toggle',
        'inline-flex items-center justify-center',
        'w-8 h-8 rounded-md',
        'text-smoke',
        'hover:text-void hover:bg-rule',
        'focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-signal-alt focus-visible:ring-offset-2',
        'transition-colors duration-fast ease-[var(--ease-standard)]',
        'cursor-pointer',
        className,
      )}
    >
      {theme === 'light' ? <MoonIcon /> : <SunIcon />}
    </button>
  )
}
