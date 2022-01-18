const THOUSAND = 1000;
const MILLION = 1000000;

/**
 * Formats large numbers to a shorter format for display:
 * - numbers below 1000 stay as is
 * - numbers between 1000 and 1000000 are formatted `###.#K`
 * - numbers above 1000000 are formatted `###.#M`
 *
 * @param  {Number} number - The number to format.
 * @return {String}        - The string version of the number in short format.
 */
export default function numberShortFormat(number) {
	const intValue = parseInt(number, 10);
	let shortFormat = '';

	if (intValue < THOUSAND) {
		shortFormat += intValue;
	} else if (intValue < MILLION) {
		shortFormat = (intValue / THOUSAND).toFixed(1) + 'K';
	} else {
		shortFormat = (intValue / MILLION).toFixed(1) + 'M';
	}

	return shortFormat;
}
