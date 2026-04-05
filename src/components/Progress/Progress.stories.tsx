import type { Meta, StoryObj } from '@storybook/react-vite'
import { Progress } from './Progress'

const meta = {
  title:     'Components/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    value: 65,
  },
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>


/* ----------------------------------------------------------
   Default
   ---------------------------------------------------------- */

export const Default: Story = {}


/* ----------------------------------------------------------
   With label + value
   ---------------------------------------------------------- */

export const WithLabel: Story = {
  name: 'With Label',
  args: {
    label: 'Completion',
    value: 65,
  },
}

export const WithValue: Story = {
  name: 'With Value Display',
  args: {
    label: 'Completion',
    value: 65,
    showValue: true,
  },
}


/* ----------------------------------------------------------
   Sizes
   ---------------------------------------------------------- */

export const Sizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div className="flex flex-col gap-6 w-80">
      <Progress size="sm" value={65} label="Small (sm)" showValue />
      <Progress size="md" value={65} label="Medium (md)" showValue />
      <Progress size="lg" value={65} label="Large (lg)" showValue />
    </div>
  ),
}


/* ----------------------------------------------------------
   Variants
   ---------------------------------------------------------- */

export const Variants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="flex flex-col gap-6 w-80">
      <Progress variant="default" value={65} label="Default (blue)" showValue />
      <Progress variant="success" value={82} label="Success (green)" showValue />
      <Progress variant="warning" value={48} label="Warning (amber)" showValue />
      <Progress variant="danger"  value={93} label="Danger (red)"    showValue />
    </div>
  ),
}


/* ----------------------------------------------------------
   Edge values
   ---------------------------------------------------------- */

export const EdgeValues: Story = {
  name: 'Edge Values',
  render: () => (
    <div className="flex flex-col gap-6 w-80">
      <Progress value={0}   label="0% — not started" showValue />
      <Progress value={25}  label="25%"               showValue />
      <Progress value={50}  label="50%"               showValue />
      <Progress value={75}  label="75%"               showValue />
      <Progress value={100} label="100% — complete"   showValue variant="success" />
    </div>
  ),
}


/* ----------------------------------------------------------
   ScopeHouse — Budget bar
   ---------------------------------------------------------- */

export const BudgetBar: Story = {
  name: 'ScopeHouse — Budget Consumed',
  render: () => (
    <div className="w-full max-w-sm flex flex-col gap-5">
      {/* Under budget */}
      <div>
        <div className="flex justify-between mb-1">
          <span className="text-sm text-smoke">Budget Consumed</span>
          <span className="text-sm font-medium text-void">$124,500 / $200,000</span>
        </div>
        <Progress value={62} size="md" variant="default" showValue />
      </div>

      {/* Near limit */}
      <div>
        <div className="flex justify-between mb-1">
          <span className="text-sm text-smoke">Labour Hours</span>
          <span className="text-sm font-medium text-void">380 / 420 hrs</span>
        </div>
        <Progress value={90} size="md" variant="warning" showValue />
      </div>

      {/* Over budget */}
      <div>
        <div className="flex justify-between mb-1">
          <span className="text-sm text-smoke">Materials</span>
          <span className="text-sm font-medium text-signal">$98,200 / $90,000</span>
        </div>
        <Progress value={100} size="md" variant="danger" showValue />
      </div>

      {/* Complete */}
      <div>
        <div className="flex justify-between mb-1">
          <span className="text-sm text-smoke">Phase 1 Complete</span>
          <span className="text-sm font-medium text-[var(--color-growth)]">Done</span>
        </div>
        <Progress value={100} size="md" variant="success" showValue />
      </div>
    </div>
  ),
}


/* ----------------------------------------------------------
   ScopeHouse — Project completion
   ---------------------------------------------------------- */

export const ProjectCompletion: Story = {
  name: 'ScopeHouse — Project Completion Overview',
  render: () => (
    <div className="w-full max-w-md flex flex-col gap-3 p-4 border border-rule rounded-md">
      <p className="font-display text-xs tracking-widest uppercase text-smoke">Project Progress</p>
      {[
        { phase: 'Foundation',    pct: 100, variant: 'success' as const },
        { phase: 'Framing',       pct: 100, variant: 'success' as const },
        { phase: 'Mechanical',    pct: 78,  variant: 'default' as const },
        { phase: 'Electrical',    pct: 52,  variant: 'default' as const },
        { phase: 'Finishes',      pct: 12,  variant: 'default' as const },
      ].map(({ phase, pct, variant }) => (
        <div key={phase} className="flex items-center gap-3">
          <span className="text-sm text-void w-28 shrink-0">{phase}</span>
          <Progress value={pct} variant={variant} size="sm" className="flex-1" />
          <span className="text-sm text-smoke tabular-nums w-8 text-right">{pct}%</span>
        </div>
      ))}
    </div>
  ),
}
