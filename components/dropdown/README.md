## Dropdown

Dropdown is a generic, reusable component, that can be used for building all kinds of menus. It doesn't contain any visual elements, borders, trigger and content need to be passed in as children or props.

## Props

| Name | Type | Required | Default value | Description
|------|------|----------|---------------|------------
|isOpen | boolean | x | - | use this prop to override internal state 
|onClick | function | x | - | overrides internal click handler
|onOpen | function | x | - | called when internal dropdown state is set to open
|onClose | function | x | - | called when internal dropdown state is set to closed
|trigger | Component / Element | x | - | the trigger UI element
|dropdownContainer | Component | x | Nothing | dropdown background/border, ideally just a `styled.div`
|options.align |string | x | 'fullwidth' | dropdown alignment
|options.useClick |boolean | x | true | toggle click behaviour
|options.useHover |boolean | x | false | toggle hover behaviour


See story.js for examples!