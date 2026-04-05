import { Slot } from '@radix-ui/react-slot'
import { cn } from '../../lib/cn'

/* ----------------------------------------------------------
   PageShell
   ---------------------------------------------------------- */

export interface PageShellProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Root layout container. Takes up full viewport height via flex column.
 * Always include PageShellTopbar + PageShellBody as direct children.
 *
 * @example
 * <PageShell>
 *   <PageShellTopbar>…</PageShellTopbar>
 *   <PageShellBody>
 *     <PageShellSidebar>…</PageShellSidebar>
 *     <PageShellContent>…</PageShellContent>
 *   </PageShellBody>
 * </PageShell>
 */
export function PageShell({ className, children, ...props }: PageShellProps) {
  return (
    <div
      className={cn('flex flex-col bg-paper', className)}
      {...props}
    >
      {children}
    </div>
  )
}


/* ----------------------------------------------------------
   PageShellTopbar
   ---------------------------------------------------------- */

export interface PageShellTopbarProps extends React.HTMLAttributes<HTMLElement> {}

/**
 * Horizontal top bar — brand, nav, user menu.
 * Fixed height defined by --topbar-height token (48px).
 */
export function PageShellTopbar({ className, children, ...props }: PageShellTopbarProps) {
  return (
    <header
      className={cn(
        // Height — matches --topbar-height token
        'h-[var(--topbar-height)] shrink-0',
        // Layout
        'flex items-center gap-4 px-5',
        // Color
        'bg-paper border-b border-rule',
        className,
      )}
      {...props}
    >
      {children}
    </header>
  )
}


/* ----------------------------------------------------------
   PageShellBody
   ---------------------------------------------------------- */

export interface PageShellBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Flex row below the topbar. Overflow is hidden here;
 * each child (sidebar, content) manages its own scroll.
 */
export function PageShellBody({ className, children, ...props }: PageShellBodyProps) {
  return (
    <div
      className={cn('flex-1 flex overflow-hidden', className)}
      {...props}
    >
      {children}
    </div>
  )
}


/* ----------------------------------------------------------
   PageShellSidebar
   ---------------------------------------------------------- */

export interface PageShellSidebarProps extends React.HTMLAttributes<HTMLElement> {}

/**
 * Dark left panel — navigation, project list, context.
 * Width is controlled by --sidebar-width token (280px).
 * Uses ash background (near-black) to contrast the paper content area.
 */
export function PageShellSidebar({ className, children, ...props }: PageShellSidebarProps) {
  return (
    <aside
      className={cn(
        // Width — matches --sidebar-width token
        'w-[var(--sidebar-width)] shrink-0',
        // Layout
        'flex flex-col overflow-y-auto',
        // Color — inverted (dark)
        'bg-ash',
        // Right border separates from content area
        'border-r border-[color-mix(in_srgb,var(--color-paper)_8%,transparent)]',
        className,
      )}
      {...props}
    >
      {children}
    </aside>
  )
}


/* ----------------------------------------------------------
   PageShellContent
   ---------------------------------------------------------- */

export interface PageShellContentProps extends React.HTMLAttributes<HTMLElement> {}

/**
 * Main content area — fills remaining horizontal space, scrolls independently.
 * This is where page-level content renders.
 */
export function PageShellContent({ className, children, ...props }: PageShellContentProps) {
  return (
    <main
      className={cn('flex-1 overflow-y-auto p-6', className)}
      {...props}
    >
      {children}
    </main>
  )
}


/* ----------------------------------------------------------
   PageShellNavItem
   ---------------------------------------------------------- */

export interface PageShellNavItemProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Marks this item as the current page/section.
   * Adds a signal-red left border indicator and highlights text.
   * Sets aria-current="page" automatically.
   */
  active?: boolean
  /**
   * Optional 16×16 icon rendered before the label.
   */
  icon?: React.ReactNode
  /**
   * Render as a child element instead of <button>.
   * Use for routing links: <PageShellNavItem asChild><a href="/projects">…</a></PageShellNavItem>
   */
  asChild?: boolean
}

/**
 * Sidebar navigation item. Designed for use on the ash (dark) sidebar.
 * Supports asChild for framework routing links.
 *
 * @example
 * // With Next.js Link
 * <PageShellNavItem asChild active={pathname === '/projects'} icon={<IconGrid />}>
 *   <Link href="/projects">Projects</Link>
 * </PageShellNavItem>
 */
export function PageShellNavItem({
  active,
  icon,
  asChild = false,
  className,
  children,
  ...props
}: PageShellNavItemProps) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      className={cn(
        // Layout
        'flex items-center gap-3 w-full',
        // Spacing
        'px-4 py-[10px]',
        // Typography — body font, small
        'font-body text-sm leading-none',
        // Base color — muted paper on dark bg
        'text-[color-mix(in_srgb,var(--color-paper)_60%,transparent)]',
        // No native button styles
        'cursor-pointer select-none no-underline outline-none border-none bg-transparent',
        // Left border placeholder — keeps text aligned between states
        'border-l-2 border-transparent',
        // Hover
        'hover:text-paper hover:bg-[color-mix(in_srgb,var(--color-paper)_6%,transparent)]',
        // Focus
        'focus-visible:ring-[2px] focus-visible:ring-inset focus-visible:ring-signal-alt',
        // Active
        active && [
          'text-paper',
          'border-l-signal',
          'bg-[color-mix(in_srgb,var(--color-paper)_8%,transparent)]',
        ],
        // Transition
        'transition-colors duration-fast ease-[var(--ease-standard)]',
        className,
      )}
      aria-current={active ? 'page' : undefined}
      {...props}
    >
      {icon && (
        <span
          className="shrink-0 w-4 h-4 flex items-center justify-center"
          aria-hidden="true"
        >
          {icon}
        </span>
      )}
      <span>{children}</span>
    </Comp>
  )
}
