import type { Meta, StoryObj } from '@storybook/react'
import { Container } from './Container'

const meta: Meta<typeof Container> = {
  title: 'Layout/Container',
  component: Container,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof Container>

function Slab({ label, width }: { label: string; width: string }) {
  return (
    <div
      style={{
        background: 'var(--color-rule)',
        padding: 'var(--space-5)',
        textAlign: 'center',
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--type-sm)',
        color: 'var(--color-text-secondary)',
        borderRadius: 'var(--radius-md)',
      }}
    >
      <strong style={{ color: 'var(--color-text-primary)', display: 'block' }}>{label}</strong>
      max-width: {width}
    </div>
  )
}

export const Small: Story = {
  render: () => (
    <Container size="sm">
      <Slab label="Container sm" width="640px" />
    </Container>
  ),
}

export const Medium: Story = {
  render: () => (
    <Container size="md">
      <Slab label="Container md" width="960px" />
    </Container>
  ),
}

export const Large: Story = {
  render: () => (
    <Container size="lg">
      <Slab label="Container lg" width="1280px (--grid-max-width)" />
    </Container>
  ),
}

export const Full: Story = {
  render: () => (
    <Container size="full">
      <Slab label="Container full" width="100%" />
    </Container>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', padding: 'var(--space-4) 0' }}>
      {(['sm', 'md', 'lg', 'full'] as const).map((size) => (
        <Container key={size} size={size}>
          <Slab
            label={`size="${size}"`}
            width={{ sm: '640px', md: '960px', lg: '1280px', full: '100%' }[size]}
          />
        </Container>
      ))}
    </div>
  ),
}
