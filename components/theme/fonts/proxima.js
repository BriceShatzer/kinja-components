import { fonturl } from './config';

export default `
	// proximacond-regular
	@font-face {
		font-display: fallback;
		font-family: 'ProximaNovaCond';
		font-weight: normal;
		font-style: normal;

		src: url(${fonturl}/proxima/proxima_nova_cond_reg-webfont.woff2?08252015) format('woff2'),
			url(${fonturl}/proxima/proxima_nova_cond_reg-webfont.woff?08252015) format('woff');
	}
	// proximacond-regular italics
	@font-face {
		font-display: fallback;
		font-family: 'ProximaNovaCond';
		font-weight: normal;
		font-style: italic;

		src: url(${fonturl}/proxima/proxima_nova_cond_reg_it-webfont.woff2?08252015) format('woff2'),
			url(${fonturl}/proxima/proxima_nova_cond_reg_it-webfont.woff?08252015) format('woff');
	}

	// proximacond-semibold
	@font-face {
		font-display: fallback;
		font-family: 'ProximaNovaCond';
		font-weight: bold;
		font-style: normal;

		src: url(${fonturl}/proxima/proxima_nova_cond_sbold-webfont.woff2?08252015) format('woff2'),
			url(${fonturl}/proxima/proxima_nova_cond_sbold-webfont.woff?08252015) format('woff');
	}

	// proximacond-semibold italics
	@font-face {
		font-display: fallback;
		font-family: 'ProximaNovaCond';
		font-weight: bold;
		font-style: italic;

		src: url(${fonturl}/proxima/proxima_nova_cond_sbold_it-webfont.woff2?08252015) format('woff2'),
			url(${fonturl}/proxima/proxima_nova_cond_sbold_it-webfont.woff?08252015) format('woff');
	}

	// proximacond-thin
	@font-face {
		font-display: fallback;
		font-family: 'ProximaNovaCond';
		font-weight: 100;
		font-style: normal;

		src: url(${fonturl}/proxima/proxima_nova_cond_thin-webfont.woff2?04172017) format('woff2'),
			url(${fonturl}/proxima/proxima_nova_cond_thin-webfont.woff?04172017) format('woff');
	}

	// proximacond-thin italics
	@font-face {
		font-display: fallback;
		font-family: 'ProximaNovaCond';
		font-weight: 100;
		font-style: italic;

		src: url(${fonturl}/proxima/proxima_nova_cond_thin_it-webfont.woff2?04172017) format('woff2'),
			url(${fonturl}/proxima/proxima_nova_cond_thin_it-webfont.woff?04172017) format('woff');
	}

	// proximacond-bold
	@font-face {
		font-display: fallback;
		font-family: 'ProximaNovaCond';
		font-weight: 800;
		font-style: normal;

		src: url(${fonturl}/proxima/proxima_nova_cond_bold-webfont.woff2?01182018) format('woff2'),
			url(${fonturl}/proxima/proxima_nova_cond_bold-webfont.woff?01182018) format('woff');
	}

	// proximacond-bold italics
	@font-face {
		font-display: fallback;
		font-family: 'ProximaNovaCond';
		font-weight: 800;
		font-style: italic;

		src: url(${fonturl}/proxima/proxima_nova_cond_bold_it-webfont.woff2?01182018) format('woff2'),
			url(${fonturl}/proxima/proxima_nova_cond_bold_it-webfont.woff?01182018) format('woff');
	}

	// proximacond-xbold
	@font-face {
		font-display: fallback;
		font-family: 'ProximaNovaCond';
		font-weight: 900;
		font-style: normal;

		src: url(${fonturl}/proxima/proxima_nova_cond_xbold-webfont.woff2?01182018) format('woff2'),
			url(${fonturl}/proxima/proxima_nova_cond_xbold-webfont.woff?01182018) format('woff');
	}

	// proximacond-xbold italics
	@font-face {
		font-display: fallback;
		font-family: 'ProximaNovaCond';
		font-weight: 900;
		font-style: italic;

		src: url(${fonturl}/proxima/proxima_nova_cond_xbold_it-webfont.woff2?01182018) format('woff2'),
			url(${fonturl}/proxima/proxima_nova_cond_xbold_it-webfont.woff?01182018) format('woff');
	}
`;
