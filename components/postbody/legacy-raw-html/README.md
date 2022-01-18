# Legacy Raw HTML ![ready](status-images/ready.svg)

This BlockNode component renders a wrapper div and dangerously sets the value of its inner HTML inside of itself.

Normally this would be a security risk, but [HTML5 specifies that a <script> tag inserted via innerHTML should not execute](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML), so it's safe. And this blocknode is no longer supported in the editor.

<!-- STORY -->

## Props

Name | Type | Description
--- | --- | ---
value | `string` | The HTML string to render in the component
