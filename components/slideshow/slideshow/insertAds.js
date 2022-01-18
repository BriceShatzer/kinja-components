
// @flow

import type { SlideType } from '../types';
import type ImageNode from 'postbody/blockNodes/ImageNode';

/**
 * Helper function that takes an array of slides and inserts ad placeholders
 * at the given frequency, then returns the array
 */
const insertAds = (originalSlides: Array<ImageNode>, adsFrequency: number): Array<SlideType> => {
	const slides: Array<SlideType> = [...originalSlides];
	if (adsFrequency < 2) {
		return slides;
	}
	let i = 0;
	let slidesSinceLastAd = 0;
	while (i < slides.length) {
		if (slidesSinceLastAd === adsFrequency) {
			slidesSinceLastAd = 0;
			slides.splice(i, 0, {
				type: 'ad',
				seen: false
			});
			i += 1;
		}
		i += 1;
		slidesSinceLastAd += 1;
	}
	return slides;
};

export default insertAds;
