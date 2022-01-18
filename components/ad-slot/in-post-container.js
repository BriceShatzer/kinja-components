// @flow

import * as React from 'react';
import {
	MidBannerAd,
	MobileInPostAd,
	InStreamNativeVideo,
	TeadsOutstreamAd,
	TeadsPassbackAd,
	TeadsOutstreamAdWithCommerce,
	TeadsPassbackAdWithCommerce
} from './ads';
import type { AdSlotNodeProps } from 'postbody/ads/AdSlotNode';
import type { CommerceModulePost } from 'kinja-components/components/sidebar/commerce/commerce-module-post';

type InPostContainerProps = AdSlotNodeProps & {
	index: number,
	isVideoPermalink: boolean,
	mobileSlotIndex?: ?number,
	features: { [string]: boolean },
	commercePost?: ?CommerceModulePost,
	blogGroup?: string
};

const InPostContainer = (props: InPostContainerProps) => {
	const {
		index,
		isMidbannerAd,
		isDesktopVideoAd,
		isMobileInPostAd,
		isMobileVideoAd,
		adZone,
		/**
		 * `isVideoPermalink` is a flag argument that toggles between
		 * video permalink and standard permalink ad insertion logic.
		 *
		 * TODO: this component and ad slot components should be refactored
		 * so they don't contain any ad insertion logic at all.
		 * Instead of rendering as this components, `AdSlotNode`s should
		 * render as a single ad slot, and as many as needed should be inserted in the post body.
		 * This refactor should be done in a separate PR, because video permalink ad insertion
		 * logic is fragile and has no tests.
		 */
		isVideoPermalink,
		mobileSlotIndex,
		features,
		commercePost,
		blogGroup = ''
	} = props;
	const component = [];
	const isAdsDisabled = features.no_ads || features.only_left_top_ad;
	const connatixBlogs = {
		avclub: {
			scriptId: '0a29fb8b53aa4fdfa181fe0024773d10',
			playerId: '8bc83ed2-1c9f-49a7-9476-08d61e9d816c'
		},
		deadspin: {
			scriptId: '8228c3bb04c04b87abe3e0d52731a641',
			playerId: '5638a340-49b9-41c9-99dc-10f56b871500'
		},
		jalopnik: {
			scriptId: '8fabd41ab75a4e1d96547d34ae3100c6',
			playerId: '648de1a7-6ca1-444e-8bf6-c4ffd2252eaf'
		},
		jezebel: {
			scriptId: 'cd2f08246f86472a98de33cfe72ddc83',
			playerId: '3efd8df0-9894-483f-b3a5-89ebeaa588e4'
		},
		kotaku: {
			scriptId: '5e16b0e786c44608a0cc80ba3f2a8684',
			playerId: '8a9e06b4-ecea-49d8-b85b-6c63b44362f3'
		},
		lifehacker: {
			scriptId: '701055c47e5f49fc872a294b2cb3e6a3',
			playerId: '5de06420-6a66-4898-8a57-ca65c11a0aa4'
		},
		splinter: {
			scriptId: '3dd187fb3ec44a83b7dfca7d4c8b822f',
			playerId: '796945ef-9e2a-4921-9bd6-b147339f6cd9'
		},
		theinventory: {
			scriptId: 'ae3be9f482ba48b79bf61b21a85b5e4d',
			playerId: 'e7f4f24d-7c4b-45d6-8012-1b1065aa15d2'
		},
		theonion: {
			scriptId: '004bc15191b44efaa933abf44f79b590',
			playerId: '10de8f06-8162-486c-a4a7-d7f5e69a6971'
		},
		theroot: {
			scriptId: 'f10c6314028348d6baed500a30d59066',
			playerId: '4e065883-27be-43c1-b568-898f10d3390b'
		},
		thetakeout: {
			scriptId: '4c084e014c5c408abb6ae36b9c264352',
			playerId: '0e0878b2-8eab-4279-a93f-7b8980d4b2d2'
		}
	};
	const { playerId, scriptId } = blogGroup && connatixBlogs[blogGroup] || {};
	const connatixScript = scriptId && playerId && (
		<script id={scriptId} dangerouslySetInnerHTML={{ __html: `
			cnxps.cmd.push(function () {
				cnxps({
				playerId: '${playerId}'
				}).render('${scriptId}');
			});
		`}}/>
	);

	if (isDesktopVideoAd && !isAdsDisabled && adZone !== 'collapse' && !features.disable_teads) {
		component.push(<TeadsOutstreamAd mobile={false} />);
	}

	if (isMobileVideoAd && !isAdsDisabled) {
		if (adZone !== 'collapse') {
			if (adZone !== 'partners' && mobileSlotIndex === 1) {
				if (adZone === 'noeditvideo') {
					component.push(<MobileInPostAd key={`mobile-in-post-${index}`} />);
				} else {
					component.push(<InStreamNativeVideo mobile={true} isVideoPermalink={isVideoPermalink} />);
				}
			} else {
				if (features.connatix && connatixScript) {
					component.push(connatixScript);
				}

				if (features.disable_teads) {
					if (features.mobile_commerce_inset) {
						component.push(<TeadsPassbackAdWithCommerce commercePost={commercePost}/>);
					} else {
						component.push(<TeadsPassbackAd />);
					}
				} else {
					if (features.mobile_commerce_inset) {
						component.push(<TeadsOutstreamAdWithCommerce commercePost={commercePost}/>);
					} else {
						component.push(<TeadsOutstreamAd mobile={true} />);
					}
				}
			}
		}
	}

	if (isMidbannerAd && !isAdsDisabled) {
		component.push(<MidBannerAd key={`mid-banner-${index}`} />);
	}

	if (isMobileInPostAd && !isAdsDisabled) {
		component.push(<MobileInPostAd key={`mobile-in-post-${index + 1}`} />);
	}

	return component;
};

export default InPostContainer;
