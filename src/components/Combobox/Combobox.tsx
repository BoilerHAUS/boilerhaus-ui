import React, { useState, useRef, useId, useMemo, useCallback, useEffect } from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { cn } from '../../lib/cn'

export interface ComboboxOption {
  value:        string
  label:        string
  description?: string
  disabled?:    boolean
}

export interface ComboboxProps {
  options:           ComboboxOption[]
  /** Controlled selected value. */
  value?:            string
  onValueChange?:    (value: string) => void
  placeholder?:      string
  searchPlaceholder?: string
  emptyMessage?:     string
  disabled?:         boolean
  className?:        string
  id?:               string
}

/* ----------------------------------------------------------
   Icons
   ---------------------------------------------------------- */

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M3 5l4 4 4-4" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 7l3.5 3.5L12 3" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="6" cy="6" r="4" />
      <path d="M12 12l-2.5-2.5" />
    </svg>
  )
}

/* ----------------------------------------------------------
   Combobox
   ---------------------------------------------------------- */

/**
 * Searchable select — a text input that filters a dropdown list.
 * Built on Radix Popover with a custom listbox for full token compliance.
 * Keyboard: ArrowDown/Up navigate, Enter selects, Escape closes.
 *
 * @example
 * <Combobox options={trades} placeholder="Select trade…" onValueChange={setTrade} />
 */
export function Combobox({
  options,
  value,
  onValueChange,
  placeholder       = 'Select…',
  searchPlaceholder = 'Search…',
  emptyMessage      = 'No results found.',
  disabled          = false,
  className,
  id,
}: ComboboxProps) {
  const [open,            setOpen]            = useState(false)
  const [search,          setSearch]          = useState('')
  const [highlightedIndex, setHighlightedIndex] = useState(0)

  const inputRef    = useRef<HTMLInputElement>(null)
  const listRef     = useRef<HTMLUListElement>(null)
  const genId       = useId()
  const listboxId   = `${id ?? genId}-listbox`

  // Derive label for the currently selected value
  const selectedLabel = useMemo(
    () => options.find((o) => o.value === value)?.label ?? '',
    [options, value],
  )

  // Filter options by search text
  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return q
      ? options.filter(
          (o) => o.label.toLowerCase().includes(q) || o.description?.toLowerCase().includes(q),
        )
      : options
  }, [options, search])

  // Reset highlight when filtered list changes
  useEffect(() => {
    setHighlightedIndex(0)
  }, [filtered.length])

  // Scroll highlighted item into view
  useEffect(() => {
    if (!open) return
    const item = listRef.current?.children[highlightedIndex] as HTMLElement | undefined
    item?.scrollIntoView({ block: 'nearest' })
  }, [highlightedIndex, open])

  const selectOption = useCallback((option: ComboboxOption) => {
    if (option.disabled) return
    onValueChange?.(option.value)
    setSearch('')
    setOpen(false)
  }, [onValueChange])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!open) {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        setOpen(true)
      }
      return
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setHighlightedIndex((i) => Math.min(i + 1, filtered.length - 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        setHighlightedIndex((i) => Math.max(i - 1, 0))
        break
      case 'Enter':
        e.preventDefault()
        if (filtered[highlightedIndex] && !filtered[highlightedIndex].disabled) {
          selectOption(filtered[highlightedIndex])
        }
        break
      case 'Escape':
        e.preventDefault()
        setSearch('')
        setOpen(false)
        break
    }
  }, [open, filtered, highlightedIndex, selectOption])

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={(next) => {
      if (disabled) return
      setOpen(next)
      if (!next) setSearch('')
    }}>
      {/* Trigger — the input button */}
      <PopoverPrimitive.Trigger asChild>
        <button
          id={id}
          type="button"
          role="combobox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-haspopup="listbox"
          disabled={disabled}
          onKeyDown={handleKeyDown}
          className={cn(
            // Layout
            'flex items-center justify-between w-full gap-2',
            // Shape
            'rounded-sm border border-rule bg-paper',
            // Spacing
            'h-9 px-3',
            // Typography
            'text-sm text-void',
            // Disabled
            'disabled:cursor-not-allowed disabled:opacity-50',
            // Focus
            'outline-none focus-visible:ring-2 focus-visible:ring-signal-alt focus-visible:ring-offset-0',
            // Hover
            'hover:border-smoke transition-colors duration-fast',
            // Open state border
            open && 'border-signal-alt ring-2 ring-signal-alt',
            className,
          )}
        >
          <span className={cn('truncate', !selectedLabel && 'text-smoke')}>
            {selectedLabel || placeholder}
          </span>
          <ChevronDownIcon className={cn('shrink-0 text-smoke transition-transform duration-fast', open && 'rotate-180')} />
        </button>
      </PopoverPrimitive.Trigger>

      {/* Dropdown panel */}
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="start"
          sideOffset={4}
          style={{ width: 'var(--radix-popover-trigger-width)' }}
          onOpenAutoFocus={(e) => {
            e.preventDefault()
            inputRef.current?.focus()
          }}
          className={cn(
            'z-50 rounded-md border border-rule bg-paper shadow-[var(--shadow-md)] overflow-hidden',
            'data-[state=open]:animate-[popover-in_150ms_ease]',
            'data-[state=closed]:animate-[popover-out_100ms_ease]',
            'outline-none',
          )}
        >
          {/* Search input */}
          <div className="flex items-center gap-2 px-3 py-2 border-b border-rule text-smoke">
            <SearchIcon />
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={searchPlaceholder}
              aria-controls={listboxId}
              className="flex-1 text-sm text-void bg-transparent outline-none placeholder:text-smoke"
            />
            {search && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => setSearch('')}
                className="text-smoke hover:text-void transition-colors duration-fast"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                  <path d="M2 2l8 8M10 2l-8 8" />
                </svg>
              </button>
            )}
          </div>

          {/* Option list */}
          <ul
            id={listboxId}
            ref={listRef}
            role="listbox"
            aria-label="Options"
            className="max-h-60 overflow-y-auto py-1"
          >
            {filtered.length === 0 ? (
              <li className="px-3 py-6 text-sm text-smoke text-center">{emptyMessage}</li>
            ) : (
              filtered.map((option, i) => {
                const isSelected    = option.value === value
                const isHighlighted = i === highlightedIndex
                return (
                  <li
                    key={option.value}
                    role="option"
                    aria-selected={isSelected}
                    aria-disabled={option.disabled}
                    onMouseEnter={() => setHighlightedIndex(i)}
                    onClick={() => selectOption(option)}
                    className={cn(
                      'flex items-center gap-2 px-3 py-2 cursor-pointer select-none',
                      // Highlight on hover/keyboard nav
                      isHighlighted && !option.disabled && 'bg-[color-mix(in_srgb,var(--color-signal-alt)_8%,var(--color-paper))]',
                      // Disabled
                      option.disabled && 'cursor-not-allowed opacity-40',
                    )}
                  >
                    {/* Check mark column (always occupies space to prevent label shift) */}
                    <span className={cn('w-4 shrink-0 text-signal-alt', !isSelected && 'invisible')}>
                      <CheckIcon />
                    </span>

                    <span className="flex flex-col min-w-0">
                      <span className={cn('text-sm truncate', isSelected ? 'text-void font-medium' : 'text-void')}>
                        {option.label}
                      </span>
                      {option.description && (
                        <span className="text-xs text-smoke truncate">{option.description}</span>
                      )}
                    </span>
                  </li>
                )
              })
            )}
          </ul>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}
