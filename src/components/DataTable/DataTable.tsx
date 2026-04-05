import React, { useState, useMemo, useCallback } from 'react'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../Table'
import { cn } from '../../lib/cn'

/* ----------------------------------------------------------
   Types
   ---------------------------------------------------------- */

export interface DataTableColumn<T> {
  /** Column identifier — also the default sort key via `(row as any)[key]`. */
  key:            string
  header:         string
  /** Custom cell renderer. If omitted, renders `(row as any)[key]` as a string. */
  cell?:          (row: T) => React.ReactNode
  sortable?:      boolean
  headerClassName?: string
  cellClassName?:   string
}

export interface DataTableProps<T> {
  columns:            DataTableColumn<T>[]
  data:               T[]
  /** Returns a stable unique string key for each row. */
  rowKey:             (row: T) => string
  /** Enables pagination; omit to show all rows. */
  pageSize?:          number
  /** Renders a search input above the table. */
  searchable?:        boolean
  searchPlaceholder?: string
  emptyMessage?:      string
  /** Called when a row is clicked. */
  onRowClick?:        (row: T) => void
  className?:         string
}

type SortDir = 'asc' | 'desc'

/* ----------------------------------------------------------
   Sort icons
   ---------------------------------------------------------- */

function SortIcon({ dir }: { dir?: SortDir }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0 ml-1">
      {(!dir || dir === 'asc') && <path d={!dir ? 'M6 2v8M3 5l3-3 3 3' : 'M3 5l3-3 3 3'} className={!dir ? 'opacity-30' : ''} />}
      {(!dir || dir === 'desc') && <path d={!dir ? 'M6 2v8M3 9l3 3 3-3' : 'M3 9l3 3 3-3'} className={!dir ? 'opacity-30' : ''} />}
    </svg>
  )
}

/* ----------------------------------------------------------
   DataTable
   ---------------------------------------------------------- */

/**
 * Full-featured data table with optional column sorting, search, and pagination.
 * Wraps the base `Table` component and manages all UI state internally.
 *
 * @example
 * <DataTable columns={cols} data={rows} rowKey={(r) => r.id} pageSize={10} searchable />
 */
export function DataTable<T>({
  columns,
  data,
  rowKey,
  pageSize,
  searchable        = false,
  searchPlaceholder = 'Search…',
  emptyMessage      = 'No results found.',
  onRowClick,
  className,
}: DataTableProps<T>) {
  const [sortCol,  setSortCol]  = useState<string | null>(null)
  const [sortDir,  setSortDir]  = useState<SortDir>('asc')
  const [page,     setPage]     = useState(1)
  const [search,   setSearch]   = useState('')

  const handleSort = useCallback((key: string) => {
    if (sortCol === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortCol(key)
      setSortDir('asc')
    }
    setPage(1)
  }, [sortCol])

  const handleSearch = useCallback((q: string) => {
    setSearch(q)
    setPage(1)
  }, [])

  /* --- Filter --- */
  const filtered = useMemo(() => {
    if (!search.trim()) return data
    const q = search.toLowerCase()
    return data.filter((row) =>
      Object.values(row as Record<string, unknown>).some((v) =>
        String(v ?? '').toLowerCase().includes(q),
      ),
    )
  }, [data, search])

  /* --- Sort --- */
  const sorted = useMemo(() => {
    if (!sortCol) return filtered
    return [...filtered].sort((a, b) => {
      const av = (a as Record<string, unknown>)[sortCol]
      const bv = (b as Record<string, unknown>)[sortCol]
      let cmp = 0
      if (typeof av === 'number' && typeof bv === 'number') {
        cmp = av - bv
      } else {
        cmp = String(av ?? '').localeCompare(String(bv ?? ''))
      }
      return sortDir === 'asc' ? cmp : -cmp
    })
  }, [filtered, sortCol, sortDir])

  /* --- Paginate --- */
  const totalPages = pageSize ? Math.max(1, Math.ceil(sorted.length / pageSize)) : 1
  const safePage   = Math.min(page, totalPages)
  const paged      = pageSize
    ? sorted.slice((safePage - 1) * pageSize, safePage * pageSize)
    : sorted

  const start = pageSize ? (safePage - 1) * pageSize + 1 : 1
  const end   = pageSize ? Math.min(safePage * pageSize, sorted.length) : sorted.length

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {/* Search bar */}
      {searchable && (
        <div className="flex items-center gap-2 text-smoke">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="6" cy="6" r="4" />
            <path d="M12 12l-2.5-2.5" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder={searchPlaceholder}
            className={cn(
              'flex-1 h-9 px-0 text-sm text-void bg-transparent border-b border-rule',
              'outline-none focus:border-signal-alt placeholder:text-smoke',
              'transition-colors duration-fast',
            )}
          />
          {search && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => handleSearch('')}
              className="text-smoke hover:text-void transition-colors duration-fast outline-none focus-visible:ring-2 focus-visible:ring-signal-alt rounded-sm"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                <path d="M2 2l8 8M10 2l-8 8" />
              </svg>
            </button>
          )}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto rounded-md border border-rule">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead
                  key={col.key}
                  className={cn(
                    col.sortable && 'cursor-pointer select-none hover:text-void transition-colors duration-fast',
                    col.headerClassName,
                  )}
                  onClick={col.sortable ? () => handleSort(col.key) : undefined}
                  aria-sort={
                    sortCol === col.key
                      ? sortDir === 'asc' ? 'ascending' : 'descending'
                      : col.sortable ? 'none' : undefined
                  }
                >
                  <span className="inline-flex items-center">
                    {col.header}
                    {col.sortable && (
                      <SortIcon dir={sortCol === col.key ? sortDir : undefined} />
                    )}
                  </span>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {paged.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="py-10 text-center text-sm text-smoke"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              paged.map((row) => (
                <TableRow
                  key={rowKey(row)}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                  className={onRowClick ? 'cursor-pointer hover:bg-[color-mix(in_srgb,var(--color-rule)_40%,var(--color-paper))]' : undefined}
                >
                  {columns.map((col) => (
                    <TableCell key={col.key} className={col.cellClassName}>
                      {col.cell
                        ? col.cell(row)
                        : String((row as Record<string, unknown>)[col.key] ?? '')}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination footer */}
      {pageSize && sorted.length > 0 && (
        <div className="flex items-center justify-between text-sm text-smoke px-1">
          <span className="tabular-nums">
            {start}–{end} of {sorted.length}
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={safePage <= 1}
              onClick={() => setPage((p) => p - 1)}
              aria-label="Previous page"
              className={cn(
                'w-8 h-8 flex items-center justify-center rounded-sm border border-rule',
                'hover:border-smoke hover:text-void transition-colors duration-fast',
                'outline-none focus-visible:ring-2 focus-visible:ring-signal-alt',
                'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-rule disabled:hover:text-smoke',
              )}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M8 2L4 6l4 4" />
              </svg>
            </button>
            <span className="px-2 tabular-nums text-void">
              {safePage} / {totalPages}
            </span>
            <button
              type="button"
              disabled={safePage >= totalPages}
              onClick={() => setPage((p) => p + 1)}
              aria-label="Next page"
              className={cn(
                'w-8 h-8 flex items-center justify-center rounded-sm border border-rule',
                'hover:border-smoke hover:text-void transition-colors duration-fast',
                'outline-none focus-visible:ring-2 focus-visible:ring-signal-alt',
                'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-rule disabled:hover:text-smoke',
              )}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 2l4 4-4 4" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
