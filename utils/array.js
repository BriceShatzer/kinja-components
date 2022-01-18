/* @flow */

/* Return an array with the separator interspersed between
 * each element of the input array.
 * Unlike join, this works on react elements.
 * shallow(intersperse([<El />, <El />], ' - ')) => <El /> - <El />
 */
export function intersperse<T, U>(arr: Array<T>, sep: U): Array<T | U> {
	if (arr.length === 0) {
		return [];
	}
	const init: Array<T | U> = [arr[0]];
	return arr.slice(1).reduce((memo: Array<T | U>, item: T): Array<T | U> => memo.concat([sep, item]), init);
}
