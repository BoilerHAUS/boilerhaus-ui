import { cn } from '../../lib/cn'

/* ----------------------------------------------------------
   Table
   ---------------------------------------------------------- */

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {}

/**
 * Semantic data table. Use with TableHeader, TableBody, TableFoot,
 * TableRow, TableHead, and TableCell.
 *
 * @example
 * <Table>
 *   <TableHeader>
 *     <TableRow>
 *       <TableHead>Description</TableHead>
 *       <TableHead numeric>Amount</TableHead>
 *     </TableRow>
 *   </TableHeader>
 *   <TableBody>
 *     <TableRow>
 *       <TableCell>Framing</TableCell>
 *       <TableCell numeric>$8,500</TableCell>
 *     </TableRow>
 *   </TableBody>
 *   <TableFoot>
 *     <TableRow>
 *       <TableCell>Total</TableCell>
 *       <TableCell numeric>$8,500</TableCell>
 *     </TableRow>
 *   </TableFoot>
 * </Table>
 */
export function Table({ className, children, ...props }: TableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <table
        className={cn(
          'w-full border-collapse text-sm',
          className,
        )}
        {...props}
      >
        {children}
      </table>
    </div>
  )
}


/* ----------------------------------------------------------
   TableHeader
   ---------------------------------------------------------- */

export interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

/** Wraps heading rows in a <thead>. */
export function TableHeader({ className, children, ...props }: TableHeaderProps) {
  return (
    <thead className={cn('border-b border-rule', className)} {...props}>
      {children}
    </thead>
  )
}


/* ----------------------------------------------------------
   TableBody
   ---------------------------------------------------------- */

export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

/** Wraps data rows in a <tbody>. */
export function TableBody({ className, children, ...props }: TableBodyProps) {
  return (
    <tbody className={cn(className)} {...props}>
      {children}
    </tbody>
  )
}


/* ----------------------------------------------------------
   TableFoot
   ---------------------------------------------------------- */

export interface TableFootProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

/**
 * Optional totals/summary row section.
 * Bold typography to distinguish from body rows.
 */
export function TableFoot({ className, children, ...props }: TableFootProps) {
  return (
    <tfoot
      className={cn(
        'border-t-2 border-void',
        'font-bold text-void',
        className,
      )}
      {...props}
    >
      {children}
    </tfoot>
  )
}


/* ----------------------------------------------------------
   TableRow
   ---------------------------------------------------------- */

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {}

/** A <tr> with a bottom border and hover highlight. */
export function TableRow({ className, children, ...props }: TableRowProps) {
  return (
    <tr
      className={cn(
        'border-b border-rule last:border-b-0',
        'transition-colors duration-fast ease-[var(--ease-standard)]',
        // Hover — only on tbody rows (tfoot rows don't need it)
        '[tbody_&]:hover:bg-[color-mix(in_srgb,var(--color-rule)_30%,var(--color-paper))]',
        className,
      )}
      {...props}
    >
      {children}
    </tr>
  )
}


/* ----------------------------------------------------------
   TableHead
   ---------------------------------------------------------- */

export interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  /**
   * Right-aligns the column — use for numeric data (amounts, quantities).
   */
  numeric?: boolean
}

/**
 * Column header cell (<th>).
 * Typography: display font, uppercase, extra-small.
 */
export function TableHead({
  numeric,
  className,
  children,
  ...props
}: TableHeadProps) {
  return (
    <th
      scope="col"
      className={cn(
        // Typography — Barlow Condensed, small, tracked uppercase
        'font-display font-bold text-xs uppercase tracking-[0.10em]',
        // Color
        'text-smoke',
        // Spacing
        'px-4 py-3',
        // Alignment
        numeric ? 'text-right' : 'text-left',
        className,
      )}
      {...props}
    >
      {children}
    </th>
  )
}


/* ----------------------------------------------------------
   TableCell
   ---------------------------------------------------------- */

export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  /**
   * Right-aligns the cell — use for numeric data (amounts, quantities).
   * Should match the numeric prop on the corresponding TableHead.
   */
  numeric?: boolean
  /**
   * Renders the cell in secondary/muted text color.
   * Useful for supporting information (dates, trade names, units).
   */
  muted?: boolean
}

/** Data cell (<td>). */
export function TableCell({
  numeric,
  muted,
  className,
  children,
  ...props
}: TableCellProps) {
  return (
    <td
      className={cn(
        // Typography
        'font-body text-sm',
        // Color
        muted ? 'text-smoke' : 'text-void',
        // Spacing
        'px-4 py-3',
        // Alignment
        numeric ? 'text-right tabular-nums' : 'text-left',
        className,
      )}
      {...props}
    >
      {children}
    </td>
  )
}
