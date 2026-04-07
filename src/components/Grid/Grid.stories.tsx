import type { Meta, StoryObj } from '@storybook/react'
import { Grid, GridCol } from './Grid'

const meta: Meta<typeof Grid> = {
  title: 'Layout/Grid',
  component: Grid,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj<typeof Grid>

function Cell({ label, accent = false }: { label: string; accent?: boolean }) {
  return (
    <div
      style={{
        background: accent ? 'var(--color-signal-alt)' : 'var(--color-rule)',
        color: accent ? 'var(--color-paper)' : 'var(--color-text-secondary)',
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--type-xs)',
        padding: '12px 8px',
        borderRadius: 'var(--radius-md)',
        textAlign: 'center',
      }}
    >
      {label}
    </div>
  )
}

export const TwelveColumn: Story = {
  render: () => (
    <Grid cols={12} gap={3}>
      {Array.from({ length: 12 }, (_, i) => (
        <GridCol key={i} span={1}>
          <Cell label="1" />
        </GridCol>
      ))}
    </Grid>
  ),
}

export const HalfHalf: Story = {
  render: () => (
    <Grid gap={5}>
      <GridCol span={6}><Cell label="6 / 12" accent /></GridCol>
      <GridCol span={6}><Cell label="6 / 12" accent /></GridCol>
    </Grid>
  ),
}

export const ThreeColumns: Story = {
  render: () => (
    <Grid gap={5}>
      <GridCol span={4}><Cell label="4 / 12" accent /></GridCol>
      <GridCol span={4}><Cell label="4 / 12" accent /></GridCol>
      <GridCol span={4}><Cell label="4 / 12" accent /></GridCol>
    </Grid>
  ),
}

export const AsymmetricLayout: Story = {
  name: 'Asymmetric (sidebar + content)',
  render: () => (
    <Grid gap={5}>
      <GridCol span={3}><Cell label="3 — sidebar" /></GridCol>
      <GridCol span={9}><Cell label="9 — content" accent /></GridCol>
    </Grid>
  ),
}

export const FormLayout: Story = {
  name: 'Two-column form row',
  render: () => (
    <Grid gap={5} rowGap={4}>
      <GridCol span={6}><Cell label="First name" accent /></GridCol>
      <GridCol span={6}><Cell label="Last name" accent /></GridCol>
      <GridCol span={12}><Cell label="Email" /></GridCol>
      <GridCol span={8}><Cell label="Address" /></GridCol>
      <GridCol span={4}><Cell label="Postal code" /></GridCol>
    </Grid>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
      <div>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--type-sm)', color: 'var(--color-text-secondary)', marginBottom: 8 }}>
          12 equal columns
        </p>
        <Grid cols={12} gap={2}>
          {Array.from({ length: 12 }, (_, i) => (
            <GridCol key={i} span={1}><Cell label={String(i + 1)} /></GridCol>
          ))}
        </Grid>
      </div>
      <div>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--type-sm)', color: 'var(--color-text-secondary)', marginBottom: 8 }}>
          Common splits: 6/6 • 4/4/4 • 3/9 • 8/4
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <Grid gap={3}>
            <GridCol span={6}><Cell label="6" accent /></GridCol>
            <GridCol span={6}><Cell label="6" accent /></GridCol>
          </Grid>
          <Grid gap={3}>
            <GridCol span={4}><Cell label="4" /></GridCol>
            <GridCol span={4}><Cell label="4" /></GridCol>
            <GridCol span={4}><Cell label="4" /></GridCol>
          </Grid>
          <Grid gap={3}>
            <GridCol span={3}><Cell label="3" /></GridCol>
            <GridCol span={9}><Cell label="9" accent /></GridCol>
          </Grid>
          <Grid gap={3}>
            <GridCol span={8}><Cell label="8" accent /></GridCol>
            <GridCol span={4}><Cell label="4" /></GridCol>
          </Grid>
        </div>
      </div>
    </div>
  ),
}
