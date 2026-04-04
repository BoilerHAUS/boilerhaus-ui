import { Slot } from '@radix-ui/react-slot'
import { cn } from '../../lib/cn'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual treatment of the button. Defaults to 'primary'. */
  variant?: ButtonVariant
  /**
   * Render as a child element instead of <button>.
   * Useful for routing links: <Button asChild><a href="/path">Go</a></Button>
   */
  asChild?: boolean
}

const base = [
  // Layout
  'inline-flex items-center justify-center gap-2 whitespace-nowrap',
  // Typography — Barlow Condensed, tracked uppercase
  'font-display font-bold text-sm tracking-[0.08em] uppercase leading-none',
  // Geometry
  'px-6 py-2 rounded-md border border-solid',
  // Interaction
  'cursor-pointer select-none no-underline',
  // Motion — fast, no bounce
  'transition-all duration-fast ease-[var(--ease-standard)]',
  // Focus — always visible, signal-alt blue ring
  'outline-none focus-visible:ring-[3px] focus-visible:ring-signal-alt focus-visible:ring-offset-0',
  // Disabled
  'disabled:opacity-[0.38] disabled:cursor-not-allowed disabled:pointer-events-none',
  // Active
  'active:translate-y-px',
].join(' ')

const variants: Record<ButtonVariant, string> = {
  /**
   * Signal red fill — the dominant CTA.
   * Use once per view. Hover darkens via color-mix.
   */
  primary: cn(
    'bg-signal text-paper border-signal',
    'hover:bg-[color-mix(in_srgb,var(--color-signal)_82%,var(--color-void))]',
    'hover:border-[color-mix(in_srgb,var(--color-signal)_82%,var(--color-void))]',
  ),

  /**
   * Paper fill, rule border — supporting or alternate action.
   */
  secondary: cn(
    'bg-paper text-void border-rule',
    'hover:bg-[color-mix(in_srgb,var(--color-paper)_88%,var(--color-void))]',
    'hover:border-smoke',
  ),

  /**
   * Transparent — tertiary or inline action. Low visual weight.
   */
  ghost: cn(
    'bg-transparent text-void border-transparent',
    'hover:bg-[color-mix(in_srgb,var(--color-rule)_40%,transparent)]',
    'hover:border-rule',
  ),

  /**
   * Paper fill, signal red text + border — danger confirmation.
   * Inverts to filled red on hover to raise urgency before confirm.
   * Uses red focus ring, not blue.
   */
  destructive: cn(
    'bg-paper text-signal border-signal',
    'hover:bg-signal hover:text-paper hover:border-signal',
    'focus-visible:ring-[color-mix(in_srgb,var(--color-signal)_50%,transparent)]',
  ),
}

/**
 * The foundational interactive element.
 * All styles are derived from Bauhaus design tokens.
 *
 * @example
 * <Button variant="primary">Submit</Button>
 * <Button variant="destructive" asChild><a href="/delete">Delete</a></Button>
 */
export function Button({
  variant = 'primary',
  asChild = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp className={cn(base, variants[variant], className)} {...props}>
      {children}
    </Comp>
  )
}
