// @flow

import { rgba } from 'polished';

export const colors = {
	primary: '#0A7BC2',
	primaryLight: '#0C91E4',
	backgroundLight: '#E6F2F8',
	logo: '#000',
	success: '#23891F',
	alert: '#EEB544',
	error: '#D24A1D',

	white: '#FFF',
	whitesmoke: '#F5F5F5',
	lightgray: '#E5E5E5',
	midgray: '#CCC',
	gray: '#7D7D7D',
	darkgray: '#666',
	darksmoke: '#222',
	black: '#000',

	// Social colors
	facebook: '#1877F2',
	instagram: '#C32AA3',
	youtube: '#FF0000',
	twitter: '#1DA1F2',
	google: '#DB4437',
	linkedin: '#0077B5',
	rss: '#7D7D7D',

	// Commerce colors
	amazon: '#F5C056',
	commerce: '#72AD75'
};

export const brandColors = {

	/*
	Accessible brand colors:

	primary
		- Used by default for most branded items.
		- Used for text links on white and background. Has at least 4.5 contrast ratio with white and background.
		- Saturated, visibly different from bodytext and secondarytext.

	primaryLight
		- Used for text links on black. Has at least 4.5 contrast ratio with black.
		- Saturated, visibly different from white and midgray.

	backgroundLight
		- Used for visually separating sections eg. left side of login form. Colored, visibly different from white.
		- Has at least 4.5 contrast ratio with primary, bodytext and secondarytext.

	Decorative brand colors:

	logo
		- Used on some sites for the logo, and for the background color of blog avatars.
		- Also used for the border at the bottom of images on branded story cards.
		- Doesn’t necessarily have a 4.5 contrast ratio with white, due to legacy reasons.
		- Should be eventually replaced with primary if possible.
	*/

	avclub: {
		primary: '#9408A3',
		primaryLight: '#91DBD9',
		backgroundLight: '#E5F7F9',
		logo: '#1C263C'
	},

	clickhole: {
		primary: '#DB3A00',
		primaryLight: '#FF6F0F',
		backgroundLight: '#FFF3EB',
		logo: '#FF6F0F',
		clickholeBlue: '#31C4F3'
	},

	deadspin: {
		primary: '#247B72',
		primaryLight: '#249D9D',
		backgroundLight: '#EAF5F4',
		logo: '#1B3A4D',
		deadspinLightblue: '#7DA8C4',
		deadspinLightgreen: '#DEFF73'
	},

	earther: {
		logo: '#0075B2'
	},

	gizmodo: {
		primary: '#0075B2',
		primaryLight: '#18AFED',
		backgroundLight: '#E6F2F8',
		logo: '#18AFED',
		gizmodoOrange: '#FF4800'
	},

	jalopnik: {
		primary: '#3E79B1',
		primaryLight: '#FF7033',
		backgroundLight: '#FFF3EB',
		logo: '#FF4D00'
	},

	jezebel: {
		primary: '#DA1032',
		primaryLight: '#FFEBBE',
		backgroundLight: '#FFF0F3',
		logo: '#EC1238',
		jezebelBlue: '#00D0FF'
	},

	kinjadeals: {
		primary: '#4A7D51',
		primaryLight: '#72AD75',
		backgroundLight: '#F5FAF5',
		logo: '#72AD75',
		dealsBlue: '#008CBA'
	},

	kotaku: {
		primary: '#B12460',
		primaryLight: '#FBC000',
		backgroundLight: '#FDF0C7',
		logo: '#FBC000',
		kotakuGreen: '#54AB97'
	},

	lifehacker: {
		primary: '#297AA3',
		primaryLight: '#94B330',
		backgroundLight: '#F1FDE7',
		logo: '#94B330',
		lifehackerDarkgreen: '#688A01',
		lifehackerLightgreen: '#D2FF42'
	},

	patriothole: {
		primary: '#DF0F0C',
		backgroundLight: '#F5F5F5',
		primaryLight: '#E9100C',
		logo: '#DF0F0C'
	},

	splinter: {
		primary: '#D42A08',
		primaryLight: '#F97358',
		backgroundLight: '#FCF0EE',
		logo: '#F85637'
	},

	theinventory: {
		primary: '#8F085E',
		primaryLight: '#F764C1',
		backgroundLight: '#F5DFED',
		logo: '#8F085E'
	},

	theroot: {
		primary: '#3F7A1A',
		primaryLight: '#509C21',
		backgroundLight: '#E6F2DF',
		logo: '#509C21',
		therootOrange: '#DD6634',
		therootPurple: '#692695'
	},

	theonion: {
		primary: '#006B3A',
		primaryLight: '#94D1B4',
		backgroundLight: '#DFF5EB',
		logo: '#006B3A'
	},

	thetakeout: {
		primary: '#CA3116',
		primaryLight: '#FBC000',
		backgroundLight: '#FAF0C3',
		logo: '#E5371A',
		thetakeoutBlue: '#174066'
	}
};

const typography = {
	ProximaNovaCond: {
		fontFamily: 'ProximaNovaCond, sans-serif',
		fontSizes: {
			xsmall: '16px',
			small: '19px',
			medium: '24px',
			large: '32px',
			xlarge: '37px'
		},
		lineHeights: {
			xsmall: '24px',
			small: '24px',
			medium: '32px',
			large: '40px',
			xlarge: '44px'
		}
	},
	ElizabethSerif: {
		fontFamily: 'ElizabethSerif, Georgia, serif',
		fontSizes: {
			xsmall: '14px',
			small: '15px',
			medium: '19px',
			large: '27px',
			xlarge: '30px'
		},
		lineHeights: {
			xsmall: '24px',
			small: '24px',
			medium: '32px',
			large: '40px',
			xlarge: '44px'
		}
	},
	FiraSans: {
		fontFamily: 'FiraSans, sans-serif',
		fontSizes: {
			xsmall: '15px',
			small: '17px',
			medium: '21px',
			large: '29px',
			xlarge: '35px'
		},
		lineHeights: {
			xsmall: '24px',
			small: '24px',
			medium: '32px',
			large: '40px',
			xlarge: '44px'
		}
	},
	LibreBaskerville: {
		fontFamily: 'Libre Baskerville, serif',
		fontSizes: {
			xsmall: '14px',
			small: '15px',
			medium: '19px',
			large: '26px',
			xlarge: '30px'
		},
		lineHeights: {
			xsmall: '24px',
			small: '24px',
			medium: '32px',
			large: '40px',
			xlarge: '44px'
		}
	}
};

const defaultTheme = {
	// Color definitions
	color: {
		...colors,

		// text colors
		bodytext: colors.darksmoke,
		secondarytext: colors.gray,

		// branded settings
		backgroundLayer: rgba(colors.black, 0.45),
		foregroundLayer: rgba(colors.black, 0.4),
		whiteOverlay: rgba(colors.white, 0.7),
		blackOverlay: rgba(colors.black, 0.7),
		darkBlackOverlay: rgba(colors.black, 0.9)
	},
	typography: {
		primary: typography.ProximaNovaCond, // deprecated, use `headline` for article headlines and headings, or `utility` for everything else
		serif: typography.ElizabethSerif, // deprecated, use `body`
		tertiary: typography.FiraSans, // deprecated, just use `FiraSans`
		headline: typography.ProximaNovaCond,
		body: typography.ElizabethSerif,
		utility: typography.ProximaNovaCond,
		headlineSize: '24px', // deprecated, use typography.headline.fontSizes
		embiggenedHeadlineSize: '34px', // deprecated, use typography.headline.fontSizes
		headlineLineHeight: '1.3', // deprecated, use typography.headline.lineHeights
		permalinkHeadlineSize: {
			small: '2rem', // deprecated, use typography.headline.fontSizes
			mediumUp: '2.5rem', // deprecated, use typography.headline.fontSizes
			xxxlargeUp: '3rem' // deprecated, use typography.headline.fontSizes
		},
		permalinkHeadlineLineHeight: '1.2' // deprecated, use typography.headline.lineHeights
	},
	linkTransition: '0.1s ease-out',
	columnGutter: '2.25rem', // 36px. deprecated, use only for legacy grid
	columnPadding: '1.125rem', // 18px. deprecated, use only for legacy grid
	columnGutter19: {
		small19: '1rem', // 16px. deprecated, use gridValue
		largeUp: '1.5rem', // 24px. deprecated, use gridValue
		xlargeUp: '2rem' // 32px. deprecated, use gridValue
	},
	columnPadding19: {
		small19: '0.5rem', // 8px. deprecated, use gridValue
		largeUp: '0.75rem', // 12px. deprecated, use gridValue
		xlargeUp: '1rem' // 16px. deprecated, use gridValue
	},
	pageWidth: '1336px', // deprecated, use gridValue
	sidebarContainerWidth: '33.5%', // deprecated, use gridValue
	mainContainerWidth: '66.5%', // deprecated, use gridValue
	featuredContentWidth: '1024px', // deprecated, use gridValue
	sidebarContentMinWidth: '300px', // deprecated, use gridValue
	sidebarContentMaxWidth: '360px', // deprecated, use gridValue
	mainContentMaxWidth: '800px', // deprecated, use gridValue
	postContentMaxWidth: '636px', // deprecated, use gridValue
	breakpointBanner: '969px', // (banner ad width - 1)
	breakpointMedium: '53.125em',  // deprecated, use gridValue
	globalNavHeight: '80px',
	scrollbackNavHeight: '60px',
	slideshowTransitionDuration: '0.2s'
};

export const avclub = {
	...defaultTheme,
	color: {
		...defaultTheme.color,
		...brandColors.avclub
	}
};

export const clickhole = {
	...defaultTheme,
	color: {
		...defaultTheme.color,
		...brandColors.clickhole
	}
};

export const deadspin = {
	...defaultTheme,
	color: {
		...defaultTheme.color,
		...brandColors.deadspin
	}
};

export const earther = {
	...defaultTheme,
	color: {
		...defaultTheme.color,
		...brandColors.earther
	}
};

export const gizmodo = {
	...defaultTheme,
	color: {
		...defaultTheme.color,
		...brandColors.gizmodo
	}
};

export const jalopnik = {
	...defaultTheme,
	color: {
		...defaultTheme.color,
		...brandColors.jalopnik
	}
};

export const jezebel = {
	...defaultTheme,
	color: {
		...defaultTheme.color,
		...brandColors.jezebel
	}
};

export const kinjadeals = {
	...defaultTheme,
	color: {
		...defaultTheme.color,
		...brandColors.kinjadeals
	}
};

export const kotaku = {
	...defaultTheme,
	color: {
		...defaultTheme.color,
		...brandColors.kotaku
	}
};

export const lifehacker = {
	...defaultTheme,
	color: {
		...defaultTheme.color,
		...brandColors.lifehacker
	}
};

export const patriothole = {
	...defaultTheme,
	color: {
		...defaultTheme.color,
		...brandColors.patriothole
	}
};

export const splinter = {
	...defaultTheme,
	color: {
		...defaultTheme.color,
		...brandColors.splinter
	}
};

export const theinventory = {
	...defaultTheme,
	color: {
		...defaultTheme.color,
		...brandColors.theinventory
	}
};

export const theroot = {
	...defaultTheme,
	color: {
		...defaultTheme.color,
		...brandColors.theroot
	}
};

export const theglowup = {
	...defaultTheme,
	color: {
		...defaultTheme.color,
		...brandColors.theroot
	}
};

export const theonion = {
	...defaultTheme,
	color: {
		...defaultTheme.color,
		...brandColors.theonion
	},
	typography: {
		...defaultTheme.typography,
		headline: typography.ElizabethSerif, // temporary, change to LibreBaskerville once onion front page is released
		curatedHomepage: typography.LibreBaskerville, // temporary, remove once onion front page is released
		headlineSize: '22px', // deprecated, use typography.headline.fontSizes
		embiggenedHeadlineSize: '28px', // deprecated, use typography.headline.fontSizes
		headlineLineHeight: '1.4', // deprecated, use typography.headline.lineHeights
		permalinkHeadlineSize: {
			small: '2rem', // deprecated, use typography.headline.fontSizes
			mediumUp: '2.125rem', // deprecated, use typography.headline.fontSizes
			xxxlargeUp: '2.5rem' // deprecated, use typography.headline.fontSizes
		},
		permalinkHeadlineLineHeight: '1.3' // deprecated, use typography.headline.lineHeights
	}
};

export const thetakeout = {
	...defaultTheme,
	color: {
		...defaultTheme.color,
		...brandColors.thetakeout
	}
};

export const blogThemes = {
	avclub,
	clickhole,
	deadspin,
	earther,
	gizmodo,
	jalopnik,
	jezebel,
	kinjadeals,
	kotaku,
	lifehacker,
	patriothole,
	splinter,
	theglowup,
	theinventory,
	theroot,
	theonion,
	thetakeout,
	default: defaultTheme
};

export default defaultTheme;
