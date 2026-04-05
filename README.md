# BoilerHAUS UI

`@boilerhaus-ui/boilerhaus-ui` is the BoilerHAUS design system package: a Bauhaus-inspired React component library for BoilerHAUS, ScopeHouse, and related products.

It combines:
- design tokens in CSS
- React 19 components
- Tailwind v4 utilities generated from tokens
- Radix UI primitives for accessibility
- Storybook as the primary component workshop

## Stack

- React 19
- TypeScript 5
- Vite 8
- Tailwind CSS v4
- Storybook 10
- Radix UI

## Package

```bash
npm install @boilerhaus-ui/boilerhaus-ui
```

```tsx
import { Button } from '@boilerhaus-ui/boilerhaus-ui'
import '@boilerhaus-ui/boilerhaus-ui/tokens.css'
```

If the consuming app uses Tailwind v4, include the package as a source so Tailwind sees the shipped class names:

```css
@import "tailwindcss";
@import "@boilerhaus-ui/boilerhaus-ui/tokens.css";
@source "../node_modules/@boilerhaus-ui/boilerhaus-ui/dist";
```

## Local Development

Install dependencies:

```bash
npm install
```

Run the local Vite app:

```bash
npm run dev
```

Run Storybook:

```bash
npm run storybook
```

Build the package library:

```bash
npm run build:lib
```

Build Storybook:

```bash
npm run build-storybook
```

Lint the repo:

```bash
npm run lint
```

## Workflow

Storybook is the main development surface for this repo.

The expected component workflow is:
1. Define the API in `<Component>.stories.tsx`
2. Implement the component in `<Component>.tsx`
3. Export it from its local `index.ts`
4. Re-export it from [`src/components/index.ts`](/media/boilerrat/Bobby/boilerhaus-ui/src/components/index.ts)
5. Verify accessibility and visual states in Storybook

## Design Rules

- Use tokens only. Do not introduce raw hex values, arbitrary spacing, or ad hoc durations.
- Prefer Tailwind token utilities in JSX such as `bg-signal`, `text-void`, `border-rule`, `rounded-md`, and `duration-fast`.
- Use CSS custom properties from [`src/tokens/tokens.css`](/media/boilerrat/Bobby/boilerhaus-ui/src/tokens/tokens.css) when utilities are not enough.
- Keep components isolated. Avoid cross-component styling dependencies.
- Favor Radix primitives for focus management, keyboard behavior, and ARIA support.

The canonical repo rules and design constraints live in [`CLAUDE.md`](/media/boilerrat/Bobby/boilerhaus-ui/CLAUDE.md).

## Structure

```text
boilerhaus-ui/
├── .storybook/         Storybook config
├── src/
│   ├── components/     Reusable UI components
│   ├── lib/            Shared helpers such as cn()
│   ├── tokens/         Design tokens
│   ├── index.css       Base styles
│   └── index.ts        Public library entry
├── package.json
└── CLAUDE.md
```

## Current Component Set

The library currently includes:

- Accordion
- Alert
- AspectRatio
- Avatar
- Badge
- Breadcrumb
- Button
- Card
- Checkbox
- Combobox
- DataTable
- DatePicker
- Dialog
- DropdownMenu
- FileUpload
- Input
- Label
- PageShell
- Popover
- Progress
- RadioGroup
- Select
- Skeleton
- Spinner
- Stat
- Stepper
- Switch
- Table
- Tabs
- Textarea
- Toast
- Tooltip

## Publishing

This package publishes to npm as a public scoped package:

```bash
npm publish
```

Package name:

```text
@boilerhaus-ui/boilerhaus-ui
```

`prepublishOnly` automatically runs the library build before publishing.
