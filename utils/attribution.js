/* @flow */

export function isEmptyAttribution(attributionData: *) {
	const firstAttribute = attributionData[0];
	return attributionData.length === 1 &&
		(firstAttribute.credit === '' && firstAttribute.source === '' && firstAttribute.label === '');
}
