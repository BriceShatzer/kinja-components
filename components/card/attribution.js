/* @flow */

import * as React from 'react';
import ImageAttributionComponent from '../image-attribution';

import type { ImageAttributionType } from 'postbody/Image';

const Attribution = ({ attributions, isEditor }: { attributions?: Array<ImageAttributionType>, isEditor: boolean }) => (
	(attributions && attributions.length) ? (
		<figcaption className="component-attribution">
			{
				<ImageAttributionComponent
					tokenize={isEditor}
					attributions={attributions.map(attribution => ({
						...attribution,
						// According to the type, credit and source should never be falsy
						// TODO: find that edge case and remove this.
						credit: attribution.credit ? attribution.credit : [],
						source: attribution.source ? attribution.source : []
					}))}
				/>
			}
		</figcaption>
	) : (
		<figcaption>Add image credit and source below</figcaption>
	)
);

export default Attribution;
