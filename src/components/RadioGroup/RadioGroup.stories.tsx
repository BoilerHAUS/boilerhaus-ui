import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { RadioGroup, Radio } from './RadioGroup'

const meta = {
  title:     'Components/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onValueChange: fn(),
  },
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>


/* ----------------------------------------------------------
   Default — vertical
   ---------------------------------------------------------- */

export const Default: Story = {
  render: (args) => (
    <RadioGroup defaultValue="net30" {...args}>
      <Radio value="net30" label="Net 30" />
      <Radio value="net45" label="Net 45" />
      <Radio value="net60" label="Net 60" />
    </RadioGroup>
  ),
}


/* ----------------------------------------------------------
   With descriptions
   ---------------------------------------------------------- */

export const WithDescriptions: Story = {
  name: 'With Descriptions',
  render: (args) => (
    <RadioGroup defaultValue="standard" {...args}>
      <Radio
        value="standard"
        label="Standard Approval"
        description="PM approves; auto-notifies client for COs over $5,000."
      />
      <Radio
        value="expedited"
        label="Expedited Review"
        description="Bypasses standard queue — use for time-critical scope changes."
      />
      <Radio
        value="owner"
        label="Owner Approval Required"
        description="CO must be countersigned by the property owner before work proceeds."
      />
    </RadioGroup>
  ),
}


/* ----------------------------------------------------------
   Horizontal
   ---------------------------------------------------------- */

export const Horizontal: Story = {
  name: 'Horizontal',
  render: (args) => (
    <RadioGroup defaultValue="all" orientation="horizontal" {...args}>
      <Radio value="all"      label="All" />
      <Radio value="active"   label="Active" />
      <Radio value="onhold"   label="On Hold" />
      <Radio value="complete" label="Complete" />
    </RadioGroup>
  ),
}


/* ----------------------------------------------------------
   Disabled
   ---------------------------------------------------------- */

export const Disabled: Story = {
  render: (args) => (
    <RadioGroup defaultValue="net30" disabled {...args}>
      <Radio value="net30" label="Net 30" />
      <Radio value="net45" label="Net 45" />
      <Radio value="net60" label="Net 60" />
    </RadioGroup>
  ),
}

export const DisabledItem: Story = {
  name: 'Disabled Item',
  render: (args) => (
    <RadioGroup defaultValue="standard" {...args}>
      <Radio value="standard"  label="Standard"  description="Available for this project type." />
      <Radio value="expedited" label="Expedited"  description="Requires manager override."   disabled />
      <Radio value="owner"     label="Owner Only" description="Owner has not enabled this."   disabled />
    </RadioGroup>
  ),
}


/* ----------------------------------------------------------
   ScopeHouse — Payment terms selector
   ---------------------------------------------------------- */

export const PaymentTerms: Story = {
  name: 'ScopeHouse — Payment Terms',
  render: (args) => (
    <div className="w-80 border border-rule rounded-md p-5 flex flex-col gap-4">
      <p className="font-display text-xs tracking-widest uppercase text-smoke">
        Payment Terms
      </p>
      <RadioGroup defaultValue="net30" {...args}>
        <Radio value="net15" label="Net 15" description="Payment due within 15 days of invoice." />
        <Radio value="net30" label="Net 30" description="Payment due within 30 days of invoice." />
        <Radio value="net45" label="Net 45" description="Payment due within 45 days of invoice." />
        <Radio value="net60" label="Net 60" description="Payment due within 60 days of invoice." />
      </RadioGroup>
    </div>
  ),
}


/* ----------------------------------------------------------
   ScopeHouse — CO status filter
   ---------------------------------------------------------- */

export const StatusFilter: Story = {
  name: 'ScopeHouse — CO Status Filter',
  render: (args) => (
    <RadioGroup defaultValue="all" orientation="horizontal" {...args}>
      <Radio value="all"      label="All" />
      <Radio value="draft"    label="Draft" />
      <Radio value="pending"  label="Pending" />
      <Radio value="approved" label="Approved" />
      <Radio value="rejected" label="Rejected" />
    </RadioGroup>
  ),
}


/* ----------------------------------------------------------
   All states
   ---------------------------------------------------------- */

export const AllStates: Story = {
  name: 'All States',
  render: (args) => (
    <div className="flex flex-col gap-6">
      <RadioGroup defaultValue="checked" {...args}>
        <Radio value="unchecked" label="Unchecked" />
        <Radio value="checked"   label="Checked (default)" />
        <Radio value="disabled"  label="Disabled" disabled />
      </RadioGroup>
    </div>
  ),
}
