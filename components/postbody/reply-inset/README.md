# ReplyInset ![ready](status-images/ready.svg)

This BlockNode will display a kinja reply inside an iframe. You need to provide a comment permalink in the editor to insert a reply inset.
The contents of the iframe will be rendered on the server side. It was made this way so that it can be used in other places as well (like amp, third pary sites etc.)

<!-- STORY -->

## Props

### link

Type: _Link_

This is a link object as defined on kinja-magma. Among other things, it contains a `postId` field inside the map called `meta`. Actually this is the only field used by this component.

### originalLink

Type: _string_

The original link as it was pasted in the editor. It is displayed instead of the inset if the postId can't be found on the link object given above.

### insetPrefix

Type: _string_

Defines where the iframe url should point to. By default it is `https://api.kinja.com`.
