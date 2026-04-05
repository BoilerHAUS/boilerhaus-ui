import * as AspectRatioPrimitive from '@radix-ui/react-aspect-ratio'
import { cn } from '../../lib/cn'

export interface AspectRatioProps
  extends React.ComponentPropsWithoutRef<typeof AspectRatioPrimitive.Root> {
  /**
   * Width-to-height ratio. Defaults to 16/9.
   * Pass a number: `ratio={4/3}`, `ratio={1}`, `ratio={16/9}`.
   */
  ratio?: number
}

/**
 * Constrains children to a fixed aspect ratio box.
 * Children should fill the box with `w-full h-full`; use `object-cover` on `<img>`.
 * Overlay content can be positioned absolutely inside.
 *
 * @example
 * <AspectRatio ratio={16 / 9}>
 *   <img src={src} alt={alt} className="w-full h-full object-cover" />
 * </AspectRatio>
 *
 * <AspectRatio ratio={1} className="rounded-md overflow-hidden">
 *   <Skeleton className="w-full h-full" />
 * </AspectRatio>
 */
export function AspectRatio({
  ratio = 16 / 9,
  className,
  ...props
}: AspectRatioProps) {
  return (
    <AspectRatioPrimitive.Root
      ratio={ratio}
      className={cn('relative', className)}
      {...props}
    />
  )
}
