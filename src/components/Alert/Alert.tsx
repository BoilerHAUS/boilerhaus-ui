import { cn } from '../../lib/cn'

export type AlertVariant = 'neutral' | 'info' | 'warning' | 'danger' | 'success'

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Semantic intent conveyed by the alert. Defaults to 'neutral'. */
  variant?: AlertVariant
  /** Bold heading line above the description. */
  title?: string
  /**
   * Override the default variant icon.
   * Pass `null` to suppress the icon entirely.
   */
  icon?: React.ReactNode
  /**
   * Callback for the dismiss (×) button.
   * When provided, an × button is rendered — the consumer is responsible
   * for removing the alert from the DOM on click.
   */
  onDismiss?: () => void
}

/* ----------------------------------------------------------
   Default icons (16×16 filled SVGs)
   ---------------------------------------------------------- */

function InfoIcon() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M8 1a7 7 0 1 1 0 14A7 7 0 0 1 8 1zm0 1a6 6 0 1 0 0 12A6 6 0 0 0 8 2zm.002 5a.75.75 0 0 1 .744.648L8.75 8.75v3a.75.75 0 0 1-1.493.102L7.25 11.75v-3A.75.75 0 0 1 8.002 8zM8 4.5a.875.875 0 1 1 0 1.75A.875.875 0 0 1 8 4.5z" />
    </svg>
  )
}

function WarningIcon() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
    </svg>
  )
}

function DangerIcon() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
    </svg>
  )
}

function SuccessIcon() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.061L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden="true">
      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
    </svg>
  )
}

const defaultIcons: Record<AlertVariant, React.ReactNode> = {
  neutral: <InfoIcon />,
  info:    <InfoIcon />,
  warning: <WarningIcon />,
  danger:  <DangerIcon />,
  success: <SuccessIcon />,
}

/* ----------------------------------------------------------
   Variant styles
   ---------------------------------------------------------- */

const variants: Record<AlertVariant, { container: string; icon: string; title: string }> = {
  neutral: {
    container: cn(
      'border-l-smoke',
      'bg-[color-mix(in_srgb,var(--color-smoke)_8%,var(--color-paper))]',
    ),
    icon:  'text-smoke',
    title: 'text-smoke',
  },
  info: {
    container: cn(
      'border-l-signal-alt',
      'bg-[color-mix(in_srgb,var(--color-signal-alt)_8%,var(--color-paper))]',
    ),
    icon:  'text-signal-alt',
    title: 'text-signal-alt',
  },
  warning: {
    container: cn(
      'border-l-[var(--color-caution)]',
      'bg-[color-mix(in_srgb,var(--color-caution)_8%,var(--color-paper))]',
    ),
    icon:  'text-[var(--color-caution)]',
    title: 'text-[var(--color-caution)]',
  },
  danger: {
    container: cn(
      'border-l-signal',
      'bg-[color-mix(in_srgb,var(--color-signal)_8%,var(--color-paper))]',
    ),
    icon:  'text-signal',
    title: 'text-signal',
  },
  success: {
    container: cn(
      'border-l-[var(--color-growth)]',
      'bg-[color-mix(in_srgb,var(--color-growth)_8%,var(--color-paper))]',
    ),
    icon:  'text-[var(--color-growth)]',
    title: 'text-[var(--color-growth)]',
  },
}

/**
 * Inline status banner. Use for form errors, page-level warnings,
 * and contextual success/info messages.
 *
 * @example
 * <Alert variant="danger" title="Save failed">
 *   Check your connection and try again.
 * </Alert>
 *
 * @example
 * // Dismissible
 * {show && (
 *   <Alert variant="success" title="Changes saved" onDismiss={() => setShow(false)} />
 * )}
 */
export function Alert({
  variant = 'neutral',
  title,
  icon,
  onDismiss,
  className,
  children,
  ...props
}: AlertProps) {
  const v      = variants[variant]
  const iconEl = icon === null ? null : (icon ?? defaultIcons[variant])

  return (
    <div
      role="alert"
      className={cn(
        // Layout
        'flex items-start gap-3',
        // Border
        'border-l-4 rounded-sm',
        // Spacing
        'px-4 py-3',
        // Variant
        v.container,
        className,
      )}
      {...props}
    >
      {/* Icon */}
      {iconEl && (
        <span className={cn('mt-0.5 shrink-0', v.icon)}>
          {iconEl}
        </span>
      )}

      {/* Body */}
      <div className="flex-1 min-w-0">
        {title && (
          <p className={cn('font-display font-bold text-sm uppercase tracking-[0.06em] leading-snug', v.title)}>
            {title}
          </p>
        )}
        {children && (
          <div className={cn('text-sm text-void leading-relaxed', title && 'mt-0.5')}>
            {children}
          </div>
        )}
      </div>

      {/* Dismiss button */}
      {onDismiss && (
        <button
          type="button"
          aria-label="Dismiss"
          onClick={onDismiss}
          className={cn(
            'shrink-0 mt-0.5 opacity-50 hover:opacity-100',
            'transition-opacity duration-fast ease-[var(--ease-standard)]',
            'outline-none focus-visible:ring-[2px] focus-visible:ring-signal-alt rounded-sm',
            v.icon,
          )}
        >
          <CloseIcon />
        </button>
      )}
    </div>
  )
}
