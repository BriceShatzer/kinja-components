/* eslint-disable flowtype/no-types-missing-file-annotation */

import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import CaptionContainer from '../../caption-container';
import ImageAttributionComponent from '../../image-attribution';
import { Licensors } from '../../image-attribution/image-attribution';
import renderPlainText from 'postbody/utils/renderPlainText';

import imageUrl from 'kinja-images/imageUrl';

import type { ImageOptions } from 'postbody/blockNodes/ImageNode';

const RssImageNode2 = ({
	id,
	format,
	width,
	caption,
	attribution,
	altText
}: ImageOptions) => {
	const hasCaption = Boolean(caption && caption.length);
	const hasAttribution = Boolean(attribution && attribution.length);

	const size = width >= 800 ? 'UncroppedWideExtraLarge' : 'Original';

	const copyright = hasAttribution
		? renderToStaticMarkup(<ImageAttributionComponent attributions={attribution} tokenize={false} />)
		: null;

	const licensor = renderToStaticMarkup(Licensors({ attributions: attribution }));

	return (<p>
		<img src={imageUrl(id, size, format)}
			alt={altText || renderPlainText(caption)}
			data-portal-copyright={copyright}
			data-has-syndication-rights={attribution.syndicationRights ? '1' : '0'}
			data-license-id="698526"
			data-licensor-name={licensor}
		/>
		{hasCaption ?
			<React.Fragment>
				<br/>
				<CaptionContainer
					caption={caption}
					editable={false}
				/>
			</React.Fragment> : null}
	</p>);
};

export default RssImageNode2;
