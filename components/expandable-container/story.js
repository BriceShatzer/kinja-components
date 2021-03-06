/* @flow */
/* eslint-disable */

import * as React from 'react';
import {
	storiesOf,
	withDocs
} from 'base-storybook';
import Button from 'kinja-components/components/buttons';
import ExpandableContainer from './expandable-container';
import README from './README.md';

const CruddyCopyPastaFromOurEditorsGeneratedMarkup = () => (
	<div dangerouslySetInnerHTML={{ __html: `
		<div class="js_post-content permalink-post__PermalinkPostWrapper-r43lxo-0 dnmdyZ">
				<p>Once upon a time, I was shooting a TV pilot. It was potentially a big moment for my career, but I’d tweaked my neck the week before. Not wanting to be all stiff, I went in to get some bodywork done, and it turns out that the bodyworker was a sadist who left me with visible bruises all over my neck. The morning of the shoot, I went to a department store to find some cover-up, and I could not for the life of me find anything that looked right. </p>
				<p>What’s especially wild about that is that, if we’re being honest here, I am a generic-ass white boy, and cosmetic companies have long designed
						<!-- -->the majority of their offerings
						<!-- -->for
						<!-- -->&nbsp;
						<!-- -->fair-skinned consumers
						<!-- -->. For people of color, finding a foundation that matches their skin perfectly can be
						<!-- -->more difficult. Companies like Fenty Beauty have certainly pushed the industry in the right direction, but there’s still a very long way to go, which is why I wanted to check out this new system from Lancôme.
						<br>&nbsp;
						<br><span><a class="inline-node__Anchor-sc-145m8ut-0 fjjjqe js_link link__Anchor-sc-1out364-0 jaYiFX" data-ga="[[&quot;Embedded Url&quot;,&quot;External link&quot;,&quot;https://www.lancome-usa.com/custom-foundation.html&quot;,{&quot;metric25&quot;:1}]]" href="https://www.lancome-usa.com/custom-foundation.html"><em>Le Teint Particulier</em> </a></span>is fully custom foundation. You can go
						<!-- -->to one of over 20 stores around the U.S., get your skin scanned with a super-accurate colorimeter, and presto, precision pumps squirt different pigments and lotions into a bottle, and in five minutes, you have foundation that matches your skin exactly. I mean, it’s uncanny. You can even adjust the thickness and oiliness of it to match your complexion. At $88, it’s
						<!-- -->expensive for foundation, but for people who have struggled to find the right makeup, it might feel revolutionary. Check out the video above to see how the whole process works.</p>
				<div id="swappable-mobile-ad-container" class="js_ad-mobile-dynamic swappable-mobile-ad-container js_ad-dynamic ad-mobile-dynamic movable-ad ads__MobileInPostWrapper-bxm4mm-3 fhloJN">
						<div class="ads__MobileInPostBorder-bxm4mm-0 ads__MobileInPostAdTopBorder-bxm4mm-1 rOAlr"></div>
						<div class="ad-unit ad-mobile ads__MobileInPostContentWrapper-bxm4mm-4 fvFZhH">
								<div class="ads__MobileHeaderWrapper-bxm4mm-5 gywsdu">Advertisement</div>
								<div is="bulbs-dfp" class="ad-container dfp dfp-slot-MOBILE_IN_POST ad-mobile js_swappable-mobile-ad" data-ad-unit="MOBILE_IN_POST" data-targeting="{&quot;pos&quot;:&quot;mobile_inpost&quot;}" id="dfp-ad-2"></div>
								<div class="bt-wrapper"><span data-uid="5d260804c9-384" class="bt-uid-tg" style="display:none !important;text-align:center" data-css-selector="ad-container.ad-mobile"></span></div>
						</div>
						<div class="ads__MobileInPostBorder-bxm4mm-0 ads__MobileInPostAdBottomBorder-bxm4mm-2 fLlvxg"></div>
				</div>
		</div>
	`}} />
);

storiesOf('3. Elements|Expandable Container', module)
	.addDecorator(withDocs(README))
	.add('ExpandableContainer', () => (
		<ExpandableContainer
			truncateLines={13}
			ExpandButton={({ onClick }) => (
				<Button
					halfwidth
					label="Continue reading"
					margin='0 25%'
					onClick={onClick}
					small
				/>
			)}
		>
			<CruddyCopyPastaFromOurEditorsGeneratedMarkup />
		</ExpandableContainer>
	));
