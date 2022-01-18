// @flow
import { replaceQueryStringParamValue } from './url';

/*
	The same functionality as addCommerceSource.es6, without the DOM manipulation
*/

export function isCommerceUrl(url: string) {
	return ['//gear.lifehacker.', '//deals.kinja.', 'theinventory.'].some(
		snippet => url.indexOf(snippet) !== -1
	);
}

export default (url: string, source: string) => {
	return isCommerceUrl(url)
		? replaceQueryStringParamValue(url, 'ks', source)
		: url;
};
