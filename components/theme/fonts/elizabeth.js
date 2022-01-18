import { fonturl } from './config';

export default `
	// elizabeth-serif-light ********** 400
	@font-face {
		font-display: fallback;
		font-family: 'ElizabethSerif';
		font-weight: 400;
		font-style: normal;

		src: url(${fonturl}/elizabeth-serif/elizabethserif-light-webfont.woff2?09162015) format('woff2'),
			url(${fonturl}/elizabeth-serif/elizabethserif-light-webfont.woff?09162015) format('woff');
	}


	// elizabeth-serif-lightitalic ********** 400 I
	@font-face {
		font-display: fallback;
		font-family: 'ElizabethSerif';
		font-weight: 400;
		font-style: italic;

	src: url(${fonturl}/elizabeth-serif/elizabethserif-lightitalic-webfont.woff2?09162015) format('woff2'),
		 url(${fonturl}/elizabeth-serif/elizabethserif-lightitalic-webfont.woff?09162015) format('woff');
	}

	// elizabeth-serif-regular ********** 500
	@font-face {
		font-display: fallback;
		font-family: 'ElizabethSerif';
		font-weight: 500;
		font-style: normal;

		src: url(${fonturl}/elizabeth-serif/elizabethserif-regular-webfont.woff2?09162015) format('woff2'),
			url(${fonturl}/elizabeth-serif/elizabethserif-regular-webfont.woff?09162015) format('woff');
	}

	// elizabeth-serif-italic ********** 500
	@font-face {
		font-display: fallback;
		font-family: 'ElizabethSerif';
		font-weight: 500;
		font-style: italic;

		src: url(${fonturl}/elizabeth-serif/elizabethserif-italic-webfont.woff2?09162015) format('woff2'),
			url(${fonturl}/elizabeth-serif/elizabethserif-italic-webfont.woff?09162015) format('woff');
	}

	// elizabeth-serif-bold ********** 700
	@font-face {
		font-display: fallback;
		font-family: 'ElizabethSerif';
		font-weight: 700;
		font-style: normal;

		src: url(${fonturl}/elizabeth-serif/elizabethserif-bold-webfont.woff2?09162015) format('woff2'),
			url(${fonturl}/elizabeth-serif/elizabethserif-bold-webfont.woff?09162015) format('woff');
	}

	// elizabeth-serif-bolditalic ********** 700 I
	@font-face {
		font-display: fallback;
		font-family: 'ElizabethSerif';
		font-weight: 700;
		font-style: italic;

		src: url(${fonturl}/elizabeth-serif/elizabethserif-bolditalic-webfont.woff2?09162015) format('woff2'),
			url(${fonturl}/elizabeth-serif/elizabethserif-bolditalic-webfont.woff?09162015) format('woff');
	}
`;
