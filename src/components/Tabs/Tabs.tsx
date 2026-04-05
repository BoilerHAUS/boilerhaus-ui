import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cn } from '../../lib/cn'

/* ----------------------------------------------------------
   Re-export primitives that need no styling
   ---------------------------------------------------------- */

/** Controls the active tab. Wrap all Tabs parts with this. */
export const Tabs = TabsPrimitive.Root

/** Associates a panel with a trigger via matching `value` props. */
export const TabsContent = TabsPrimitive.Content

/* ----------------------------------------------------------
   TabsList
   ---------------------------------------------------------- */

export interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> {}

/**
 * Container for tab trigger buttons.
 * Renders as an underlined bar — Bauhaus horizontal rule aesthetic.
 *
 * @example
 * <Tabs defaultValue="budget">
 *   <TabsList>
 *     <TabsTrigger value="budget">Budget</TabsTrigger>
 *     <TabsTrigger value="schedule">Schedule</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="budget">…</TabsContent>
 *   <TabsContent value="schedule">…</TabsContent>
 * </Tabs>
 */
export function TabsList({ className, ...props }: TabsListProps) {
  return (
    <TabsPrimitive.List
      className={cn(
        // Layout — horizontal row
        'flex items-end gap-0',
        // Bottom border — the rule the active tab "sits on"
        'border-b border-rule',
        className,
      )}
      {...props}
    />
  )
}


/* ----------------------------------------------------------
   TabsTrigger
   ---------------------------------------------------------- */

export interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {}

/**
 * Individual tab button. Active state: Bauhaus red bottom border.
 */
export function TabsTrigger({ className, ...props }: TabsTriggerProps) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        // Layout
        'relative flex items-center gap-1.5',
        // Typography
        'font-display font-bold text-xs uppercase tracking-widest',
        // Spacing — bottom padding creates space for the active indicator
        'px-4 pb-3 pt-2',
        // Color — inactive
        'text-smoke',
        // Active indicator — 2px red bottom border
        'border-b-2 border-transparent -mb-px',
        // Active state
        'data-[state=active]:text-void data-[state=active]:border-b-signal',
        // Hover — inactive tabs only
        'data-[state=inactive]:hover:text-void',
        // Focus
        'outline-none focus-visible:ring-2 focus-visible:ring-signal-alt focus-visible:ring-inset rounded-t-sm',
        // Disabled
        'disabled:opacity-[0.38] disabled:cursor-not-allowed disabled:pointer-events-none',
        // Transition
        'transition-colors duration-fast ease-(--ease-standard)',
        className,
      )}
      {...props}
    />
  )
}
