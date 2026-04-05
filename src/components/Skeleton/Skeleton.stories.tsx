import type { Meta, StoryObj } from '@storybook/react-vite'
import { Skeleton } from './Skeleton'

const meta = {
  title:     'Components/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>


/* ----------------------------------------------------------
   Default
   ---------------------------------------------------------- */

export const Default: Story = {
  render: () => <Skeleton className="w-48 h-4" />,
}


/* ----------------------------------------------------------
   Text lines
   ---------------------------------------------------------- */

export const TextLines: Story = {
  name: 'Text Paragraph',
  render: () => (
    <div className="flex flex-col gap-2 w-72">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-4/5" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  ),
}


/* ----------------------------------------------------------
   Avatar
   ---------------------------------------------------------- */

export const AvatarShape: Story = {
  name: 'Avatar',
  render: () => (
    <div className="flex items-center gap-3">
      <Skeleton className="w-10 h-10 rounded-full" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  ),
}


/* ----------------------------------------------------------
   Card
   ---------------------------------------------------------- */

export const CardShape: Story = {
  name: 'Card',
  render: () => (
    <div className="w-72 border border-rule rounded-md p-4 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-5 w-16 rounded-sm" />
      </div>
      {/* Body lines */}
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
      {/* Footer */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-8 w-24 rounded-sm" />
        <Skeleton className="h-8 w-24 rounded-sm" />
      </div>
    </div>
  ),
}


/* ----------------------------------------------------------
   Table rows
   ---------------------------------------------------------- */

export const TableRows: Story = {
  name: 'Table Rows',
  render: () => (
    <div className="w-full max-w-lg border border-rule rounded-md overflow-hidden">
      {/* Header */}
      <div className="flex gap-4 px-4 py-3 border-b border-rule bg-paper">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-3 w-16 ml-auto" />
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-3 w-16" />
      </div>
      {/* Rows */}
      {[80, 64, 72, 56].map((w, i) => (
        <div key={i} className="flex gap-4 items-center px-4 py-3 border-b border-rule last:border-b-0">
          <Skeleton className="h-4" style={{ width: `${w}px` }} />
          <Skeleton className="h-4 w-12 ml-auto" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-6 w-16 rounded-sm" />
        </div>
      ))}
    </div>
  ),
}


/* ----------------------------------------------------------
   ScopeHouse — Project list loading state
   ---------------------------------------------------------- */

export const ProjectList: Story = {
  name: 'ScopeHouse — Project List Loading',
  render: () => (
    <div className="w-full max-w-md flex flex-col gap-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="border border-rule rounded-md p-4 flex flex-col gap-3">
          <div className="flex items-start justify-between">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-5 w-20 rounded-sm" />
          </div>
          <Skeleton className="h-4 w-full" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-1.5 flex-1 rounded-full" />
            <Skeleton className="h-4 w-8" />
          </div>
        </div>
      ))}
    </div>
  ),
}


/* ----------------------------------------------------------
   KPI Stat tile
   ---------------------------------------------------------- */

export const StatTile: Story = {
  name: 'KPI Stat Tile',
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="border border-rule rounded-md p-4 flex flex-col gap-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-8 w-28" />
          <Skeleton className="h-3 w-16" />
        </div>
      ))}
    </div>
  ),
}
