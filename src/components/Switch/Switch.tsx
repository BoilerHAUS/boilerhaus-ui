import * as SwitchPrimitive from '@radix-ui/react-switch'
import { cn } from '../../lib/cn'

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {}

/**
 * Toggle switch for boolean settings.
 * Compose with Label for accessible form fields.
 *
 * Track dimensions: 36×20px. Thumb: 14×14px.
 * Thumb travel: 3px (off) → 19px (on).
 *
 * @example
 * <div className="flex items-center gap-2">
 *   <Switch id="notifs" checked={enabled} onCheckedChange={setEnabled} />
 *   <Label htmlFor="notifs">Email notifications</Label>
 * </div>
 */
export function Switch({ className, ...props }: SwitchProps) {
  return (
    <SwitchPrimitive.Root
      className={cn(
        // Track geometry
        'relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full',
        // Track color — off
        'bg-rule',
        // Track color — on
        'data-[state=checked]:bg-signal-alt',
        // Focus
        'outline-none',
        'focus-visible:ring-[2px] focus-visible:ring-signal-alt focus-visible:ring-offset-2',
        // Disabled
        'disabled:opacity-[0.38] disabled:cursor-not-allowed',
        // Transition
        'transition-colors duration-fast ease-[var(--ease-standard)]',
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          // Thumb geometry
          'block h-3.5 w-3.5 rounded-full',
          // Thumb color
          'bg-paper',
          // Elevation
          'shadow-[var(--shadow-sm)]',
          // Position — off
          'translate-x-[3px]',
          // Position — on
          'data-[state=checked]:translate-x-[19px]',
          // Transition
          'transition-transform duration-fast ease-[var(--ease-standard)]',
        )}
      />
    </SwitchPrimitive.Root>
  )
}
