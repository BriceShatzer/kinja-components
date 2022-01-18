# Creating Components ![ready](status-images/ready.svg)

We try to keep components as generic and reusable as possible. Before creating a new component please consider modifying an existing one to fulfill new requirements.

To create and bootstrap a simple component use

```bash
yarn generate:component
```

This will generate a subdirectory in the `components` folder containing a kinja component with styles, tests, usage examples (aka. stories) and documentation. Check out the counter component for a reference implementation.

```
[component-name]
  ↳ ${component-name}.js
  ↳ ${component-name}.spec.js
  ↳ index.js
  ↳ story.js
  ↳ README.md
```

## Learn more

- [Coding Guidelines](https://github.com/gawkermedia/kinja-mantle/blob/master/packages/kinja-components/doc/contributing/CODING.md)
- [Localizing Components](https://github.com/gawkermedia/kinja-mantle/blob/master/packages/kinja-components/doc/contributing/LOCALIZING.md)
- [Styling Components](https://github.com/gawkermedia/kinja-mantle/blob/master/packages/kinja-components/doc/contributing/STYLING.md)
- [Testing](https://github.com/gawkermedia/kinja-mantle/blob/master/packages/kinja-components/doc/contributing/TESTING.md)
- [Writing READMEs](https://github.com/gawkermedia/kinja-mantle/blob/master/packages/kinja-components/doc/contributing/READMES.md)
- [Writing Stories](https://github.com/gawkermedia/kinja-mantle/blob/master/packages/kinja-components/doc/contributing/STORIES.md)
- [Generating SVG Sets](https://github.com/gawkermedia/kinja-mantle/blob/master/packages/kinja-components/doc/contributing/GENERATING.md)
