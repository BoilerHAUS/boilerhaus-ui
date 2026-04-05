/**
 * boilerhaus-ui — public library entry
 *
 * Usage in consuming apps:
 *
 *   CSS (in globals.css / entry CSS):
 *     @import "tailwindcss";
 *     @import "boilerhaus-ui/tokens.css";
 *     @source "../node_modules/boilerhaus-ui/dist";  ← scans components for class names
 *
 *   Components:
 *     import { Button } from 'boilerhaus-ui'
 *
 *   Utilities:
 *     import { cn } from 'boilerhaus-ui'
 */

// Components
export { Button } from './components/Button'
export type { ButtonProps, ButtonVariant } from './components/Button'

export { Badge } from './components/Badge'
export type { BadgeProps, BadgeVariant } from './components/Badge'

export { Label } from './components/Label'
export type { LabelProps } from './components/Label'

export { Input } from './components/Input'
export type { InputProps } from './components/Input'

// Utilities — exported so consumers can use cn() with the same merge logic
export { cn } from './lib/cn'
