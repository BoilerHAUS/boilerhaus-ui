import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from '../Badge'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './Accordion'

const meta = {
  title:     'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>


/* ----------------------------------------------------------
   Default — single
   ---------------------------------------------------------- */

export const Default: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-80">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is a change order?</AccordionTrigger>
        <AccordionContent>
          A change order (CO) is a written amendment to the original contract that documents
          additions, deletions, or revisions to the scope of work and adjusts the contract
          price or schedule accordingly.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Who can approve a change order?</AccordionTrigger>
        <AccordionContent>
          Change orders must be approved by the project manager and, for amounts over $5,000,
          countersigned by the property owner before work proceeds.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Can I reject a change order?</AccordionTrigger>
        <AccordionContent>
          Yes. Rejecting a CO returns it to the submitting contractor with a reason. They may
          revise and resubmit or escalate to dispute resolution.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}


/* ----------------------------------------------------------
   Multiple — many open at once
   ---------------------------------------------------------- */

export const Multiple: Story = {
  name: 'Multiple (many open)',
  render: () => (
    <Accordion type="multiple" className="w-80">
      <AccordionItem value="item-1">
        <AccordionTrigger>General Information</AccordionTrigger>
        <AccordionContent>
          Project details, contract value, and key contacts are visible here.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Scope of Work</AccordionTrigger>
        <AccordionContent>
          The full bill of materials, labour breakdown, and subcontractor assignments
          for each phase of the project.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Documents & Attachments</AccordionTrigger>
        <AccordionContent>
          Drawings, specifications, permits, and signed contracts uploaded to this project.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}


/* ----------------------------------------------------------
   With badge in trigger
   ---------------------------------------------------------- */

export const WithBadge: Story = {
  name: 'With Badge in Trigger',
  render: () => (
    <Accordion type="single" collapsible className="w-96">
      <AccordionItem value="pending">
        <AccordionTrigger>
          <span className="flex items-center gap-2">
            Pending Change Orders
            <Badge variant="warning">4</Badge>
          </span>
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-2">
            {['CO #14 — Additional Framing', 'CO #15 — Electrical Upgrade', 'CO #16 — Window Substitution', 'CO #17 — Concrete Pour Delay'].map((co) => (
              <div key={co} className="flex items-center justify-between py-1.5 border-b border-rule last:border-b-0">
                <span className="text-sm text-void">{co}</span>
                <Badge variant="warning">Pending</Badge>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="approved">
        <AccordionTrigger>
          <span className="flex items-center gap-2">
            Approved Change Orders
            <Badge variant="success">11</Badge>
          </span>
        </AccordionTrigger>
        <AccordionContent>
          11 change orders have been approved for this project.
          Total approved value: $42,800.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}


/* ----------------------------------------------------------
   Disabled item
   ---------------------------------------------------------- */

export const DisabledItem: Story = {
  name: 'Disabled Item',
  render: () => (
    <Accordion type="single" collapsible className="w-80">
      <AccordionItem value="active">
        <AccordionTrigger>Active phase</AccordionTrigger>
        <AccordionContent>Content for the active phase.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="locked" disabled>
        <AccordionTrigger>Locked phase (coming soon)</AccordionTrigger>
        <AccordionContent>This content is not yet available.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="other">
        <AccordionTrigger>Other phase</AccordionTrigger>
        <AccordionContent>Content for the other phase.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}


/* ----------------------------------------------------------
   ScopeHouse — Scope item groups
   ---------------------------------------------------------- */

export const ScopeGroups: Story = {
  name: 'ScopeHouse — Scope Item Groups',
  render: () => (
    <Accordion type="multiple" defaultValue={['framing']} className="w-full max-w-lg">
      {[
        {
          value: 'foundation',
          label: 'Foundation',
          status: 'success' as const,
          total: '$48,200',
          items: ['Excavation & grading', 'Concrete footings', 'Waterproofing'],
        },
        {
          value: 'framing',
          label: 'Framing',
          status: 'active' as const,
          total: '$112,500',
          items: ['Exterior wall framing', 'Interior partition framing', 'Roof trusses', 'Sheathing'],
        },
        {
          value: 'mechanical',
          label: 'Mechanical',
          status: 'neutral' as const,
          total: '$67,800',
          items: ['HVAC rough-in', 'Plumbing rough-in', 'Gas lines'],
        },
      ].map(({ value, label, status, total, items }) => (
        <AccordionItem key={value} value={value}>
          <AccordionTrigger>
            <span className="flex items-center justify-between w-full pr-2">
              <span className="flex items-center gap-2">
                {label}
                <Badge variant={status}>{status === 'success' ? 'Complete' : status === 'active' ? 'In Progress' : 'Not Started'}</Badge>
              </span>
              <span className="text-sm text-smoke font-body normal-case tracking-normal">{total}</span>
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="flex flex-col divide-y divide-rule">
              {items.map((item) => (
                <li key={item} className="flex items-center justify-between py-2">
                  <span className="text-sm text-void">{item}</span>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ),
}
