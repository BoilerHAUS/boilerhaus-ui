import type { Preview } from '@storybook/react-vite'

// Full CSS chain: Tailwind base → tokens (@theme + :root vars) → base styles
import '../src/index.css'

const preview: Preview = {
  parameters: {
    layout: 'centered',

    backgrounds: {
      default: 'paper',
      values: [
        { name: 'paper', value: '#F7F5F0' }, // --color-paper
        { name: 'void',  value: '#0C0C0C' }, // --color-void
        { name: 'ash',   value: '#2E2C2A' }, // --color-ash
        { name: 'white', value: '#ffffff' },
      ],
    },

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date:  /Date$/i,
      },
    },

    a11y: {
      test: 'todo',
    },
  },
}

export default preview
