// @flow
import takeWhile from 'lodash/takeWhile';
import dropWhile from 'lodash/dropWhile';

/**
 * packBy is similar to groupBy, but keeps items in order, only grouping continous items that
 * match the predicate
 * [1,1,2,3,3,3,4,1] -> [[1,1], [2], [3,3,3], [4], [1]]
 */
export default function packBy<T>(list: Array<T>, equality: (T, T) => boolean): Array<Array<T>> {
	if (list.length === 0) {
		return [];
	}
	const predicate = (value: T, index: number) => {
		if (index === 0) {
			return true;
		}
		return equality(value, list[index - 1]);

	};
	const same = takeWhile(list, predicate);
	const rest = dropWhile(list, predicate);
	return [same, ...packBy(rest, equality)];
}