/* @flow */

export const curationGaEvents = {
	tertiaryListItemDesktop: 'Mobile Modular Layout StoryClick - Tertiary list - column'
};

export const mainBlogNames = [
	'avclub',
	'deadspin',
	'esgizmodo',
	'gizmodo',
	'jalopnik',
	'jezebel',
	'kotaku',
	'lifehacker',
	'theroot',
	'theonion',
	'thetakeout',
	'splinter',
	'theinventory'
];

export const BLOGS: {[key: string]: number} = {
	avclub: 1636027099,
	deadspin: 11,
	earther: 1636390014,
	gizmodo: 4,
	gizmodoes: 19292,
	jalopnik: 12,
	jezebel: 39,
	kotaku: 9,
	lifehacker: 17,
	onionlabs: 1636420981,
	onionnative: 1636420981,
	splinter: 1635895473,
	studioatgizmodo: 4541888,
	theinventory: 1458353822,
	theonion: 1636079510,
	theroot: 1635821517,
	thetakeout: 1636140418,
	trackrecord: 1635984514
};

export const BLOG_IDS_NAMES: Array<{ id: number, name: $Keys<typeof BLOGS> }> = Object.keys(BLOGS).map(name => {
	const id = BLOGS[name];
	return { id, name };
});

// Blogs to render in footer component
export const NETWORK_BLOGS = [{
	name: 'deadspin',
	url: '//deadspin.com',
	isSatire: false,
	isCommerce: false,
	tagline: 'Sports News Without Access, Favor, Or Discretion'
}, {
	name: 'gizmodo',
	url: '//gizmodo.com',
	isSatire: false,
	isCommerce: false,
	tagline: 'We come from the future.'
}, {
	name: 'jalopnik',
	url: '//jalopnik.com',
	isSatire: false,
	isCommerce: false,
	tagline: 'Drive Free or Die.'
}, {
	name: 'jezebel',
	url: '//jezebel.com',
	isSatire: false,
	isCommerce: false,
	tagline: 'A Supposedly Feminist Website'
}, {
	name: 'kotaku',
	url: '//kotaku.com',
	isSatire: false,
	isCommerce: false,
	tagline: 'Gaming Reviews, News, Tips and More.'
}, {
	name: 'lifehacker',
	url: '//lifehacker.com',
	isSatire: false,
	isCommerce: false,
	tagline: 'Do everything better'
}, {
	name: 'theroot',
	url: '//theroot.com',
	isSatire: false,
	isCommerce: false,
	tagline: 'Black news, opinions, politics and culture.'
}, {
	name: 'avclub',
	url: '//avclub.com',
	isSatire: false,
	isCommerce: false,
	tagline: 'Pop culture obsessives writing for the pop culture obsessed.'
}, {
	name: 'theinventory',
	url: '//theinventory.com',
	isSatire: false,
	tagline: 'It\'s all consuming.',
	isCommerce: true
}, {
	name: 'theonion',
	url: '//theonion.com',
	isSatire: true,
	isCommerce: false,
	tagline: 'America\'s finest news source.'
}, {
	name: 'thetakeout',
	url: '//thetakeout.com',
	isSatire: false,
	isCommerce: false,
	tagline: 'Food is delicious.'
}, {
	name: 'kinjadeals',
	url: '//kinjadeals.theinventory.com',
	isSatire: false,
	isCommerce: true
}];

export const BLOG_GROUPS = {
	avclub: 'The A.V. Club',
	deadspin: 'Deadspin',
	gizmodo: 'Gizmodo',
	jalopnik: 'Jalopnik',
	jezebel: 'Jezebel',
	kotaku: 'Kotaku',
	lifehacker: 'Lifehacker',
	splinter: 'Splinter',
	theinventory: 'The Inventory',
	theonion: 'The Onion',
	theroot: 'The Root',
	thetakeout: 'The Takeout'
};

export const DEFAULT_AVATAR_PNG = '//i.kinja-img.com/gawker-media/image/upload/s--c-KnrSZE--/' +
'c_fill,fl_progressive,g_center,h_200,q_80,w_200/17jcxm3lnjqwmpng.png';

export const DEFAULT_LOGO_PNG = '//x.kinja-static.com/assets/images/logos/touchicons/default-touch-icon-200x200.png';

export const BLOG_PLACEHOLDER = (src: string) => {
	switch (true) {
		case src.includes('avclub.com'):
			return 'https://x.kinja-static.com/assets/images/logos/placeholders/avclub-saturated.png';
		case src.includes('earther.com'):
			return 'https://x.kinja-static.com/assets/images/logos/placeholders/earther-saturated.png';
		case src.includes('jezebel.com'):
			return 'https://x.kinja-static.com/assets/images/logos/placeholders/jezebel-saturated.png';
		case src.includes('lifehacker.com'):
			return 'https://x.kinja-static.com/assets/images/logos/placeholders/lifehacker-saturated.png';
		case src.includes('deadspin.com'):
			return 'https://x.kinja-static.com/assets/images/logos/placeholders/deadspin-saturated.png';
		case src.includes('gizmodo.com'):
			return 'https://x.kinja-static.com/assets/images/logos/placeholders/gizmodo-saturated.png';
		case src.includes('jalopnik.com'):
			return 'https://x.kinja-static.com/assets/images/logos/placeholders/jalopnik-saturated.png';
		case src.includes('kotaku.com'):
			return 'https://x.kinja-static.com/assets/images/logos/placeholders/kotaku-saturated.png';
		case src.includes('splinter.com'):
			return 'https://x.kinja-static.com/assets/images/logos/placeholders/splinter-saturated.png';
		case src.includes('theinventory.com'):
			return 'https://x.kinja-static.com/assets/images/logos/placeholders/theinventory-saturated.png';
		case src.includes('theroot.com'):
			return 'https://x.kinja-static.com/assets/images/logos/placeholders/theroot-saturated.png';
		case src.includes('onion'):
			return 'https://x.kinja-static.com/assets/images/logos/placeholders/theonion-saturated.png';
		case src.includes('thetakeout'):
			return 'https://x.kinja-static.com/assets/images/logos/placeholders/thetakeout-saturated.png';
		default:
			return 'https://x.kinja-static.com/assets/images/logos/placeholders/default.png';
	}
};

// these are just the ones we're using right now. feel free to add to this list.
export const BLOG_PROPERTIES = {
	HIDE_VIEWCOUNTS: 'hideViewcounts',
	HIDE_BYLINES: 'noBlogBylines',
	HIDE_COMMENTS: 'commentsDisabled',
	AUTO_REPOST_TO_PARENT: 'autoRepostToParent'
};

// enable allow-same-origin & allow-scripts in iframes
export const IFRAME_WHITELIST = [
	'abcnews.go.com',
	'aljazeera.com',
	'assets.pgs.io', // Public Good (needs to be able to open popup, so can't use our restrictive sandbox settings)
	'bleacherreport.com',
	'bloomberg.com',
	'blip.tv',
	'brightcove.com',
	'cache.vevo.com', // alt embed from Vevo
	'cdnapi.kaltura.com', // TMZ
	'cdnapisec.kaltura.com', // alternate TMZ
	'cbc.ca',
	'cbs.com',
	'cbsnews.com',
	'curalate.com',
	'eplayer.clipsyndicate.com',
	'eonline.com',
	'ellentube.com',
	'cnn.com',
	'content.nerdist.com',
	'coub.com',
	'c-span.org',
	'docs.google.com',
	'embed.ted.com',
	'esa.int',
	'ew.com',
	'facebook.com',
	'fandango.com',
	'foxfdm.com',
	'funnyordie.com',
	'flotrack.org',
	'fusion.net',
	'globalnews.ca',
	'gfycat.com',
	'hulu.com',
	'hudl.com',
	'huffingtonpost.com',
	'indavideo.hu',
	'instagram.com',
	'indiewire.com',
	'jwplatform.com',
	'kickstarter.com',
	'kutv.com',
	'liveleak.com',
	'livestream.com',
	'majorleaguegaming.com',
	'maxpreps.com',
	'media.iheart.com',
	'megaphone.link',
	'megaphone.fm',
	'metacafe.com',
	'mixcloud.com',
	'mlb.com',
	'milb.com',
	'msn.com',
	'mno.hu',
	'movieweb.com',
	'mtvnservices.com',
	'nationalgeographic.com',
	'nbcsports.com',
	'newsinc.com',
	'nytimes.com',
	'ooyala.com',
	'open.spotify.com',
	'prezi.com',
	'plot.ly',
	'reubenfb.github.io', // editor-created infographics
	'snappytv.com',
	'soundcloud.com',
	'streamable.com',
	'spotify.com',
	'springboardplatform.com',
	'snagplayer.video.dp.discovery.com',
	'starz.com',
	'typeform.com',
	'trilobita.hu',
	'rtl.hu',
	'pixter.hu',
	'teamcoco.com',
	'theatlantic.com',
	'theplatform.com',
	'turnto23.com',
	'twitch.tv',
	'tv2.hu',
	'tv4play.se',
	'ustream.tv',
	'up.anv.bz',
	'vidd.me',
	'videa.hu',
	'vid.me',
	'vice.com',
	'viddler.com',
	'nhl.com',
	'vimeo.com',
	'vevo.com',
	'vine.co',
	'washingtonpost.com',
	'wnyc.org',
	'wsj.com',
	'wat.tv',
	'w.soundcloud.com',
	'bbc.co.uk',
	'gigapan.com',
	'yahoo.com',
	'youtube.com',
	'embed.5min.com'
];

// List of countries where no "double" opt-in is required for newsletters.
// We use this to check if we need to confirm subscription with the user.
export const SINGLE_OPT_IN_COUNTRY_CODES = ['us'];

// List of blogIds with multiple newsletters.
export const MAILING_LISTS = {
	// AV Club
	'avclub': [{
		key: 'avClubDaily',
		name: 'Daily Newsletter',
		id: 'AV_Club_Daily',
		description: 'Highlights from The A.V. Club',
		provider: 'CampaignMonitor'
	}, {
		key: 'avClubTonight',
		name: 'What\'s On Tonight',
		id: 'AV_Club_Whats_On_Tonight',
		description: 'A daily update on the world of TV',
		provider: 'CampaignMonitor'
	}],
	// The Onion
	'theonion': [{
		key: 'onionDaily',
		name: 'Daily Headlines',
		id: 'The_Onion_Daily',
		provider: 'CampaignMonitor'
	}, {
		key: 'onionWeekly',
		name: 'Weekly Updates',
		id: 'The_Onion_Weekly',
		provider: 'CampaignMonitor'
	}],

	io9: [{
		name: 'Daily Newsletter',
		key: 'io9_Daily',
		id: 'io9_Daily',
		provider: 'CampaignMonitor'
	}],
	earther: [{
		name: 'Daily Newsletter',
		key: 'Earther_Daily',
		id: 'Earther_Daily',
		provider: 'CampaignMonitor'
	}],
	deals: [{
		name: 'Daily Newsletter',
		key: 'Kinja_Deals_Daily',
		id: 'Kinja_Deals_Daily',
		provider: 'CampaignMonitor'
	}]
};

export const getOwnMailingLists = (blogName: string = window.kinja.meta.blog.name) => MAILING_LISTS[blogName];

// This is the timestamp for the date when we disabled user-created blogs, 2019.11.04. 13:00 EST
export const END_DATE_OF_POSTING = 1572890400000;