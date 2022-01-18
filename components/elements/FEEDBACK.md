# Feedback ![under_review](status-images/under-review.svg) ![new](status-images/new.svg)

The feedback component is used to show error messages, alerts and success notifications to the user. This feedback can be related to a specific element on the page (element-level) or not (standalone).

<!-- STORY -->

### Element-Level Feedback

Element-level feedback closely relates to a specific element on the screen. For example, an error message related to a form field, or a warning tooltip displayed next to a button that does a risky action. This type of feedback has a small triangle to show what it’s related to.

### Standalone Feedback

Standalone (or screen-level) feedback is not related to any specific element on the screen. This type of feedback has no triangle, since it’s not directly related to an adjacent element. It is inside the element flow.

### Colors

The feedback component has four color schemes:

* `error`: Use this when something went wrong, an action initiated by the user was not completed, and it's impossible to do what the user was trying to do. For example, the user has chosen a username that is already taken.
* `alert`: There is something that might lead to problems if ignored, but it's possible to move on regardless. For example, the user is trying to crop a thumbnail for a post that would be too small and appear pixelated.
* `success`: We want to reassure the user that everything went right. For example, the post the user wrote was saved successfully.
* `default`: When none of the above types make sense. *Use this sparingly!*

### Shadow

Put a shadow on a feedback component only when it's outside of the element flow (like a tooltip).
