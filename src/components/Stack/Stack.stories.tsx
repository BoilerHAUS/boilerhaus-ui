import type { Meta, StoryObj } from '@storybook/react'
import { Stack } from './Stack'

const meta: Meta<typeof Stack> = {
  title: 'Layout/Stack',
  component: Stack,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj<typeof Stack>

// Helper block for visual spacing demos
function Block({ label }: { label: string }) {
  return (
    <div
      style={{
        background: 'var(--color-rule)',
        color: 'var(--color-text-secondary)',
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--type-xs)',
        padding: '12px 16px',
        borderRadius: 'var(--radius-md)',
        minWidth: 80,
        textAlign: 'center',
      }}
    >
      {label}
    </div>
  )
}

export const Vertical: Story = {
  render: () => (
    <Stack gap={4}>
      <Block label="Item 1" />
      <Block label="Item 2" />
      <Block label="Item 3" />
    </Stack>
  ),
}

export const Horizontal: Story = {
  render: () => (
    <Stack direction="row" gap={4} align="center">
      <Block label="Item 1" />
      <Block label="Item 2" />
      <Block label="Item 3" />
    </Stack>
  ),
}

export const GapScale: Story = {
  render: () => (
    <Stack gap={8}>
      {([1, 2, 3, 4, 5, 6] as const).map((g) => (
        <Stack key={g} direction="row" align="center" gap={4}>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--type-xs)',
              color: 'var(--color-text-secondary)',
              width: 40,
              textAlign: 'right',
              flexShrink: 0,
            }}
          >
            gap={g}
          </div>
          <Stack direction="row" gap={g} align="center">
            <Block label="A" />
            <Block label="B" />
            <Block label="C" />
          </Stack>
        </Stack>
      ))}
    </Stack>
  ),
}

export const JustifyBetween: Story = {
  render: () => (
    <Stack direction="row" justify="between" align="center" style={{ width: '100%' }}>
      <Block label="Start" />
      <Block label="Center" />
      <Block label="End" />
    </Stack>
  ),
}

export const Wrap: Story = {
  render: () => (
    <Stack direction="row" gap={3} wrap style={{ maxWidth: 320 }}>
      {['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta'].map((name) => (
        <Block key={name} label={name} />
      ))}
    </Stack>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <Stack gap={8}>
      <div>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--type-sm)', color: 'var(--color-text-secondary)', marginBottom: 8 }}>
          Column (default)
        </p>
        <Stack gap={3}>
          <Block label="Item 1" />
          <Block label="Item 2" />
          <Block label="Item 3" />
        </Stack>
      </div>

      <div>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--type-sm)', color: 'var(--color-text-secondary)', marginBottom: 8 }}>
          Row
        </p>
        <Stack direction="row" gap={3} align="center">
          <Block label="Item 1" />
          <Block label="Item 2" />
          <Block label="Item 3" />
        </Stack>
      </div>

      <div>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--type-sm)', color: 'var(--color-text-secondary)', marginBottom: 8 }}>
          Row — justify between
        </p>
        <Stack direction="row" justify="between" align="center" style={{ width: '100%' }}>
          <Block label="Left" />
          <Block label="Right" />
        </Stack>
      </div>
    </Stack>
  ),
}
