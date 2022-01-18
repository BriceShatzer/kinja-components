/* @flow */

/**
 * For use in exhaustiveness checking of switch statements and
 * conditionals
 * @see https://github.com/gawkermedia/kinja-mantle/blob/master/doc/FlowCookbook.md#exhaustiveness-checking
 */

export function unexpectedCase(impossible: empty): void {
	throw new Error(`Unexpected case ${impossible}`);
}
