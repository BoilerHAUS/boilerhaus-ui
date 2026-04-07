import { cn } from '../../lib/cn'

/* ----------------------------------------------------------
   Stack
   Flex container with token-based gap for vertical/horizontal
   composition. Gap values map directly to --space-* tokens.
   ---------------------------------------------------------- */

export type SpaceToken = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Layout direction — defaults to column */
  direction?: 'row' | 'column'
  /** Gap between children — maps to --space-N token */
  gap?: SpaceToken
  /** Cross-axis alignment */
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline'
  /** Main-axis justification */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  /** Allow children to wrap */
  wrap?: boolean
}

const alignClass: Record<NonNullable<StackProps['align']>, string> = {
  start:    'items-start',
  center:   'items-center',
  end:      'items-end',
  stretch:  'items-stretch',
  baseline: 'items-baseline',
}

const justifyClass: Record<NonNullable<StackProps['justify']>, string> = {
  start:   'justify-start',
  center:  'justify-center',
  end:     'justify-end',
  between: 'justify-between',
  around:  'justify-around',
  evenly:  'justify-evenly',
}

export function Stack({
  direction = 'column',
  gap = 4,
  align = 'stretch',
  justify = 'start',
  wrap = false,
  className,
  children,
  style,
  ...props
}: StackProps) {
  return (
    <div
      className={cn(
        'flex',
        direction === 'row' ? 'flex-row' : 'flex-col',
        alignClass[align],
        justifyClass[justify],
        wrap && 'flex-wrap',
        className,
      )}
      style={{ gap: gap === 0 ? 0 : `var(--space-${gap})`, ...style }}
      {...props}
    >
      {children}
    </div>
  )
}
