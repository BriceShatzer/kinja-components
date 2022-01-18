# Designing Icons ![ready](status-images/ready.svg)

First check them out in their natural habitat. They live in 2 places:
- They're designed [in Sketch](https://drive.google.com/open?id=14KmPbvN3uI0YpUhkv5UbeKT-ljccmama) and stored in two formats:
	- an easily editable stroked layer group
	- a reusable single-layer symbol
- [In code](https://gawkermedia.github.io/kinja-components/?selectedKind=3.%20Elements%7CIcon19&selectedStory=default) they live as svg files and react components.

They're hollow by default and designed with strokes. They can have filled siblings for active states for example.

Their size can either be **18x18px**, **24x24px** or **48x48px**. When using or creating one try sticking to **18x18px** unless there's a reason to go bigger.

## Here's How To Make Them At Home
1. Make sure your [Kinja Design Kit](https://github.com/gawkermedia/kinja-mantle/blob/master/packages/kinja-components/doc/DESIGNKIT.md) and [dev environment](https://github.com/gawkermedia/kinja-mantle/blob/master/README.md#installation) is set up.
2. Install [SVGO Sketch plugin](https://www.sketchapp.com/extensions/plugins/svgo-compressor/).
3. Set up SVGO. In Sketch click `Plugins > Manage Plugins > Gear icon (at the bottom left) > Reveal Plugins folder`. Copy over `svgo.json` and `addAriaLabel.js` from `Design Kit / SVGO Settings` in Google Drive to your Sketch `Plugins` folder.
4. Open *Kinja Component Library.sketch*, select the *Icons* page and start drawing. Watch out for [optical size](https://medium.muz.li/icon-set-3b4fc87dc6b5) and fit your icon to the pixel grid.
5. Copy the finished design to a new symbol on the same page.
6. Convert the icon in the symbol to a single shape layer. Select all layers, hit `Layer > Convert to Outlines` and merge them using [boolean operations](https://sketchapp.com/docs/shapes/boolean-operations/).
7. Once you have just a single layer, apply the `fill/black` layer style to it.
8. Give the symbol a **unique** PascalCase name. Think about reusability, try to name by content not by function (eg. *ArrowLeft* is a better name than *Back*).
9. Your icon is ready for export! Export the symbol as svg. The exported code should look something like this:
```
<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" aria-label="Pin icon" viewBox="0 0 18 18">
	<path d="..."/>
</svg>
```
If it looks different check your svgo settings (go back to step 3).
10. To add the icon in code, open a terminal at `kinja-mantle` and create a new git branch
```
git checkout master
git pull
git branch new-icon
git checkout new-icon
```
11. Drop your svg(s) to `kinja-mantle/packages/kinja-components/components/icon19/svg`.
12. In terminal run the script to regenerate icon components
```
cd packages/kinja-components
yarn generate:icon
```
This should create one `.js` file for each `.svg` you added.
13. Commit and push your changes to git
```
git add .
git commit -m "adding new icon"
git push --set-upstream origin new-icon
```
14. Open github and create a pull request. Add *gawkermedia/design* as a reviewer.
15. Once someone approves your pull request, merge it.
16. Rejoice! Your icon is now ready to use.

## Learn more

- [Kinja Design Kit](https://github.com/gawkermedia/kinja-mantle/blob/master/packages/kinja-components/doc/DESIGNKIT.md)
- [Icon component](https://gawkermedia.github.io/kinja-components/?selectedKind=3.%20Elements%7CIcon19&selectedStory=default)
