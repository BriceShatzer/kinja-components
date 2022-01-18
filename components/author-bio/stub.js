// @flow

import User from 'kinja-magma/models/User';

const authorUserProperties = {
	'1484116754': {
		showBio: true,
		twitterHandle: 'zmetser',
		pgpKeyUrl: 'https://keybase.io/zmetser',
		pgpFingerprint: 'CE505548D52848B1',
		otrFingerprint: 'CE505548D52848B1',
		bio: 'Hacking Kinja',
		email: 'test@kinja.com',
		emailIsConfirmed: true
	}
};

const authors = [
	{
		id: '1484116754',
		avatar: {
			id: '17jcxldy9dbzapng',
			format: 'jpg'
		},
		displayName: 'John Doe',
		screenName: 'joeKinja',
		isSuperuser: false,
		status: 'enabled',
		createdMillis: 0

	},
	{
		id: '1484116754',
		avatar: {
			id: '17jcxldy9dbzapng',
			format: 'jpg'
		},
		displayName: 'Sam Doe',
		screenName: 'samKinja',
		isSuperuser: false,
		status: 'enabled',
		createdMillis: 0
	}
];


export const props = {
	host: 'kinja.com',
	authors: authors.map<User>(author => User.fromJSON(author)),
	isAmp: false,
	authorUserProperties
};
