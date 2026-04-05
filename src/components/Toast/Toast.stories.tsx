import type { Meta, StoryObj } from '@storybook/react-vite'
import { Toaster } from './Toast'
import { toast } from './use-toast'

const meta = {
  title:     'Components/Toast',
  component: Toaster,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    (Story: React.ComponentType) => (
      <>
        <Story />
        <Toaster />
      </>
    ),
  ],
} satisfies Meta<typeof Toaster>

export default meta
type Story = StoryObj<typeof meta>

/* ----------------------------------------------------------
   Helper button row
   ---------------------------------------------------------- */

function TriggerRow({
  label,
  onClick,
}: {
  label: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-4 py-2 rounded-sm border border-rule font-body text-sm text-void bg-paper hover:bg-[color-mix(in_srgb,var(--color-rule)_40%,var(--color-paper))] transition-colors duration-fast"
    >
      {label}
    </button>
  )
}


/* ----------------------------------------------------------
   Neutral
   ---------------------------------------------------------- */

export const Neutral: Story = {
  render: () => (
    <TriggerRow
      label="Show neutral toast"
      onClick={() => toast({ title: 'Project saved', description: 'Your changes have been saved.' })}
    />
  ),
}


/* ----------------------------------------------------------
   Success
   ---------------------------------------------------------- */

export const Success: Story = {
  render: () => (
    <TriggerRow
      label="Show success toast"
      onClick={() => toast.success({ title: 'CO approved', description: 'Change order CO-003 has been approved.' })}
    />
  ),
}


/* ----------------------------------------------------------
   Warning
   ---------------------------------------------------------- */

export const Warning: Story = {
  render: () => (
    <TriggerRow
      label="Show warning toast"
      onClick={() => toast.warning({ title: 'Budget threshold', description: 'Committed costs are now at 94% of the approved budget.' })}
    />
  ),
}


/* ----------------------------------------------------------
   Danger
   ---------------------------------------------------------- */

export const Danger: Story = {
  render: () => (
    <TriggerRow
      label="Show danger toast"
      onClick={() => toast.danger({ title: 'Upload failed', description: 'Could not attach the file. Please try again.' })}
    />
  ),
}


/* ----------------------------------------------------------
   Title only
   ---------------------------------------------------------- */

export const TitleOnly: Story = {
  name: 'Title Only',
  render: () => (
    <TriggerRow
      label="Show title-only toast"
      onClick={() => toast.success({ title: 'Permit submitted' })}
    />
  ),
}


/* ----------------------------------------------------------
   ScopeHouse — All variants
   ---------------------------------------------------------- */

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="flex flex-wrap gap-3">
      <TriggerRow
        label="Neutral"
        onClick={() => toast({ title: 'Draft saved', description: 'Your changes have been saved as a draft.' })}
      />
      <TriggerRow
        label="Success"
        onClick={() => toast.success({ title: 'CO-002 approved', description: 'Upgraded countertop material approved +$1,800.' })}
      />
      <TriggerRow
        label="Warning"
        onClick={() => toast.warning({ title: 'Over budget', description: 'Approving this CO will exceed the contract budget.' })}
      />
      <TriggerRow
        label="Danger"
        onClick={() => toast.danger({ title: 'Save failed', description: 'Check your connection and try again.' })}
      />
    </div>
  ),
}
