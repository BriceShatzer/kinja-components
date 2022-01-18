import { fonturl } from './config';

export default `
	// libre-baskerville-bold ********** 700
	@font-face {
		font-display: fallback;
		font-family: 'Libre Baskerville';
		font-weight: 700;
		font-style: normal;
		src: local('Libre Baskerville Bold'), local('LibreBaskerville-Bold'),
			url(${fonturl}/libre-baskerville/libre-baskerville-bold.woff2) format('woff2');
	}
`;
