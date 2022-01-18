// @flow

const blogGroups: {
	[string]: {
		blogName: string,
		hostName: string
	}
} = {
	avclub: {
		blogName: 'The A.V. Club',
		hostName: 'avclub.com'
	},
	clickhole: {
		blogName: 'ClickHole',
		hostName: 'clickhole.com'
	},
	deadspin: {
		blogName: 'Deadspin',
		hostName: 'deadspin.com'
	},
	gizmodo: {
		blogName: 'Gizmodo',
		hostName: 'gizmodo.com'
	},
	gizmodoes: {
		blogName: 'Gizmodo en Español',
		hostName: 'es.gizmodo.com'
	},
	jalopnik: {
		blogName: 'Jalopnik',
		hostName: 'jalopnik.com'
	},
	jezebel: {
		blogName: 'Jezebel',
		hostName: 'jezebel.com'
	},
	kotaku: {
		blogName: 'Kotaku',
		hostName: 'kotaku.com'
	},
	lifehacker: {
		blogName: 'Lifehacker',
		hostName: 'lifehacker.com'
	},
	splinter: {
		blogName: 'Splinter',
		hostName: 'splinternews.com'
	},
	theinventory: {
		blogName: 'The Inventory',
		hostName: 'theinventory.com'
	},
	theonion: {
		blogName: 'The Onion',
		hostName: 'theonion.com'
	},
	theroot: {
		blogName: 'The Root',
		hostName: 'theroot.com'
	},
	thetakeout: {
		blogName: 'The Takeout',
		hostName: 'thetakeout.com'
	},
	trackrecord: {
		blogName: 'TrackRecord',
		hostName: 'trackrecord.net'
	}
};

export default (groupName: string = window.kinja.meta.blog.blogGroup) => blogGroups[groupName];