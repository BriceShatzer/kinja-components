// @flow

import * as React from 'react';

type MegaphoneOptions = {
	id: string
}

const AmpMegaphoneNode = ({ id }: MegaphoneOptions) => {
	return (
		<p className="flex-video">
			<amp-megaphone
				data-episode={id}
				height='150'
				layout='fixed-height' />
		</p>
	);
};

export default AmpMegaphoneNode;
