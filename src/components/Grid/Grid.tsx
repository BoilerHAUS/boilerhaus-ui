import { cn } from '../../lib/cn'
import type { SpaceToken } from '../Stack'

/* ----------------------------------------------------------
   Grid / GridCol
   12-column CSS grid with token-based gutter.
   ---------------------------------------------------------- */

export type GridCols = 1 | 2 | 3 | 4 | 6 | 12
export type GridColSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of equal columns — defaults to 12 */
  cols?: GridCols
  /** Gap between cells — maps to --space-N token */
  gap?: SpaceToken
  /** Independent row gap — falls back to gap if not set */
  rowGap?: SpaceToken
}

export interface GridColProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of columns this cell spans — defaults to full width */
  span?: GridColSpan
  /** Start column (1-based) — optional */
  start?: GridColSpan
}

export function Grid({
  cols = 12,
  gap = 5,
  rowGap,
  className,
  children,
  style,
  ...props
}: GridProps) {
  return (
    <div
      className={cn('grid', className)}
      style={{
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        columnGap: `var(--space-${gap})`,
        rowGap: rowGap != null ? `var(--space-${rowGap})` : `var(--space-${gap})`,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  )
}

export function GridCol({
  span,
  start,
  className,
  children,
  style,
  ...props
}: GridColProps) {
  return (
    <div
      className={cn('min-w-0', className)}
      style={{
        gridColumn: span != null ? `span ${span} / span ${span}` : undefined,
        gridColumnStart: start != null ? start : undefined,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  )
}
