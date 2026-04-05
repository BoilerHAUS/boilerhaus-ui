import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Combobox } from './Combobox'
import type { ComboboxOption } from './Combobox'

const meta = {
  title:     'Components/Combobox',
  component: Combobox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onValueChange: fn(),
  },
} satisfies Meta<typeof Combobox>

export default meta
type Story = StoryObj<typeof meta>


/* ----------------------------------------------------------
   Shared option sets
   ---------------------------------------------------------- */

const trades: ComboboxOption[] = [
  { value: 'electrical',    label: 'Electrical' },
  { value: 'plumbing',      label: 'Plumbing' },
  { value: 'hvac',          label: 'HVAC' },
  { value: 'framing',       label: 'Framing' },
  { value: 'concrete',      label: 'Concrete' },
  { value: 'masonry',       label: 'Masonry' },
  { value: 'roofing',       label: 'Roofing' },
  { value: 'insulation',    label: 'Insulation' },
  { value: 'drywall',       label: 'Drywall' },
  { value: 'flooring',      label: 'Flooring' },
  { value: 'painting',      label: 'Painting' },
  { value: 'landscaping',   label: 'Landscaping' },
  { value: 'excavation',    label: 'Excavation' },
  { value: 'steel',         label: 'Structural Steel' },
  { value: 'glazing',       label: 'Glazing & Windows' },
]

const contractors: ComboboxOption[] = [
  { value: 'apex-elec',     label: 'Apex Electrical Inc.',      description: 'Licensed — Toronto, ON' },
  { value: 'bluewave',      label: 'Bluewave Plumbing Co.',     description: 'Licensed — Toronto, ON' },
  { value: 'crestline',     label: 'Crestline HVAC Systems',    description: 'Licensed — Mississauga, ON' },
  { value: 'durham-frame',  label: 'Durham Framing Ltd.',       description: 'Licensed — Durham Region, ON' },
  { value: 'granite-msnry', label: 'Granite Masonry Works',     description: 'Licensed — Hamilton, ON' },
  { value: 'ironclad',      label: 'Ironclad Steel Erectors',   description: 'Licensed — Toronto, ON' },
  { value: 'northshore',    label: 'Northshore Roofing Inc.',   description: 'Licensed — Barrie, ON' },
  { value: 'pacific-flr',   label: 'Pacific Flooring Solutions', description: 'Licensed — Brampton, ON' },
  { value: 'prism-glass',   label: 'Prism Glass & Glazing',     description: 'Licensed — Toronto, ON' },
  { value: 'redwood-paint', label: 'Redwood Painting Ltd.',     description: 'Licensed — Oakville, ON' },
]


/* ----------------------------------------------------------
   Default
   ---------------------------------------------------------- */

export const Default: Story = {
  args: {
    options:     trades,
    placeholder: 'Select a trade…',
  },
}


/* ----------------------------------------------------------
   With descriptions
   ---------------------------------------------------------- */

export const WithDescriptions: Story = {
  name: 'With Descriptions',
  args: {
    options:           contractors,
    placeholder:       'Select a contractor…',
    searchPlaceholder: 'Search contractors…',
  },
}


/* ----------------------------------------------------------
   Pre-selected value
   ---------------------------------------------------------- */

export const PreSelected: Story = {
  name: 'Pre-selected Value',
  args: {
    options:     trades,
    value:       'electrical',
    placeholder: 'Select a trade…',
  },
}


/* ----------------------------------------------------------
   Disabled
   ---------------------------------------------------------- */

export const Disabled: Story = {
  args: {
    options:     trades,
    placeholder: 'Select a trade…',
    disabled:    true,
  },
}


/* ----------------------------------------------------------
   Custom empty message
   ---------------------------------------------------------- */

export const EmptyState: Story = {
  name: 'Empty State',
  args: {
    options:      [],
    placeholder:  'Select a trade…',
    emptyMessage: 'No trades configured for this project.',
  },
}


/* ----------------------------------------------------------
   ScopeHouse — Trade selector on scope item
   ---------------------------------------------------------- */

export const TradeLookup: Story = {
  name: 'ScopeHouse — Trade Lookup',
  render: (args) => (
    <div className="w-72 border border-rule rounded-md p-4 flex flex-col gap-3">
      <div>
        <label className="block font-display text-xs tracking-widest uppercase text-smoke mb-1.5">
          Trade
        </label>
        <Combobox
          options={trades}
          placeholder="Select trade…"
          searchPlaceholder="Search trades…"
          {...args}
        />
      </div>
    </div>
  ),
}


/* ----------------------------------------------------------
   ScopeHouse — Contractor assignment on scope item
   ---------------------------------------------------------- */

export const ContractorLookup: Story = {
  name: 'ScopeHouse — Contractor Assignment',
  render: (args) => (
    <div className="w-80 border border-rule rounded-md p-4 flex flex-col gap-3">
      <div>
        <label className="block font-display text-xs tracking-widest uppercase text-smoke mb-1.5">
          Assigned Contractor
        </label>
        <Combobox
          options={contractors}
          placeholder="Search contractors…"
          searchPlaceholder="Search by name or location…"
          emptyMessage="No contractors match — add one in your vendor list."
          {...args}
        />
      </div>
    </div>
  ),
}
