import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../Button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from './DropdownMenu'

const meta = {
  title:     'Components/DropdownMenu',
  component: DropdownMenuContent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DropdownMenuContent>

export default meta
type Story = StoryObj<typeof meta>

/* ----------------------------------------------------------
   Trigger helper
   ---------------------------------------------------------- */

function DotsButton() {
  return (
    <button
      type="button"
      className="w-8 h-8 flex items-center justify-center rounded-sm border border-rule text-smoke hover:text-void hover:bg-[color-mix(in_srgb,var(--color-rule)_50%,var(--color-paper))] transition-colors duration-fast outline-none focus-visible:ring-2 focus-visible:ring-signal-alt"
      aria-label="Row actions"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
        <circle cx="7" cy="2.5" r="1.25" />
        <circle cx="7" cy="7"   r="1.25" />
        <circle cx="7" cy="11.5" r="1.25" />
      </svg>
    </button>
  )
}


/* ----------------------------------------------------------
   Default
   ---------------------------------------------------------- */

export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <DotsButton />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Duplicate</DropdownMenuItem>
        <DropdownMenuItem>View details</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}


/* ----------------------------------------------------------
   With separator + destructive
   ---------------------------------------------------------- */

export const WithDestructive: Story = {
  name: 'With Separator + Destructive',
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <DotsButton />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Duplicate</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem destructive>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}


/* ----------------------------------------------------------
   With label + sections
   ---------------------------------------------------------- */

export const WithLabel: Story = {
  name: 'With Label Sections',
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Actions</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Change Order</DropdownMenuLabel>
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Duplicate</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Status</DropdownMenuLabel>
        <DropdownMenuItem>Mark approved</DropdownMenuItem>
        <DropdownMenuItem>Send for review</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem destructive>Void CO</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}


/* ----------------------------------------------------------
   Checkbox items
   ---------------------------------------------------------- */

export const CheckboxItems: Story = {
  name: 'Checkbox Items',
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Columns</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Visible Columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked>Scope Item</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked>Trade</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked>Amount</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>Unit Price</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>Qty</DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}


/* ----------------------------------------------------------
   Radio items
   ---------------------------------------------------------- */

export const RadioItems: Story = {
  name: 'Radio Items',
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Sort by</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Sort by</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value="amount">
          <DropdownMenuRadioItem value="name">Scope Item</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="trade">Trade</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="amount">Amount</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="date">Date Added</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}


/* ----------------------------------------------------------
   Sub-menu
   ---------------------------------------------------------- */

export const SubMenu: Story = {
  name: 'With Sub-menu',
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <DotsButton />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Change status</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>Draft</DropdownMenuItem>
            <DropdownMenuItem>Pending review</DropdownMenuItem>
            <DropdownMenuItem>Approved</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem destructive>Void</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem destructive>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}


/* ----------------------------------------------------------
   ScopeHouse — Change order row actions
   ---------------------------------------------------------- */

export const ScopeHouseCORowActions: Story = {
  name: 'ScopeHouse — CO Row Actions',
  render: () => (
    <div className="flex items-center gap-4">
      <span className="font-mono text-xs text-smoke">CO-004</span>
      <span className="text-sm text-void flex-1">Electrical panel upgrade</span>
      <span className="text-sm tabular-nums text-void">+$3,200.00</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <DotsButton />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Edit CO</DropdownMenuItem>
          <DropdownMenuItem>View history</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Change status</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Approve</DropdownMenuItem>
              <DropdownMenuItem>Send for review</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem destructive>Reject</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem destructive>Void CO</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ),
}
