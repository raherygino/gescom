---
name: frontend-design
description: Guidance for distinctive, intentional visual design when building new UI or reshaping an existing one. Helps with aesthetic direction, typography, and making choices that don't read as templated defaults.
license: Complete terms in LICENSE.txt
---

# Frontend Design

Approach this as the design lead at a small studio known for giving every client a visual identity that could not be mistaken for anyone else's. This client has already rejected proposals that felt templated, and is paying for a distinctive point of view: make deliberate, opinionated choices about palette, typography, and layout that are specific to this brief, and take one real aesthetic risk you can justify.

## Ground it in the subject

If the brief does not pin down what the product or subject is, pin it yourself before designing: name one concrete subject, its audience, and the page's single job, and state your choice. If there's any information in your memory about the human's preferences, context about what they're building, or designs you've made before – use that as a hint. The subject's own world, its materials, instruments, artifacts, and vernacular, is where distinctive choices come from. Build with the brief's real content and subject matter throughout.

## Design principles

For web designs, the hero is a thesis. Open with the most characteristic thing in the subject's world, in whatever form makes sense for it: a headline, an image, an animation, a live demo, an interactive moment. Be deliberate with your choice: a big number with a small label, supporting stats, and a gradient accent is the template answer, only use if that's truly the best option.

Typography carries the personality of the page. Pair the display and body faces deliberately, not the same families you would reach for on any other project, and set a clear type scale with intentional weights, widths, and spacing. Make the type treatment itself a memorable part of the design, not a neutral delivery vehicle for the content.

Structure is information. Structural devices, numbering, eyebrows, dividers, labels, should encode something true about the content, not decorate it. Many generic designs use numbered markers (01 / 02 / 03), but that's only appropriate if the content actually is a sequence - like a real process or a typed timeline where order carries information the reader needs. Question if choices like numbered markers actually make sense before incorporating them.

Leverage motion deliberately. Think about where and if animation can serve the subject: a page-load sequence, a scroll-triggered reveal, hover micro-interactions, ambient atmosphere. An orchestrated moment usually lands harder than scattered effects; choose what the direction calls for. However, sometimes less is more, and extra animation contributes to the feeling that the design is AI-generated.

Match complexity to the vision. Maximalist directions need elaborate execution; minimal directions need precision in spacing, type, and detail. Elegance is executing the chosen vision well.

Consider written content carefully. Often a design brief may not contain real content, and it's up to you to come up with copy. Copy can make a design feel as templated as the design itself. See the below section on writing for more guidance.

### Surface & depth

Design for a clear surface hierarchy. Use layered backgrounds (card, popover, dialog, sidebar) to communicate which surfaces are actionable, which are informational, and which are modal overlays. Elevation should follow a consistent shadow scale: 3–4 named depths (flat, raised, overlay, modal). Apply frosted glass effects (backdrop blur + semi-transparent background) sparingly — on modals, command palettes, and floating panels — to create visual separation without heavy borders. Every surface should feel deliberate: if it floats, it needs a reason and a shadow that matches its z-distance.

### Data-rich interfaces

Dashboard apps live on data. Design stat cards that communicate trend, not just value: pair the primary metric with a delta badge (up/down/flat), a sparkline or mini-progress, and a contextual label. Tables should support sticky headers, row hover actions, column sorting indicators, and inline editing without leaving the list view. Use micro-charts (progress bars, donut rings, horizontal bars) inline in tables to replace raw numbers where the reader benefits from visual comparison. Every data display should prioritize the most important dimension — usually the change, not the absolute value.

### Form design

Forms are conversations. Design them to give continuous feedback: validate inline with debounced logic after the user stops typing (300ms), show success states on completed fields, and group related inputs with fieldset labels rather than relying on layout alone. Use floating labels that translate up on focus or when filled, input groups for prefixed/suffixed values, and stacked layouts for complex forms rather than multi-column grids that break reading order. Multi-step forms should show progress (step X of Y with a labeled progress bar) and preserve state when moving backward. Never disable the submit button — instead, show inline errors on the fields that need attention.

## Process: brainstorm, explore, plan, critique, build, critique again

For calibration: AI-generated design right now clusters around three looks: (1) a warm cream background (near #F4F1EA) with a high-contrast serif display and a terracotta accent; (2) a near-black background with a single bright acid-green or vermilion accent; (3) a broadsheet-style layout with hairline rules, zero border-radius, and dense newspaper-like columns. All three are legitimate for some briefs, but they are defaults rather than choices, and they appear regardless of subject. Where the brief pins down a visual direction, follow it exactly — the brief's own words always win, including when it asks for one of these looks. Where it leaves an axis free, don't spend that freedom on one of these defaults. Just like a human designer who's hired, there's often a careful balance between doing what you're good at and taking each project as a chance to experiment and learn.

Work in two passes. First, brainstorm a short design plan based on the human's design brief: create a compact token system with color, type, layout, and signature. Color: describe the palette as 4–6 named hex values. Type: the typefaces for 2+ roles (a characterful display face that's used with restraint, a complementary body face, and a utility face for captions or data if needed). Layout: a layout concept, using one-sentence prose descriptions and ASCII wireframes to ideate and compare. Signature: the single unique element this page will be remembered by that embodies the brief in an appropriate way.

Then review that plan against the brief before building: if any part of it reads like the generic default you would produce for any similar page (work through a similar prompt to see if you arrive somewhere similar) rather than a choice made for this specific brief — revise that part, say what you changed and why. Only after you've confirmed the relative uniqueness of your design plan should you start to write the code, following the revised plan exactly and deriving every color and type decision from it.

When writing the code, be careful of structuring your CSS selector specificities. It's easy to generate CSS classes that cancel each other out (especially with a type-based selector like .section and a element-based selector like .cta). This can happen often with paddings/margins between sections.

Try to do a lot of this planning and iteration in your thinking, and only show ideas to the user when you have higher confidence it'll delight them.

## Design Token Architecture

Build a token system that transcends color names. Define tokens in three layers: **global** (raw values), **alias** (semantic roles), and **component** (scoped overrides). Keep global tokens in CSS custom properties on `:root`/.dark. Use HSL for hue/saturation/lightness control, with the hue angle as the single shifting variable between light and dark mode — this gives you coherent dark theme colors without manual remapping. Prefer OKLCH for any interpolation or gradient work (it avoids the gray dead zone HSL creates between hues).

Structure your tokens as:
- **Color**: surface (0–4 elevation), text (primary, secondary, tertiary, disabled), border (subtle, default, strong), interactive states using `hsl(var(--color) / <alpha>)` opacity modulation rather than separate hex values
- **Spacing**: a 4px base unit scale (0.25rem, 0.5rem, 0.75rem, 1rem, 1.5rem, 2rem, 3rem, 4rem, 6rem). Use consistent gaps: section padding = 6rem, card padding = 1.5rem, element gap = 0.75rem, inline gap = 0.5rem
- **Typography**: a fluid type scale using `clamp()` — e.g., `clamp(0.875rem, 0.8rem + 0.25vw, 1rem)` for body, `clamp(1.5rem, 1rem + 2vw, 2.5rem)` for display headings. This removes breakpoint-specific font sizes entirely. Set `font-feature-settings: "tnum"` for tabular numbers in data contexts, `"liga"` and `"calt"` for body text
- **Shadows**: 4 named depths — `shadow-sm` (subtle, card resting), `shadow-md` (elevated, dropdowns), `shadow-lg` (overlay, modals), `shadow-xl` (toast, tooltip, floating action). In dark mode, shadows should use colored tints (e.g., `0 4px 24px hsl(240 10% 3.9% / 0.5)`) rather than pure black which looks muddy
- **Border radius**: a 3-step scale — `sm` (4px for inputs, badges), `md` (8px for cards, dialogs), `lg` (12px for modals, sheets). Only use `rounded-full` for pills/badges and avatars, never for containers

## Desktop Application Design

This is a desktop application, not a web page — design for the platform's native expectations. The window frame, title bar, and chrome should feel like part of the OS: macOS traffic lights on the left with full-height draggable region, Windows controls on the right with hover-highlight backgrounds. The title bar is prime real estate — use it for navigation tabs, global search, and theme toggle, not just the app name.

Design for keyboard as a first-class input. Every action should have a discoverable shortcut: show `Ctrl+N` or `⌘K` in tooltips, badges in the command palette, and a keyboard shortcut reference in the status bar. The command palette (`Ctrl+P` / `⌘P`) should be the universal action hub — accessible from anywhere, searchable by action name and fuzzy match, with category groups and recent actions at the top.

Support resizable panels for any side-by-side content (list + detail, editor + preview). Use a drag handle between panels with a visible hover state. Persist panel sizes across sessions.

Context menus matter. Right-click on table rows, sidebar items, and content areas should show contextual actions (edit, delete, copy, duplicate, export). Keep context menus compact — 3–8 items maximum, with separators for logical groups, and keyboard accelerators listed.

The status bar is information architecture, not decoration. Show connection status, sync state, current user, active branch/environment, and keyboard shortcut hints. Make status items clickable where there's a relevant action (e.g., clicking the connection indicator opens network settings).

## Component Composition & Polymorphism

Build components that compose, not just render. Use the Slot/asChild pattern (from Radix) when a component needs to render an arbitrary element while inheriting styles — buttons that act as links, labels that wrap custom inputs. The `cn()` utility (clsx + tailwind-merge) is the single class-merging surface for every component; never concatenate className strings manually.

Use CVA (class-variance-authority) for components with multiple visual axes (variant + size + state). Define the base styles (shared across all variants) as the first argument, variants as a flat map of single-responsibility keys, and defaultVariants so the simplest usage looks right. Don't use CVA for one-off style overrides — inline Tailwind classes in the parent are clearer for exceptional cases.

Prefer compound components for complex UI. A `Card` should be `Card + CardHeader + CardTitle + CardDescription + CardContent + CardFooter`, where the parent provides layout constraints and children own their content. This keeps each piece testable and overridable without props drilling.

When building a data list or table, extract the row renderer into its own component. The table holds layout (header, sort controls, pagination), the row holds display logic (cell formatting, status badges, action buttons), and cell formatters are pure functions or simple components. This prevents one giant component that does everything.

## Motion Design System

Motion should feel physical, not animated. Use Framer Motion's spring transitions (`type: "spring", stiffness: 300, damping: 30`) for interactive elements — sidebar open/close, dialog enter/exit, list reorder — because springs respond to velocity and feel tactile. Use tween transitions (`duration: 0.2, ease: "easeInOut"`) for passive animations — page transitions, fade-ins, skeleton reveals — because they feel predictable and non-competitive with user input.

Three animation categories, each with a distinct role:
- **Page transitions**: `AnimatePresence` wrapping routes with `mode: "wait"`. Use staggered children (container `staggerChildren: 0.05`) for lists and grids. Keep it subtle — 200ms fade + 8px slide-up, never more.
- **Layout animations**: `layout` prop on elements that change position when siblings enter/leave (filtered lists, reordered items, expanding cards). Force `layoutId` on elements that represent the same logical entity across different visual contexts (e.g., a row expanding into a detail card) — this creates a seamless shared-axis transition.
- **Micro-interactions**: button press (scale 0.97 on `whileTap`), card hover (translateY -2px + shadow increase on `whileHover`), row hover (background shift). These should be under 150ms with spring return. Never animate `width`, `height`, or `top`/`left` — animate `transform` and `opacity` only.

Respect reduced motion. Use Framer Motion's `useReducedMotion()` to switch to instant transitions (duration: 0) for users who prefer reduced motion. Don't remove the animation entirely — just make it instant so the layout change still happens without disorienting motion.

## Restraint and self-critique

Spend your boldness in one place. Let the signature element be the one memorable thing, keep everything around it quiet and disciplined, and cut any decoration that does not serve the brief. Not taking a risk can be a risk itself! Build to a quality floor without announcing it: responsive down to mobile, visible keyboard focus, reduced motion respected. Critique your own work as you build, taking screenshots if your environment supports it – a picture is worth 1000 tokens. Consider Chanel's advice: before leaving the house, take a look in the mirror and remove one accessory. Human creators have memory and always try to do something new, so if you have a space to quickly jot down notes about what you've tried, it can help you in future passes.

## Accessibility & Inclusive Design

Accessibility is design, not an audit step. Every component must work at viewport widths down to 320px, with 200% zoom, and without a pointer device. These constraints produce better design for everyone.

- **Focus**: Use `focus-visible` for keyboard focus rings (never `:focus` — that shows on click). Design focus rings as 2px solid with 2px offset using the ring color token — they should be visible against any background. Every interactive element (button, link, input, select, tooltip trigger) needs a focus-visible state.
- **Color contrast**: All text must meet WCAG AA (4.5:1 for body, 3:1 for large text). Use the `primary`/`muted`/`foreground` token system to guarantee this — never hardcode text colors that skip the token layer. Test interactive states (hover, active, focus) for sufficient contrast too.
- **Reduced motion**: Wrap every Framer Motion animation in a check: `useReducedMotion()` returns `true` → set `transition: { duration: 0 }`. Don't hide the element, just skip the animation. Test by enabling "Reduce motion" in the OS accessibility settings.
- **Screen readers**: Every icon button needs an `aria-label` or accessible label. Every status change (loading, sorting, filtering) needs a live region (`aria-live="polite"`). Use semantic HTML (`<nav>`, `<main>`, `<aside>`, `<article>`) as the backbone, with ARIA as enhancement, not replacement.
- **Zoom & readability**: Use relative units (`rem`, `em`) exclusively — never `px` for font sizes or spacing. Test at 200% zoom with no horizontal overflow. Ensure line length stays between 60–75 characters for reading content.

Design for the margins. The user who tabs through every control, the user who zooms to 150%, the user who navigates with voice control — designing for them makes the product better for everyone, and no one should notice you did it.

## More on writing in design

Words appear in a design for one reason: to make it easier to understand, and therefore easier to use. They are design material, not decoration. Bring the same intentionality to copy that you would bring to spacing and color. Before writing anything, ask what the design needs to say, and how it can best be said to help the person navigate the experience.

Write from the end user's side of the screen. Name things by what people control and recognize, never by how the system is built. A person manages notifications, not webhook config. Describe what something does in plain terms rather than selling it. Being specific is always better than being clever.

Use active voice as default. A control should say exactly what happens when it's used: "Save changes," not "Submit." An action keeps the same name through the whole flow, so the button that says "Publish" produces a toast that says "Published." The vocabulary of an interface is the signposting for someone navigating the product. Cohesion and consistency are how people learn their way around.

Treat failure and emptiness as moments for direction, not mood. Explain what went wrong and how to fix it, in the interface's voice rather than a person's. Errors don't apologize, and they are never vague about what happened. An empty screen is an invitation to act.

Keep the register conversational and tuned: plain verbs, sentence case, no filler, with tone matched to the brand and the audience. Let each element do exactly one job. A label labels, an example demonstrates, and nothing quietly does double duty.
