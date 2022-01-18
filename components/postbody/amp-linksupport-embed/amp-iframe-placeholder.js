// @flow

import * as React from 'react';

type PlaceholderOptions = {
	source?: string
}

const AmpIframePlaceholder = ({ source }: PlaceholderOptions) => {
	return (
		<p>
			<amp-img
				src='https://i.kinja-img.com/gawker-media/image/upload/f5f5f5_f3ytsm.png'
				width='1'
				height='1'
				alt='Embed preview placeholder'
				placeholder
				layout='fill' />
			<div
				overflow='overflow'
				tabIndex='0'
				role='button'
				aria-label='Read more'>Read more {source && <a href={source}> here</a> }!</div>
		</p>
	);
};

export default AmpIframePlaceholder;
