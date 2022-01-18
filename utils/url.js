/* @flow */

import queryString from 'query-string';

export function extractItemId(url: string): ?number {
	const permalinkWithTitleRegex = /^\/[^/]*-([0-9]+)(?:\/ask|\/chat)?$/;
	const permalinkWithTitleAndLookupRegex = /^\/([0-9]+)(?:\/.*)?$/;
	const permalinkWithTagsAndTitleLookupRegex = /^\/[^/]+\/[^/]+\/.*-([0-9]+)\.php$/;
	const anchor: HTMLAnchorElement = document.createElement('a');
	let retVal;

	anchor.href = url;
	[permalinkWithTitleRegex, permalinkWithTitleAndLookupRegex, permalinkWithTagsAndTitleLookupRegex].some((regex: RegExp) => {
		retVal = (anchor.pathname.match(regex) || [])[1];
		return (anchor.pathname.match(regex) || [])[1];
	});

	return retVal;
}

export function getKinjaHost() {
	const devTLD = window.location.host.match(/\.(localhost|xip\.io)(:\d+)?$/);
	return 'kinja' + (devTLD ? devTLD[0] : '.com');
}

export function replaceQueryStringParamValue(url: string, paramName: string, value: string): string {
	const [urlWithoutFragment, fragment] = url.split('#');
	const {url: urlBase, query} = queryString.parseUrl(urlWithoutFragment);
	const updatedQueryParams = queryString.stringify({
		...query,
		[paramName]: value
	});
	return `${urlBase}?${updatedQueryParams}${fragment ? `#${fragment}` : ''}`;
}

export function removeQueryStringParam(url: string, paramName: string): string {
	const [urlWithoutFragment, fragment] = url.split('#');
	const {url: urlBase, query} = queryString.parseUrl(urlWithoutFragment);
	delete query[paramName];
	const updatedQueryParams = queryString.stringify(query);
	return `${urlBase}${updatedQueryParams.length ? `?${updatedQueryParams}` : ''}${fragment ? `#${fragment}` : ''}`;
}

export function fullyQualifyWithProtocol(url: string): string {
	if (url.includes('http:')) {
		return url.replace('http:', 'https:');
	} else if (url.includes('https:')) {
		return url;
	} else {
		return `https://${url}`;
	}
}

export function filterXssUrl(url: string): string {
	if (url.match('^(mailto:|https?:|ftp:|#|/)')) {
		return url;
	} else {
		return '';
	}
}
