import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Table,
  TableHeader,
  TableBody,
  TableFoot,
  TableRow,
  TableHead,
  TableCell,
} from './Table'

const meta = {
  title:     'Components/Table',
  component: Table,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>


/* ----------------------------------------------------------
   Basic
   ---------------------------------------------------------- */

export const Default: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>J. Morrison</TableCell>
          <TableCell>Owner</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>P. Nakamura</TableCell>
          <TableCell>Subcontractor</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>R. Okafor</TableCell>
          <TableCell>Inspector</TableCell>
          <TableCell>Pending</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
}


/* ----------------------------------------------------------
   ScopeHouse — Budget breakdown
   ---------------------------------------------------------- */

export const BudgetBreakdown: Story = {
  name: 'ScopeHouse — Budget Breakdown',
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Scope Item</TableHead>
          <TableHead>Trade</TableHead>
          <TableHead numeric>Qty</TableHead>
          <TableHead numeric>Unit Price</TableHead>
          <TableHead numeric>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[
          { item: 'Structural framing',   trade: 'Carpentry',  qty: 1,   unit: '$8,500.00',  total: '$8,500.00' },
          { item: 'Drywall supply & install', trade: 'Drywall', qty: 420, unit: '$4.50 /sf',  total: '$1,890.00' },
          { item: 'Interior painting',    trade: 'Painting',   qty: 420, unit: '$2.25 /sf',  total: '$945.00'   },
          { item: 'Tile — kitchen floor', trade: 'Tile',       qty: 85,  unit: '$12.00 /sf', total: '$1,020.00' },
          { item: 'Cabinetry supply',     trade: 'Millwork',   qty: 1,   unit: '$14,200.00', total: '$14,200.00'},
          { item: 'Countertop install',   trade: 'Millwork',   qty: 1,   unit: '$3,400.00',  total: '$3,400.00' },
          { item: 'Electrical rough-in',  trade: 'Electrical', qty: 1,   unit: '$6,800.00',  total: '$6,800.00' },
          { item: 'Plumbing rough-in',    trade: 'Plumbing',   qty: 1,   unit: '$5,200.00',  total: '$5,200.00' },
        ].map((row) => (
          <TableRow key={row.item}>
            <TableCell>{row.item}</TableCell>
            <TableCell muted>{row.trade}</TableCell>
            <TableCell numeric muted>{row.qty}</TableCell>
            <TableCell numeric muted>{row.unit}</TableCell>
            <TableCell numeric>{row.total}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFoot>
        <TableRow>
          <TableCell colSpan={4}>Contract Total</TableCell>
          <TableCell numeric>$41,955.00</TableCell>
        </TableRow>
      </TableFoot>
    </Table>
  ),
}


/* ----------------------------------------------------------
   ScopeHouse — Change order log
   ---------------------------------------------------------- */

export const ChangeOrderLog: Story = {
  name: 'ScopeHouse — Change Order Log',
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>CO #</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead numeric>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[
          { co: 'CO-001', desc: 'Additional blocking — island',    date: 'Jun 12, 2025', status: 'Approved', amount: '+$320.00',    positive: true  },
          { co: 'CO-002', desc: 'Upgraded countertop material',    date: 'Jun 19, 2025', status: 'Approved', amount: '+$1,800.00',  positive: true  },
          { co: 'CO-003', desc: 'Delete soffit',                   date: 'Jun 25, 2025', status: 'Approved', amount: '-$450.00',   positive: false },
          { co: 'CO-004', desc: 'Electrical panel upgrade',        date: 'Jul 3, 2025',  status: 'Pending',  amount: '+$3,200.00', positive: true  },
        ].map((row) => (
          <TableRow key={row.co}>
            <TableCell>
              <span className="font-mono text-xs">{row.co}</span>
            </TableCell>
            <TableCell>{row.desc}</TableCell>
            <TableCell muted>{row.date}</TableCell>
            <TableCell>
              <span className={row.status === 'Approved' ? 'text-[var(--color-growth)]' : 'text-[var(--color-caution)]'}>
                {row.status}
              </span>
            </TableCell>
            <TableCell numeric>
              <span className={row.positive ? 'text-[var(--color-growth)]' : 'text-signal'}>
                {row.amount}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFoot>
        <TableRow>
          <TableCell colSpan={4}>Net Change Orders</TableCell>
          <TableCell numeric>
            <span className="text-[var(--color-growth)]">+$4,870.00</span>
          </TableCell>
        </TableRow>
      </TableFoot>
    </Table>
  ),
}


/* ----------------------------------------------------------
   Empty state
   ---------------------------------------------------------- */

export const Empty: Story = {
  name: 'Empty State',
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Description</TableHead>
          <TableHead numeric>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell colSpan={2}>
            <p className="text-center text-sm text-smoke py-6">
              No items yet. Add a scope item to get started.
            </p>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
}
