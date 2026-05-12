---
name: Internal Enterprise Design System
colors:
  surface: '#faf8ff'
  surface-dim: '#d9d9e5'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3fe'
  surface-container: '#ededf9'
  surface-container-high: '#e7e7f3'
  surface-container-highest: '#e1e2ed'
  on-surface: '#191b23'
  on-surface-variant: '#434655'
  inverse-surface: '#2e3039'
  inverse-on-surface: '#f0f0fb'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#505f76'
  on-secondary: '#ffffff'
  secondary-container: '#d0e1fb'
  on-secondary-container: '#54647a'
  tertiary: '#943700'
  on-tertiary: '#ffffff'
  tertiary-container: '#bc4800'
  on-tertiary-container: '#ffede6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#d3e4fe'
  secondary-fixed-dim: '#b7c8e1'
  on-secondary-fixed: '#0b1c30'
  on-secondary-fixed-variant: '#38485d'
  tertiary-fixed: '#ffdbcd'
  tertiary-fixed-dim: '#ffb596'
  on-tertiary-fixed: '#360f00'
  on-tertiary-fixed-variant: '#7d2d00'
  background: '#faf8ff'
  on-background: '#191b23'
  surface-variant: '#e1e2ed'
typography:
  h1:
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
  h2:
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  h3:
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-base:
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  table-data:
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-caps:
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  container-margin: 24px
  grid-gutter: 16px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 24px
  input-padding: 8px 12px
---

## Brand & Style
The design system is engineered for high-utility internal management environments. It focuses on a **Corporate Modern** aesthetic that balances high data density with visual clarity. The brand personality is authoritative yet unobtrusive, prioritizing functional efficiency over decorative flair. 

The UI utilizes a "Focus-First" philosophy: secondary information is de-emphasized through neutral tonal layering, while critical actions and system statuses use high-fidelity accents to guide the user's eye. The result is a professional, reliable environment that minimizes cognitive load during complex ERP workflows.

## Colors
The palette is anchored by **Action Blue** (#2563EB), used exclusively for interactive elements and primary indicators. Grays are cool-toned to maintain a crisp, modern feel. 

For Dark Mode, the system shifts to a high-contrast deep navy base rather than pure black to preserve readability of dense data tables. Semantic colors maintain a 4.5:1 contrast ratio against surface backgrounds to ensure WCAG AA compliance. Use "Surface" levels to differentiate between the background canvas and elevated dashboard widgets.

## Typography
**Inter** is the primary typeface for its exceptional legibility in data-dense interfaces. The hierarchy is strictly enforced to manage information density:
- **Headlines:** Use tighter letter spacing and heavier weights to anchor sections.
- **Body:** Standardized at 14px for ERP modules to allow more information on screen without sacrificing readability.
- **Table Data:** A specialized 13px level is used for large data grids, paired with a slightly increased line height to prevent "bleeding" between rows.
- **Labels:** Uppercase styles are reserved for column headers and non-interactive metadata.

## Layout & Spacing
This design system utilizes a **12-column fluid grid** with fixed sidebars (240px-280px). Layouts are built on a 4px baseline grid to ensure mathematical consistency. 

Padding inside dashboard cards should be generous (24px) to provide visual "breathing room" amidst high data density, while internal spacing between form elements and list items should remain tight (8px-12px) to maximize vertical real estate.

## Elevation & Depth
Depth is communicated through **Tonal Layering** supplemented by subtle ambient shadows. 
- **Level 0 (Canvas):** The neutral background (#F8FAFC).
- **Level 1 (Card/Surface):** Flat white with a 1px border (#E2E8F0) and no shadow for secondary containers.
- **Level 2 (Active Widget):** White with a soft, diffused shadow (0px 4px 6px -1px rgba(0,0,0,0.1)).
- **Level 3 (Modals/Popovers):** Higher contrast shadows to draw immediate focus, with a semi-transparent dark overlay (backdrop-blur: 4px) to dim the background ERP data.

## Shapes
A consistent **Rounded (8px-12px)** language is applied to all components.
- **Standard Components:** Buttons, inputs, and small widgets use 8px (`rounded-md`).
- **Containers:** Dashboard cards and large panels use 12px (`rounded-lg`).
- **Status Pills:** Use fully rounded (9999px) radii to distinguish them from interactive buttons.

## Components
- **Buttons:** Primary buttons use solid Action Blue with white text. Secondary buttons use a subtle gray ghost style with a 1px border. 
- **Data Tables:** Use alternating row stripes (Zebra striping) only in high-density views. Headers must remain sticky.
- **Inputs:** Standardized 40px height. Active states use a 2px Action Blue ring with high-contrast labels.
- **Status Chips:** Use a "tint-on-tint" approach (e.g., Success Green text on a 10% opacity Green background) for non-interactive indicators.
- **Search:** Persistent global search in the top navigation with a keyboard shortcut hint (`Cmd+K`).
- **Side Navigation:** High-contrast icons with clear active states (Action Blue vertical bar on the left edge).