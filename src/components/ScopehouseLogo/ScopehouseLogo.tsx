import { cn } from '../../lib/cn'

export type ScopeLogoVariant = 'color' | 'void' | 'dark' | 'paper'
export type ScopeLogoLockup  = 'horizontal' | 'stacked' | 'mark-only' | 'wordmark-only'
export type ScopeLogoSize    = 'sm' | 'md' | 'lg'

export interface ScopeLogoProps {
  /** Color scheme. Use 'dark' or 'paper' on dark backgrounds. Defaults to 'color'. */
  variant?: ScopeLogoVariant
  /** Layout of mark and wordmark. Defaults to 'horizontal'. */
  lockup?: ScopeLogoLockup
  /** Overall size — sm for topbar, md default, lg for hero/display. Defaults to 'md'. */
  size?: ScopeLogoSize
  className?: string
}

const markSizeClass: Record<ScopeLogoSize, string> = {
  sm: 'w-[var(--space-4)] h-[var(--space-4)]',
  md: 'w-[var(--space-6)] h-[var(--space-6)]',
  lg: 'w-[var(--space-8)] h-[var(--space-8)]',
}

const wordmarkSizeClass: Record<ScopeLogoSize, string> = {
  sm: 'text-base',
  md: 'text-xl',
  lg: 'text-4xl',
}

const gapHClass: Record<ScopeLogoSize, string> = {
  sm: 'gap-[var(--space-2)]',
  md: 'gap-[var(--space-3)]',
  lg: 'gap-[var(--space-5)]',
}

const gapVClass: Record<ScopeLogoSize, string> = {
  sm: 'gap-[var(--space-1)]',
  md: 'gap-[var(--space-2)]',
  lg: 'gap-[var(--space-4)]',
}

// Mark: vertically split circle — left: signal-alt, right: void
// Represents the scope/lens concept with Bauhaus geometric precision.
const markFills: Record<ScopeLogoVariant, { left: string; right: string }> = {
  color: { left: 'fill-signal-alt', right: 'fill-void'   },
  void:  { left: 'fill-void',       right: 'fill-void'   },
  dark:  { left: 'fill-signal-alt', right: 'fill-paper'  },
  paper: { left: 'fill-paper',      right: 'fill-paper'  },
}

const wordmarkColors: Record<ScopeLogoVariant, { scope: string; house: string }> = {
  color: { scope: 'text-void',  house: 'text-signal-alt' },
  void:  { scope: 'text-void',  house: 'text-void'       },
  dark:  { scope: 'text-paper', house: 'text-signal-alt' },
  paper: { scope: 'text-paper', house: 'text-paper'      },
}

export function ScopehouseLogo({
  variant = 'color',
  lockup  = 'horizontal',
  size    = 'md',
  className,
}: ScopeLogoProps) {
  const { left, right } = markFills[variant]
  const { scope, house } = wordmarkColors[variant]

  const mark = (
    <svg
      viewBox="0 0 1 1"
      className={cn('flex-shrink-0', markSizeClass[size])}
      aria-hidden="true"
    >
      {/* Left semicircle */}
      <path d="M0.5,0 A0.5,0.5 0 0,0 0.5,1 Z" className={left} />
      {/* Right semicircle */}
      <path d="M0.5,0 A0.5,0.5 0 0,1 0.5,1 Z" className={right} />
    </svg>
  )

  const wordmark = (
    <span
      className={cn(
        'font-display font-bold tracking-[0.04em] leading-none',
        wordmarkSizeClass[size],
      )}
    >
      <span className={scope}>scope</span>
      <span className={house}>house</span>
    </span>
  )

  if (lockup === 'mark-only') {
    return (
      <svg
        viewBox="0 0 1 1"
        className={cn('flex-shrink-0', markSizeClass[size], className)}
        role="img"
        aria-label="ScopeHouse"
      >
        <path d="M0.5,0 A0.5,0.5 0 0,0 0.5,1 Z" className={left} />
        <path d="M0.5,0 A0.5,0.5 0 0,1 0.5,1 Z" className={right} />
      </svg>
    )
  }

  if (lockup === 'wordmark-only') {
    return (
      <span
        className={cn(
          'font-display font-bold tracking-[0.04em] leading-none',
          wordmarkSizeClass[size],
          className,
        )}
        role="img"
        aria-label="ScopeHouse"
      >
        <span className={scope}>scope</span>
        <span className={house}>house</span>
      </span>
    )
  }

  return (
    <div
      className={cn(
        'inline-flex items-center',
        lockup === 'stacked'
          ? cn('flex-col items-start', gapVClass[size])
          : cn('flex-row', gapHClass[size]),
        className,
      )}
      role="img"
      aria-label="ScopeHouse"
    >
      {mark}
      {wordmark}
    </div>
  )
}
