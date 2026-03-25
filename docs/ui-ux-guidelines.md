# UI/UX Guidelines

This document is the shared reference for frontend interaction polish in this
template. Use it when adding new pages, refining existing ones, or keeping
future UI work visually consistent.

## Purpose

- Keep interaction behavior intentional instead of page-specific.
- Preserve a reusable design language for future products built on the kit.
- Document motion and hover decisions in one place instead of scattering them
  across components.

## Core Principles

- Prefer subtle motion over flashy motion.
- Keep hover states smooth, not jumpy.
- Let emphasis come from glow, spacing, and contrast before large color shifts.
- Avoid layout jolts when content, errors, or animations appear.
- Preserve accessibility with reduced-motion fallbacks.

## Motion

- Reveal-on-scroll effects should be soft and short.
- First-view content may animate, but it should not flash, disappear, then
  reappear.
- Route changes should reset page entrance effects so revisiting a page still
  feels intentional.
- Motion should support `prefers-reduced-motion`.

Current implementation:

- `frontend/src/components/scroll-reveal.tsx`
- `frontend/src/components/route-content-frame.tsx`
- `frontend/src/layouts/root-shell.tsx`
- `frontend/src/app/globals.css`

## Buttons

- Hover should slightly scale buttons up instead of lifting them upward.
- Hover should keep the base color stable and add a soft glow instead of a hard
  color swap.
- Press states should briefly scale down, then return smoothly.
- Light buttons should stay clean and minimal without unnecessary borders.

Current implementation:

- `frontend/src/components/ui/button.tsx`
- `frontend/src/app/globals.css`

## Links And Navigation

- Text links should glow from the text, not from a large background chip.
- Navbar hover states should feel light and text-led.
- Animated underlines should align with their dotted baseline and not make text
  feel thinner.
- Footer auth links may use local overrides when shared underline utilities are
  too broad.

Current implementation:

- `frontend/src/components/site-header.tsx`
- `frontend/src/features/auth/components/auth-form-shell.tsx`
- `frontend/src/app/globals.css`

## Forms And Feedback

- Error messages should not blink out during retries if the request is still
  failing.
- Status messages should not make cards feel unstable or suddenly overflow.
- Auth cards should size to their own content instead of stretching to match a
  taller sibling panel.

Current implementation:

- `frontend/src/features/auth/components/auth-form-shell.tsx`
- `frontend/src/features/auth/components/auth-split-shell.tsx`

## Backgrounds And Atmosphere

- The overall surface should stay warm and calm, built from cream, orange, and
  teal accents.
- Background color should continue down the page and not disappear after the
  first fold.
- Mobile first-view backgrounds should be softer than desktop so they do not
  overpower content.
- Adjust intensity in small steps; avoid flattening the entire page when
  reducing color.

Current implementation:

- `frontend/src/app/globals.css`
- `frontend/src/features/home/components/centered-home-page.tsx`
- `frontend/src/features/sandbox/components/sandbox-page.tsx`

## Themed Chrome

- Scrollbars should match the visual theme instead of using the default browser
  look.
- Effects should remain subtle and polished, not distract from the page.

Current implementation:

- `frontend/src/app/globals.css`

## How To Use This Doc

- Add new interaction rules here when they become shared patterns.
- If a style is only for one page, note why before promoting it into a global
  utility.
- Prefer updating shared utilities only when the behavior is truly reusable.
- When a tweak is one-off, scope it locally and mention it here if future pages
  may want the same idea.

## Quick Checklist For Future UI Work

- Does the motion feel smooth and restrained?
- Does hover add clarity without causing layout shift?
- Does mobile get a tuned version instead of a direct desktop copy?
- Does the effect work with the template's warm neutral palette?
- Is the rule reusable enough to live in a shared utility?
