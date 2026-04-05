# CLAUDE.md — boilerhaus-ui

Design system for Boilerhaus and ScopeHouse. Token-based, Bauhaus-inspired.

**Canonical design spec and brand identity:** `../boilerhaus-ops/CLAUDE.md`
**Company:** Boilerhaus (legal entity) — ScopeHouse (first product)
**Country:** Canada

---

## Stack

| Layer | Package |
|-------|---------|
| Build | Vite 8 + TypeScript 5 + `@tailwindcss/vite` |
| UI | React 19 |
| Styling | Tailwind v4 (CSS-first, no config file) + CSS custom properties |
| Primitives | Radix UI (headless, accessible — install per-package as needed) |
| Class util | `cn()` in `src/lib/cn.ts` — `clsx` + `tailwind-merge` |
| Stories | Storybook 10 (`@storybook/react-vite`) |
| Tests | Vitest 4 + `@storybook/addon-vitest` (story-based) |

---

## Token Rules — Non-Negotiable

1. **Never use raw values.** No hex codes, no arbitrary `px`, no bare `ms` durations — in Tailwind classes or CSS.
2. **Two ways to use tokens:**
   - **Tailwind utility** (preferred in JSX): `bg-signal`, `text-void`, `border-rule`, `font-display`, `text-sm`, `rounded-md`, `duration-fast`
   - **CSS custom property** (for non-utility CSS): `var(--color-signal)`, `var(--space-4)`, `var(--ease-standard)`
3. **Token source of truth:** `src/tokens/tokens.css`. The `@theme` block generates Tailwind utilities. The `:root` block covers spacing, motion, shadows, and semantic aliases.
4. **To add a token:** add to `@theme` (if it needs a utility class) or `:root` (if CSS var only). Update this file's "Token Reference" section.
5. **Semantic aliases** (`--color-text-primary`, `--color-border`, etc.) — prefer in CSS over raw token names.

---

## Component Anatomy

Every component in `src/components/<Name>/`:

```
<Name>.tsx          — props interface (exported) + function component
                      styles live here as Tailwind classes via cn()
<Name>.stories.tsx  — stories for all variants + edge cases (disabled, etc.)
index.ts            — re-export: export { Name } from './<Name>'
```

Separate CSS files only when Tailwind utilities are genuinely insufficient (e.g. complex keyframe animations). Use `cn()` from `src/lib/cn.ts` for all class composition.

Export from `src/components/index.ts`.

## Radix UI Pattern

Install primitives individually: `npm install @radix-ui/react-<primitive>`

Use `asChild` for polymorphic rendering (e.g. Button rendered as `<a>`):
```tsx
import { Slot } from '@radix-ui/react-slot'
const Comp = asChild ? Slot : 'button'
return <Comp className={cn(...)} {...props}>{children}</Comp>
```

Radix handles: focus management, ARIA attributes, keyboard navigation, portal rendering.

---

## CSS Naming Convention

- **Prefix:** `bh-` on every class (prevents collision with host apps)
- **Block:** `bh-<component>` → `bh-button`
- **Modifier:** `bh-<component>--<variant>` → `bh-button--primary`
- **Element:** `bh-<component>__<part>` → `bh-button__icon`

---

## Story Conventions

- `title:` → `'Components/<Name>'`
- Always include `tags: ['autodocs']`
- Export one story per documented variant
- Export one `AllVariants` render story showing all variants together
- Use `fn()` from `storybook/test` for callback args (enables Actions panel)

---

## Accessibility Requirements

- WCAG AA minimum — color contrast verified on every variant
- Focus states always visible (`:focus-visible` ring using `--color-signal-alt`)
- Interactive elements have explicit `aria-*` attributes where needed
- All stories pass `@storybook/addon-a11y` checks

---

## How to Add a Component

1. Create `src/components/<Name>/` directory
2. Write the stories file first — this defines the public API
3. Implement the component to pass visual review in Storybook
4. Export from `src/components/index.ts`
5. Verify a11y panel shows no violations

---

## File Structure

```
boilerhaus-ui/
├── CLAUDE.md                    ← this file
├── index.html                   ← Google Fonts link, base meta
├── src/
│   ├── tokens/
│   │   └── tokens.css           ← all CSS custom properties
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.css
│   │   │   ├── Button.stories.tsx
│   │   │   └── index.ts
│   │   └── index.ts             ← barrel export
│   ├── index.css                ← base styles, imports tokens.css
│   └── main.tsx                 ← app entry (demo only)
├── .storybook/
│   ├── main.ts                  ← Storybook config
│   └── preview.ts               ← imports tokens.css, global parameters
└── vite.config.ts
```

---

## Token Reference

### Colors

| Token | Value | Use |
|-------|-------|-----|
| `--color-void` | `#0C0C0C` | Primary text, headers |
| `--color-paper` | `#F7F5F0` | Primary background |
| `--color-signal` | `#D92B2B` | Bauhaus red, CTAs |
| `--color-signal-alt` | `#1A52CC` | Bauhaus blue, links, focus rings |
| `--color-rule` | `#E2DED8` | Borders, dividers |
| `--color-smoke` | `#6B6660` | Secondary text, captions |
| `--color-ash` | `#2E2C2A` | Dark sidebar, code backgrounds |
| `--color-caution` | `#9A6F00` | Bauhaus amber, warning states |
| `--color-growth` | `#1B6B3A` | Forest green, success/completion |

Semantic aliases: `--color-text-primary`, `--color-text-secondary`, `--color-bg-primary`, `--color-bg-inverted`, `--color-accent`, `--color-border`

Status aliases: `--color-status-neutral`, `--color-status-active`, `--color-status-warning`, `--color-status-danger`, `--color-status-success`

### Type Scale (major third, 1.25 ratio)

`--type-xs` (0.64rem) → `--type-sm` (0.80rem) → `--type-base` (1rem) → `--type-md` → `--type-lg` → `--type-xl` → `--type-2xl` → `--type-3xl` → `--type-4xl` (3.81rem)

### Spacing (8px base)

`--space-1` (4px) → `--space-2` (8px) → `--space-3` (12px) → `--space-4` (16px) → `--space-5` (24px) → `--space-6` (32px) → `--space-7` (48px) → `--space-8` (64px) → `--space-9` (96px) → `--space-10` (128px)

### Motion

No bounce, no spring. `--ease-standard: cubic-bezier(0.4, 0, 0.2, 1)`
Durations: `--duration-fast` (100ms) → `--duration-base` (200ms) → `--duration-slow` (350ms) → `--duration-xslow` (500ms)

---

## Rules for Claude in This Repo

1. **Read before modifying.** Check existing component/token before changing anything.
2. **Tokens only.** No raw values anywhere in component CSS.
3. **One component, one concern.** No cross-component dependencies in CSS.
4. **Stories first.** Define the API in the story before implementing.
5. **Accessibility is not optional.** Every component ships with verified focus states and contrast.
6. **No CSS-in-JS.** No styled-components, no emotion, no inline `style={{}}` for anything tokens cover.
7. **Prefer editing to creating.** Don't add new util files or helpers unless strictly necessary — `cn()` is the only class utility needed.
