import type { Meta, StoryObj } from '@storybook/react-vite'
import { Label } from './Label'

const meta = {
  title:     'Components/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    required: {
      control:     'boolean',
      description: 'Appends a required indicator (*) to the label.',
      table: { defaultValue: { summary: 'false' } },
    },
    disabled: {
      control:     'boolean',
      description: 'Reduces opacity — use when the associated input is disabled.',
      table: { defaultValue: { summary: 'false' } },
    },
    children: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>


/* ----------------------------------------------------------
   Variants
   ---------------------------------------------------------- */

export const Default: Story = {
  args: { children: 'Project Name' },
}

export const Required: Story = {
  args: { children: 'Project Name', required: true },
}

export const Disabled: Story = {
  args: { children: 'Project Name', disabled: true },
}


/* ----------------------------------------------------------
   Inventory
   ---------------------------------------------------------- */

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Label>Default label</Label>
      <Label required>Required field</Label>
      <Label disabled>Disabled field</Label>
    </div>
  ),
}
