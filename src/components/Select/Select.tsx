import * as SelectPrimitive from '@radix-ui/react-select'
import { cn } from '../../lib/cn'

/* ----------------------------------------------------------
   SelectItem
   ---------------------------------------------------------- */

export interface SelectItemProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> {}

/**
 * A single option inside a Select.
 * Renders the checkmark indicator when selected.
 */
export function SelectItem({ className, children, ...props }: SelectItemProps) {
  return (
    <SelectPrimitive.Item
      className={cn(
        // Layout
        'flex items-center justify-between gap-3',
        // Typography
        'font-body text-sm text-void',
        // Spacing
        'px-4 py-2',
        // Interaction
        'cursor-default select-none outline-none',
        // Highlighted (keyboard / hover)
        'data-[highlighted]:bg-[color-mix(in_srgb,var(--color-rule)_50%,var(--color-paper))]',
        // Selected
        'data-[state=checked]:text-signal-alt data-[state=checked]:font-medium',
        // Disabled
        'data-[disabled]:opacity-[0.38] data-[disabled]:pointer-events-none',
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator>
        <CheckIcon />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
}


/* ----------------------------------------------------------
   Select (root + trigger + content)
   ---------------------------------------------------------- */

export interface SelectProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root> {
  /** The id applied to the trigger button — links to a Label via htmlFor. */
  id?: string
  /** Placeholder text shown when no value is selected. */
  placeholder?: string
  /** Error message shown below the trigger. Puts the trigger in error state. */
  error?: string
  /** Additional className applied to the outer wrapper div. */
  className?: string
  /** Inline styles applied to the outer wrapper div. */
  style?: React.CSSProperties
}

const triggerBase = [
  // Layout — matches Input sizing exactly
  'w-full flex items-center justify-between gap-2',
  // Typography
  'font-body text-base text-void',
  // Geometry
  'px-4 py-2 rounded-sm border border-solid',
  // Color
  'bg-paper border-rule',
  // Placeholder color
  '[&[data-placeholder]]:text-smoke',
  // Focus
  'outline-none',
  'focus-visible:border-signal-alt',
  'focus-visible:ring-[2px] focus-visible:ring-signal-alt focus-visible:ring-offset-0',
  // Transition
  'transition-colors duration-fast ease-[var(--ease-standard)]',
  // Disabled
  'disabled:opacity-[0.38] disabled:cursor-not-allowed',
  'disabled:bg-[color-mix(in_srgb,var(--color-rule)_30%,var(--color-paper))]',
].join(' ')

const triggerError = [
  'border-signal',
  'focus-visible:border-signal',
  'focus-visible:ring-[color-mix(in_srgb,var(--color-signal)_40%,transparent)]',
].join(' ')

/**
 * Dropdown selector. Wraps Radix Select with Boilerhaus styling.
 * Matches Input visually — use with Label for accessible form fields.
 *
 * @example
 * <Label htmlFor="status" required>Status</Label>
 * <Select id="status" placeholder="Select status" onValueChange={setValue}>
 *   <SelectItem value="active">In Progress</SelectItem>
 *   <SelectItem value="complete">Complete</SelectItem>
 * </Select>
 */
export function Select({
  id,
  placeholder,
  error,
  className,
  style,
  children,
  ...props
}: SelectProps) {
  const errorId = id ? `${id}-error` : undefined

  return (
    <div className={cn('flex flex-col gap-1', className)} style={style}>
      <SelectPrimitive.Root {...props}>
        <SelectPrimitive.Trigger
          id={id}
          className={cn(triggerBase, error && triggerError)}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? errorId : undefined}
        >
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectPrimitive.Icon asChild>
            <ChevronDownIcon />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            position="popper"
            sideOffset={4}
            className={cn(
              // Geometry
              'rounded-sm border border-rule',
              // Color + elevation
              'bg-paper shadow-[var(--shadow-md)]',
              // Sizing — matches trigger width
              'w-[var(--radix-select-trigger-width)]',
              // Max height
              'max-h-[var(--radix-select-content-available-height)]',
              // Z-index
              'z-50 overflow-hidden',
            )}
          >
            <SelectPrimitive.Viewport className="py-1">
              {children}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>

      {error && (
        <p
          id={errorId}
          role="alert"
          className="text-xs text-signal leading-none"
        >
          {error}
        </p>
      )}
    </div>
  )
}


/* ----------------------------------------------------------
   Icons — inline SVGs, no external dependency
   ---------------------------------------------------------- */

function ChevronDownIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className="shrink-0 text-smoke"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 5l4 4 4-4" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className="text-signal-alt"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.5 7l3.5 3.5 5.5-6" />
    </svg>
  )
}
