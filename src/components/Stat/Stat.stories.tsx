import type { Meta, StoryObj } from '@storybook/react-vite'
import { Stat } from './Stat'

const meta = {
  title:     'Components/Stat',
  component: Stat,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    value: '$124,500',
    label: 'Total Committed',
  },
} satisfies Meta<typeof Stat>

export default meta
type Story = StoryObj<typeof meta>


/* ----------------------------------------------------------
   Default
   ---------------------------------------------------------- */

export const Default: Story = {}


/* ----------------------------------------------------------
   With delta — up
   ---------------------------------------------------------- */

export const DeltaUp: Story = {
  name: 'Delta — Up',
  args: {
    value:          '$124,500',
    label:          'Total Committed',
    delta:          '+$8,200',
    deltaDirection: 'up',
    caption:        'vs. last month',
  },
}


/* ----------------------------------------------------------
   With delta — down
   ---------------------------------------------------------- */

export const DeltaDown: Story = {
  name: 'Delta — Down',
  args: {
    value:          '62%',
    label:          'Budget Used',
    delta:          '-4%',
    deltaDirection: 'down',
    caption:        'from prior period',
  },
}


/* ----------------------------------------------------------
   With delta — neutral
   ---------------------------------------------------------- */

export const DeltaNeutral: Story = {
  name: 'Delta — Neutral',
  args: {
    value:          '14',
    label:          'Open RFIs',
    delta:          '0',
    deltaDirection: 'neutral',
    caption:        'no change',
  },
}


/* ----------------------------------------------------------
   With caption only
   ---------------------------------------------------------- */

export const WithCaption: Story = {
  name: 'With Caption',
  args: {
    value:   '38 days',
    label:   'Days Until Substantial Completion',
    caption: 'Target: June 30, 2026',
  },
}


/* ----------------------------------------------------------
   ScopeHouse — Dashboard KPI grid
   ---------------------------------------------------------- */

export const DashboardGrid: Story = {
  name: 'ScopeHouse — Dashboard KPI Grid',
  render: () => (
    <div className="grid grid-cols-2 gap-4 w-[480px]">
      <Stat
        label="Contract Value"
        value="$1.24M"
        caption="original contract"
      />
      <Stat
        label="Committed to Date"
        value="$820K"
        delta="+$42K"
        deltaDirection="up"
        caption="incl. approved COs"
      />
      <Stat
        label="Budget Remaining"
        value="$420K"
        delta="-$42K"
        deltaDirection="down"
        caption="uncommitted balance"
      />
      <Stat
        label="Open Change Orders"
        value="7"
        delta="+2"
        deltaDirection="up"
        caption="awaiting approval"
      />
    </div>
  ),
}


/* ----------------------------------------------------------
   ScopeHouse — Full project header stats
   ---------------------------------------------------------- */

export const ProjectHeader: Story = {
  name: 'ScopeHouse — Project Header Stats',
  render: () => (
    <div className="w-full max-w-2xl border border-rule rounded-md p-5">
      <h2 className="font-display font-bold text-lg uppercase tracking-wide text-void mb-4">
        Parkdale Townhomes — Phase 2
      </h2>
      <div className="grid grid-cols-4 gap-3">
        <Stat label="Contract Value"  value="$2.1M"  />
        <Stat label="% Complete"      value="62%"    delta="+8%" deltaDirection="up" caption="this period" />
        <Stat label="Open COs"        value="3"      />
        <Stat label="Finish Date"     value="Jul 12" caption="on schedule" />
      </div>
    </div>
  ),
}


/* ----------------------------------------------------------
   All variants together
   ---------------------------------------------------------- */

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      <Stat label="No Delta"     value="$124,500" />
      <Stat label="Delta Up"     value="$124,500" delta="+$8,200"  deltaDirection="up"      caption="vs. last month" />
      <Stat label="Delta Down"   value="$124,500" delta="-$4,100"  deltaDirection="down"    caption="vs. last month" />
      <Stat label="Delta Flat"   value="$124,500" delta="$0"       deltaDirection="neutral" caption="no change" />
      <Stat label="With Caption" value="$124,500" caption="total committed to date" />
    </div>
  ),
}
