/* @flow */

export function capitalizeString(
	str: string
) {
	return str.substr(0, 1).toUpperCase().concat(str.substr(1));
}

export function identity(arg: *) {
	return arg;
}

export function stripHTML(
	html: string,
	createElementFn?: string => HTMLElement
) {
	let temp: HTMLElement;

	function createElement(el) {
		if (createElementFn) {
			return createElementFn(el);
		}
		return global.document.createElement(el);
	}

	try {
		temp = createElement('div');
	} catch (err) {
		throw Error(err);
	}

	temp.innerHTML = html;

	return temp.textContent || temp.innerText || html;
}

export function stripHTMLWithRegex(html: string) {
	// taken from https://github.com/google/closure-library/blob/master/closure/goog/i18n/bidi.js#L250
	const regex = /<[^>]*>|&[^;]+;/g;
	return html.replace(regex, '');
}

export function truncateStringBy(
	str: string = '',
	len?: number = str.length,
	ellipsis?: boolean = true
) {
	return str.length <= len ? str : str.substr(0, len).concat(ellipsis ? '…' : '');
}

/*
* Converts unicode characters found in the ranges:
*	Latin-1 Supplement (U+00A0 - U+00FF)
*	Latin Extended-A   (U+0100 - U+017F)
*	Latin Extended-B   (U+0180 - U+024F)
*	IPA Extensions     (U+0250 - U+02AF)
*	Spacing Modifiers  (U+02B0 - U+02FF)
*
*  to printable US-ASCII characters (U+0020 - U+007E).
*  This replaces functionality previously provided by the unidecode library.
*  https://github.com/FGRibreau/node-unidecode
*
**/
export function extendedLatinToASCII(
	string: string
) {
	// ASCII assumptions for the first 768 character codes (U+0000 - U+02FF)
	const charCodeEquivalents = ['\x00','\x01','\x02','\x03','\x04','\x05','\x06','\x07','\x08','\x09','\x0a','\x0b','\x0c','\x0d','\x0e','\x0f','\x10','\x11','\x12','\x13','\x14','\x15','\x16','\x17','\x18','\x19','\x1a','\x1b','\x1c','\x1d','\x1e','\x1f',' ','!','"','#','$','%','&','\'','(',')','*','+',',','-','.','/','0','1','2','3','4','5','6','7','8','9',':',';','<','=','>','?','@','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','[','\\',']','^','_','`','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','{','|','}','~','\x7f','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',' ','!','C/','PS','$?','Y=','|','SS','"','(c)','a','<<','!','','(r)','-','deg','+-','2','3','\'','u','P','*',',','1','o','>>','1/4','1/2','3/4','?','A','A','A','A','A','A','AE','C','E','E','E','E','I','I','I','I','D','N','O','O','O','O','O','x','O','U','U','U','U','U','Th','ss','a','a','a','a','a','a','ae','c','e','e','e','e','i','i','i','i','d','n','o','o','o','o','o','/','o','u','u','u','u','y','th','y', 'A','a','A','a','A','a','C','c','C','c','C','c','C','c','D','d','D','d','E','e','E','e','E','e','E','e','E','e','G','g','G','g','G','g','G','g','H','h','H','h','I','i','I','i','I','i','I','i','I','i','IJ','','J','j','K','k','k','L','l','L','l','L','l','L','l','L','l','N','n','N','n','N','n','\'n','ng','NG','O','o','O','o','O','o','OE','oe','R','r','R','r','R','r','S','s','S','s','S','s','S','s','T','t','T','t','T','t','U','u','U','u','U','u','U','u','U','u','U','u','W','w','Y','y','Y','Z','z','Z','z','Z','z','s','b','B','B','b','6','6','O','C','c','D','D','D','d','d','3','@','E','F','f','G','G','hv','I','I','K','k','l','l','W','N','n','O','O','o','OI','oi','P','p','YR','2','2','SH','sh','t','T','t','T','U','u','Y','V','Y','y','Z','z','ZH','ZH','zh','zh','2','5','5','ts','w','|','||','|=','!','DZ','Dz','dz','LJ','Lj','lj','NJ','Nj','nj','A','a','I','i','O','o','U','u','U','u','U','u','U','u','U','u','@','A','a','A','a','AE','ae','G','g','G','g','K','k','O','o','O','o','ZH','zh','j','DZ','D','dz','G','g','HV','W','N','n','A','a','AE','ae','O','o','A','a','A','a','E','e','E','e','I','i','I','i','O','o','O','o','R','r','R','r','U','u','U','u','S','s','T','t','Y','y','H','h','[?]','[?]','OU','ou','Z','z','A','a','E','e','O','o','O','o','O','o','O','o','Y','y','[?]','[?]','[?]','[?]','[?]','[?]','[?]','[?]','[?]','[?]','[?]','[?]','[?]','[?]','[?]','[?]','[?]','[?]','[?]','[?]','[?]','[?]','[?]','[?]','[?]','[?]','[?]','[?]','a','a','a','b','o','c','d','d','e','@','@','e','e','e','e','j','g','g','g','g','u','Y','h','h','i','i','I','l','l','l','lZ','W','W','m','n','n','n','o','OE','O','F','R','R','R','R','r','r','R','R','R','s','S','j','S','S','t','t','U','U','v','^','W','Y','Y','z','z','Z','Z','?','?','?','C','@','B','E','G','H','j','k','L','q','?','?','dz','dZ','dz','ts','tS','tC','fN','ls','lz','WW',']]','[?]','[?]','k','h','j','r','r','r','r','w','y','\'','"','`','\'','`','`','\'','?','?','<','>','^','V','^','V','\'','-','/','\\',',','_','\\','/',':','.','`','\'','^','V','+','-','V','.','@',',','~','"','R','X','G','l','s','x','?','','','','','','','','V','=','"','[?]','[?]','[?]','[?]','[?]','[?]','[?]','[?]','[?]','[?]','[?]','[?]','[?]','[?]','[?]','[?]']; /* eslint-disable-line max-len */

	const arrayOfLetters = string.split('');
	arrayOfLetters.forEach((letter, i) => {
		const charCode = letter.charCodeAt(0);
		if (127 < charCode && charCode < charCodeEquivalents.length) {
			arrayOfLetters.splice(i,1,charCodeEquivalents[charCode]);
		}
	});

	return arrayOfLetters.join('');
}

/*
* This function takes an array of strings and returns the
* maximum amount of items that fit within a predetermined
* character limit when joined by the string ', '.
*
* Eg. for the input ['Jane Doe', 'John Doe']
* and a character limit of 10, this will return ['Jane Doe'].
*/
export function truncateStringArray(strings: Array<string>, charLimit: number = 50) {
	const loop = (stringsWithinLimit, restOfStrings) => {
		if (!restOfStrings.length) {
			return [...stringsWithinLimit];
		}
		if (stringsWithinLimit.join(', ').length + strings[0].length < charLimit) {
			const [head, ...tail] = restOfStrings;
			return loop([...stringsWithinLimit, head], tail);
		} else {
			return [...stringsWithinLimit];
		}
	};

	return loop([], strings);
}

export function decodeHTMLEntities(str: string) {
	return str ? str.replace(/&#(\d+);/g, (m, num) => String.fromCharCode(num)) : '';
}

/*
*	 https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
*/
export function hashFromString(str: string = '') {
	return str.split('').reduce((prevHash, currVal) =>
		(((prevHash << 5) - prevHash) + currVal.charCodeAt(0)) | 0, 0);
}

/*
* https://github.com/nefe/You-Dont-Need-jQuery#6.4
*/
export function parseHTML(string: string = '') {
	const context = document.implementation.createHTMLDocument();

	// Set the base href for the created document so any parsed elements with URLs
	// are based on the document's URL
	const base = context.createElement('base');
	// $FlowFixMe
	base.href = document.location.href;
	// $FlowFixMe
	context.head.appendChild(base);

	// $FlowFixMe
	context.body.innerHTML = string;
	// $FlowFixMe
	return context.body.children;
}
