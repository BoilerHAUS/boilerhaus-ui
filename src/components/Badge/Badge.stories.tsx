import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from './Badge'

const meta = {
  title:     'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control:     { type: 'select' },
      options:     ['neutral', 'active', 'warning', 'danger', 'success'],
      description: 'Semantic status of the badge.',
      table: { defaultValue: { summary: 'neutral' } },
    },
    children: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>


/* ----------------------------------------------------------
   Variants
   ---------------------------------------------------------- */

export const Neutral: Story = {
  args: { variant: 'neutral', children: 'Draft' },
}

export const Active: Story = {
  args: { variant: 'active', children: 'In Progress' },
}

export const Warning: Story = {
  args: { variant: 'warning', children: 'Attention' },
}

export const Danger: Story = {
  args: { variant: 'danger', children: 'Blocked' },
}

export const Success: Story = {
  args: { variant: 'success', children: 'Complete' },
}


/* ----------------------------------------------------------
   ScopeHouse status labels
   ---------------------------------------------------------- */

export const ProjectStatuses: Story = {
  name: 'Project Statuses',
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Badge variant="neutral">Draft</Badge>
      <Badge variant="active">In Progress</Badge>
      <Badge variant="warning">On Hold</Badge>
      <Badge variant="danger">Blocked</Badge>
      <Badge variant="success">Complete</Badge>
    </div>
  ),
}

export const ChangeOrderStatuses: Story = {
  name: 'Change Order Statuses',
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Badge variant="neutral">Pending</Badge>
      <Badge variant="active">Under Review</Badge>
      <Badge variant="warning">Revision Required</Badge>
      <Badge variant="danger">Rejected</Badge>
      <Badge variant="success">Approved</Badge>
    </div>
  ),
}


/* ----------------------------------------------------------
   Inventory
   ---------------------------------------------------------- */

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Badge variant="neutral">Neutral</Badge>
      <Badge variant="active">Active</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="success">Success</Badge>
    </div>
  ),
}
