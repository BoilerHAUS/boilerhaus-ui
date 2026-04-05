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

export { Textarea } from './components/Textarea'
export type { TextareaProps } from './components/Textarea'

export { Checkbox } from './components/Checkbox'
export type { CheckboxProps } from './components/Checkbox'

export { Switch } from './components/Switch'
export type { SwitchProps } from './components/Switch'

export { Alert } from './components/Alert'
export type { AlertProps, AlertVariant } from './components/Alert'

export { Toaster, toast, useToastStore } from './components/Toast'
export type { ToasterProps, ToastItem, ToastVariant, ToastOptions } from './components/Toast'

export { Tabs, TabsList, TabsTrigger, TabsContent } from './components/Tabs'
export type { TabsListProps, TabsTriggerProps } from './components/Tabs'

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from './components/DropdownMenu'
export type {
  DropdownMenuContentProps,
  DropdownMenuItemProps,
  DropdownMenuCheckboxItemProps,
  DropdownMenuRadioItemProps,
  DropdownMenuLabelProps,
  DropdownMenuSeparatorProps,
  DropdownMenuSubTriggerProps,
  DropdownMenuSubContentProps,
} from './components/DropdownMenu'

export { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from './components/Tooltip'
export type { TooltipProviderProps, TooltipContentProps } from './components/Tooltip'

export { Spinner } from './components/Spinner'
export type { SpinnerProps, SpinnerSize } from './components/Spinner'

export { Skeleton } from './components/Skeleton'
export type { SkeletonProps } from './components/Skeleton'

export { Progress } from './components/Progress'
export type { ProgressProps, ProgressSize, ProgressVariant } from './components/Progress'

export { Stat } from './components/Stat'
export type { StatProps, StatDeltaDirection } from './components/Stat'

// Utilities — exported so consumers can use cn() with the same merge logic
export { cn } from './lib/cn'
