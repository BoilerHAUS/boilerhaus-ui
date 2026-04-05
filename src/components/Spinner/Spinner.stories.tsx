import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../Button'
import { Spinner } from './Spinner'

const meta = {
  title:     'Components/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>


/* ----------------------------------------------------------
   Default
   ---------------------------------------------------------- */

export const Default: Story = {}


/* ----------------------------------------------------------
   Sizes
   ---------------------------------------------------------- */

export const Sizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div className="flex items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <Spinner size="sm" />
        <span className="text-sm text-smoke">sm</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="md" />
        <span className="text-sm text-smoke">md</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="lg" />
        <span className="text-sm text-smoke">lg</span>
      </div>
    </div>
  ),
}


/* ----------------------------------------------------------
   Inherited color
   ---------------------------------------------------------- */

export const Colors: Story = {
  name: 'Inherits currentColor',
  render: () => (
    <div className="flex items-center gap-6">
      <Spinner className="text-void" />
      <Spinner className="text-signal-alt" />
      <Spinner className="text-signal" />
      <Spinner className="text-[var(--color-growth)]" />
      <Spinner className="text-smoke" />
    </div>
  ),
}


/* ----------------------------------------------------------
   Inline with text
   ---------------------------------------------------------- */

export const InlineWithText: Story = {
  name: 'Inline With Text',
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-smoke">
        <Spinner size="sm" />
        <span className="text-sm">Saving changes…</span>
      </div>
      <div className="flex items-center gap-2 text-smoke">
        <Spinner size="md" />
        <span className="text-base">Loading project data…</span>
      </div>
    </div>
  ),
}


/* ----------------------------------------------------------
   Button loading state
   ---------------------------------------------------------- */

export const ButtonLoading: Story = {
  name: 'Button Loading State',
  render: () => (
    <div className="flex items-center gap-4">
      <Button disabled className="flex items-center gap-2">
        <Spinner size="sm" />
        Submitting…
      </Button>
      <Button variant="secondary" disabled className="flex items-center gap-2">
        <Spinner size="sm" />
        Saving…
      </Button>
    </div>
  ),
}


/* ----------------------------------------------------------
   On dark background
   ---------------------------------------------------------- */

export const OnDark: Story = {
  name: 'On Dark Background',
  render: () => (
    <div className="flex items-center justify-center gap-4 p-8 bg-ash rounded-md">
      <Spinner className="text-paper" size="sm" />
      <Spinner className="text-paper" size="md" />
      <Spinner className="text-paper" size="lg" />
    </div>
  ),
}
