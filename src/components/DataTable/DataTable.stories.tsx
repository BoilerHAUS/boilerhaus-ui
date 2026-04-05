import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Badge } from '../Badge'
import { DataTable } from './DataTable'
import type { DataTableColumn } from './DataTable'

const meta = {
  title:     'Components/DataTable',
  component: DataTable,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DataTable>

export default meta
type Story = StoryObj<typeof meta>


/* ----------------------------------------------------------
   Shared data — Change Orders
   ---------------------------------------------------------- */

interface ChangeOrder {
  id:          string
  number:      string
  description: string
  trade:       string
  amount:      number
  status:      'draft' | 'pending' | 'approved' | 'rejected'
  submitted:   string
}

const changeOrders: ChangeOrder[] = [
  { id: '1',  number: 'CO-001', description: 'Additional electrical outlets — Suite 4B',    trade: 'Electrical', amount:  3400,  status: 'approved', submitted: '2026-01-14' },
  { id: '2',  number: 'CO-002', description: 'Plumbing rough-in revision — Unit 7',         trade: 'Plumbing',   amount:  8250,  status: 'approved', submitted: '2026-01-19' },
  { id: '3',  number: 'CO-003', description: 'HVAC duct rerouting — Level 2',               trade: 'HVAC',       amount: 12600,  status: 'pending',  submitted: '2026-02-03' },
  { id: '4',  number: 'CO-004', description: 'Exterior wall framing addition — East wing',  trade: 'Framing',    amount:  5800,  status: 'approved', submitted: '2026-02-10' },
  { id: '5',  number: 'CO-005', description: 'Concrete slab pour — Parkade level B1',       trade: 'Concrete',   amount: 18400,  status: 'rejected', submitted: '2026-02-18' },
  { id: '6',  number: 'CO-006', description: 'Window substitution — north elevation',       trade: 'Glazing',    amount:  9100,  status: 'pending',  submitted: '2026-02-24' },
  { id: '7',  number: 'CO-007', description: 'Insulation upgrade — attic assembly',         trade: 'Insulation', amount:  4200,  status: 'approved', submitted: '2026-03-01' },
  { id: '8',  number: 'CO-008', description: 'Structural steel rework — column grid C4',   trade: 'Steel',      amount: 22750,  status: 'pending',  submitted: '2026-03-07' },
  { id: '9',  number: 'CO-009', description: 'Roofing membrane extension — section 3',     trade: 'Roofing',    amount:  6300,  status: 'draft',    submitted: '2026-03-12' },
  { id: '10', number: 'CO-010', description: 'Drywall repair — fire damage corridor B',    trade: 'Drywall',    amount:  3900,  status: 'pending',  submitted: '2026-03-18' },
  { id: '11', number: 'CO-011', description: 'Painting — additional coat exterior trim',   trade: 'Painting',   amount:  1800,  status: 'draft',    submitted: '2026-03-22' },
  { id: '12', number: 'CO-012', description: 'Landscaping grade adjustment — rear yard',   trade: 'Landscaping', amount: 7400,  status: 'approved', submitted: '2026-03-28' },
]

const coColumns: DataTableColumn<ChangeOrder>[] = [
  {
    key:     'number',
    header:  'CO #',
    sortable: true,
    headerClassName: 'w-24',
  },
  {
    key:     'description',
    header:  'Description',
    sortable: true,
  },
  {
    key:     'trade',
    header:  'Trade',
    sortable: true,
    headerClassName: 'w-32',
  },
  {
    key:     'amount',
    header:  'Amount',
    sortable: true,
    headerClassName: 'w-28 text-right',
    cellClassName:   'text-right tabular-nums',
    cell: (row) => new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(row.amount),
  },
  {
    key:     'status',
    header:  'Status',
    sortable: true,
    headerClassName: 'w-28',
    cell: (row) => {
      const map = {
        draft:    'neutral',
        pending:  'warning',
        approved: 'success',
        rejected: 'danger',
      } as const
      return <Badge variant={map[row.status]}>{row.status}</Badge>
    },
  },
  {
    key:     'submitted',
    header:  'Submitted',
    sortable: true,
    headerClassName: 'w-32',
    cell: (row) => new Intl.DateTimeFormat('en-CA', { dateStyle: 'medium' }).format(new Date(row.submitted)),
  },
]


/* ----------------------------------------------------------
   Default
   ---------------------------------------------------------- */

export const Default: Story = {
  args: {
    columns:      coColumns,
    data:         changeOrders,
    rowKey:       (row: ChangeOrder) => row.id,
    emptyMessage: 'No change orders found.',
  },
}


/* ----------------------------------------------------------
   With pagination
   ---------------------------------------------------------- */

export const WithPagination: Story = {
  name: 'With Pagination',
  args: {
    columns:      coColumns,
    data:         changeOrders,
    rowKey:       (row: ChangeOrder) => row.id,
    pageSize:     5,
    emptyMessage: 'No change orders found.',
  },
}


/* ----------------------------------------------------------
   With search
   ---------------------------------------------------------- */

export const WithSearch: Story = {
  name: 'With Search',
  args: {
    columns:           coColumns,
    data:              changeOrders,
    rowKey:            (row: ChangeOrder) => row.id,
    searchable:        true,
    searchPlaceholder: 'Search change orders…',
    emptyMessage:      'No change orders match your search.',
  },
}


/* ----------------------------------------------------------
   Full featured
   ---------------------------------------------------------- */

export const FullFeatured: Story = {
  name: 'Full Featured (search + pagination)',
  args: {
    columns:           coColumns,
    data:              changeOrders,
    rowKey:            (row: ChangeOrder) => row.id,
    pageSize:          5,
    searchable:        true,
    searchPlaceholder: 'Search change orders…',
    emptyMessage:      'No change orders match your search.',
    onRowClick:        fn(),
  },
}


/* ----------------------------------------------------------
   Empty state
   ---------------------------------------------------------- */

export const EmptyState: Story = {
  name: 'Empty State',
  args: {
    columns:      coColumns,
    data:         [],
    rowKey:       (row: ChangeOrder) => row.id,
    emptyMessage: 'No change orders have been submitted yet.',
  },
}


/* ----------------------------------------------------------
   ScopeHouse — Scope items table
   ---------------------------------------------------------- */

interface ScopeItem {
  id:       string
  code:     string
  description: string
  qty:      number
  unit:     string
  rate:     number
  status:   'not-started' | 'in-progress' | 'complete'
}

const scopeItems: ScopeItem[] = [
  { id: '1', code: 'FRM-001', description: 'Exterior wall framing — north',  qty: 420,  unit: 'LF',  rate: 28,  status: 'complete'    },
  { id: '2', code: 'FRM-002', description: 'Exterior wall framing — south',  qty: 380,  unit: 'LF',  rate: 28,  status: 'complete'    },
  { id: '3', code: 'FRM-003', description: 'Interior partition framing',      qty: 1240, unit: 'LF',  rate: 18,  status: 'in-progress' },
  { id: '4', code: 'FRM-004', description: 'Roof truss installation',         qty: 44,   unit: 'EA',  rate: 680, status: 'in-progress' },
  { id: '5', code: 'FRM-005', description: 'Sheathing — exterior walls',      qty: 6800, unit: 'SF',  rate: 3.2, status: 'not-started' },
  { id: '6', code: 'FRM-006', description: 'Sheathing — roof deck',           qty: 4200, unit: 'SF',  rate: 2.9, status: 'not-started' },
]

const scopeColumns: DataTableColumn<ScopeItem>[] = [
  { key: 'code',        header: 'Code',        sortable: true, headerClassName: 'w-28' },
  { key: 'description', header: 'Description', sortable: true },
  { key: 'qty',         header: 'Qty',         sortable: true, headerClassName: 'w-20 text-right', cellClassName: 'text-right tabular-nums' },
  { key: 'unit',        header: 'Unit',        headerClassName: 'w-16' },
  {
    key: 'rate', header: 'Rate', sortable: true,
    headerClassName: 'w-24 text-right',
    cellClassName: 'text-right tabular-nums',
    cell: (row) => `$${row.rate.toFixed(2)}`,
  },
  {
    key: 'total', header: 'Total', sortable: true,
    headerClassName: 'w-28 text-right',
    cellClassName: 'text-right tabular-nums font-medium',
    cell: (row) => new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(row.qty * row.rate),
  },
  {
    key: 'status', header: 'Status', sortable: true, headerClassName: 'w-32',
    cell: (row) => {
      const map = { 'not-started': 'neutral', 'in-progress': 'active', 'complete': 'success' } as const
      const labels = { 'not-started': 'Not Started', 'in-progress': 'In Progress', 'complete': 'Complete' }
      return <Badge variant={map[row.status]}>{labels[row.status]}</Badge>
    },
  },
]

export const ScopeItemsTable: Story = {
  name: 'ScopeHouse — Scope Items',
  args: {
    columns:    scopeColumns,
    data:       scopeItems,
    rowKey:     (row: ScopeItem) => row.id,
    searchable: true,
    searchPlaceholder: 'Search scope items…',
  },
}
