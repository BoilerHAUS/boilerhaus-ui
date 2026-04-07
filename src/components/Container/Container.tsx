import { cn } from '../../lib/cn'

/* ----------------------------------------------------------
   Container
   Max-width content wrapper with horizontal padding.
   Centered via auto margins.
   ---------------------------------------------------------- */

export type ContainerSize = 'sm' | 'md' | 'lg' | 'full'

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Max-width breakpoint:
   * - sm  → 640px   — forms, modals, narrow content
   * - md  → 960px   — articles, settings pages
   * - lg  → 1280px  — matches --grid-max-width token, dashboards
   * - full → 100%   — edge-to-edge
   */
  size?: ContainerSize
}

const maxWidthMap: Record<ContainerSize, string> = {
  sm:   '640px',
  md:   '960px',
  lg:   'var(--grid-max-width)',
  full: '100%',
}

export function Container({
  size = 'lg',
  className,
  children,
  style,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn('mx-auto w-full px-[var(--space-5)]', className)}
      style={{ maxWidth: maxWidthMap[size], ...style }}
      {...props}
    >
      {children}
    </div>
  )
}
