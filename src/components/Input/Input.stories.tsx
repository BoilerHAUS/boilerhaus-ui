import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from './Input'
import { Label } from '../Label/Label'

const meta = {
  title:     'Components/Input',
  component: Input,
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
      description: 'Error message displayed below the input.',
    },
    helperText: {
      control:     'text',
      description: 'Hint text displayed below the input.',
    },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>


/* ----------------------------------------------------------
   States
   ---------------------------------------------------------- */

export const Default: Story = {
  args: {
    id:          'scope-name',
    placeholder: 'e.g. Roof replacement',
  },
}

export const WithHelperText: Story = {
  name: 'With Helper Text',
  args: {
    id:          'scope-desc',
    placeholder: 'Brief description of the scope item',
    helperText:  'This will appear on the change order.',
  },
}

export const WithError: Story = {
  name: 'With Error',
  args: {
    id:          'project-budget',
    placeholder: '0.00',
    error:       'Budget must be greater than 0.',
  },
}

export const Disabled: Story = {
  args: {
    id:          'locked-field',
    value:       'Approved contract value',
    disabled:    true,
    readOnly:    true,
  },
}


/* ----------------------------------------------------------
   Paired with Label — illustrates canonical form field usage
   ---------------------------------------------------------- */

export const WithLabel: Story = {
  name: 'With Label',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '320px' }}>
      <Label htmlFor="project-name" required>Project Name</Label>
      <Input id="project-name" placeholder="e.g. 123 Main St — Kitchen Reno" required />
    </div>
  ),
}

export const WithLabelAndError: Story = {
  name: 'With Label + Error',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '320px' }}>
      <Label htmlFor="contract-value" required>Contract Value</Label>
      <Input
        id="contract-value"
        placeholder="0.00"
        type="number"
        error="Contract value is required."
        required
      />
    </div>
  ),
}

export const WithLabelDisabled: Story = {
  name: 'With Label — Disabled',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '320px' }}>
      <Label htmlFor="locked" disabled>Locked Field</Label>
      <Input id="locked" value="Read-only value" disabled readOnly />
    </div>
  ),
}


/* ----------------------------------------------------------
   Inventory
   ---------------------------------------------------------- */

export const AllVariants: Story = {
  name: 'All States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '320px' }}>
      <Input id="s1" placeholder="Default" />
      <Input id="s2" placeholder="With helper text" helperText="This is helper text." />
      <Input id="s3" placeholder="With error" error="This field is required." />
      <Input id="s4" value="Disabled input" disabled readOnly />
    </div>
  ),
}
