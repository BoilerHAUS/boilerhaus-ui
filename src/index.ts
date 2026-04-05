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

// Utilities — exported so consumers can use cn() with the same merge logic
export { cn } from './lib/cn'
