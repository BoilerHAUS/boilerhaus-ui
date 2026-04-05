import { cn } from '../../lib/cn'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * Error message shown below the textarea.
   * When set, the textarea renders in an error state (signal-red border).
   */
  error?: string
  /**
   * Hint text shown below the textarea when there is no error.
   */
  helperText?: string
}

const textareaBase = [
  // Layout
  'w-full',
  // Typography
  'font-body text-base text-void',
  // Geometry
  'px-4 py-2 rounded-sm border border-solid',
  // Size
  'min-h-[80px] resize-y',
  // Color
  'bg-paper border-rule',
  // Placeholder
  'placeholder:text-smoke',
  // Focus
  'outline-none',
  'focus-visible:border-signal-alt',
  'focus-visible:ring-[2px] focus-visible:ring-signal-alt focus-visible:ring-offset-0',
  // Transition
  'transition-colors duration-fast ease-[var(--ease-standard)]',
  // Disabled
  'disabled:opacity-[0.38] disabled:cursor-not-allowed',
  'disabled:bg-[color-mix(in_srgb,var(--color-rule)_30%,var(--color-paper))]',
  'disabled:resize-none',
].join(' ')

const textareaError = [
  'border-signal',
  'focus-visible:border-signal',
  'focus-visible:ring-[color-mix(in_srgb,var(--color-signal)_40%,transparent)]',
].join(' ')

/**
 * Multi-line text input.
 * Same error/helper/disabled API as Input — compose with Label for accessible fields.
 *
 * @example
 * <Label htmlFor="notes" required>Scope Notes</Label>
 * <Textarea id="notes" rows={4} placeholder="Describe the work scope…" />
 *
 * @example
 * <Textarea id="desc" error="Description is required." />
 */
export function Textarea({
  id,
  error,
  helperText,
  className,
  ...props
}: TextareaProps) {
  const errorId = id ? `${id}-error` : undefined
  const hintId  = id ? `${id}-hint`  : undefined

  const describedBy = error
    ? errorId
    : helperText
      ? hintId
      : undefined

  return (
    <div className="flex flex-col gap-1">
      <textarea
        id={id}
        className={cn(textareaBase, error && textareaError, className)}
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
          id={hintId}
          className="text-xs text-smoke leading-none"
        >
          {helperText}
        </p>
      )}
    </div>
  )
}
