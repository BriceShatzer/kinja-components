/* @flow */

export const legalDisclaimers = {
	theonion: 'The Onion is not intended for readers under 18 years of age.',
	clickhole: `ClickHole uses invented names in all of its stories, except in cases where public figures
							are being satirized. Any other use of real names is accidental and coincidental. ClickHole is
							not intended for readers under 18 years of age.`
};

export const leavingSiteDisclaimer = (legalText: string) => (
	`Disclaimer: You are leaving ${legalText} website and going to a third party site,
	 which is subject to its own privacy policy and terms of use.`
);

export const onionIncBlogs = [
	'avclub',
	'clickhole',
	'theonion',
	'thetakeout'
];

export const gmgBlogs = [
	'deadspin',
	'earther',
	'gizmodo',
	'jalopnik',
	'jezebel',
	'kotaku',
	'lifehacker',
	'splinter',
	'theinventory',
	'theroot'
];

export const storeUrls = {
	jalopnik: 'https://store.jalopnik.com',
	gizmodo: 'https://store.gizmodo.com',
	kotaku: 'https://store.kotaku.com',
	jezebel: 'https://store.jezebel.com',
	lifehacker: 'https://store.lifehacker.com',
	deadspin: 'https://store.deadspin.com',
	avclub: 'https://store.avclub.com/',
	theonion: 'https://store.theonion.com/',
	theroot: 'https://store.theroot.com/',
	thetakeout: 'https://store.thetakeout.com/'
};
