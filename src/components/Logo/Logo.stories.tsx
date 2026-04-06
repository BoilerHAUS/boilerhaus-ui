import type { Meta, StoryObj } from '@storybook/react-vite'
import { Logo } from './Logo'

const meta = {
  title: 'Components/Logo',
  component: Logo,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['color', 'void', 'dark', 'paper'],
      description: 'Color scheme — use `dark` or `paper` on dark backgrounds.',
      table: { defaultValue: { summary: 'color' } },
    },
    lockup: {
      control: { type: 'select' },
      options: ['horizontal', 'stacked', 'mark-only', 'wordmark-only'],
      description: 'Layout of mark and wordmark.',
      table: { defaultValue: { summary: 'horizontal' } },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Overall size. sm = topbar, md = default, lg = hero/display.',
      table: { defaultValue: { summary: 'md' } },
    },
  },
} satisfies Meta<typeof Logo>

export default meta
type Story = StoryObj<typeof meta>


/* ----------------------------------------------------------
   Variants
   ---------------------------------------------------------- */

export const Color: Story = {
  args: { variant: 'color' },
}

export const Void: Story = {
  name: 'Void (single color)',
  args: { variant: 'void' },
}

export const Dark: Story = {
  name: 'Dark (on dark bg)',
  parameters: { backgrounds: { default: 'void' } },
  args: { variant: 'dark' },
}

export const Paper: Story = {
  name: 'Paper (on dark bg)',
  parameters: { backgrounds: { default: 'void' } },
  args: { variant: 'paper' },
}


/* ----------------------------------------------------------
   Lockups
   ---------------------------------------------------------- */

export const Horizontal: Story = {
  args: { lockup: 'horizontal' },
}

export const Stacked: Story = {
  args: { lockup: 'stacked' },
}

export const MarkOnly: Story = {
  name: 'Mark only',
  args: { lockup: 'mark-only', size: 'lg' },
}

export const WordmarkOnly: Story = {
  name: 'Wordmark only',
  args: { lockup: 'wordmark-only' },
}


/* ----------------------------------------------------------
   Sizes
   ---------------------------------------------------------- */

export const AllSizes: Story = {
  name: 'All Sizes',
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'flex-start' }}>
      <Logo {...args} size="sm" />
      <Logo {...args} size="md" />
      <Logo {...args} size="lg" />
    </div>
  ),
  args: { variant: 'color', lockup: 'horizontal' },
}


/* ----------------------------------------------------------
   Inventory
   ---------------------------------------------------------- */

export const AllVariants: Story = {
  name: 'All Variants — Light',
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'flex-start' }}>
      <Logo {...args} variant="color" />
      <Logo {...args} variant="void" />
    </div>
  ),
}

export const AllVariantsDark: Story = {
  name: 'All Variants — Dark',
  parameters: { backgrounds: { default: 'void' } },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'flex-start' }}>
      <Logo {...args} variant="dark" />
      <Logo {...args} variant="paper" />
    </div>
  ),
}

export const AllLockups: Story = {
  name: 'All Lockups',
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', alignItems: 'flex-start' }}>
      <Logo {...args} lockup="horizontal" />
      <Logo {...args} lockup="stacked" />
      <Logo {...args} lockup="mark-only" size="lg" />
      <Logo {...args} lockup="wordmark-only" />
    </div>
  ),
  args: { variant: 'color' },
}
