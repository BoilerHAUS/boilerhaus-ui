import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  PageShell,
  PageShellTopbar,
  PageShellBody,
  PageShellSidebar,
  PageShellContent,
  PageShellNavItem,
} from './PageShell'
import { Badge } from '../Badge/Badge'
import { Button } from '../Button/Button'

const meta = {
  title:     'Components/PageShell',
  component: PageShell,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PageShell>

export default meta
type Story = StoryObj<typeof meta>


/* ----------------------------------------------------------
   Icon helpers — inline SVG, stories-only
   ---------------------------------------------------------- */

function IconGrid() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="1" y="1" width="6" height="6" rx="1" />
      <rect x="9" y="1" width="6" height="6" rx="1" />
      <rect x="1" y="9" width="6" height="6" rx="1" />
      <rect x="9" y="9" width="6" height="6" rx="1" />
    </svg>
  )
}

function IconDoc() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 1h6l3 3v10a1 1 0 01-1 1H4a1 1 0 01-1-1V2a1 1 0 011-1z" />
      <path d="M10 1v3h3" />
      <path d="M5 7h6M5 10h4" />
    </svg>
  )
}

function IconClock() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="8" cy="8" r="6.5" />
      <path d="M8 4.5V8l2.5 2" />
    </svg>
  )
}

function IconSettings() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="8" cy="8" r="2" />
      <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.42 1.42M11.53 11.53l1.42 1.42M3.05 12.95l1.42-1.42M11.53 4.47l1.42-1.42" />
    </svg>
  )
}

function IconUser() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="8" cy="5.5" r="2.5" />
      <path d="M2 14c0-3.31 2.69-6 6-6s6 2.69 6 6" />
    </svg>
  )
}


/* ----------------------------------------------------------
   Shared shell wrapper for stories
   ---------------------------------------------------------- */

function ScopeHouseShell({
  activeItem = 'projects',
  children,
}: {
  activeItem?: string
  children: React.ReactNode
}) {
  return (
    <PageShell style={{ height: '100vh' }}>
      <PageShellTopbar>
        {/* Brand */}
        <span className="font-display font-bold text-base uppercase tracking-[0.08em] text-void select-none">
          ScopeHouse
        </span>
        {/* Spacer */}
        <div className="flex-1" />
        {/* User area */}
        <div className="flex items-center gap-2 text-sm text-smoke">
          <IconUser />
          <span>J. Morrison</span>
        </div>
      </PageShellTopbar>

      <PageShellBody>
        <PageShellSidebar>
          {/* Sidebar header */}
          <div className="px-4 py-4 border-b border-[color-mix(in_srgb,var(--color-paper)_10%,transparent)]">
            <p className="text-xs font-display font-bold uppercase tracking-[0.10em] text-[color-mix(in_srgb,var(--color-paper)_40%,transparent)]">
              Navigation
            </p>
          </div>

          <nav className="flex flex-col py-2">
            <PageShellNavItem icon={<IconGrid />} active={activeItem === 'projects'}>
              Projects
            </PageShellNavItem>
            <PageShellNavItem icon={<IconDoc />} active={activeItem === 'change-orders'}>
              Change Orders
            </PageShellNavItem>
            <PageShellNavItem icon={<IconClock />} active={activeItem === 'schedule'}>
              Schedule
            </PageShellNavItem>
          </nav>

          {/* Push settings to bottom */}
          <div className="flex-1" />
          <div className="py-2 border-t border-[color-mix(in_srgb,var(--color-paper)_10%,transparent)]">
            <PageShellNavItem icon={<IconSettings />} active={activeItem === 'settings'}>
              Settings
            </PageShellNavItem>
          </div>
        </PageShellSidebar>

        <PageShellContent>
          {children}
        </PageShellContent>
      </PageShellBody>
    </PageShell>
  )
}


/* ----------------------------------------------------------
   Stories
   ---------------------------------------------------------- */

export const Default: Story = {
  render: () => (
    <ScopeHouseShell activeItem="projects">
      <p className="text-smoke text-sm">Main content area</p>
    </ScopeHouseShell>
  ),
}

export const ProjectList: Story = {
  name: 'ScopeHouse — Project List',
  render: () => (
    <ScopeHouseShell activeItem="projects">
      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display font-bold text-2xl uppercase tracking-[0.06em] text-void">
          Projects
        </h1>
        <Button variant="primary">New Project</Button>
      </div>

      {/* Project rows */}
      <div className="flex flex-col gap-3">
        {[
          { name: '123 Main St — Kitchen Reno',  client: 'J. Morrison', value: '$48,500', status: 'active'   as const, statusLabel: 'In Progress' },
          { name: '88 Queen St — Bathroom',       client: 'P. Nakamura', value: '$22,000', status: 'warning'  as const, statusLabel: 'On Hold'     },
          { name: '45 Elm Ave — Basement Finish', client: 'R. Okafor',   value: '$31,200', status: 'neutral'  as const, statusLabel: 'Draft'        },
          { name: '12 Oak Lane — Full Reno',      client: 'S. Petit',    value: '$94,000', status: 'success'  as const, statusLabel: 'Complete'     },
        ].map((p) => (
          <div
            key={p.name}
            className="flex items-center justify-between px-5 py-4 bg-paper border border-rule rounded-sm hover:shadow-[var(--shadow-sm)] transition-shadow duration-fast"
          >
            <div className="flex flex-col gap-1">
              <span className="font-display font-bold text-sm uppercase tracking-[0.06em] text-void">{p.name}</span>
              <span className="text-xs text-smoke">{p.client}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-void">{p.value}</span>
              <Badge variant={p.status}>{p.statusLabel}</Badge>
            </div>
          </div>
        ))}
      </div>
    </ScopeHouseShell>
  ),
}

export const ChangeOrders: Story = {
  name: 'ScopeHouse — Change Orders',
  render: () => (
    <ScopeHouseShell activeItem="change-orders">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display font-bold text-2xl uppercase tracking-[0.06em] text-void">
          Change Orders
        </h1>
        <Button variant="primary">New Change Order</Button>
      </div>
      <p className="text-sm text-smoke">Change order list goes here.</p>
    </ScopeHouseShell>
  ),
}

export const AllNavItemStates: Story = {
  name: 'NavItem — All States',
  parameters: { layout: 'centered', backgrounds: { default: 'void' } },
  render: () => (
    <div style={{ width: '280px', background: 'var(--color-ash)', padding: '8px 0' }}>
      <PageShellNavItem icon={<IconGrid />}>Default</PageShellNavItem>
      <PageShellNavItem icon={<IconDoc />} active>Active</PageShellNavItem>
      <PageShellNavItem icon={<IconClock />}>Another Item</PageShellNavItem>
    </div>
  ),
}
