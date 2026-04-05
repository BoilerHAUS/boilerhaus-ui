import { cn } from '../../lib/cn'

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /**
   * Appends a required indicator (*) after the label text.
   * Does not affect validation — pair with the `required` attribute on the input.
   */
  required?: boolean
  /**
   * Reduces opacity to match a disabled input.
   * Does not affect the native label behaviour.
   */
  disabled?: boolean
}

/**
 * Accessible form label. Link to an input via `htmlFor` / `id`.
 *
 * @example
 * <Label htmlFor="name" required>Project Name</Label>
 * <Input id="name" required />
 */
export function Label({
  required,
  disabled,
  className,
  children,
  ...props
}: LabelProps) {
  return (
    <label
      className={cn(
        // Typography — body font, sm size, medium weight
        'font-body font-medium text-sm leading-none',
        // Color
        'text-void',
        // Disabled state
        disabled && 'opacity-[0.38] cursor-not-allowed',
        className,
      )}
      {...props}
    >
      {children}
      {required && (
        <span
          className="ml-1 text-signal"
          aria-hidden="true"
        >
          *
        </span>
      )}
    </label>
  )
}
