import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { cn } from '../../lib/cn'

export interface RadioGroupProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
  /** Stack direction. Defaults to 'vertical'. */
  orientation?: 'vertical' | 'horizontal'
}

export interface RadioProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  /** Visible label text. */
  label?: string
  /** Optional supporting description rendered below the label. */
  description?: string
}

/* ----------------------------------------------------------
   RadioGroup
   ---------------------------------------------------------- */

/**
 * Container for a set of mutually exclusive Radio options.
 * Built on Radix RadioGroup — handles ARIA radiogroup role and keyboard nav.
 *
 * @example
 * <RadioGroup defaultValue="net30" onValueChange={setTerms}>
 *   <Radio value="net30" label="Net 30" />
 *   <Radio value="net45" label="Net 45" />
 * </RadioGroup>
 */
export function RadioGroup({
  orientation = 'vertical',
  className,
  ...props
}: RadioGroupProps) {
  return (
    <RadioGroupPrimitive.Root
      orientation={orientation}
      className={cn(
        'flex',
        orientation === 'vertical'   ? 'flex-col gap-3' : 'flex-row flex-wrap gap-4',
        className,
      )}
      {...props}
    />
  )
}

/* ----------------------------------------------------------
   Radio (item)
   ---------------------------------------------------------- */

/**
 * A single radio option inside a RadioGroup.
 *
 * @example
 * <Radio value="net30" label="Net 30" description="Due within 30 days." />
 */
export function Radio({
  label,
  description,
  className,
  disabled,
  ...props
}: RadioProps) {
  return (
    <label
      className={cn(
        'flex items-start gap-2.5 group',
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        className,
      )}
    >
      <RadioGroupPrimitive.Item
        disabled={disabled}
        className={cn(
          // Layout — vertically centred with first line of label
          'mt-0.5 shrink-0',
          // Shape
          'w-4 h-4 rounded-full border border-rule bg-paper',
          // Focus
          'outline-none focus-visible:ring-2 focus-visible:ring-signal-alt focus-visible:ring-offset-1',
          // Checked track
          'data-[state=checked]:border-signal-alt',
          // Transition
          'transition-colors duration-fast',
        )}
        {...props}
      >
        <RadioGroupPrimitive.Indicator className="flex items-center justify-center w-full h-full relative">
          {/* Filled dot */}
          <span className="w-2 h-2 rounded-full bg-signal-alt block" />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>

      {(label || description) && (
        <div className="flex flex-col gap-0.5 leading-none">
          {label && (
            <span className={cn(
              'text-sm text-void leading-tight',
              disabled && 'text-smoke',
            )}>
              {label}
            </span>
          )}
          {description && (
            <span className="text-sm text-smoke leading-snug">
              {description}
            </span>
          )}
        </div>
      )}
    </label>
  )
}
