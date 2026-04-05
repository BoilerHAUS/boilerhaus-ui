import { cn } from '../../lib/cn'

export type BadgeVariant = 'neutral' | 'active' | 'warning' | 'danger' | 'success'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Semantic status conveyed by this badge. Defaults to 'neutral'. */
  variant?: BadgeVariant
}

const base = [
  // Layout
  'inline-flex items-center',
  // Typography — xs, display, bold, tracked uppercase
  'font-display font-bold text-xs tracking-[0.10em] uppercase leading-none',
  // Geometry — minimal radius, consistent padding
  'px-2 py-[3px] rounded-sm',
  // No interaction
  'select-none whitespace-nowrap',
].join(' ')

const variants: Record<BadgeVariant, string> = {
  /**
   * Smoke on rule-tinted background — draft, pending, default state.
   */
  neutral: cn(
    'text-smoke',
    'bg-[color-mix(in_srgb,var(--color-smoke)_10%,var(--color-paper))]',
  ),

  /**
   * Signal-alt blue — in progress, active, under review.
   */
  active: cn(
    'text-signal-alt',
    'bg-[color-mix(in_srgb,var(--color-signal-alt)_10%,var(--color-paper))]',
  ),

  /**
   * Caution amber — on hold, revision required, needs attention.
   */
  warning: cn(
    'text-[var(--color-caution)]',
    'bg-[color-mix(in_srgb,var(--color-caution)_10%,var(--color-paper))]',
  ),

  /**
   * Signal red — blocked, rejected, critical.
   */
  danger: cn(
    'text-signal',
    'bg-[color-mix(in_srgb,var(--color-signal)_10%,var(--color-paper))]',
  ),

  /**
   * Growth green — complete, approved, resolved.
   */
  success: cn(
    'text-[var(--color-growth)]',
    'bg-[color-mix(in_srgb,var(--color-growth)_10%,var(--color-paper))]',
  ),
}

/**
 * Non-interactive status label.
 * Conveys project state, change-order state, or any categorical label.
 *
 * @example
 * <Badge variant="active">In Progress</Badge>
 * <Badge variant="danger">Blocked</Badge>
 */
export function Badge({
  variant = 'neutral',
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span className={cn(base, variants[variant], className)} {...props}>
      {children}
    </span>
  )
}
