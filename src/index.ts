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

export { Card, CardHeader, CardBody, CardFooter } from './components/Card'
export type { CardProps, CardHeaderProps, CardBodyProps, CardFooterProps } from './components/Card'

export { Select, SelectItem } from './components/Select'
export type { SelectProps, SelectItemProps } from './components/Select'

export {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from './components/Dialog'
export type {
  DialogContentProps,
  DialogTitleProps,
  DialogDescriptionProps,
  DialogFooterProps,
} from './components/Dialog'

export {
  PageShell,
  PageShellTopbar,
  PageShellBody,
  PageShellSidebar,
  PageShellContent,
  PageShellNavItem,
} from './components/PageShell'
export type {
  PageShellProps,
  PageShellTopbarProps,
  PageShellBodyProps,
  PageShellSidebarProps,
  PageShellContentProps,
  PageShellNavItemProps,
} from './components/PageShell'

export { Table, TableHeader, TableBody, TableFoot, TableRow, TableHead, TableCell } from './components/Table'
export type {
  TableProps,
  TableHeaderProps,
  TableBodyProps,
  TableFootProps,
  TableRowProps,
  TableHeadProps,
  TableCellProps,
} from './components/Table'

// Utilities — exported so consumers can use cn() with the same merge logic
export { cn } from './lib/cn'
