import { useState } from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { cn } from '../../lib/cn'

/* ----------------------------------------------------------
   Calendar helpers
   ---------------------------------------------------------- */

const DAY_ABBR = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth()    === b.getMonth()    &&
    a.getDate()     === b.getDate()
  )
}

function isToday(date: Date): boolean {
  return isSameDay(date, new Date())
}

/** Returns a padded 42-cell grid (6 × 7) for the given month. */
function getCalendarGrid(year: number, month: number): Array<Date | null> {
  const first    = new Date(year, month, 1)
  const lastDate = new Date(year, month + 1, 0).getDate()
  const startPad = first.getDay()
  const grid: Array<Date | null> = []

  for (let i = 0; i < startPad; i++) grid.push(null)
  for (let d = 1; d <= lastDate; d++) grid.push(new Date(year, month, d))

  const remainder = grid.length % 7
  if (remainder > 0) {
    for (let i = 0; i < 7 - remainder; i++) grid.push(null)
  }

  return grid
}

function formatDisplay(date: Date): string {
  return new Intl.DateTimeFormat('en-CA', { dateStyle: 'medium' }).format(date)
}

function formatMonthYear(year: number, month: number): string {
  return new Intl.DateTimeFormat('en-CA', {
    month: 'long',
    year:  'numeric',
  }).format(new Date(year, month, 1))
}

/* ----------------------------------------------------------
   Calendar grid (internal)
   ---------------------------------------------------------- */

interface CalendarProps {
  selected?:      Date
  onSelect:       (date: Date) => void
  viewYear:       number
  viewMonth:      number
  onMonthChange:  (year: number, month: number) => void
}

function Calendar({ selected, onSelect, viewYear, viewMonth, onMonthChange }: CalendarProps) {
  const grid = getCalendarGrid(viewYear, viewMonth)

  function prevMonth() {
    viewMonth === 0
      ? onMonthChange(viewYear - 1, 11)
      : onMonthChange(viewYear, viewMonth - 1)
  }

  function nextMonth() {
    viewMonth === 11
      ? onMonthChange(viewYear + 1, 0)
      : onMonthChange(viewYear, viewMonth + 1)
  }

  const navBtn = cn(
    'w-7 h-7 flex items-center justify-center rounded-sm',
    'text-smoke hover:text-void hover:bg-rule',
    'transition-colors duration-fast',
    'outline-none focus-visible:ring-2 focus-visible:ring-signal-alt',
  )

  return (
    <div className="p-3 select-none w-[268px]">
      {/* Month / year nav */}
      <div className="flex items-center justify-between mb-3">
        <button type="button" onClick={prevMonth} aria-label="Previous month" className={navBtn}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 3L5 7l4 4" />
          </svg>
        </button>
        <span className="font-display font-bold text-xs tracking-widest uppercase text-void">
          {formatMonthYear(viewYear, viewMonth)}
        </span>
        <button type="button" onClick={nextMonth} aria-label="Next month" className={navBtn}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 3l4 4-4 4" />
          </svg>
        </button>
      </div>

      {/* Day-of-week headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAY_ABBR.map((d) => (
          <div key={d} className="h-8 flex items-center justify-center text-xs text-smoke font-display font-bold tracking-wider uppercase">
            {d}
          </div>
        ))}
      </div>

      {/* Day buttons */}
      <div className="grid grid-cols-7 gap-y-0.5">
        {grid.map((date, i) => {
          if (!date) return <div key={`pad-${i}`} className="h-8" />

          const isSelected = selected && isSameDay(date, selected)
          const today      = isToday(date)

          return (
            <button
              key={date.toISOString()}
              type="button"
              onClick={() => onSelect(date)}
              aria-label={formatDisplay(date)}
              aria-pressed={isSelected ?? false}
              className={cn(
                'h-8 w-8 mx-auto flex items-center justify-center rounded-sm text-sm',
                'outline-none focus-visible:ring-2 focus-visible:ring-signal-alt',
                'transition-colors duration-fast',
                isSelected
                  ? 'bg-signal-alt text-paper font-medium'
                  : today
                  ? 'border border-signal-alt text-signal-alt font-medium hover:bg-[color-mix(in_srgb,var(--color-signal-alt)_10%,var(--color-paper))]'
                  : 'text-void hover:bg-rule',
              )}
            >
              {date.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ----------------------------------------------------------
   DatePicker
   ---------------------------------------------------------- */

export interface DatePickerProps {
  /** Controlled selected date. */
  value?:           Date
  onValueChange?:   (date: Date) => void
  placeholder?:     string
  disabled?:        boolean
  className?:       string
  id?:              string
}

/**
 * Date input with a calendar popover.
 * Built on Radix Popover — handles portal, focus, outside-click.
 *
 * @example
 * <DatePicker value={date} onValueChange={setDate} placeholder="Select date…" />
 */
export function DatePicker({
  value,
  onValueChange,
  placeholder = 'Select date…',
  disabled    = false,
  className,
  id,
}: DatePickerProps) {
  const today = new Date()
  const [open,       setOpen]       = useState(false)
  const [viewYear,   setViewYear]   = useState(value?.getFullYear() ?? today.getFullYear())
  const [viewMonth,  setViewMonth]  = useState(value?.getMonth()    ?? today.getMonth())

  function handleOpenChange(next: boolean) {
    if (disabled) return
    if (next && value) {
      setViewYear(value.getFullYear())
      setViewMonth(value.getMonth())
    }
    setOpen(next)
  }

  function handleSelect(date: Date) {
    onValueChange?.(date)
    setOpen(false)
  }

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={handleOpenChange}>
      <PopoverPrimitive.Trigger asChild>
        <button
          id={id}
          type="button"
          disabled={disabled}
          aria-haspopup="dialog"
          aria-expanded={open}
          className={cn(
            'flex items-center justify-between w-full gap-2',
            'rounded-sm border border-rule bg-paper',
            'h-9 px-3 text-sm',
            value ? 'text-void' : 'text-smoke',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'outline-none focus-visible:ring-2 focus-visible:ring-signal-alt',
            'hover:border-smoke transition-colors duration-fast',
            open && 'border-signal-alt ring-2 ring-signal-alt',
            className,
          )}
        >
          <span>{value ? formatDisplay(value) : placeholder}</span>
          {/* Calendar icon */}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0 text-smoke">
            <rect x="1.5" y="2.5" width="11" height="10" rx="1" />
            <path d="M1.5 6h11M5 1v3M9 1v3" />
          </svg>
        </button>
      </PopoverPrimitive.Trigger>

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="start"
          sideOffset={4}
          className={cn(
            'z-50 rounded-md border border-rule bg-paper shadow-[var(--shadow-md)]',
            'data-[state=open]:animate-[popover-in_150ms_ease]',
            'data-[state=closed]:animate-[popover-out_100ms_ease]',
            'outline-none',
          )}
        >
          <Calendar
            selected={value}
            onSelect={handleSelect}
            viewYear={viewYear}
            viewMonth={viewMonth}
            onMonthChange={(y, m) => { setViewYear(y); setViewMonth(m) }}
          />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}
