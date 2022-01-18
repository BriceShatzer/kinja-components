// @flow

import * as React from 'react';

type VineOptions = {
	id: string
}

const AmpVineNode = ({ id }: VineOptions) => {
	return (
		<p>
			<amp-vine
				data-vineid={id}
				width='1'
				height='1'
				layout='responsive' />
		</p>
	);
};

export default AmpVineNode;
