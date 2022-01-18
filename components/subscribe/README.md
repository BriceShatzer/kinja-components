# Newsletter Subscription Component ![ready](status-images/ready.svg)

A reusable component that handles the whole newsletter subscription flow.

<!-- STORY -->

## Subcomponents

### Subscribe

The main wrapper around the form and confirmation dialog.

### Subscribe Form

Contains logic for form the form, including validation & API integration.

### Subscribe Configm

Shows a dialog confirming a user's subscription to a newsletter.

### getMailingLists

Returns associated mailing lists (if any) for a given blog. If none exist, that means a blog only has one newsletter.
