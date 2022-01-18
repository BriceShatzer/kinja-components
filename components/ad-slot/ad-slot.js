/* @flow */

import * as React from 'react';
import classnames from 'classnames';

type Props = {
	swappableMobileAd?: boolean, // Used to show mobile ad when recent videos module is hidden
	type: string, // the ad unit type (e.g. TOP_BANNER, etc)
	cssClass: string, // the type part of the ad's css class
	ppPosition?: string, // the promoted zone position
	position?: string, // the zone position (e.g. top, etc)
	postId?: string, // override the associated postId for this slot
	blogName?: string, // override the associated blog name for this slot
	tags?: string, // override the associated tags for this slot
	forcedAdZone?: string, // override the ad zone for this slot
	nativeStyleTemplate?: string, // provide a template name set up for the native ad targeting
	adIndex?: string,
	blockthroughId?: string // the blockthrough id associated with the ad
};

function AdSlot(props: Props) {
	const {
		swappableMobileAd,
		type,
		cssClass,
		ppPosition,
		position,
		postId,
		blogName,
		tags,
		forcedAdZone,
		nativeStyleTemplate,
		adIndex,
		blockthroughId
	} = props;

	const targetingValues = {
		pos: position,
		pp_position: ppPosition,
		postId,
		blogName,
		tags,
		forcedAdZone,
		native_style_template: nativeStyleTemplate || undefined,
		ad_index: adIndex || undefined
	};

	return (
		<React.Fragment>
			<div
				is="bulbs-dfp"
				class={classnames(`ad-container dfp dfp-slot-${type} ad-${cssClass}`, {
					'js_swappable-mobile-ad': swappableMobileAd
				})}
				data-ad-unit={type}
				data-pp-position={ppPosition}
				data-targeting={JSON.stringify(targetingValues)}
			/>
			{blockthroughId &&
				<div className='bt-wrapper'>
					<span
						data-uid={blockthroughId}
						className='bt-uid-tg'
						style={{ display: 'none !important', textAlign: 'center' }}
						data-css-selector={`ad-container.ad-${cssClass}`}
					></span>
				</div>
			}
		</React.Fragment>
	);
}

export default AdSlot;
