import { cn } from '../../lib/cn'

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Placeholder shape shown while content is loading.
 * Compose by setting width, height, and border-radius via `className`.
 *
 * @example
 * <Skeleton className="w-48 h-4" />                    // text line
 * <Skeleton className="w-10 h-10 rounded-full" />      // avatar
 * <Skeleton className="w-full h-32 rounded-md" />      // card
 */
export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn('animate-pulse rounded-sm bg-rule', className)}
      {...props}
    />
  )
}
