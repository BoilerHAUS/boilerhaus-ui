import * as ToastPrimitive from '@radix-ui/react-toast'
import { cn } from '../../lib/cn'
import { useToastStore, type ToastVariant } from './use-toast'

/* ----------------------------------------------------------
   Icons
   ---------------------------------------------------------- */

function SuccessIcon() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.061L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
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

function CloseIcon() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden="true">
      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
    </svg>
  )
}

/* ----------------------------------------------------------
   Variant styles
   ---------------------------------------------------------- */

const variantStyles: Record<ToastVariant, { container: string; icon: React.ReactNode | null }> = {
  neutral: {
    container: 'bg-ash text-paper border-[color-mix(in_srgb,var(--color-paper)_15%,transparent)]',
    icon: null,
  },
  success: {
    container: 'bg-ash text-paper border-[color-mix(in_srgb,var(--color-growth)_50%,transparent)]',
    icon: <SuccessIcon />,
  },
  warning: {
    container: 'bg-ash text-paper border-[color-mix(in_srgb,var(--color-caution)_50%,transparent)]',
    icon: <WarningIcon />,
  },
  danger: {
    container: 'bg-ash text-paper border-[color-mix(in_srgb,var(--color-signal)_50%,transparent)]',
    icon: <DangerIcon />,
  },
}

const iconColors: Record<ToastVariant, string> = {
  neutral: 'text-smoke',
  success: 'text-[var(--color-growth)]',
  warning: 'text-[var(--color-caution)]',
  danger:  'text-signal',
}

/* ----------------------------------------------------------
   Toaster — renders portal + all active toasts
   Render once, near the root of your app.
   ---------------------------------------------------------- */

export interface ToasterProps {
  /** Pixel distance from the viewport edge. Default: 16. */
  offset?: number
}

/**
 * Renders the Radix Toast viewport and all active toasts.
 * Mount once near the app root (inside your layout or PageShell).
 *
 * @example
 * // In your root layout:
 * <Toaster />
 *
 * // Anywhere in your app:
 * import { toast } from 'boilerhaus-ui'
 * toast.success({ title: 'Saved', description: 'Project details updated.' })
 */
export function Toaster({ offset = 16 }: ToasterProps) {
  const { toasts, dismiss } = useToastStore()

  return (
    <ToastPrimitive.Provider swipeDirection="right">
      {toasts.map((t) => {
        const v       = variantStyles[t.variant ?? 'neutral']
        const iconCol = iconColors[t.variant ?? 'neutral']

        return (
          <ToastPrimitive.Root
            key={t.id}
            duration={t.duration === Infinity ? undefined : t.duration}
            onOpenChange={(open) => { if (!open) dismiss(t.id) }}
            className={cn(
              // Layout
              'flex items-start gap-3',
              // Geometry
              'w-[360px] max-w-[calc(100vw-32px)] rounded-sm border',
              // Spacing
              'px-4 py-3',
              // Elevation
              'shadow-[var(--shadow-lg)]',
              // Animation — slide in from right, fade out
              'data-[state=open]:animate-[toast-in_200ms_var(--ease-enter)]',
              'data-[state=closed]:animate-[toast-out_150ms_var(--ease-exit)]',
              'data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]',
              'data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-transform',
              'data-[swipe=end]:animate-[toast-out_150ms_var(--ease-exit)]',
              v.container,
            )}
          >
            {/* Variant icon */}
            {v.icon && (
              <span className={cn('mt-0.5 shrink-0', iconCol)}>
                {v.icon}
              </span>
            )}

            {/* Body */}
            <div className="flex-1 min-w-0">
              {t.title && (
                <ToastPrimitive.Title className="font-display font-bold text-sm uppercase tracking-[0.06em] leading-snug">
                  {t.title}
                </ToastPrimitive.Title>
              )}
              {t.description && (
                <ToastPrimitive.Description
                  className={cn(
                    'text-sm text-smoke leading-relaxed',
                    t.title && 'mt-0.5',
                  )}
                >
                  {t.description}
                </ToastPrimitive.Description>
              )}
            </div>

            {/* Close */}
            <ToastPrimitive.Close
              aria-label="Dismiss"
              className={cn(
                'shrink-0 mt-0.5 text-smoke opacity-60 hover:opacity-100',
                'transition-opacity duration-fast ease-[var(--ease-standard)]',
                'outline-none focus-visible:ring-[2px] focus-visible:ring-signal-alt rounded-sm',
              )}
            >
              <CloseIcon />
            </ToastPrimitive.Close>
          </ToastPrimitive.Root>
        )
      })}

      <ToastPrimitive.Viewport
        className="fixed bottom-0 right-0 flex flex-col gap-2 p-4 w-[392px] max-w-[100vw] z-50 outline-none"
        style={{ '--offset': `${offset}px` } as React.CSSProperties}
      />
    </ToastPrimitive.Provider>
  )
}
