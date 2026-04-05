import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { cn } from '../../lib/cn'

/* ----------------------------------------------------------
   TooltipProvider
   Wrap your app (or Storybook decorator) once with this.
   Controls the global delayDuration and skipDelayDuration.
   ---------------------------------------------------------- */

export interface TooltipProviderProps
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Provider> {}

export const TooltipProvider = TooltipPrimitive.Provider

/* ----------------------------------------------------------
   Tooltip root + trigger
   Re-exported without modification — no styling needed.
   ---------------------------------------------------------- */

export const Tooltip        = TooltipPrimitive.Root
export const TooltipTrigger = TooltipPrimitive.Trigger


/* ----------------------------------------------------------
   TooltipContent
   ---------------------------------------------------------- */

export interface TooltipContentProps
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> {}

/**
 * The floating label shown on hover/focus of the trigger.
 * Keep text short — one phrase, no punctuation.
 *
 * @example
 * // Wrap your app once with TooltipProvider, then:
 * <Tooltip>
 *   <TooltipTrigger asChild>
 *     <Button variant="ghost" size="icon" aria-label="Delete row">
 *       <TrashIcon />
 *     </Button>
 *   </TooltipTrigger>
 *   <TooltipContent>Delete row</TooltipContent>
 * </Tooltip>
 */
export function TooltipContent({
  className,
  sideOffset = 6,
  side = 'top',
  ...props
}: TooltipContentProps) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        sideOffset={sideOffset}
        side={side}
        className={cn(
          // Geometry
          'rounded-sm px-2.5 py-1.5',
          // Color — inverted: ash bg, paper text
          'bg-ash text-paper',
          // Typography
          'font-body text-xs leading-none',
          // Elevation
          'shadow-[var(--shadow-md)]',
          // Z-index
          'z-50',
          // Max width — prevent very long strings
          'max-w-[220px] text-center',
          // Animation
          'data-[state=delayed-open]:animate-[tooltip-in_100ms_var(--ease-enter)]',
          'data-[state=instant-open]:animate-[tooltip-in_100ms_var(--ease-enter)]',
          'data-[state=closed]:animate-[tooltip-out_80ms_var(--ease-exit)]',
          className,
        )}
        {...props}
      />
    </TooltipPrimitive.Portal>
  )
}
