# **Curation Module Editor App**

## Initial state
In order to render a curation module on a blog, that blog must be a GMG blog, which means, that `isGMGBlog` blog property must be set to `true`and the user must have `AUTHOR`, `ADMIN` or `OWNER` permissions.

If these rules are met, the edit button will appear in the upper right corner of the page.
Relevant code can be found here: [curationOpenButton.js](https://github.com/gawkermedia/kinja-mantle/blob/master/kinja-magma/client/hydration/curationOpenButton.js)

**Empty state**:  No server side curation data is available, since nothing was saved yet for this blog. Once the button is rendered, and you click it, the edit mode will appear with an empty Headline layout activated as default and the layout toolbar on the left side, where you can choose between default layouts.

**Non-empty state**: if the blog already has a curation module saved, you will see it being server-side rendered ([see front-page component for details, it's pretty straightforward](https://github.com/gawkermedia/kinja-mantle/blob/master/kinja-magma/controllers/front-page/front-page.js) - `curationModulePromise` and `prepareCurationProps`). Once you press the edit button, it gets hydrated and loads the currently saved layout and items into the 	 and activates it in the layouts toolbar. 

`loadCurationModule` function is responsible for lazy-loading all the necessary components for it and `fetchCurationProps` calls the `getCurationForBlog` API to fetch curation for the blog and prepares the props to be passed down to the `<Curation>`. The inner workings of this will be described in detail in the `<CurationLayout>` section.

### `loadCurationModule` main tasks
- lazy-loads [default layout config](https://github.com/gawkermedia/kinja-mantle/blob/page19/packages/kinja-components/components/curation-layout/default-layouts-stub.js) which stores configurations of the currently used layouts. It is used in the `<CurationLayout>` in conjunction with [`layout-toolbar-config`](https://github.com/gawkermedia/kinja-mantle/blob/page19/packages/kinja-components/components/curation-layout/layout-toolbar-config.js) function `layoutToolbarConfig` to build the props for the layout toolbar based on the saved layout's value from the API response or the currently selected layout's value from the toolbar. It sets the click handlers and active layout. `layoutToolbarConfig` is called every time a new layout is selected in the toolbar.
*NOTE: These configs must be updated when adding new layouts.*

- lazy-loads the `<Curation>` component, that is a wrapper for the  actual `<CurationModule>` and `<CurationToolbar>` and it's responsible for handling various more global click events on the module.


### `fetchCurationProps`  main tasks
- takes care of empty state props if blog has no curation module, or sets the non-empty state  props if blog has a previously saved curation module.
- passes the `externalAPI` functions for various tasks
	- `imageUploader`, `resolveItem`, `getParentBlog`, `returnValidCurationModel`, `saveLayoutAndItems`
- builds the `curationCustomOptions` object where we can pass feature switches and various other Kinja specific flags like `isSatire` or `isOnion`. These should be maintained on product level and feature level and cleaned up if needed.


## APIs
### Data structure
    type CurationRequest = {
    	blogId: string | number,
    } & GridConfig;

Type is located [here](https://github.com/gawkermedia/kinja-mantle/blob/page19/packages/kinja-components/components/types.js#L401)
Live response: [https://gizmodo.com/api/core/curation/views/forBlog?blogId=4](https://gizmodo.com/api/core/curation/views/forBlog?blogId=4)
#### API calls, used in `fetchCurationProps`
- `getCurationForBlog` to fetch the saved module for a blog
- `saveCurationForBlog` to save for blog
- `getPost` to fetch post when pasting a post item to a curation item slot
These are [core APIs]([https://github.com/gawkermedia/kinja-mantle/blob/page19/kinja-magma/api/core.js](https://github.com/gawkermedia/kinja-mantle/blob/page19/kinja-magma/api/core.js))
- `getUsers` is used to build the `authors` property for the blog
- `getParentBlogWithNames` is used to get parent blog
These are [profile APIs](https://github.com/gawkermedia/kinja-mantle/blob/page19/kinja-magma/api/profile.js)
- `uploadImage` is used to upload images. [link](https://github.com/gawkermedia/kinja-mantle/blob/page19/kinja-magma/api/uploadImage.js)

More details on how these are used can be found in `Curation Layout` (TODO: rename to `Curation Controller`) section.

**IMPORTANT**: Item data structure is not set in stone on the backend so it can be basically anything to allow reusability of the module with any kinds of items. That's why we build the curation item data in `setItemsOnPaste` method when retrieving the post and making it go through the `fromJSON` method of the used CurationItem model `const validModel = CurationItem.fromJSON(model);` 
The next step is to be able to use different CurationItem models + curation card types to allow the module to render any kind of item designs from not just kinja post API.

## Layouts

Default layouts configs are defined in the [default layout config](https://github.com/gawkermedia/kinja-mantle/blob/page19/packages/kinja-components/components/curation-layout/default-layouts-stub.js)

- `group` - defines the layout groups, that help visualise the layouts better, than reading naked config files. 
	- `Modular` - mixed layout that has different kinds of item sizes in it's zones
	- `Headline` - occupies the entire container and has one item
	- `Equal` - has items of the same size

Example of a layout config:

    {
    	group: 'Modular',
    	cardinality: 3,
    	zones: [
    		{
    			dimension: '2fr',
    			numberOfItems: 1
    		},
    		{
    			dimension: '1fr',
    			numberOfItems: 2
    		}
    	]
    }
   
This is, i.e. a `Modular` layout (different sizes of items) that has 2 zones, where the first zone is twice as wide (`2fr` vs. `1fr`, which are CSS grid _fraction_ unit) as the second and contains 1 item, and the second zone contains 2.

## Rendering logic

Currently, all the rendering logic lives in the `<CurationModule>` component that renders passes the `gridConfig` to the `<Grid>` component, that splices the items to respective `<ZoneComponent>` based on the layout config.

### Grid component and Zones
`<Grid>` ([link](https://github.com/gawkermedia/kinja-mantle/blob/master/packages/kinja-components/components/grid/grid.js)) is the component that is responsible for setting out the css grid styles for the currently used layout and set the `grid-template-columns` property on the `<GridWrapper>`. 
`<Grid>` also maps out the Zones based on the used layout's configuration, sets the drag events on each zone and passes the relevant items to each zone. `<ZoneComponent>` is used to map out the zones and distribute the items among them.

**IMPORTANT:** The key thing in the `<CurationModule` is the `renderWithZones` function, which is a render prop for all final children of the `<Grid>` . It runs on every child, returned by the each `<ZoneComponent>`, which in turn is a function (the `<Item>`) that returns the `model, itemIndex, zoneIndex, zoneSize, draggable` props, which are then passed over to the final `return` that builds the each item's logic based on the state of the module. 

The type of item defaults to `<FrontPageCard>` but can be basically anything, depending on what  the `curationType` is set to in the `customCurationOptions` and that is how new item designs should be implemented in the future.
**NOTE:** The saving method does not yet support other types of items, because this is where we had to stop development in favour of other projects.

## Edit mode and Curation Layout (controller) [link](https://github.com/gawkermedia/kinja-mantle/blob/master/packages/kinja-components/components/curation-layout/curation-layout.js)

Currently both edit mode and static server render mode are going thru the same components. `<CurationLayout` component is responsible for rendering both. While with the server side it's pretty easy (build the props, pass them on, render once), the Edit mode needs a lot of methods that manipulate the module's state when editing.

### Editable parts
Most of methods that are used to re-calc the state are using item and zone indexes.

- **Kinja posts are resolved, when pasted to an empty item**. `setItemsOnPaste` is the method that runs the asyn `resolveItem` method that queries the API for the kinja post and runs it through the `CurationItem.fromJSON(model);` to build the data struct used in the Curation Module.
- **Items can be deleted**. `deleteItemModel` method is used here.
- **Item image can be changed**. `handleItemImageChange` and `returnItemsWithCustomImage` are used here 
 - **Zones are draggable within any layout.** `setLayout` method is used to recalculate the state and re-rendering the module.
 -  **Items of each zone can be swapped within the same zone or other zones.** `setCardSwapState` method is used to do this.
 - **headline and excerpt are editable as well**. `saveCardStateChange` method is used here.
 
**NOTE**: Most of these methods rely on `returnEditedItems` method that return the new items array that reflects the new change.

**Saving** also happens in curation layout in the `onSave` method that contains all the possible error states in the module and updates the item models with error flags if save checks don't pass.

## Card component [link](https://github.com/gawkermedia/kinja-mantle/blob/master/packages/kinja-components/components/card/card.js)
Card component is responsible for communicating with curation layout when it come sto item swaps through calling `setCardSwapState`,  functions for image change `handleItemImageChange`, deleting an item `deleteItemModel` and, also, handling content editable `headline` and `excerpt` though calling `saveCardStateChange`. 


# THE FUTURE

The initial idea for this module was to make it a separate and maintainable repository in order to make it truly plug and play, which isn't the end goal right now, but is a "nice to have".

**The immediate refactoring should address these main issues:**

 1. Curation Item model should be passed to the module depending on the type of item. This will allow us to use different data structs for the module, not just the ones based exclusively on kinja posts. To accomplish this, all references to any specific kinja post properties must be removed from the Curation Layout, especially from the [`setItemsOnPaste`](https://github.com/gawkermedia/kinja-mantle/blob/fix/frontend/hydrate-magazine-header/packages/kinja-components/components/curation-layout/curation-layout.js#L342) method, i.e. `defaultBlogId`, `storyType` `defaultBlogHost` and such.
 2. Curation Item models and card types should depend on each other, just like the `<FrontPageCard>` card depends currently on the post data structure. We can have `KinjaPostItem` model, `AdItem` model and all sorts of other models and react components that accommodate their data structures, that can be rendered in the curation module layouts.
 3. Removal of any remaining CSS ([link](https://github.com/gawkermedia/kinja-mantle/blob/fix/frontend/hydrate-magazine-header/build/tiger/scss/components/_curation-mountain.scss)) for the module and adding the rules to the respective styled components .
4. Consider separating the edit mode logic and server side rendering in the module. The issue here is the fact that we'll have to maintain 2 sets of components (edit and render) and make sure the new changes are synced.
5. Remove all the building blocks from the curation module and use new Story Card components instead for `Headline`, `Excerpt`, `Authors` etc. This task assumes removing the [story-card](https://github.com/gawkermedia/kinja-mantle/blob/master/packages/kinja-components/components/card/story-card.js) component completely and refactoring the [Card](https://github.com/gawkermedia/kinja-mantle/blob/master/packages/kinja-components/components/card/card.js) component to only keep the toolbar and drag and drop logic.