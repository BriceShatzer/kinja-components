# LinkPreview ![under-review](status-images/under-review.svg)

Link Preview insets show a nicely formatted box that contains information pulled from a url. There are four kinds:
- Internal Kinja urls: it will show the share image, title of the article and a short excerpt. It will be branded with the blog logo and colors.
- External urls: the same information will be shown, pulled from meta og tags. Will not be branded.
- Commerce urls: These are url for products from amazon and similar vendors we have support for. It will show information like the price, product image, how many of this item have been purchased by our readers, a CTA button etc. These kind of insets point to a url that have our special commision tag embedded. There are two kinds of these insets: one with only the price and the product name, and one with every feature from product image to CTA.

You get these kind of insets automatically when you paste a url into the editor.

<!-- STORY -->

## Props

### style

Type: _string_ ( `'Normal' | 'CommerceList' | 'CommerceCondensed'` )

Tells the component what type of link it is and what form it should render in.

### url

Type: _string_

The originally pasted url

### link

Type: _Link_

This is the whole link object, populated with extra information by our link service.

### isInternal

Type: _boolean_

Whether the link points to a Kinja article or not. Effects branding. Has no effect on Commerce insets.

### tag

Type: _string_ | Optional

Amazon information to properly format the urls so that we get our commission. Only relevant for Commerce links.

### subtag

Type: _string_ | Optional

Amazon information to properly format the urls so that we get our commission. Only relevant for Commerce links.

### cleanedUrl

Type: _string_ | Optional

Url of the product with price and promo code information stripped. Only relevant for Commerce links.

### isGmgBlog

Type: _boolean_ | Optional

Whether we are currently on a GMG blog. Only relevant for Commerce links.

### permalinkUrl

Type: _string_ | Optional

The permalink we are currently on. Only relevant for Commerce links.
