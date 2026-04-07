import { cn } from '../../lib/cn'

/* ----------------------------------------------------------
   FormGroup
   Accessible wrapper: label + field + helper/error text.

   Usage:
     <FormGroup label="Email" fieldId="email" required helper="We'll never share this.">
       <Input id="email" type="email" aria-describedby="email-help" />
     </FormGroup>

   The fieldId prop links the <label> to the control via htmlFor.
   Pass the same value as `id` on the inner field element.
   Pass `aria-describedby="<fieldId>-help"` on the field to connect
   helper/error text for screen readers.
   ---------------------------------------------------------- */

export interface FormGroupProps {
  /** Text label for the field */
  label: string
  /** id of the form control — sets htmlFor on the label */
  fieldId?: string
  /** Supplemental text shown below the field */
  helper?: string
  /** Validation error — replaces helper text, styled in signal red */
  error?: string
  /** Adds a visual required indicator (*) to the label */
  required?: boolean
  /** The form control (Input, Select, Textarea, etc.) */
  children: React.ReactNode
  className?: string
}

export function FormGroup({
  label,
  fieldId,
  helper,
  error,
  required,
  children,
  className,
}: FormGroupProps) {
  const helpId = fieldId ? `${fieldId}-help` : undefined
  const subtext = error ?? helper

  return (
    <div className={cn('flex flex-col gap-[var(--space-1)]', className)}>
      <label
        htmlFor={fieldId}
        className={cn(
          'font-body text-sm font-medium text-void',
          'leading-none select-none',
        )}
      >
        {label}
        {required && (
          <span
            aria-hidden="true"
            className="ml-[var(--space-1)] text-signal"
          >
            *
          </span>
        )}
      </label>

      {children}

      {subtext && (
        <p
          id={helpId}
          className={cn(
            'font-body text-sm leading-snug',
            error ? 'text-signal' : 'text-smoke',
          )}
          role={error ? 'alert' : undefined}
        >
          {subtext}
        </p>
      )}
    </div>
  )
}


/* ----------------------------------------------------------
   FormSection
   Titled section that groups related FormGroups within a form.
   Renders a visual heading + optional description, then children.
   ---------------------------------------------------------- */

export interface FormSectionProps {
  /** Section heading */
  title: string
  /** Optional explanatory text below the heading */
  description?: string
  /** FormGroup elements and other field components */
  children: React.ReactNode
  className?: string
}

export function FormSection({ title, description, children, className }: FormSectionProps) {
  return (
    <fieldset
      className={cn(
        'border-0 p-0 m-0',
        'flex flex-col gap-[var(--space-4)]',
        className,
      )}
    >
      <div className="flex flex-col gap-[var(--space-1)] pb-[var(--space-3)] border-b border-rule">
        <legend className="font-display font-bold text-md text-void uppercase tracking-[0.04em] float-left w-full">
          {title}
        </legend>
        {description && (
          <p className="font-body text-sm text-smoke leading-snug">
            {description}
          </p>
        )}
      </div>

      {children}
    </fieldset>
  )
}
