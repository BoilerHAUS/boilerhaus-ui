import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../Button'
import { Badge } from '../Badge'
import { Checkbox } from '../Checkbox'
import { RadioGroup, Radio } from '../RadioGroup'
import { Popover, PopoverTrigger, PopoverContent, PopoverClose } from './Popover'

const meta = {
  title:     'Components/Popover',
  component: PopoverContent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PopoverContent>

export default meta
type Story = StoryObj<typeof meta>


/* ----------------------------------------------------------
   Default
   ---------------------------------------------------------- */

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <p className="text-sm text-void">This is a popover. Use it for contextual actions, filter panels, and inline forms.</p>
      </PopoverContent>
    </Popover>
  ),
}


/* ----------------------------------------------------------
   With header + close button
   ---------------------------------------------------------- */

export const WithHeader: Story = {
  name: 'With Header',
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary">Settings</Button>
      </PopoverTrigger>
      <PopoverContent className="w-72">
        <div className="flex items-center justify-between mb-3">
          <p className="font-display text-xs tracking-widest uppercase text-smoke">
            Display Options
          </p>
          <PopoverClose asChild>
            <button
              type="button"
              aria-label="Close"
              className="text-smoke hover:text-void transition-colors duration-fast outline-none focus-visible:ring-2 focus-visible:ring-signal-alt rounded-sm"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M2 2l10 10M12 2L2 12" />
              </svg>
            </button>
          </PopoverClose>
        </div>
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox id="grid" />
            <span className="text-sm text-void">Grid view</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox id="compact" defaultChecked />
            <span className="text-sm text-void">Compact rows</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox id="totals" defaultChecked />
            <span className="text-sm text-void">Show column totals</span>
          </label>
        </div>
      </PopoverContent>
    </Popover>
  ),
}


/* ----------------------------------------------------------
   Sides
   ---------------------------------------------------------- */

export const Sides: Story = {
  name: 'All Sides',
  render: () => (
    <div className="grid grid-cols-3 gap-6 place-items-center p-12">
      <div />
      <Popover>
        <PopoverTrigger asChild><Button variant="secondary" size="sm">Top</Button></PopoverTrigger>
        <PopoverContent side="top"><p className="text-sm">Top popover</p></PopoverContent>
      </Popover>
      <div />

      <Popover>
        <PopoverTrigger asChild><Button variant="secondary" size="sm">Left</Button></PopoverTrigger>
        <PopoverContent side="left"><p className="text-sm">Left popover</p></PopoverContent>
      </Popover>
      <div />
      <Popover>
        <PopoverTrigger asChild><Button variant="secondary" size="sm">Right</Button></PopoverTrigger>
        <PopoverContent side="right"><p className="text-sm">Right popover</p></PopoverContent>
      </Popover>

      <div />
      <Popover>
        <PopoverTrigger asChild><Button variant="secondary" size="sm">Bottom</Button></PopoverTrigger>
        <PopoverContent side="bottom"><p className="text-sm">Bottom popover</p></PopoverContent>
      </Popover>
      <div />
    </div>
  ),
}


/* ----------------------------------------------------------
   ScopeHouse — Filter panel
   ---------------------------------------------------------- */

export const FilterPanel: Story = {
  name: 'ScopeHouse — CO Filter Panel',
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary">
          Filters
          <Badge variant="active" className="ml-1.5">2</Badge>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72">
        <div className="flex flex-col gap-4">
          <div>
            <p className="font-display text-xs tracking-widest uppercase text-smoke mb-2">Status</p>
            <RadioGroup defaultValue="all" orientation="horizontal">
              <Radio value="all"      label="All" />
              <Radio value="pending"  label="Pending" />
              <Radio value="approved" label="Approved" />
            </RadioGroup>
          </div>
          <div className="border-t border-rule pt-3">
            <p className="font-display text-xs tracking-widest uppercase text-smoke mb-2">Show</p>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox id="f-mine" defaultChecked />
                <span className="text-sm text-void">Assigned to me</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox id="f-urgent" defaultChecked />
                <span className="text-sm text-void">Urgent only</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox id="f-archived" />
                <span className="text-sm text-void">Include archived</span>
              </label>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-1 border-t border-rule">
            <PopoverClose asChild>
              <Button variant="ghost" size="sm">Reset</Button>
            </PopoverClose>
            <PopoverClose asChild>
              <Button size="sm">Apply</Button>
            </PopoverClose>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
}


/* ----------------------------------------------------------
   ScopeHouse — Inline note / annotation
   ---------------------------------------------------------- */

export const InlineNote: Story = {
  name: 'ScopeHouse — Inline Annotation',
  render: () => (
    <div className="flex items-center gap-4">
      <span className="text-sm text-void">Budget: $124,500</span>
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            aria-label="View note"
            className="w-4 h-4 rounded-full bg-signal-alt text-paper text-xs flex items-center justify-center font-bold leading-none outline-none focus-visible:ring-2 focus-visible:ring-signal-alt focus-visible:ring-offset-1"
          >
            i
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-64" side="top">
          <p className="text-sm text-void leading-relaxed">
            Includes approved CO #7 ($8,200) and CO #9 ($3,400). Excludes pending CO #11.
          </p>
        </PopoverContent>
      </Popover>
    </div>
  ),
}
