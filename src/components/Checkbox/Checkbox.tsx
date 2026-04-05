import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { cn } from '../../lib/cn'

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {}

/* Checkmark SVG */
function CheckIcon() {
  return (
    <svg
      viewBox="0 0 10 8"
      className="w-2.5 h-2"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M1 4L3.5 6.5L9 1.5" />
    </svg>
  )
}

/* Dash SVG — rendered when checked === 'indeterminate' */
function DashIcon() {
  return (
    <svg
      viewBox="0 0 10 2"
      className="w-2.5 h-0.5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M1 1h8" />
    </svg>
  )
}

/**
 * Accessible checkbox. Compose with Label for labelled form fields.
 *
 * @example
 * // Unlabelled
 * <Checkbox id="approved" checked={approved} onCheckedChange={setApproved} />
 *
 * @example
 * // Labelled
 * <div className="flex items-center gap-2">
 *   <Checkbox id="approved" />
 *   <Label htmlFor="approved">Mark as approved</Label>
 * </div>
 *
 * @example
 * // Indeterminate (select-all pattern)
 * <Checkbox checked="indeterminate" />
 */
export function Checkbox({ checked, className, ...props }: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      checked={checked}
      className={cn(
        // Geometry
        'h-4 w-4 shrink-0 rounded-sm border border-rule',
        // Color — unchecked
        'bg-paper',
        // Checked / indeterminate
        'data-[state=checked]:bg-signal-alt data-[state=checked]:border-signal-alt data-[state=checked]:text-paper',
        'data-[state=indeterminate]:bg-signal-alt data-[state=indeterminate]:border-signal-alt data-[state=indeterminate]:text-paper',
        // Focus
        'outline-none',
        'focus-visible:ring-[2px] focus-visible:ring-signal-alt focus-visible:ring-offset-1',
        // Disabled
        'disabled:opacity-[0.38] disabled:cursor-not-allowed',
        // Transition
        'transition-colors duration-fast ease-[var(--ease-standard)]',
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
        {checked === 'indeterminate' ? <DashIcon /> : <CheckIcon />}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}
