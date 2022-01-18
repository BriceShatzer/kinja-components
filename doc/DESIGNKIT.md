# 🎨 Kinja Design Kit ![ready](status-images/ready.svg)

Kinja Design Kit is a collection of tools and assets to make drawing Kinja UIs fast and easy.

Check out [Storybook](https://gawkermedia.github.io/kinja-components/) to learn more about our design system and play around with live components. If you're not sure how to start designing, read the [FMG Product Design Process guide](https://drive.google.com/open?id=1qG_mFQBHE3uYcRXt0mXk9KB1t54qnwfX94z_FCIGH8I) first.

## What "tools and assets" exactly?
- **Kinja Component Library.sketch**, a [Sketch Library](https://sketchapp.com/docs/libraries/) of reusable styles and symbols. [Sketch Runner](https://sketchrunner.com/) is recommended for quick Symbol search and insertion. You can manage your Sketch libraries if you navigate to `Sketch > Preferences > Libraries`.
- **Kinja Screen Template.sketch**, a [Sketch template](https://sketchapp.com/docs/templates/) set up _the Kinja way_, filled with example artboards, rulers, layout settings an stuff like that to kickstart your design projects. Once added, you can start each project from `File > New from Template > Kinja Design Template`.
- **kinja-data.sketchplugin**, a [Data plugin](https://sketchapp.com/docs/data/) allowing you to quickly add real live kinja headlines & lead images to your designs.
- **Kinja Icons.sketch**, the file where we design icons.
- **Kinja Logos & Avatars.sketch**, the file where we design logos and avatars.
- **Typefaces**

## Setup
You can get the Kit from the Product-Engineering Google Drive.
1. Sync the _Design / Design Kit_ folder from Google Drive.
2. Install fonts (On macOS open Font Book and drag the _Typefaces_ folder on it).
3. Open _Kinja Design Library.sketch_ and click `File > Add as Library...`.
2. Symlink the screen template to your templates folder.
	- Get the path to the screen template file. You can `Alt + Right Click` on it and hit `Copy "Kinja Screen Template" as Pathname`. It will look something like this:
	```
	/Volumes/GoogleDrive/Team Drives/Product-Engineering/Design/Design Kit/Kinja Screen Template.sketch
	```

	- Get the path to your Sketch Templates folder. You can click `File > New from Template > Reveal in Finder`. It will look something like this:
	```
	/Users/username/Library/Application Support/com.bohemiancoding.sketch3/Templates
	```

	- Open Terminal and run the following command (replace the paths)
	```
	ln -s "path-to-template-file" "path-to-templates-folder"
	```

	- Now you'll have a symlink in the Templates folder and you can start each Sketch project from `File > New from Template > Kinja Screen Template`.
5. Let’s design, it’s fun!

## Maintenance & Contribution
__The Kinja Design Kit always represents our current living styles and components, as they are on the web.__
You can make changes to it, but please make sure that they stay visually and structurally aligned with [Storybook](https://gawkermedia.github.io/kinja-components/) & the [live page](https://kinja.com/).

If you have a new idea to explore, feel free to use the Kit as a starting point, but don't make changes to it, until your idea turns into reality.

Ideally, the Kit wouldn't need to be edited by hand, since it's directly derived from code. But we're not there yet, most of the Kit is maintained manually. The parts that are automatically synced are done so by a [bunch of Sketch scripts](https://github.com/gawkermedia/kinja-to-sketch), feel free to contribute on Github!

## Learn more
- [Designing Icons](https://github.com/gawkermedia/kinja-mantle/blob/master/packages/kinja-components/doc/contributing/ICONS.md)
