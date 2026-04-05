import { cn } from '../../lib/cn'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Error message shown below the input.
   * When set, the input renders in an error state (signal-red border).
   */
  error?: string
  /**
   * Hint text shown below the input when there is no error.
   */
  helperText?: string
}

const inputBase = [
  // Layout — full width of its container
  'w-full',
  // Typography
  'font-body text-base text-void',
  // Geometry
  'px-4 py-2 rounded-sm border border-solid',
  // Color
  'bg-paper border-rule',
  // Placeholder
  'placeholder:text-smoke',
  // Focus — signal-alt ring, remove default outline
  'outline-none',
  'focus-visible:border-signal-alt',
  'focus-visible:ring-[2px] focus-visible:ring-signal-alt focus-visible:ring-offset-0',
  // Transition
  'transition-colors duration-fast ease-[var(--ease-standard)]',
  // Disabled
  'disabled:opacity-[0.38] disabled:cursor-not-allowed',
  'disabled:bg-[color-mix(in_srgb,var(--color-rule)_30%,var(--color-paper))]',
].join(' ')

const inputError = [
  'border-signal',
  'focus-visible:border-signal',
  'focus-visible:ring-[color-mix(in_srgb,var(--color-signal)_40%,transparent)]',
].join(' ')

/**
 * Single-line text input.
 * Compose with Label for accessible form fields:
 *
 * @example
 * <Label htmlFor="name" required>Project Name</Label>
 * <Input id="name" placeholder="e.g. Kitchen Reno" required />
 *
 * @example
 * <Input id="budget" error="Budget is required." />
 */
export function Input({
  id,
  error,
  helperText,
  className,
  ...props
}: InputProps) {
  const errorId    = id ? `${id}-error` : undefined
  const helperIdId = id ? `${id}-hint`  : undefined

  const describedBy = error
    ? errorId
    : helperText
      ? helperIdId
      : undefined

  return (
    <div className="flex flex-col gap-1">
      <input
        id={id}
        className={cn(inputBase, error && inputError, className)}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describedBy}
        {...props}
      />
      {error && (
        <p
          id={errorId}
          role="alert"
          className="text-xs text-signal leading-none"
        >
          {error}
        </p>
      )}
      {!error && helperText && (
        <p
          id={helperIdId}
          className="text-xs text-smoke leading-none"
        >
          {helperText}
        </p>
      )}
    </div>
  )
}
