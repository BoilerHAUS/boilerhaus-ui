import React from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { cn } from '../../lib/cn'

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl'

export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  /** Image URL. When absent or broken the initials fallback renders. */
  src?: string
  /** Person's name — used for initials fallback and alt text. */
  alt?: string
  /** Visual size. Defaults to 'md'. */
  size?: AvatarSize
}

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Maximum avatars to display before showing an overflow count. Defaults to 4. */
  max?: number
  /** Size forwarded to the overflow badge. Match the size used on child Avatars. Defaults to 'md'. */
  size?: AvatarSize
}

/* ----------------------------------------------------------
   Sizes
   ---------------------------------------------------------- */

const sizeClasses: Record<AvatarSize, string> = {
  sm: 'w-6 h-6 text-[10px]',
  md: 'w-8 h-8 text-xs',
  lg: 'w-10 h-10 text-sm',
  xl: 'w-12 h-12 text-base',
}

/* ----------------------------------------------------------
   Deterministic fallback colour — hash name → one of 6 palettes
   ---------------------------------------------------------- */

const fallbackPalettes = [
  'bg-signal-alt text-paper',
  'bg-[var(--color-growth)] text-paper',
  'bg-[var(--color-caution)] text-paper',
  'bg-signal text-paper',
  'bg-ash text-paper',
  'bg-smoke text-paper',
]

function hashName(name: string): number {
  let h = 0
  for (let i = 0; i < name.length; i++) {
    h = (h * 31 + name.charCodeAt(i)) >>> 0
  }
  return h
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

/* ----------------------------------------------------------
   Avatar
   ---------------------------------------------------------- */

/**
 * Circular user avatar — shows an image when available, falls back to
 * coloured initials derived from `alt`.
 *
 * @example
 * <Avatar src="/avatars/jlee.jpg" alt="Jordan Lee" />
 * <Avatar alt="Jordan Lee" />          // initials fallback
 * <Avatar alt="Jordan Lee" size="lg" />
 */
export function Avatar({
  src,
  alt = '',
  size = 'md',
  className,
  ...props
}: AvatarProps) {
  const initials = getInitials(alt)
  const palette  = fallbackPalettes[hashName(alt) % fallbackPalettes.length]

  return (
    <AvatarPrimitive.Root
      className={cn(
        'relative inline-flex items-center justify-center rounded-full overflow-hidden shrink-0 select-none',
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {src && (
        <AvatarPrimitive.Image
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />
      )}
      <AvatarPrimitive.Fallback
        className={cn(
          'flex items-center justify-center w-full h-full font-display font-bold leading-none',
          palette,
        )}
        delayMs={src ? 300 : 0}
      >
        {initials}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  )
}

/* ----------------------------------------------------------
   AvatarGroup
   ---------------------------------------------------------- */

/**
 * Stacks multiple Avatars with overlap rings. Shows a "+N" overflow badge
 * when children exceed `max`.
 *
 * @example
 * <AvatarGroup max={3}>
 *   <Avatar alt="Alex Kovacs" />
 *   <Avatar alt="Jordan Lee" />
 *   <Avatar alt="Maria da Silva" />
 *   <Avatar alt="Sam Chen" />   // → "+1" badge
 * </AvatarGroup>
 */
export function AvatarGroup({
  children,
  max = 4,
  size = 'md',
  className,
  ...props
}: AvatarGroupProps) {
  const all      = React.Children.toArray(children)
  const visible  = all.slice(0, max)
  const overflow = all.length - max

  return (
    <div className={cn('flex items-center', className)} {...props}>
      {visible.map((child, i) => (
        <div
          key={i}
          className={cn(
            'ring-2 ring-paper rounded-full',
            i > 0 && '-ml-2',
          )}
        >
          {child}
        </div>
      ))}

      {overflow > 0 && (
        <div
          aria-label={`${overflow} more team members`}
          className={cn(
            '-ml-2 ring-2 ring-paper rounded-full flex items-center justify-center',
            'bg-rule text-smoke font-display font-bold shrink-0',
            sizeClasses[size],
          )}
        >
          +{overflow}
        </div>
      )}
    </div>
  )
}
