import type { Meta, StoryObj } from '@storybook/react-vite'
import { Avatar, AvatarGroup } from './Avatar'

const meta = {
  title:     'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>


/* ----------------------------------------------------------
   Default — image
   ---------------------------------------------------------- */

export const WithImage: Story = {
  name: 'With Image',
  args: {
    src: 'https://i.pravatar.cc/150?img=3',
    alt: 'Jordan Lee',
  },
}


/* ----------------------------------------------------------
   Fallback — initials
   ---------------------------------------------------------- */

export const Initials: Story = {
  name: 'Initials Fallback',
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar alt="Jordan Lee" />
      <Avatar alt="Alex Kovacs" />
      <Avatar alt="Sam" />
      <Avatar alt="Maria da Silva" />
      <Avatar alt="T" />
    </div>
  ),
}


/* ----------------------------------------------------------
   Sizes
   ---------------------------------------------------------- */

export const Sizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-center gap-2">
        <Avatar alt="Jordan Lee" size="sm" />
        <span className="text-sm text-smoke">sm</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar alt="Jordan Lee" size="md" />
        <span className="text-sm text-smoke">md</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar alt="Jordan Lee" size="lg" />
        <span className="text-sm text-smoke">lg</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar alt="Jordan Lee" size="xl" />
        <span className="text-sm text-smoke">xl</span>
      </div>
    </div>
  ),
}


/* ----------------------------------------------------------
   Colour variance
   ---------------------------------------------------------- */

export const Colors: Story = {
  name: 'Fallback Colour Variance',
  render: () => (
    <div className="flex items-center gap-3">
      {[
        'Alex Kovacs',
        'Jordan Lee',
        'Maria da Silva',
        'Sam Chen',
        'Taylor Brooks',
        'Robin Walsh',
      ].map((name) => (
        <Avatar key={name} alt={name} size="lg" />
      ))}
    </div>
  ),
}


/* ----------------------------------------------------------
   AvatarGroup
   ---------------------------------------------------------- */

export const Group: Story = {
  name: 'AvatarGroup',
  render: () => (
    <div className="flex flex-col gap-6 items-start">
      {/* Basic group */}
      <AvatarGroup>
        <Avatar alt="Alex Kovacs" />
        <Avatar alt="Jordan Lee" />
        <Avatar alt="Maria da Silva" />
      </AvatarGroup>

      {/* With overflow */}
      <AvatarGroup max={3}>
        <Avatar alt="Alex Kovacs" />
        <Avatar alt="Jordan Lee" />
        <Avatar alt="Maria da Silva" />
        <Avatar alt="Sam Chen" />
        <Avatar alt="Taylor Brooks" />
        <Avatar alt="Robin Walsh" />
      </AvatarGroup>

      {/* Large */}
      <AvatarGroup size="lg" max={4}>
        <Avatar alt="Alex Kovacs"   size="lg" />
        <Avatar alt="Jordan Lee"    size="lg" />
        <Avatar alt="Maria da Silva" size="lg" />
        <Avatar alt="Sam Chen"      size="lg" />
        <Avatar alt="Taylor Brooks" size="lg" />
      </AvatarGroup>
    </div>
  ),
}


/* ----------------------------------------------------------
   ScopeHouse — Team row on project card
   ---------------------------------------------------------- */

export const TeamRow: Story = {
  name: 'ScopeHouse — Project Team Row',
  render: () => (
    <div className="w-80 border border-rule rounded-md p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="font-display text-xs tracking-widest uppercase text-smoke">Assigned Team</span>
        <span className="text-sm text-smoke">6 members</span>
      </div>
      <AvatarGroup max={4} size="md">
        <Avatar alt="Alex Kovacs" />
        <Avatar alt="Jordan Lee" />
        <Avatar alt="Maria da Silva" />
        <Avatar alt="Sam Chen" />
        <Avatar alt="Taylor Brooks" />
        <Avatar alt="Robin Walsh" />
      </AvatarGroup>
    </div>
  ),
}


/* ----------------------------------------------------------
   ScopeHouse — Assignee chip inline
   ---------------------------------------------------------- */

export const AssigneeChip: Story = {
  name: 'ScopeHouse — Inline Assignee',
  render: () => (
    <div className="flex items-center gap-2">
      <Avatar alt="Jordan Lee" size="sm" />
      <span className="text-sm text-void">Jordan Lee</span>
    </div>
  ),
}
