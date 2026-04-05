import { cn } from '../../lib/cn'

export type SpinnerSize = 'sm' | 'md' | 'lg'

export interface SpinnerProps extends React.SVGAttributes<SVGSVGElement> {
  /** Visual size of the spinner. Defaults to 'md'. */
  size?: SpinnerSize
  /** Accessible label announced to screen readers. Defaults to 'Loading'. */
  label?: string
}

const sizes: Record<SpinnerSize, string> = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
}

/**
 * Spinning indicator for loading states.
 * Inherits `color` from its parent — place inside a coloured container or
 * set `className="text-signal-alt"` to tint it.
 *
 * @example
 * <Spinner />                           // 24px, inherits color
 * <Spinner size="sm" className="text-signal-alt" />
 * <Button disabled><Spinner size="sm" /> Saving…</Button>
 */
export function Spinner({
  size = 'md',
  label = 'Loading',
  className,
  ...props
}: SpinnerProps) {
  return (
    <svg
      role="status"
      aria-label={label}
      viewBox="0 0 24 24"
      fill="none"
      className={cn('animate-spin shrink-0', sizes[size], className)}
      {...props}
    >
      {/* Track ring */}
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="2.5"
        className="opacity-20"
      />
      {/* Active arc — top quarter */}
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  )
}
