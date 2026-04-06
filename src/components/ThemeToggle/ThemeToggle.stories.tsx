import type { Meta, StoryObj } from '@storybook/react-vite'
import { ThemeToggle } from './ThemeToggle'

const meta = {
  title:     'Components/ThemeToggle',
  component: ThemeToggle,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ThemeToggle>

export default meta
type Story = StoryObj<typeof meta>


/* ----------------------------------------------------------
   Default
   Click to toggle between light and dark.
   Persists to localStorage under the key "bh-theme".
   ---------------------------------------------------------- */

export const Default: Story = {}


/* ----------------------------------------------------------
   In topbar context
   ---------------------------------------------------------- */

export const InTopbar: Story = {
  render: () => (
    <div
      className="h-[var(--topbar-height)] flex items-center gap-4 px-5 bg-paper border-b border-rule"
      style={{ width: 480 }}
    >
      <span className="font-display font-bold text-sm uppercase tracking-[0.10em] text-void">
        ScopeHouse
      </span>
      <div className="ml-auto flex items-center gap-2">
        <ThemeToggle />
      </div>
    </div>
  ),
}


/* ----------------------------------------------------------
   All Variants — both icon states side-by-side (static preview)
   ---------------------------------------------------------- */

export const AllVariants: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      {/* Moon icon — shown when in light mode (click → go dark) */}
      <div className="flex flex-col items-center gap-2">
        <button
          type="button"
          aria-label="Switch to dark mode"
          className="inline-flex items-center justify-center w-8 h-8 rounded-md text-smoke hover:text-void hover:bg-rule transition-colors duration-fast ease-[var(--ease-standard)] cursor-pointer"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M13.5 9.5A6 6 0 0 1 6.5 2.5a6 6 0 1 0 7 7Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <span className="text-xs text-smoke font-body">Light mode</span>
      </div>

      {/* Sun icon — shown when in dark mode (click → go light) */}
      <div className="flex flex-col items-center gap-2">
        <button
          type="button"
          aria-label="Switch to light mode"
          className="inline-flex items-center justify-center w-8 h-8 rounded-md text-smoke hover:text-void hover:bg-rule transition-colors duration-fast ease-[var(--ease-standard)] cursor-pointer"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
            <path
              d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.42 1.42M11.53 11.53l1.42 1.42M3.05 12.95l1.42-1.42M11.53 4.47l1.42-1.42"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <span className="text-xs text-smoke font-body">Dark mode</span>
      </div>
    </div>
  ),
}
