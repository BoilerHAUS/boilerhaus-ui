import * as PopoverPrimitive from '@radix-ui/react-popover'
import { cn } from '../../lib/cn'

export const Popover        = PopoverPrimitive.Root
export const PopoverTrigger = PopoverPrimitive.Trigger
export const PopoverClose   = PopoverPrimitive.Close
export const PopoverAnchor  = PopoverPrimitive.Anchor

export interface PopoverContentProps
  extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> {}

/**
 * Styled Popover panel — renders in a portal, animated in/out.
 * Pair with `Popover`, `PopoverTrigger`, and optionally `PopoverClose`.
 *
 * Radix handles: focus trap, scroll lock, outside-click dismiss, ARIA.
 *
 * @example
 * <Popover>
 *   <PopoverTrigger asChild>
 *     <Button>Open</Button>
 *   </PopoverTrigger>
 *   <PopoverContent>
 *     <p>Popover body</p>
 *   </PopoverContent>
 * </Popover>
 */
export function PopoverContent({
  className,
  align = 'start',
  sideOffset = 8,
  ...props
}: PopoverContentProps) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        align={align}
        sideOffset={sideOffset}
        className={cn(
          // Layout + shape
          'z-50 rounded-md border border-rule bg-paper p-4',
          // Shadow
          'shadow-[var(--shadow-md)]',
          // Width default — consumers override via className
          'w-64',
          // Open animations
          'data-[state=open]:animate-[popover-in_150ms_ease]',
          // Close animations
          'data-[state=closed]:animate-[popover-out_100ms_ease]',
          // Focus
          'outline-none',
          className,
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
}
