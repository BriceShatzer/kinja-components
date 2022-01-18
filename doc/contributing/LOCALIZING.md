# Localizing Components ![ready](status-images/ready.svg)

If your component has words in it somewhere, chances are they should be translated.
- Create the necessary translations:
	- Translated messages from mantle exist in `config/locales`.
	- If you added a translation to mantle but aren't seeing it there, run `./scripts/generate-jsmessages.sh` from the main mantle directory and then run `yarn localize` here.
	- If you need to add a new translation, create the corresponding entry in `config/locales/misc` and run `yarn localize` again.
- Create a file that will hold all the translations your component needs:
	- To reduce overhead, create a layer that will only import relevant translations which can then be imported into your component.
		- This is a manual/tedious process for now, hopefully with the next ES update `import` will support variables.
	- `components/top-bar/SearchTranslations.js` is a good example of this.
- Instantiate a `Translator` in your component and import/register these translations with it.
	- `components/top-bar/Search.js`:
		- `import searchTranslations from './SearchTranslations';`
		- `this.translator = new Translator(searchTranslations, props.language);`
- Call `this.translator.getTranslation(translationKey, locale)` to translate your message.
- Make sure you have an `index.js` in the root of your component. The build script is looking for this file, anything exported here will be in the final components build.
- Before releasing your component make sure you haven't introduced any unnecessary dependency to the final build. Run the `yarn inspect` command to inspect the build in the browser.

## Learn more

- [Coding Guidelines](https://github.com/gawkermedia/kinja-mantle/blob/master/packages/kinja-components/doc/contributing/CODING.md)
- [Creating Components](https://github.com/gawkermedia/kinja-mantle/blob/master/packages/kinja-components/doc/contributing/CREATING.md)
- [Styling Components](https://github.com/gawkermedia/kinja-mantle/blob/master/packages/kinja-components/doc/contributing/STYLING.md)
- [Testing](https://github.com/gawkermedia/kinja-mantle/blob/master/packages/kinja-components/doc/contributing/TESTING.md)
- [Writing READMEs](https://github.com/gawkermedia/kinja-mantle/blob/master/packages/kinja-components/doc/contributing/READMES.md)
- [Writing Stories](https://github.com/gawkermedia/kinja-mantle/blob/master/packages/kinja-components/doc/contributing/STORIES.md)
- [Generating SVG Sets](https://github.com/gawkermedia/kinja-mantle/blob/master/packages/kinja-components/doc/contributing/GENERATING.md)
