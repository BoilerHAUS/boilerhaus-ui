import type { Meta, StoryObj } from '@storybook/react-vite'
import { Card, CardHeader, CardBody, CardFooter } from './Card'
import { Badge } from '../Badge/Badge'
import { Button } from '../Button/Button'

const meta = {
  title:     'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>


/* ----------------------------------------------------------
   Structure
   ---------------------------------------------------------- */

export const Default: Story = {
  render: () => (
    <Card style={{ width: '360px' }}>
      <CardBody>
        <p>Basic card content goes here.</p>
      </CardBody>
    </Card>
  ),
}

export const WithHeader: Story = {
  name: 'With Header',
  render: () => (
    <Card style={{ width: '360px' }}>
      <CardHeader>
        <span className="font-display font-bold text-base uppercase tracking-[0.06em]">
          Card Title
        </span>
      </CardHeader>
      <CardBody>
        <p className="text-sm text-smoke">Card body content goes here.</p>
      </CardBody>
    </Card>
  ),
}

export const WithHeaderAndFooter: Story = {
  name: 'With Header + Footer',
  render: () => (
    <Card style={{ width: '360px' }}>
      <CardHeader>
        <span className="font-display font-bold text-base uppercase tracking-[0.06em]">
          Card Title
        </span>
      </CardHeader>
      <CardBody>
        <p className="text-sm text-smoke">Card body content goes here.</p>
      </CardBody>
      <CardFooter>
        <Button variant="secondary" style={{ flex: 1 }}>Cancel</Button>
        <Button variant="primary" style={{ flex: 1 }}>Confirm</Button>
      </CardFooter>
    </Card>
  ),
}


/* ----------------------------------------------------------
   ScopeHouse — Project card
   ---------------------------------------------------------- */

export const ProjectCard: Story = {
  name: 'ScopeHouse — Project Card',
  render: () => (
    <Card style={{ width: '360px' }}>
      <CardHeader>
        <span className="font-display font-bold text-base uppercase tracking-[0.06em] text-void">
          123 Main St — Kitchen Reno
        </span>
        <Badge variant="active">In Progress</Badge>
      </CardHeader>
      <CardBody>
        <dl className="flex flex-col gap-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-smoke">Client</dt>
            <dd className="font-medium text-void">J. Morrison</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-smoke">Contract Value</dt>
            <dd className="font-medium text-void">$48,500</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-smoke">Completion</dt>
            <dd className="font-medium text-void">Aug 15, 2025</dd>
          </div>
        </dl>
      </CardBody>
      <CardFooter>
        <Button variant="ghost">View Details</Button>
        <Button variant="secondary">Edit</Button>
      </CardFooter>
    </Card>
  ),
}

export const ChangeOrderCard: Story = {
  name: 'ScopeHouse — Change Order Card',
  render: () => (
    <Card style={{ width: '360px' }}>
      <CardHeader>
        <span className="font-display font-bold text-base uppercase tracking-[0.06em] text-void">
          CO-004 — Electrical Upgrade
        </span>
        <Badge variant="warning">Revision Required</Badge>
      </CardHeader>
      <CardBody>
        <dl className="flex flex-col gap-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-smoke">Requested</dt>
            <dd className="font-medium text-void">Jul 3, 2025</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-smoke">Change Amount</dt>
            <dd className="font-medium text-signal">+$3,200</dd>
          </div>
        </dl>
      </CardBody>
      <CardFooter>
        <Button variant="ghost">View</Button>
        <Button variant="destructive">Reject</Button>
        <Button variant="primary">Approve</Button>
      </CardFooter>
    </Card>
  ),
}


/* ----------------------------------------------------------
   Inventory
   ---------------------------------------------------------- */

export const AllVariants: Story = {
  name: 'All Compositions',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '360px' }}>
      <Card>
        <CardBody>Body only</CardBody>
      </Card>

      <Card>
        <CardHeader>
          <span className="font-display font-bold text-sm uppercase tracking-[0.06em]">Header only</span>
        </CardHeader>
        <CardBody>With header</CardBody>
      </Card>

      <Card>
        <CardHeader>
          <span className="font-display font-bold text-sm uppercase tracking-[0.06em]">Full card</span>
          <Badge variant="neutral">Draft</Badge>
        </CardHeader>
        <CardBody>With header and footer</CardBody>
        <CardFooter>
          <Button variant="secondary">Cancel</Button>
          <Button variant="primary">Save</Button>
        </CardFooter>
      </Card>
    </div>
  ),
}
