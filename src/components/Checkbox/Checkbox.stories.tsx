import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Label } from '../Label'
import { Checkbox } from './Checkbox'

const meta = {
  title:     'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'padded',
  },
  args: {
    onCheckedChange: fn(),
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>


/* ----------------------------------------------------------
   Default (uncontrolled)
   ---------------------------------------------------------- */

export const Default: Story = {
  args: {
    id: 'cb-default',
  },
}


/* ----------------------------------------------------------
   Checked
   ---------------------------------------------------------- */

export const Checked: Story = {
  args: {
    id:      'cb-checked',
    checked: true,
  },
}


/* ----------------------------------------------------------
   Indeterminate
   ---------------------------------------------------------- */

export const Indeterminate: Story = {
  args: {
    id:      'cb-indet',
    checked: 'indeterminate',
  },
}


/* ----------------------------------------------------------
   Disabled
   ---------------------------------------------------------- */

export const Disabled: Story = {
  args: {
    id:       'cb-disabled',
    disabled: true,
  },
}

export const DisabledChecked: Story = {
  name: 'Disabled + Checked',
  args: {
    id:       'cb-disabled-checked',
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
    <div className="flex items-center gap-2">
      <Checkbox id="cb-label" {...args} />
      <Label htmlFor="cb-label">Mark as approved</Label>
    </div>
  ),
}


/* ----------------------------------------------------------
   ScopeHouse — Permit checklist
   ---------------------------------------------------------- */

export const PermitChecklist: Story = {
  name: 'ScopeHouse — Permit Checklist',
  render: () => (
    <fieldset className="flex flex-col gap-3 border-0 p-0">
      <legend className="font-display font-bold text-xs uppercase tracking-[0.10em] text-smoke mb-3">
        Required Permits
      </legend>
      {[
        { id: 'permit-building',   label: 'Building Permit',      checked: true  },
        { id: 'permit-electrical', label: 'Electrical Permit',     checked: true  },
        { id: 'permit-plumbing',   label: 'Plumbing Permit',       checked: false },
        { id: 'permit-hvac',       label: 'HVAC Permit',           checked: false },
        { id: 'permit-demo',       label: 'Demolition Permit',     checked: true  },
      ].map(({ id, label, checked }) => (
        <div key={id} className="flex items-center gap-2">
          <Checkbox id={id} defaultChecked={checked} />
          <Label htmlFor={id}>{label}</Label>
        </div>
      ))}
    </fieldset>
  ),
}


/* ----------------------------------------------------------
   All States
   ---------------------------------------------------------- */

export const AllStates: Story = {
  name: 'All States',
  render: () => (
    <div className="flex flex-col gap-3">
      {[
        { id: 'all-unchecked',   label: 'Unchecked',            checked: false          },
        { id: 'all-checked',     label: 'Checked',              checked: true           },
        { id: 'all-indet',       label: 'Indeterminate',        checked: 'indeterminate' as const },
        { id: 'all-dis',         label: 'Disabled',             checked: false,          disabled: true },
        { id: 'all-dis-checked', label: 'Disabled + Checked',   checked: true,           disabled: true },
      ].map(({ id, label, checked, disabled }) => (
        <div key={id} className="flex items-center gap-2">
          <Checkbox id={id} checked={checked} disabled={disabled} />
          <Label htmlFor={id} disabled={disabled}>{label}</Label>
        </div>
      ))}
    </div>
  ),
}
