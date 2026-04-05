import { cn } from '../../lib/cn'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Elevated container for project summaries, scope items, and change orders.
 * Compose with CardHeader, CardBody, CardFooter as needed.
 *
 * @example
 * <Card>
 *   <CardHeader>
 *     <span>Kitchen Reno</span>
 *     <Badge variant="active">In Progress</Badge>
 *   </CardHeader>
 *   <CardBody>…</CardBody>
 *   <CardFooter>
 *     <Button variant="ghost">View</Button>
 *   </CardFooter>
 * </Card>
 */
export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-paper border border-rule rounded-sm shadow-[var(--shadow-sm)]',
        'overflow-hidden',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * Optional header slot. Renders a flex row — ideal for a title + Badge.
 * Separated from the body by a 1px rule border.
 */
export function CardHeader({ className, children, ...props }: CardHeaderProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-between gap-4',
        'px-5 py-4',
        'border-b border-rule',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * Main content area. Handles its own padding.
 */
export function CardBody({ className, children, ...props }: CardBodyProps) {
  return (
    <div
      className={cn('px-5 py-4', className)}
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * Optional footer slot. Renders a flex row for action buttons.
 * Separated from the body by a 1px rule border.
 */
export function CardFooter({ className, children, ...props }: CardFooterProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-end gap-3',
        'px-5 py-4',
        'border-t border-rule',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
