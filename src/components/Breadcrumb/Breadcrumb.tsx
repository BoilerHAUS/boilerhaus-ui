import { Slot } from '@radix-ui/react-slot'
import { cn } from '../../lib/cn'

/* ----------------------------------------------------------
   Breadcrumb — root nav
   ---------------------------------------------------------- */

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {}

/**
 * Root `<nav>` wrapper. Sets aria-label="breadcrumb".
 */
export function Breadcrumb({ className, ...props }: BreadcrumbProps) {
  return (
    <nav aria-label="breadcrumb" className={cn(className)} {...props} />
  )
}

/* ----------------------------------------------------------
   BreadcrumbList — ordered list
   ---------------------------------------------------------- */

export interface BreadcrumbListProps extends React.HTMLAttributes<HTMLOListElement> {}

/**
 * `<ol>` that lays out breadcrumb items horizontally with wrapping.
 */
export function BreadcrumbList({ className, ...props }: BreadcrumbListProps) {
  return (
    <ol
      className={cn(
        'flex flex-wrap items-center gap-1 text-sm text-smoke',
        className,
      )}
      {...props}
    />
  )
}

/* ----------------------------------------------------------
   BreadcrumbItem — list item
   ---------------------------------------------------------- */

export interface BreadcrumbItemProps extends React.HTMLAttributes<HTMLLIElement> {}

/**
 * `<li>` wrapper for a link or the current page label.
 */
export function BreadcrumbItem({ className, ...props }: BreadcrumbItemProps) {
  return (
    <li
      className={cn('inline-flex items-center gap-1', className)}
      {...props}
    />
  )
}

/* ----------------------------------------------------------
   BreadcrumbLink — ancestor link
   ---------------------------------------------------------- */

export interface BreadcrumbLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Render as child component (e.g. React Router `<Link>` or Next.js `<Link>`). */
  asChild?: boolean
}

/**
 * Ancestor crumb link. Use `asChild` to render as a router `<Link>`.
 *
 * @example
 * <BreadcrumbLink href="/projects">Projects</BreadcrumbLink>
 * <BreadcrumbLink asChild><Link to="/projects">Projects</Link></BreadcrumbLink>
 */
export function BreadcrumbLink({
  asChild,
  className,
  ...props
}: BreadcrumbLinkProps) {
  const Comp = asChild ? Slot : 'a'
  return (
    <Comp
      className={cn(
        'text-smoke hover:text-void transition-colors duration-fast',
        'underline-offset-2 hover:underline',
        'outline-none focus-visible:ring-2 focus-visible:ring-signal-alt rounded-sm',
        className,
      )}
      {...props}
    />
  )
}

/* ----------------------------------------------------------
   BreadcrumbPage — current page (not a link)
   ---------------------------------------------------------- */

export interface BreadcrumbPageProps extends React.HTMLAttributes<HTMLSpanElement> {}

/**
 * The final (current) crumb — rendered as a `<span>` with `aria-current="page"`.
 */
export function BreadcrumbPage({ className, ...props }: BreadcrumbPageProps) {
  return (
    <span
      aria-current="page"
      className={cn('text-void font-medium', className)}
      {...props}
    />
  )
}

/* ----------------------------------------------------------
   BreadcrumbSeparator — visual divider
   ---------------------------------------------------------- */

export interface BreadcrumbSeparatorProps extends React.HTMLAttributes<HTMLLIElement> {}

/**
 * Separator between crumbs. Defaults to "/" — pass children to customise.
 *
 * @example
 * <BreadcrumbSeparator />
 * <BreadcrumbSeparator><ChevronRightIcon /></BreadcrumbSeparator>
 */
export function BreadcrumbSeparator({
  children,
  className,
  ...props
}: BreadcrumbSeparatorProps) {
  return (
    <li
      role="presentation"
      aria-hidden="true"
      className={cn('text-smoke select-none', className)}
      {...props}
    >
      {children ?? '/'}
    </li>
  )
}

/* ----------------------------------------------------------
   BreadcrumbEllipsis — collapsed middle
   ---------------------------------------------------------- */

export interface BreadcrumbEllipsisProps extends React.HTMLAttributes<HTMLSpanElement> {}

/**
 * Placeholder for collapsed intermediate crumbs.
 */
export function BreadcrumbEllipsis({ className, ...props }: BreadcrumbEllipsisProps) {
  return (
    <span
      role="presentation"
      aria-hidden="true"
      className={cn('text-smoke select-none tracking-widest', className)}
      {...props}
    >
      …
    </span>
  )
}
