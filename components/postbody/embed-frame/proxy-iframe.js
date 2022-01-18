// @flow
import queryString from 'query-string';
import some from 'lodash/some';
import type { ImageProperties } from 'postbody/Image';

const proxiedPath = '/proxy/iframe';
export const proxiedQuery = `${proxiedPath}?url=`; // IFRAME proxy endpoint
export const pathWhitelist = ['/inset/iframe?id=', '/embed/thread/', proxiedQuery]; // Whitelisted paths that won't be proxied.

/**
 * Given an IFRAME src path that may be proxied for display in the Editor, return the un-proxied version
 */
export function getUnproxiedPath(path: string): string {
	if (path.indexOf(proxiedPath) > -1) {
		// /proxy/iframe?url=http%3A%2F%2F.test.com%3Fparam=on&imageId=zhxqs1hhlflked7raena&imageExt=jpg
		// => https://test.com?param=on
		return queryString.parseUrl(path).query.url;
	}
	return path;
}

export const isWhitelistedSource = (url: string): boolean => some(pathWhitelist, path => url.indexOf(path) > -1);

/**
 * Add thumbnail url params to IFRAME src
 */
export function iframeSrcWithThumb(iframeSrc: string, thumbnail: ImageProperties): string {
	const { url, query } = queryString.parseUrl(iframeSrc);
	return url + '?' + queryString.stringify({
		...query,
		imageId: thumbnail.id,
		imageExt: thumbnail.format
	});
}

/**
 * Replace IFRAME URL to a proxied Kinja path
 */
export function proxyIframe(frame: HTMLIFrameElement, thumbnail?: ImageProperties) {
	const originalSrc = frame.getAttribute('src') || '';

	if (originalSrc && !isWhitelistedSource(originalSrc)) {
		const proxiedUrl = proxiedQuery + encodeURIComponent(originalSrc);
		frame.setAttribute('src', thumbnail ? iframeSrcWithThumb(proxiedUrl, thumbnail) : proxiedUrl);
		if (originalSrc.indexOf('http://') === 0) {
			frame.setAttribute('data-insecure', 'true');
			frame.setAttribute('scrolling', 'no');
		}
	} else {
		frame.setAttribute('src', thumbnail ? iframeSrcWithThumb(originalSrc, thumbnail) : originalSrc);
	}
}

/**
 * Replace iframe urls to a proxied kinja path.
 * @param  {Element} el Finding iframe Elements in this Element.
 * @return {Element}    Same element reference passed as argument.
 */
export function proxyIframes(el: Element): Element {
	const iframes = el.querySelectorAll('iframe');
	Array.prototype.forEach.call(iframes, iframe => proxyIframe(iframe));
	return el;
}
