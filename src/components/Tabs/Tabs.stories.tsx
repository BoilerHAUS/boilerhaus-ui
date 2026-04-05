import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from '../Badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs'

const meta = {
  title:     'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>


/* ----------------------------------------------------------
   Default
   ---------------------------------------------------------- */

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="history">History</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="pt-4">
        <p className="text-sm text-void">Overview panel content.</p>
      </TabsContent>
      <TabsContent value="details" className="pt-4">
        <p className="text-sm text-void">Details panel content.</p>
      </TabsContent>
      <TabsContent value="history" className="pt-4">
        <p className="text-sm text-void">History panel content.</p>
      </TabsContent>
    </Tabs>
  ),
}


/* ----------------------------------------------------------
   With disabled tab
   ---------------------------------------------------------- */

export const WithDisabled: Story = {
  name: 'With Disabled Tab',
  render: () => (
    <Tabs defaultValue="budget">
      <TabsList>
        <TabsTrigger value="budget">Budget</TabsTrigger>
        <TabsTrigger value="schedule">Schedule</TabsTrigger>
        <TabsTrigger value="documents" disabled>Documents</TabsTrigger>
      </TabsList>
      <TabsContent value="budget" className="pt-4">
        <p className="text-sm text-void">Budget content.</p>
      </TabsContent>
      <TabsContent value="schedule" className="pt-4">
        <p className="text-sm text-void">Schedule content.</p>
      </TabsContent>
    </Tabs>
  ),
}


/* ----------------------------------------------------------
   ScopeHouse — Project view tabs
   ---------------------------------------------------------- */

export const ScopeHouseProjectView: Story = {
  name: 'ScopeHouse — Project View',
  render: () => (
    <Tabs defaultValue="budget">
      <TabsList>
        <TabsTrigger value="budget">Budget</TabsTrigger>
        <TabsTrigger value="schedule">Schedule</TabsTrigger>
        <TabsTrigger value="team">Team</TabsTrigger>
        <TabsTrigger value="permits">Permits</TabsTrigger>
        <TabsTrigger value="documents">Documents</TabsTrigger>
      </TabsList>

      <TabsContent value="budget" className="pt-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold text-lg uppercase tracking-[0.06em] text-void">
              Budget Summary
            </h2>
            <Badge variant="warning">94% committed</Badge>
          </div>
          <p className="text-sm text-smoke">
            Contract total: $41,955 · Committed: $39,455 · Remaining: $2,500
          </p>
        </div>
      </TabsContent>

      <TabsContent value="schedule" className="pt-6">
        <p className="text-sm text-smoke">Schedule content — Gantt or milestone list.</p>
      </TabsContent>

      <TabsContent value="team" className="pt-6">
        <p className="text-sm text-smoke">Team roster — owner, GC, subcontractors.</p>
      </TabsContent>

      <TabsContent value="permits" className="pt-6">
        <p className="text-sm text-smoke">Permit tracker — issued, pending, expired.</p>
      </TabsContent>

      <TabsContent value="documents" className="pt-6">
        <p className="text-sm text-smoke">Document library — drawings, specs, contracts.</p>
      </TabsContent>
    </Tabs>
  ),
}


/* ----------------------------------------------------------
   All Variants
   ---------------------------------------------------------- */

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="flex flex-col gap-10">
      <div>
        <p className="font-display font-bold text-xs uppercase tracking-widest text-smoke mb-4">
          Two tabs
        </p>
        <Tabs defaultValue="a">
          <TabsList>
            <TabsTrigger value="a">Active</TabsTrigger>
            <TabsTrigger value="b">Inactive</TabsTrigger>
          </TabsList>
          <TabsContent value="a" className="pt-4">
            <p className="text-sm text-void">Active tab content.</p>
          </TabsContent>
          <TabsContent value="b" className="pt-4">
            <p className="text-sm text-void">Inactive tab content.</p>
          </TabsContent>
        </Tabs>
      </div>

      <div>
        <p className="font-display font-bold text-xs uppercase tracking-widest text-smoke mb-4">
          Five tabs (with disabled)
        </p>
        <Tabs defaultValue="one">
          <TabsList>
            <TabsTrigger value="one">One</TabsTrigger>
            <TabsTrigger value="two">Two</TabsTrigger>
            <TabsTrigger value="three">Three</TabsTrigger>
            <TabsTrigger value="four">Four</TabsTrigger>
            <TabsTrigger value="five" disabled>Five</TabsTrigger>
          </TabsList>
          <TabsContent value="one" className="pt-4">
            <p className="text-sm text-void">Tab one content.</p>
          </TabsContent>
          <TabsContent value="two" className="pt-4">
            <p className="text-sm text-void">Tab two content.</p>
          </TabsContent>
          <TabsContent value="three" className="pt-4">
            <p className="text-sm text-void">Tab three content.</p>
          </TabsContent>
          <TabsContent value="four" className="pt-4">
            <p className="text-sm text-void">Tab four content.</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  ),
}
