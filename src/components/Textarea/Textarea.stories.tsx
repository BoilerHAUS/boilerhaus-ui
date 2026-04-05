import type { Meta, StoryObj } from '@storybook/react-vite'
import { Label } from '../Label'
import { Textarea } from './Textarea'

const meta = {
  title:     'Components/Textarea',
  component: Textarea,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>


/* ----------------------------------------------------------
   Default
   ---------------------------------------------------------- */

export const Default: Story = {
  args: {
    id:          'notes',
    placeholder: 'Describe the work scope…',
  },
}


/* ----------------------------------------------------------
   With helper text
   ---------------------------------------------------------- */

export const WithHelperText: Story = {
  args: {
    id:          'notes-helper',
    placeholder: 'e.g. Install new drywall on east wall, tape and mud, prime.',
    helperText:  'Be specific — trades will use this to price the work.',
  },
}


/* ----------------------------------------------------------
   Error state
   ---------------------------------------------------------- */

export const WithError: Story = {
  args: {
    id:    'notes-error',
    value: '',
    error: 'Scope description is required before submitting.',
  },
}


/* ----------------------------------------------------------
   Disabled
   ---------------------------------------------------------- */

export const Disabled: Story = {
  args: {
    id:       'notes-disabled',
    value:    'Structural framing — east addition, per engineered drawings.',
    disabled: true,
  },
}


/* ----------------------------------------------------------
   Tall (rows=6)
   ---------------------------------------------------------- */

export const Tall: Story = {
  name: 'Tall (rows=6)',
  args: {
    id:          'notes-tall',
    rows:        6,
    placeholder: 'Full contract description…',
  },
}


/* ----------------------------------------------------------
   ScopeHouse — Composed with Label
   ---------------------------------------------------------- */

export const ComposedWithLabel: Story = {
  name: 'ScopeHouse — Composed with Label',
  render: () => (
    <div className="flex flex-col gap-1.5 max-w-md">
      <Label htmlFor="scope-notes" required>
        Scope of Work
      </Label>
      <Textarea
        id="scope-notes"
        rows={4}
        placeholder="Describe the materials, methods, and extent of work to be performed…"
        helperText="Trades will use this description to prepare their bids."
      />
    </div>
  ),
}


/* ----------------------------------------------------------
   All variants
   ---------------------------------------------------------- */

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="flex flex-col gap-6 max-w-md">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="av-default">Default</Label>
        <Textarea id="av-default" placeholder="Default state…" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="av-helper">With Helper Text</Label>
        <Textarea id="av-helper" placeholder="With helper…" helperText="Some helpful context goes here." />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="av-error" required>With Error</Label>
        <Textarea id="av-error" error="This field is required." />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="av-disabled" disabled>Disabled</Label>
        <Textarea id="av-disabled" value="Read-only content." disabled />
      </div>
    </div>
  ),
}
