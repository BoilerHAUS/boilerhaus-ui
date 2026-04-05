import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from '../Badge'
import { Skeleton } from '../Skeleton'
import { AspectRatio } from './AspectRatio'

const meta = {
  title:     'Components/AspectRatio',
  component: AspectRatio,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AspectRatio>

export default meta
type Story = StoryObj<typeof meta>

// Placeholder image — solid colour blocks so stories work without network
function PlaceholderImage({ label }: { label?: string }) {
  return (
    <div className="w-full h-full bg-rule flex items-center justify-center">
      <span className="font-display text-xs tracking-widest uppercase text-smoke">{label ?? 'Image'}</span>
    </div>
  )
}


/* ----------------------------------------------------------
   Common ratios
   ---------------------------------------------------------- */

export const Landscape: Story = {
  name: '16 / 9 — Landscape (default)',
  render: () => (
    <div className="w-80">
      <AspectRatio ratio={16 / 9}>
        <PlaceholderImage label="16 / 9" />
      </AspectRatio>
    </div>
  ),
}

export const Standard: Story = {
  name: '4 / 3 — Standard',
  render: () => (
    <div className="w-80">
      <AspectRatio ratio={4 / 3}>
        <PlaceholderImage label="4 / 3" />
      </AspectRatio>
    </div>
  ),
}

export const Square: Story = {
  name: '1 / 1 — Square',
  render: () => (
    <div className="w-64">
      <AspectRatio ratio={1}>
        <PlaceholderImage label="1 / 1" />
      </AspectRatio>
    </div>
  ),
}

export const Portrait: Story = {
  name: '3 / 4 — Portrait',
  render: () => (
    <div className="w-48">
      <AspectRatio ratio={3 / 4}>
        <PlaceholderImage label="3 / 4" />
      </AspectRatio>
    </div>
  ),
}


/* ----------------------------------------------------------
   All ratios side-by-side
   ---------------------------------------------------------- */

export const AllRatios: Story = {
  name: 'All Common Ratios',
  render: () => (
    <div className="flex items-end gap-4">
      {([
        [16, 9,  '16/9'],
        [4,  3,  '4/3'],
        [1,  1,  '1/1'],
        [3,  4,  '3/4'],
      ] as [number, number, string][]).map(([w, h, label]) => (
        <div key={label} className="w-32">
          <AspectRatio ratio={w / h} className="rounded-sm">
            <PlaceholderImage label={label} />
          </AspectRatio>
          <p className="text-xs text-smoke text-center mt-1.5">{label}</p>
        </div>
      ))}
    </div>
  ),
}


/* ----------------------------------------------------------
   With real <img> — object-cover fills the box
   ---------------------------------------------------------- */

export const WithImage: Story = {
  name: 'With <img> (object-cover)',
  render: () => (
    <div className="w-80 rounded-md overflow-hidden border border-rule">
      <AspectRatio ratio={16 / 9}>
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=640&q=80"
          alt="Construction site framing"
          className="w-full h-full object-cover"
        />
      </AspectRatio>
    </div>
  ),
}


/* ----------------------------------------------------------
   Loading skeleton
   ---------------------------------------------------------- */

export const LoadingSkeleton: Story = {
  name: 'Loading — Skeleton',
  render: () => (
    <div className="w-80">
      <AspectRatio ratio={16 / 9}>
        <Skeleton className="w-full h-full rounded-none" />
      </AspectRatio>
    </div>
  ),
}


/* ----------------------------------------------------------
   With overlay — badge + caption
   ---------------------------------------------------------- */

export const WithOverlay: Story = {
  name: 'With Overlay Content',
  render: () => (
    <div className="w-80 rounded-md overflow-hidden border border-rule relative">
      <AspectRatio ratio={4 / 3}>
        <div className="w-full h-full bg-ash" />
        {/* Top-left badge */}
        <div className="absolute top-2 left-2">
          <Badge variant="active">Master Bedroom</Badge>
        </div>
        {/* Bottom caption bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-[color-mix(in_srgb,var(--color-void)_70%,transparent)] px-3 py-2">
          <p className="text-xs text-paper font-medium">Uploaded 3 Apr 2026</p>
        </div>
      </AspectRatio>
    </div>
  ),
}


/* ----------------------------------------------------------
   ScopeHouse — Room photo grid
   ---------------------------------------------------------- */

const rooms = [
  { label: 'Living Room',   ratio: 16 / 9,  badge: 'neutral' as const },
  { label: 'Kitchen',       ratio: 4 / 3,   badge: 'active'  as const },
  { label: 'Master Bedroom', ratio: 4 / 3,  badge: 'neutral' as const },
  { label: 'Bathroom',      ratio: 1,        badge: 'warning' as const },
  { label: 'Exterior Front', ratio: 16 / 9, badge: 'success' as const },
  { label: 'Garage',        ratio: 16 / 9,  badge: 'neutral' as const },
]

export const RoomPhotoGrid: Story = {
  name: 'ScopeHouse — Room Photo Grid',
  render: () => (
    <div className="grid grid-cols-3 gap-3 w-[600px]">
      {rooms.map(({ label, ratio, badge }) => (
        <div key={label} className="rounded-sm overflow-hidden border border-rule relative group cursor-pointer">
          <AspectRatio ratio={ratio}>
            <div className="w-full h-full bg-rule transition-colors duration-fast group-hover:bg-smoke/20" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-fast">
              <span className="text-xs font-display font-bold tracking-widest uppercase text-void">View</span>
            </div>
          </AspectRatio>
          <div className="px-2 py-1.5 flex items-center justify-between gap-2 bg-paper">
            <span className="text-xs text-void truncate">{label}</span>
            <Badge variant={badge} className="shrink-0 text-[10px]">
              {badge === 'active' ? 'New' : badge === 'warning' ? 'Review' : badge === 'success' ? 'Done' : '—'}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  ),
}


/* ----------------------------------------------------------
   ScopeHouse — Single room upload card
   ---------------------------------------------------------- */

export const RoomUploadCard: Story = {
  name: 'ScopeHouse — Room Upload Card',
  render: () => (
    <div className="w-72 border border-rule rounded-md overflow-hidden">
      <AspectRatio ratio={4 / 3}>
        {/* Simulates an uploaded photo */}
        <div className="w-full h-full bg-ash flex items-center justify-center">
          <span className="font-display text-xs tracking-widest uppercase text-smoke">Photo</span>
        </div>
        <div className="absolute top-2 left-2">
          <Badge variant="active">Living Room</Badge>
        </div>
      </AspectRatio>
      <div className="p-3 flex flex-col gap-1 border-t border-rule">
        <p className="text-sm font-medium text-void">Living Room — North wall</p>
        <p className="text-xs text-smoke">Uploaded Apr 3, 2026 · 2.4 MB</p>
      </div>
    </div>
  ),
}
