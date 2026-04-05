import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Label } from '../Label'
import { Switch } from './Switch'

const meta = {
  title:     'Components/Switch',
  component: Switch,
  parameters: {
    layout: 'padded',
  },
  args: {
    onCheckedChange: fn(),
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>


/* ----------------------------------------------------------
   Default (off)
   ---------------------------------------------------------- */

export const Default: Story = {
  args: {
    id: 'sw-default',
  },
}


/* ----------------------------------------------------------
   On
   ---------------------------------------------------------- */

export const On: Story = {
  args: {
    id:      'sw-on',
    checked: true,
  },
}


/* ----------------------------------------------------------
   Disabled
   ---------------------------------------------------------- */

export const Disabled: Story = {
  args: {
    id:       'sw-disabled',
    disabled: true,
  },
}

export const DisabledOn: Story = {
  name: 'Disabled + On',
  args: {
    id:       'sw-disabled-on',
    checked:  true,
    disabled: true,
  },
}


/* ----------------------------------------------------------
   Composed with Label
   ---------------------------------------------------------- */

export const WithLabel: Story = {
  name: 'Composed with Label',
  render: (args) => (
    <div className="flex items-center gap-3">
      <Switch id="sw-label" {...args} />
      <Label htmlFor="sw-label">Email notifications</Label>
    </div>
  ),
}


/* ----------------------------------------------------------
   ScopeHouse — Notification preferences
   ---------------------------------------------------------- */

export const NotificationPreferences: Story = {
  name: 'ScopeHouse — Notification Preferences',
  render: () => (
    <div className="flex flex-col gap-5 max-w-sm">
      <p className="font-display font-bold text-xs uppercase tracking-[0.10em] text-smoke">
        Notification Settings
      </p>
      {[
        { id: 'notif-co',      label: 'Change order submitted',     sub: 'When a contractor submits a CO for review',   on: true  },
        { id: 'notif-pay',     label: 'Payment request received',   sub: 'When a payment application is submitted',     on: true  },
        { id: 'notif-permit',  label: 'Permit status update',       sub: 'When a permit is approved or rejected',       on: true  },
        { id: 'notif-budget',  label: 'Budget threshold exceeded',  sub: 'When committed costs pass 80% of budget',     on: false },
        { id: 'notif-digest',  label: 'Weekly digest',              sub: 'Summary email every Monday at 8 AM',          on: false },
      ].map(({ id, label, sub, on }) => (
        <div key={id} className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-0.5">
            <Label htmlFor={id} className="leading-none">{label}</Label>
            <p className="text-xs text-smoke">{sub}</p>
          </div>
          <Switch id={id} defaultChecked={on} className="mt-0.5 shrink-0" />
        </div>
      ))}
    </div>
  ),
}


/* ----------------------------------------------------------
   All States
   ---------------------------------------------------------- */

export const AllStates: Story = {
  name: 'All States',
  render: () => (
    <div className="flex flex-col gap-4">
      {[
        { id: 'all-off',        label: 'Off',              checked: false, disabled: false },
        { id: 'all-on',         label: 'On',               checked: true,  disabled: false },
        { id: 'all-dis-off',    label: 'Disabled off',     checked: false, disabled: true  },
        { id: 'all-dis-on',     label: 'Disabled on',      checked: true,  disabled: true  },
      ].map(({ id, label, checked, disabled }) => (
        <div key={id} className="flex items-center gap-3">
          <Switch id={id} checked={checked} disabled={disabled} />
          <Label htmlFor={id} disabled={disabled}>{label}</Label>
        </div>
      ))}
    </div>
  ),
}
