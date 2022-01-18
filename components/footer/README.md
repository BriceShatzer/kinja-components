# Footer :shoe: ![ready](status-images/ready.svg)

The footer that is rendered at the bottom of a page on Kinja. Also includes logic for the store and subscription modals triggered by links in the footer.

[Storybook Demo](http://localhost:8001/?selectedKind=Footer).

<!-- STORY -->

##### Table of Contents
 - [Subcomponents](#subcomponents)
 - [Props](#props)
   - [blog](#props-blog)
   - [feature](#props-feature)
   - [isPermalink](#props-permalink)
   - [language](#props-language)
   - [showStoreDialog](#props-store)
 - [Example](#example)

<a name="subcomponents"/>

### Subcomponents

 - [Blog Logo](./subcomponents/footerLogo.js)
 - [General Links](./subcomponents/footerLinks.js)
 - [Legal Disclaimers](./subcomponents/footerLegal.js)
 - [Network Links](./subcomponents/footerNetwork.js)
 - [Social Links](./subcomponents/footerSocial.js)

#### Modals
 - [Store Redirect](./modals/storeRedirect.js)

<a name="props"/>

### Props

<a name="props-blog"/>

#### blog

###### type: _BlogType_

The blog corresponding to the page that the footer is being rendered on. If it exists, the footer will try to render the blog's logo and links to its about and store pages. Otherwise it will render a generic footer.

<a name="props-feature"/>

#### feature

###### type: _FeatureType [required]_

The feature switch controller to determine if various switches are on or off.

<a name="props-permalink"/>

#### isPermalink

###### type: _boolean_, default: false

Whether the footer is being rendered on a permalink page or not.

<a name="props-language"/>

#### language

###### type: _String_, default: 'en-US'

The language to render translatable messages to. Only affects links in the `FooterLinks` component.

<a name="props-store"/>

#### showStoreDialog

###### type: _boolean_

Optional override to show the store modal when the component is first rendered.

<a name="example"/>

### Example

```javascript
const { blog } = window.kinja.meta;

<Footer
	blog={blog}
	feature={feature}
	language={'es'}
/>
```
