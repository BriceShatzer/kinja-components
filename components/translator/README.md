# Translator :earth_americas: ![ready](status-images/ready.svg)

This is a helper for translations. It adds the ability to have strings display the correct form based on the given laguage. The English version goes directly to the code, while other translations (Spanish) go in a translations file that is specific to a given component.

Storybook stories you make should allow you to set the language via a knob.

Here is a [demo](http://localhost:8001/?knob-Size=250&knob-Color=%234A90E2&knob-Font=helvetica&knob-Blog%20Name=Gizmodo&knob-Locale=es&knob-isOpen=true&selectedKind=TopBar&selectedStory=TopBar&full=0&down=1&left=1&panelRight=0&downPanel=kadirahq%2Fstorybook-addon-knobs) of the TopBar with localization knobs.

## How to use

First you need to create a translate function by calling `createTranslate` with the hash of translated strings and the language of the page/blog.

```javascript
const translations = {
	'es-ES': {
		...
		'Your profile': 'Tu perfil',
		'Compose post': 'Componer entrada',
		'Account Settings': 'Ajustes de la cuenta',
		...
	}
}

const translate = createTranslate(translations, language);
```

What you get back is a function that will determine the resulting string at runtime.

```javascript
<p>{translate('Account Settings')}</p>
```

Strings can also include variables, for which the values you need to pass in as the second argument:

```javascript
<p>{translate('Hello, {username}', { username: user.name })}</p>
```

Note that in order to make the task of extracting the messages easier, you should always use a plain string literal as the first argument of the translate function. This will allow us to collect all existing messages in a file and hand it off for translation.

### Fallbacks
If a given string is not available in a language, the translator will fall back to the English version (which is the string you pass in to the translate function.)
If you specify a locale that is not available, it will fall back to the english version as well as displaying an error in your console.
Currently supported locales are: `en-US` and `es-ES`.