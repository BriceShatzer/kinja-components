# SpecialSection ![ready](status-images/ready.svg) ![new](status-images/new.svg)

[Storybook demo](http://localhost:8001/?selectedKind=SpecialSection)

<!-- STORY -->

## Special Section Page
The SpecialSectionPage component is a stateful container for Special Sections.
It acts as a controller for a Special Section, including:
- confirmation / image upload modal
- notification / error message
- Special Section proper
- Fixed Toolbar
- Publishing Tools


This component contains the logic for saving, publishing, and cancelling edits on the special section, as well as toggling edit state for the whole page.

## Special Section
The SpecialSection component renders the ui elements in a SpecialSection that are present on the editor and permalink views, including: 
- impact header
- Custom Modules

## Special Section Toolbar
Triggers Cancel, Save, and Save and Preview methods on a special section.

## Special Section Publishing Tools
Handles toggling edit mode and publish state for a special section.
Renders a Special Section.

<!-- STORY -->


Elements include:
- an `<ImpactHeader/>`
- a `<LazyProgressiveImage/>` slot for the blog's logo.
- Two `<MidBanner/>` `<AdSlots/>`
- `<SpecialSectionStream/>` of `<Lunchboxes/>`

## SpecialSectionStream
- accepts an array from the special section's customContent attribute and renders a list of `<Lunchbox/>` components.
