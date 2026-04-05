import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Select, SelectItem } from './Select'
import { Label } from '../Label/Label'

const meta = {
  title:     'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
    },
    disabled: {
      control:     'boolean',
      description: 'Prevents interaction and reduces opacity.',
      table: { defaultValue: { summary: 'false' } },
    },
    error: {
      control:     'text',
      description: 'Error message displayed below the trigger.',
    },
  },
  args: {
    onValueChange: fn(),
  },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>


/* ----------------------------------------------------------
   States
   ---------------------------------------------------------- */

export const Default: Story = {
  args: {
    id:          'status',
    placeholder: 'Select status',
  },
  render: (args) => (
    <Select {...args} style={{ width: '240px' }}>
      <SelectItem value="draft">Draft</SelectItem>
      <SelectItem value="active">In Progress</SelectItem>
      <SelectItem value="on-hold">On Hold</SelectItem>
      <SelectItem value="complete">Complete</SelectItem>
    </Select>
  ),
}

export const WithError: Story = {
  name: 'With Error',
  render: (args) => (
    <Select
      {...args}
      id="status-error"
      placeholder="Select status"
      error="Status is required."
      style={{ width: '240px' }}
    >
      <SelectItem value="draft">Draft</SelectItem>
      <SelectItem value="active">In Progress</SelectItem>
    </Select>
  ),
}

export const Disabled: Story = {
  args: {
    id:          'status-disabled',
    placeholder: 'Locked',
    disabled:    true,
  },
  render: (args) => (
    <Select {...args} style={{ width: '240px' }}>
      <SelectItem value="active">In Progress</SelectItem>
    </Select>
  ),
}


/* ----------------------------------------------------------
   Paired with Label
   ---------------------------------------------------------- */

export const WithLabel: Story = {
  name: 'With Label',
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '280px' }}>
      <Label htmlFor="project-status" required>Project Status</Label>
      <Select {...args} id="project-status" placeholder="Select status">
        <SelectItem value="draft">Draft</SelectItem>
        <SelectItem value="active">In Progress</SelectItem>
        <SelectItem value="on-hold">On Hold</SelectItem>
        <SelectItem value="complete">Complete</SelectItem>
      </Select>
    </div>
  ),
}

export const WithLabelAndError: Story = {
  name: 'With Label + Error',
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '280px' }}>
      <Label htmlFor="co-status" required>Change Order Status</Label>
      <Select {...args} id="co-status" placeholder="Select status" error="Status is required.">
        <SelectItem value="pending">Pending</SelectItem>
        <SelectItem value="review">Under Review</SelectItem>
        <SelectItem value="approved">Approved</SelectItem>
        <SelectItem value="rejected">Rejected</SelectItem>
      </Select>
    </div>
  ),
}


/* ----------------------------------------------------------
   Inventory
   ---------------------------------------------------------- */

export const AllVariants: Story = {
  name: 'All States',
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '280px' }}>
      <Select {...args} id="all-1" placeholder="Default">
        <SelectItem value="a">Option A</SelectItem>
        <SelectItem value="b">Option B</SelectItem>
      </Select>
      <Select {...args} id="all-2" placeholder="With error" error="Required.">
        <SelectItem value="a">Option A</SelectItem>
      </Select>
      <Select {...args} id="all-3" placeholder="Disabled" disabled>
        <SelectItem value="a">Option A</SelectItem>
      </Select>
    </div>
  ),
}
