import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../Button'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from './Tooltip'

const meta = {
  title:     'Components/Tooltip',
  component: TooltipContent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story: React.ComponentType) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
} satisfies Meta<typeof TooltipContent>

export default meta
type Story = StoryObj<typeof meta>


/* ----------------------------------------------------------
   Default (top)
   ---------------------------------------------------------- */

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button>Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>Tooltip label</TooltipContent>
    </Tooltip>
  ),
}


/* ----------------------------------------------------------
   Sides
   ---------------------------------------------------------- */

export const Sides: Story = {
  name: 'All Sides',
  render: () => (
    <div className="grid grid-cols-3 gap-6 place-items-center p-12">
      {/* Top */}
      <div />
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="secondary">Top</Button>
        </TooltipTrigger>
        <TooltipContent side="top">Top tooltip</TooltipContent>
      </Tooltip>
      <div />

      {/* Left + Right */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="secondary">Left</Button>
        </TooltipTrigger>
        <TooltipContent side="left">Left tooltip</TooltipContent>
      </Tooltip>
      <div />
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="secondary">Right</Button>
        </TooltipTrigger>
        <TooltipContent side="right">Right tooltip</TooltipContent>
      </Tooltip>

      {/* Bottom */}
      <div />
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="secondary">Bottom</Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Bottom tooltip</TooltipContent>
      </Tooltip>
      <div />
    </div>
  ),
}


/* ----------------------------------------------------------
   ScopeHouse — Icon-only action buttons
   ---------------------------------------------------------- */

function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 3.5h10M5.5 3.5V2.5a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1M5.5 6v4.5M8.5 6v4.5M3 3.5l.7 7a1 1 0 0 0 1 .9h4.6a1 1 0 0 0 1-.9l.7-7" />
    </svg>
  )
}

function EditIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9.5 2.5l2 2-7 7H2.5v-2l7-7zM8.5 3.5l2 2" />
    </svg>
  )
}

function DuplicateIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="4" width="8" height="8" rx="1" />
      <path d="M2 10V2h8" />
    </svg>
  )
}

function IconButton({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          aria-label={label}
          className="w-8 h-8 flex items-center justify-center rounded-sm border border-rule text-smoke hover:text-void hover:bg-[color-mix(in_srgb,var(--color-rule)_50%,var(--color-paper))] transition-colors duration-fast outline-none focus-visible:ring-2 focus-visible:ring-signal-alt"
        >
          {children}
        </button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  )
}

export const IconButtons: Story = {
  name: 'ScopeHouse — Icon-only Row Actions',
  render: () => (
    <div className="flex items-center gap-1">
      <IconButton label="Edit scope item"><EditIcon /></IconButton>
      <IconButton label="Duplicate"><DuplicateIcon /></IconButton>
      <IconButton label="Delete"><TrashIcon /></IconButton>
    </div>
  ),
}


/* ----------------------------------------------------------
   Long text wraps
   ---------------------------------------------------------- */

export const LongText: Story = {
  name: 'Long Text (wraps)',
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="secondary">Budget %</Button>
      </TooltipTrigger>
      <TooltipContent>
        Percentage of approved budget committed to date, including all approved change orders
      </TooltipContent>
    </Tooltip>
  ),
}
