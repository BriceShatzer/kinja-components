import { fonturl } from './config';

export default `
	/* fira-sans-light ********** 300 */
	@font-face {
		font-display: fallback;
		font-family: 'FiraSans';
		font-weight: 300;
		font-style: normal;

		src: url(${fonturl}/fira-sans/fira-sans-light.woff2?02092016) format('woff2'),
			url(${fonturl}/fira-sans/fira-sans-light.woff?02092016) format('woff');
	}

	/* fira-sans-medium ********** 500 */
	@font-face {
		font-display: fallback;
		font-family: 'FiraSans';
		font-weight: bold;
		font-style: normal;

		src: url(${fonturl}/fira-sans/fira-sans-medium.woff2?02092016) format('woff2'),
			url(${fonturl}/fira-sans/fira-sans-medium.woff?02092016) format('woff');
	}
`;
