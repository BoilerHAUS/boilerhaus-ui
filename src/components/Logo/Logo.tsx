import { cn } from '../../lib/cn'

export type LogoVariant = 'color' | 'void' | 'dark' | 'paper'
export type LogoLockup  = 'horizontal' | 'stacked' | 'mark-only' | 'wordmark-only'
export type LogoSize    = 'sm' | 'md' | 'lg'

export interface LogoProps {
  /** Color scheme. Use 'dark' or 'paper' on dark backgrounds. Defaults to 'color'. */
  variant?: LogoVariant
  /** Layout of mark and wordmark. Defaults to 'horizontal'. */
  lockup?: LogoLockup
  /** Overall size — sm for topbar, md default, lg for hero/display. Defaults to 'md'. */
  size?: LogoSize
  className?: string
}

const markSizeClass: Record<LogoSize, string> = {
  sm: 'w-[var(--space-4)] h-[var(--space-4)]',
  md: 'w-[var(--space-6)] h-[var(--space-6)]',
  lg: 'w-[var(--space-8)] h-[var(--space-8)]',
}

const wordmarkSizeClass: Record<LogoSize, string> = {
  sm: 'text-base',
  md: 'text-xl',
  lg: 'text-4xl',
}

const gapHClass: Record<LogoSize, string> = {
  sm: 'gap-[var(--space-2)]',
  md: 'gap-[var(--space-3)]',
  lg: 'gap-[var(--space-5)]',
}

const gapVClass: Record<LogoSize, string> = {
  sm: 'gap-[var(--space-1)]',
  md: 'gap-[var(--space-2)]',
  lg: 'gap-[var(--space-4)]',
}

const markFills: Record<LogoVariant, { top: string; bottom: string }> = {
  color: { top: 'fill-signal', bottom: 'fill-void'  },
  void:  { top: 'fill-void',   bottom: 'fill-void'  },
  dark:  { top: 'fill-signal', bottom: 'fill-paper' },
  paper: { top: 'fill-paper',  bottom: 'fill-paper' },
}

const wordmarkColors: Record<LogoVariant, { boiler: string; haus: string }> = {
  color: { boiler: 'text-void',  haus: 'text-signal' },
  void:  { boiler: 'text-void',  haus: 'text-void'   },
  dark:  { boiler: 'text-paper', haus: 'text-signal' },
  paper: { boiler: 'text-paper', haus: 'text-paper'  },
}

export function Logo({
  variant = 'color',
  lockup  = 'horizontal',
  size    = 'md',
  className,
}: LogoProps) {
  const { top, bottom } = markFills[variant]
  const { boiler, haus } = wordmarkColors[variant]

  const mark = (
    <svg
      viewBox="0 0 1 1"
      className={cn('flex-shrink-0', markSizeClass[size])}
      aria-hidden="true"
    >
      <polygon points="0,0 1,0 0,1" className={top} />
      <polygon points="1,0 1,1 0,1" className={bottom} />
    </svg>
  )

  const wordmark = (
    <span
      className={cn(
        'font-display font-bold tracking-[0.04em] leading-none',
        wordmarkSizeClass[size],
      )}
    >
      <span className={boiler}>boiler</span>
      <span className={haus}>haus</span>
    </span>
  )

  if (lockup === 'mark-only') {
    return (
      <svg
        viewBox="0 0 1 1"
        className={cn('flex-shrink-0', markSizeClass[size], className)}
        role="img"
        aria-label="Boilerhaus"
      >
        <polygon points="0,0 1,0 0,1" className={top} />
        <polygon points="1,0 1,1 0,1" className={bottom} />
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
        aria-label="Boilerhaus"
      >
        <span className={boiler}>boiler</span>
        <span className={haus}>haus</span>
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
      aria-label="Boilerhaus"
    >
      {mark}
      {wordmark}
    </div>
  )
}
