import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Button } from './Button'

const meta = {
  title:     'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control:     { type: 'select' },
      options:     ['primary', 'secondary', 'ghost', 'destructive'],
      description: 'Visual treatment of the button.',
      table: { defaultValue: { summary: 'primary' } },
    },
    asChild: {
      control:     'boolean',
      description: 'Render as a child element (e.g. an anchor tag).',
      table: { defaultValue: { summary: 'false' } },
    },
    disabled: {
      control:     'boolean',
      description: 'Prevents interaction and reduces opacity.',
    },
    children: {
      control: 'text',
    },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>


/* ----------------------------------------------------------
   Variants
   ---------------------------------------------------------- */

export const Primary: Story = {
  args: { variant: 'primary', children: 'Primary Action' },
}

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Secondary Action' },
}

export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Ghost Action' },
}

export const Destructive: Story = {
  args: { variant: 'destructive', children: 'Delete Record' },
}


/* ----------------------------------------------------------
   States
   ---------------------------------------------------------- */

export const Disabled: Story = {
  args: { variant: 'primary', children: 'Unavailable', disabled: true },
}


/* ----------------------------------------------------------
   asChild — renders as anchor, inherits Button styles
   ---------------------------------------------------------- */

export const AsLink: Story = {
  name: 'asChild — anchor',
  args: { variant: 'secondary', asChild: true },
  render: (args) => (
    <Button {...args}>
      {/* Slot merges props onto this element */}
      <a href="https://boilerhaus.ca" target="_blank" rel="noreferrer">
        Visit Boilerhaus
      </a>
    </Button>
  ),
}


/* ----------------------------------------------------------
   Inventory
   ---------------------------------------------------------- */

export const AllVariants: Story = {
  name: 'All Variants',
  render: (args) => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Button {...args} variant="primary">Primary</Button>
      <Button {...args} variant="secondary">Secondary</Button>
      <Button {...args} variant="ghost">Ghost</Button>
      <Button {...args} variant="destructive">Destructive</Button>
    </div>
  ),
  args: { onClick: fn() },
}

export const AllVariantsDisabled: Story = {
  name: 'All Variants — Disabled',
  render: (args) => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Button {...args} variant="primary"     disabled>Primary</Button>
      <Button {...args} variant="secondary"   disabled>Secondary</Button>
      <Button {...args} variant="ghost"       disabled>Ghost</Button>
      <Button {...args} variant="destructive" disabled>Destructive</Button>
    </div>
  ),
  args: { onClick: fn() },
}

export const OnDarkBackground: Story = {
  name: 'On Dark Background',
  parameters: { backgrounds: { default: 'void' } },
  render: (args) => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Button {...args} variant="primary">Primary</Button>
      <Button {...args} variant="secondary">Secondary</Button>
      <Button {...args} variant="ghost">Ghost</Button>
      <Button {...args} variant="destructive">Destructive</Button>
    </div>
  ),
  args: { onClick: fn() },
}
