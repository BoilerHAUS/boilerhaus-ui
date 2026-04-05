import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { cn } from '../../lib/cn'

export const Accordion = AccordionPrimitive.Root

export interface AccordionItemProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> {}

export interface AccordionTriggerProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> {}

export interface AccordionContentProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> {}

/* ----------------------------------------------------------
   AccordionItem
   ---------------------------------------------------------- */

/**
 * Wrapper for one collapsible section. Requires a unique `value` prop.
 */
export function AccordionItem({ className, ...props }: AccordionItemProps) {
  return (
    <AccordionPrimitive.Item
      className={cn('border-b border-rule', className)}
      {...props}
    />
  )
}

/* ----------------------------------------------------------
   AccordionTrigger
   ---------------------------------------------------------- */

/**
 * Clickable header that toggles the section open/closed.
 * Renders a rotating chevron on the right — pass children for the label.
 */
export function AccordionTrigger({ className, children, ...props }: AccordionTriggerProps) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          // Layout
          'flex flex-1 items-center justify-between',
          // Spacing
          'py-4',
          // Typography
          'font-display font-bold text-sm tracking-widest uppercase text-void',
          // Interaction
          'cursor-pointer',
          'transition-colors duration-fast',
          'hover:text-signal-alt',
          // Disabled
          'disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:text-void',
          // Focus
          'outline-none focus-visible:ring-2 focus-visible:ring-signal-alt focus-visible:ring-inset rounded-sm',
          className,
        )}
        {...props}
      >
        {children}

        {/* Chevron — rotates 180° when open */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="shrink-0 text-smoke transition-transform duration-base ease-(--ease-standard) group-data-[state=open]:rotate-180 [[data-state=open]_&]:rotate-180"
        >
          <path d="M4 6l4 4 4-4" />
        </svg>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

/* ----------------------------------------------------------
   AccordionContent
   ---------------------------------------------------------- */

/**
 * Collapsible body panel. Animates height via CSS keyframes that consume
 * `--radix-accordion-content-height`.
 */
export function AccordionContent({ className, children, ...props }: AccordionContentProps) {
  return (
    <AccordionPrimitive.Content
      className={cn(
        'overflow-hidden text-sm text-void',
        'data-[state=open]:animate-[accordion-down_200ms_ease]',
        'data-[state=closed]:animate-[accordion-up_150ms_ease]',
        className,
      )}
      {...props}
    >
      <div className="pb-4 pt-0">{children}</div>
    </AccordionPrimitive.Content>
  )
}
