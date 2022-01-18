import packBy from './packBy';

describe('packBy', () => {
	it('works on simple arrays', () => {
		expect(packBy([1,1,2,3,1,4,4], ((a, b) => a === b))).toEqual([[1,1], [2], [3], [1], [4,4]]);
	});
	it('works on objects', () => {
		expect(packBy([{ foo: 1 }, { foo: 1 }, { foo: 2 }], ((a, b) => a.foo === b.foo))).toEqual([[{ foo: 1 }, { foo: 1 }], [{ foo: 2 }]]);
	});
	it('returns empty array', () => {
		expect(packBy([], ((a, b) => a === b))).toEqual([]);
	});
});