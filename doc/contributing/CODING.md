# Coding Guidelines ![ready](status-images/ready.svg)

To ensure consistency throughout the source code, keep these rules in mind as you are working:

- All features or bug fixes must be tested by one or more specs.
- We don't go crazy with type annotations for private internal APIs. The best guidance is to do what makes the most sense.
- Use flowtype type annotations over `PropType`, they're more powerful. [See the official docs](https://flowtype.org/docs/react.html)
- Check coverage of type annotations by running `flow coverage path_to_file`, you don't have to aim for 100% flow will infer types for you. Feel free to consult `flow suggest path_to_file`
- It's good practice to export once at the bottom of the module and *for the most part* I’d encourage you to use `export default`.
   - The single export statement at the bottom of a module makes it immediately obvious what the exported API is.

## Coding Style

Regarding style, our linter will catch most issues that may exist in your code.
You can check the status of your code styling by simply running `yarn lint`.

- Use semicolons `;`
- Commas last `,`
- Tabs for indentation
- Prefer `'` over `"`
- `'use strict';`
- 100 character line length (except documentation)
- Write "attractive" code
- Do not use the optional parameters of `setTimeout` and `setInterval`

## Learn more

- [Creating Components](https://github.com/gawkermedia/kinja-mantle/blob/master/packages/kinja-components/doc/contributing/CREATING.md)
- [Localizing Components](https://github.com/gawkermedia/kinja-mantle/blob/master/packages/kinja-components/doc/contributing/LOCALIZING.md)
- [Styling Components](https://github.com/gawkermedia/kinja-mantle/blob/master/packages/kinja-components/doc/contributing/STYLING.md)
- [Testing](https://github.com/gawkermedia/kinja-mantle/blob/master/packages/kinja-components/doc/contributing/TESTING.md)
- [Writing READMEs](https://github.com/gawkermedia/kinja-mantle/blob/master/packages/kinja-components/doc/contributing/READMES.md)
- [Writing Stories](https://github.com/gawkermedia/kinja-mantle/blob/master/packages/kinja-components/doc/contributing/STORIES.md)
- [Generating SVG Sets](https://github.com/gawkermedia/kinja-mantle/blob/master/packages/kinja-components/doc/contributing/GENERATING.md)
