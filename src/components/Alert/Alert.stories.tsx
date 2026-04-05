import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Alert } from './Alert'

const meta = {
  title:     'Components/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
  },
  args: {
    onDismiss: fn(),
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>


/* ----------------------------------------------------------
   Default (neutral, description only)
   ---------------------------------------------------------- */

export const Default: Story = {
  args: {
    children: 'This project is currently in draft mode and has not been shared with any trades.',
  },
}


/* ----------------------------------------------------------
   Title only
   ---------------------------------------------------------- */

export const TitleOnly: Story = {
  name: 'Title Only',
  args: {
    variant: 'info',
    title:   'Site access required before work begins.',
  },
}


/* ----------------------------------------------------------
   Title + description
   ---------------------------------------------------------- */

export const TitleAndDescription: Story = {
  name: 'Title + Description',
  args: {
    variant:  'warning',
    title:    'Budget threshold reached',
    children: 'Committed costs are at 94% of the approved budget. Review change orders before approving additional work.',
  },
}


/* ----------------------------------------------------------
   Dismissible
   ---------------------------------------------------------- */

export const Dismissible: Story = {
  args: {
    variant:  'success',
    title:    'Changes saved',
    children: 'Your project details have been updated.',
  },
}


/* ----------------------------------------------------------
   Without icon
   ---------------------------------------------------------- */

export const NoIcon: Story = {
  name: 'Without Icon',
  args: {
    variant:  'info',
    icon:     null,
    title:    'Payment terms',
    children: '30 days net from date of invoice.',
  },
}


/* ----------------------------------------------------------
   All Variants
   ---------------------------------------------------------- */

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="flex flex-col gap-4 max-w-lg">
      <Alert variant="neutral" title="Neutral">
        Informational context with no specific urgency.
      </Alert>
      <Alert variant="info" title="Info">
        A tip or relevant detail the user should know.
      </Alert>
      <Alert variant="warning" title="Warning">
        Something needs attention before proceeding.
      </Alert>
      <Alert variant="danger" title="Danger">
        An error occurred or action is blocked.
      </Alert>
      <Alert variant="success" title="Success">
        The action completed successfully.
      </Alert>
    </div>
  ),
}


/* ----------------------------------------------------------
   ScopeHouse — Form validation
   ---------------------------------------------------------- */

export const FormValidation: Story = {
  name: 'ScopeHouse — Form Validation',
  render: () => (
    <div className="flex flex-col gap-4 max-w-lg">
      <Alert variant="danger" title="Cannot submit change order">
        Please correct the following before submitting:
        <ul className="mt-2 list-disc list-inside space-y-1">
          <li>Scope description is required</li>
          <li>At least one line item must be added</li>
          <li>Total amount cannot be $0.00</li>
        </ul>
      </Alert>
    </div>
  ),
}


/* ----------------------------------------------------------
   ScopeHouse — Budget alert
   ---------------------------------------------------------- */

export const BudgetAlert: Story = {
  name: 'ScopeHouse — Budget Alert',
  render: () => (
    <div className="flex flex-col gap-4 max-w-lg">
      <Alert
        variant="warning"
        title="Projected over budget"
        onDismiss={() => {}}
      >
        Approving CO-004 (+$3,200) will bring committed costs to{' '}
        <strong>$49,025</strong>, exceeding the approved budget of $47,500 by{' '}
        <strong className="text-[var(--color-caution)]">$1,525</strong>.
      </Alert>
      <Alert variant="success" title="CO-003 approved">
        The credit of $450.00 has been applied to the contract total.
      </Alert>
    </div>
  ),
}
