import { cn } from '../../lib/cn'

export type StatDeltaDirection = 'up' | 'down' | 'neutral'

export interface StatProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Primary metric value — number, currency string, percentage, etc. */
  value: string | number
  /** Short label identifying the metric. Rendered in display font uppercase. */
  label: string
  /** Change indicator text, e.g. "+$8,200" or "-4%". */
  delta?: string | number
  /** Direction controls colour: up=green, down=red, neutral=smoke. Defaults to 'neutral'. */
  deltaDirection?: StatDeltaDirection
  /** Secondary supporting text shown below the value row. */
  caption?: string
}

const deltaColors: Record<StatDeltaDirection, string> = {
  up:      'text-[var(--color-growth)]',
  down:    'text-signal',
  neutral: 'text-smoke',
}

const deltaIcons: Record<StatDeltaDirection, string> = {
  up:      '↑',
  down:    '↓',
  neutral: '—',
}

/**
 * KPI tile displaying a headline metric with optional delta indicator.
 * Designed for dashboard summary rows and project header strips.
 *
 * @example
 * <Stat label="Contract Value" value="$1.24M" />
 * <Stat label="Budget Used" value="62%" delta="+8%" deltaDirection="up" caption="this period" />
 */
export function Stat({
  value,
  label,
  delta,
  deltaDirection = 'neutral',
  caption,
  className,
  ...props
}: StatProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-1 p-4 border border-rule rounded-md bg-paper',
        className,
      )}
      {...props}
    >
      {/* Metric label */}
      <span className="font-display text-xs tracking-widest uppercase text-smoke leading-none">
        {label}
      </span>

      {/* Value + delta */}
      <div className="flex items-baseline gap-2 mt-0.5">
        <span className="font-display font-bold text-2xl text-void leading-none tabular-nums">
          {value}
        </span>
        {delta !== undefined && (
          <span
            className={cn('text-sm font-medium tabular-nums leading-none', deltaColors[deltaDirection])}
            aria-label={`${deltaDirection === 'up' ? 'increase' : deltaDirection === 'down' ? 'decrease' : 'no change'} of ${delta}`}
          >
            <span aria-hidden="true">{deltaIcons[deltaDirection]} </span>
            {delta}
          </span>
        )}
      </div>

      {/* Supporting caption */}
      {caption && (
        <span className="text-sm text-smoke leading-snug">{caption}</span>
      )}
    </div>
  )
}
