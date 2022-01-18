// @flow

import * as React from 'react';

const dir = '/assets/images/logos/newsletter/';

const files = {
	avclub: 'avclub-white.png',
	clickhole: 'clickhole-white.png',
	deadspin: 'deadspin-white.png',
	earther: 'earther-white.png',
	gizmodo: 'gizmodo-white.png',
	gomedia: 'gomedia-white.png',
	jalopnik: 'jalopnik-white.png',
	jezebel: 'jezebel-white.png',
	kinja: 'kinja-white.png',
	kinjadeals: 'kinjadeals-white.png',
	kotaku: 'kotaku-white.png',
	lifehacker: 'lifehacker-white.png',
	theinventory: 'theinventory-white.png',
	theonion: 'theonion-white.png',
	theroot: 'theroot-white.png',
	thetakeout: 'thetakeout-white.png'
};

const WhiteBlogLogoImg = ({
	name,
	alt,
	staticHost,
	style
}: {
	name: string,
	alt?: string,
	staticHost: string,
	style?: {[string]: string}
}) => {
	const file = files[name];

	if (!file) {
		return null;
	}

	return <img src={staticHost + dir + file} alt={alt} style={style} border='0'/>;
};

export default WhiteBlogLogoImg;
