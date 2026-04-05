import * as DialogPrimitive from '@radix-ui/react-dialog'
import { cn } from '../../lib/cn'

/* ----------------------------------------------------------
   Re-export primitives that need no styling
   ---------------------------------------------------------- */

/** Controls open/close state. Wrap all Dialog parts with this. */
export const Dialog = DialogPrimitive.Root

/** Renders the element that opens the dialog. Use asChild with a Button. */
export const DialogTrigger = DialogPrimitive.Trigger

/**
 * Closes the dialog without additional action.
 * Use asChild with a Button:
 * @example
 * <DialogClose asChild><Button variant="secondary">Cancel</Button></DialogClose>
 */
export const DialogClose = DialogPrimitive.Close


/* ----------------------------------------------------------
   DialogContent
   ---------------------------------------------------------- */

export interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {}

/**
 * The dialog panel — rendered in a portal above an overlay.
 * Always include DialogTitle for accessibility.
 *
 * @example
 * <Dialog>
 *   <DialogTrigger asChild><Button>Open</Button></DialogTrigger>
 *   <DialogContent>
 *     <DialogTitle>Confirm Action</DialogTitle>
 *     <DialogDescription>This cannot be undone.</DialogDescription>
 *     <DialogFooter>
 *       <DialogClose asChild><Button variant="secondary">Cancel</Button></DialogClose>
 *       <Button variant="destructive">Delete</Button>
 *     </DialogFooter>
 *   </DialogContent>
 * </Dialog>
 */
export function DialogContent({ className, children, ...props }: DialogContentProps) {
  return (
    <DialogPrimitive.Portal>
      {/* Overlay */}
      <DialogPrimitive.Overlay
        className={cn(
          'fixed inset-0 z-50',
          'bg-void/50',
          'backdrop-blur-[2px]',
        )}
      />

      {/* Panel */}
      <DialogPrimitive.Content
        className={cn(
          // Position — centered
          'fixed z-50',
          'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
          // Sizing
          'w-full max-w-lg',
          // Geometry
          'rounded-sm border border-rule',
          // Color + elevation
          'bg-paper shadow-[var(--shadow-xl)]',
          // Layout
          'flex flex-col gap-4',
          'p-6',
          // Close button anchor
          'relative',
          // Overflow safety
          'max-h-[85vh] overflow-y-auto',
          className,
        )}
        {...props}
      >
        {children}

        {/* Close × button — top-right */}
        <DialogPrimitive.Close
          className={cn(
            'absolute top-4 right-4',
            'flex items-center justify-center',
            'w-7 h-7 rounded-sm',
            'text-smoke',
            'hover:text-void hover:bg-[color-mix(in_srgb,var(--color-rule)_50%,transparent)]',
            'outline-none focus-visible:ring-[2px] focus-visible:ring-signal-alt',
            'transition-colors duration-fast ease-[var(--ease-standard)]',
          )}
          aria-label="Close dialog"
        >
          <CloseIcon />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}


/* ----------------------------------------------------------
   DialogTitle
   ---------------------------------------------------------- */

export interface DialogTitleProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title> {}

/**
 * Required for accessibility — sets the dialog's accessible name.
 * Rendered as a heading in display font.
 */
export function DialogTitle({ className, ...props }: DialogTitleProps) {
  return (
    <DialogPrimitive.Title
      className={cn(
        'font-display font-bold text-lg uppercase tracking-[0.06em] text-void',
        // Leave space for the close button on the right
        'pr-8',
        className,
      )}
      {...props}
    />
  )
}


/* ----------------------------------------------------------
   DialogDescription
   ---------------------------------------------------------- */

export interface DialogDescriptionProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description> {}

/**
 * Optional supporting text below the title.
 * Sets the dialog's accessible description.
 */
export function DialogDescription({ className, ...props }: DialogDescriptionProps) {
  return (
    <DialogPrimitive.Description
      className={cn('text-sm text-smoke leading-relaxed', className)}
      {...props}
    />
  )
}


/* ----------------------------------------------------------
   DialogFooter
   ---------------------------------------------------------- */

export interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Action button row. Renders right-aligned by default.
 * Reverses to column on small screens for touch accessibility.
 */
export function DialogFooter({ className, ...props }: DialogFooterProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-end gap-3',
        'pt-2 border-t border-rule',
        className,
      )}
      {...props}
    />
  )
}


/* ----------------------------------------------------------
   Icon — inline SVG, no external dependency
   ---------------------------------------------------------- */

function CloseIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
    >
      <path d="M2 2l10 10M12 2L2 12" />
    </svg>
  )
}
