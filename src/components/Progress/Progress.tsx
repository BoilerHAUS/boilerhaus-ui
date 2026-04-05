import * as ProgressPrimitive from '@radix-ui/react-progress'
import { cn } from '../../lib/cn'

export type ProgressSize    = 'sm' | 'md' | 'lg'
export type ProgressVariant = 'default' | 'warning' | 'danger' | 'success'

export interface ProgressProps
  extends Omit<React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>, 'value'> {
  /** Current value (0–max). Defaults to 0. */
  value?: number
  /** Maximum value. Defaults to 100. */
  max?: number
  /** Track height. Defaults to 'md'. */
  size?: ProgressSize
  /** Indicator colour. Defaults to 'default' (signal-alt blue). */
  variant?: ProgressVariant
  /** Accessible label for the progress bar. */
  label?: string
  /** Render the numeric percentage to the right of the label row. */
  showValue?: boolean
}

const trackSizes: Record<ProgressSize, string> = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-4',
}

const indicatorColors: Record<ProgressVariant, string> = {
  default: 'bg-signal-alt',
  warning: 'bg-[var(--color-caution)]',
  danger:  'bg-signal',
  success: 'bg-[var(--color-growth)]',
}

/**
 * Horizontal progress bar built on Radix Progress.
 * Manages ARIA progressbar role, aria-valuenow/min/max automatically.
 *
 * @example
 * <Progress value={65} />
 * <Progress value={65} label="Budget used" showValue variant="warning" />
 */
export function Progress({
  value = 0,
  max = 100,
  size = 'md',
  variant = 'default',
  label,
  showValue = false,
  className,
  ...props
}: ProgressProps) {
  const pct = Math.min(100, Math.max(0, max > 0 ? (value / max) * 100 : 0))

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between gap-3">
          {label && (
            <span className="text-sm text-smoke">{label}</span>
          )}
          {showValue && (
            <span className="text-sm text-smoke tabular-nums ml-auto">
              {Math.round(pct)}%
            </span>
          )}
        </div>
      )}

      <ProgressPrimitive.Root
        value={value}
        max={max}
        aria-label={label ?? 'Progress'}
        className={cn(
          'relative w-full overflow-hidden rounded-full bg-rule',
          trackSizes[size],
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className={cn(
            'h-full transition-[width] duration-slow ease-(--ease-standard)',
            indicatorColors[variant],
          )}
          style={{ width: `${pct}%` }}
        />
      </ProgressPrimitive.Root>
    </div>
  )
}
