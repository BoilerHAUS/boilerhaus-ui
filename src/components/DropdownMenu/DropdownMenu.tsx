import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { cn } from '../../lib/cn'

/* ----------------------------------------------------------
   Re-export primitives that need no styling
   ---------------------------------------------------------- */

export const DropdownMenu       = DropdownMenuPrimitive.Root
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger
export const DropdownMenuGroup  = DropdownMenuPrimitive.Group
export const DropdownMenuSub    = DropdownMenuPrimitive.Sub
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup


/* ----------------------------------------------------------
   DropdownMenuContent
   ---------------------------------------------------------- */

export interface DropdownMenuContentProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content> {}

/**
 * The floating menu panel. Rendered in a portal, anchored to the trigger.
 *
 * @example
 * <DropdownMenu>
 *   <DropdownMenuTrigger asChild>
 *     <Button variant="ghost" size="icon" aria-label="Row actions">⋯</Button>
 *   </DropdownMenuTrigger>
 *   <DropdownMenuContent align="end">
 *     <DropdownMenuItem>Edit</DropdownMenuItem>
 *     <DropdownMenuItem>Duplicate</DropdownMenuItem>
 *     <DropdownMenuSeparator />
 *     <DropdownMenuItem destructive>Delete</DropdownMenuItem>
 *   </DropdownMenuContent>
 * </DropdownMenu>
 */
export function DropdownMenuContent({
  className,
  sideOffset = 4,
  align = 'start',
  ...props
}: DropdownMenuContentProps) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        sideOffset={sideOffset}
        align={align}
        className={cn(
          // Geometry
          'min-w-[160px] rounded-sm border border-rule',
          // Color + elevation
          'bg-paper shadow-[var(--shadow-md)]',
          // Layout
          'py-1',
          // Z-index
          'z-50',
          // Animation
          'data-[state=open]:animate-[dropdown-in_120ms_var(--ease-enter)]',
          'data-[state=closed]:animate-[dropdown-out_80ms_var(--ease-exit)]',
          className,
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
}


/* ----------------------------------------------------------
   DropdownMenuItem
   ---------------------------------------------------------- */

export interface DropdownMenuItemProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> {
  /** Renders in signal-red — use for delete / destructive actions. */
  destructive?: boolean
  /** Optional leading icon node. */
  icon?: React.ReactNode
}

export function DropdownMenuItem({
  destructive,
  icon,
  className,
  children,
  ...props
}: DropdownMenuItemProps) {
  return (
    <DropdownMenuPrimitive.Item
      className={cn(
        // Layout
        'flex items-center gap-2',
        // Typography
        'font-body text-sm',
        // Spacing
        'px-4 py-2',
        // Interaction
        'cursor-default select-none outline-none',
        // Color
        destructive ? 'text-signal' : 'text-void',
        // Highlighted
        destructive
          ? 'data-[highlighted]:bg-[color-mix(in_srgb,var(--color-signal)_8%,var(--color-paper))]'
          : 'data-[highlighted]:bg-[color-mix(in_srgb,var(--color-rule)_60%,var(--color-paper))]',
        // Disabled
        'data-[disabled]:opacity-[0.38] data-[disabled]:pointer-events-none',
        className,
      )}
      {...props}
    >
      {icon && (
        <span className="shrink-0 w-4 h-4 flex items-center justify-center opacity-70">
          {icon}
        </span>
      )}
      {children}
    </DropdownMenuPrimitive.Item>
  )
}


/* ----------------------------------------------------------
   DropdownMenuCheckboxItem
   ---------------------------------------------------------- */

export interface DropdownMenuCheckboxItemProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem> {}

export function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: DropdownMenuCheckboxItemProps) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      checked={checked}
      className={cn(
        'flex items-center gap-2 font-body text-sm text-void',
        'px-4 py-2 cursor-default select-none outline-none',
        'data-[highlighted]:bg-[color-mix(in_srgb,var(--color-rule)_60%,var(--color-paper))]',
        'data-[disabled]:opacity-[0.38] data-[disabled]:pointer-events-none',
        className,
      )}
      {...props}
    >
      {/* Checkbox indicator — 16px box */}
      <span className="shrink-0 w-4 h-4 flex items-center justify-center rounded-sm border border-rule data-[state=checked]:bg-signal-alt data-[state=checked]:border-signal-alt">
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  )
}


/* ----------------------------------------------------------
   DropdownMenuRadioItem
   ---------------------------------------------------------- */

export interface DropdownMenuRadioItemProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem> {}

export function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: DropdownMenuRadioItemProps) {
  return (
    <DropdownMenuPrimitive.RadioItem
      className={cn(
        'flex items-center gap-2 font-body text-sm text-void',
        'px-4 py-2 cursor-default select-none outline-none',
        'data-[highlighted]:bg-[color-mix(in_srgb,var(--color-rule)_60%,var(--color-paper))]',
        'data-[disabled]:opacity-[0.38] data-[disabled]:pointer-events-none',
        className,
      )}
      {...props}
    >
      {/* Radio dot */}
      <span className="shrink-0 w-4 h-4 flex items-center justify-center rounded-full border border-rule">
        <DropdownMenuPrimitive.ItemIndicator>
          <span className="block w-2 h-2 rounded-full bg-signal-alt" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  )
}


/* ----------------------------------------------------------
   DropdownMenuLabel
   ---------------------------------------------------------- */

export interface DropdownMenuLabelProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> {}

/** Section label — not interactive. */
export function DropdownMenuLabel({ className, ...props }: DropdownMenuLabelProps) {
  return (
    <DropdownMenuPrimitive.Label
      className={cn(
        'px-4 py-1.5',
        'font-display font-bold text-xs uppercase tracking-widest text-smoke',
        className,
      )}
      {...props}
    />
  )
}


/* ----------------------------------------------------------
   DropdownMenuSeparator
   ---------------------------------------------------------- */

export interface DropdownMenuSeparatorProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator> {}

export function DropdownMenuSeparator({ className, ...props }: DropdownMenuSeparatorProps) {
  return (
    <DropdownMenuPrimitive.Separator
      className={cn('my-1 h-px bg-rule', className)}
      {...props}
    />
  )
}


/* ----------------------------------------------------------
   DropdownMenuSubTrigger
   ---------------------------------------------------------- */

export interface DropdownMenuSubTriggerProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> {}

export function DropdownMenuSubTrigger({ className, children, ...props }: DropdownMenuSubTriggerProps) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      className={cn(
        'flex items-center justify-between gap-2',
        'font-body text-sm text-void',
        'px-4 py-2 cursor-default select-none outline-none',
        'data-[highlighted]:bg-[color-mix(in_srgb,var(--color-rule)_60%,var(--color-paper))]',
        'data-[state=open]:bg-[color-mix(in_srgb,var(--color-rule)_60%,var(--color-paper))]',
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon />
    </DropdownMenuPrimitive.SubTrigger>
  )
}


/* ----------------------------------------------------------
   DropdownMenuSubContent
   ---------------------------------------------------------- */

export interface DropdownMenuSubContentProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent> {}

export function DropdownMenuSubContent({ className, ...props }: DropdownMenuSubContentProps) {
  return (
    <DropdownMenuPrimitive.SubContent
      className={cn(
        'min-w-[160px] rounded-sm border border-rule',
        'bg-paper shadow-[var(--shadow-md)]',
        'py-1 z-50',
        className,
      )}
      {...props}
    />
  )
}


/* ----------------------------------------------------------
   Icons
   ---------------------------------------------------------- */

function CheckIcon() {
  return (
    <svg viewBox="0 0 10 8" className="w-2.5 h-2 text-paper" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M1 4L3.5 6.5L9 1.5" />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-smoke">
      <path d="M4.5 2.5L8 6l-3.5 3.5" />
    </svg>
  )
}
