// @flow

import * as React from 'react';
import {
	storiesOf,
	select,
	text,
	boolean,
	withDocs,
	action
} from 'base-storybook';
import styled from 'styled-components';

import Blog from 'kinja-magma/models/Blog';
import SpecialSection from 'kinja-magma/models/SpecialSection';

import { Header } from './header';
import { default as HeaderWithScroll } from './header';
import SectionBrowser from './section-browser';
import Theme from '../theme';
import { blogThemes as Themes } from '../theme/themes';
import README from './README.md';
import stubbedSections from './__stubs__/stubbedSections.json';
import stubbedBlogs from './__stubs__/stubbedBlogs.json';
import stubbedSpecialSections from './__stubs__/stubbedSpecialSections.json';
import SiteSection from 'kinja-magma/models/SiteSection';

const noop = () => undefined;

const pageTypes = [
	'frontpage',
	'permalink',
	'categoryStream',
	'sectionedCategoryStream',
	'tag',
	'videopage'
];

const getBlogDomain = blog => {
	switch (blog) {
		case 'splinter':
			return `${blog}news.com`;
		default:
			return `${blog}.com`;
	}
};

const globalProps = {
	// Mock Google Analytics
	ga: (...args) => action('GA')(...args)
};

const createBlog = (blog: string) => Blog.fromJSON({
	id: 1,
	name: blog,
	canonicalHost: getBlogDomain(blog),
	displayName: blog,
	description: 'Blog tagline.',
	properties: {
		blogGroup: blog,
		facebookScreenName: blog,
		twitterScreenName: blog,
		instagramScreenName: blog,
		youtubeUrl: blog,
		canonicalHost: blog
	},
	hosts: [''],
	status: 'ENABLED',
	timezone: '',
	timezoneOffset: 1
});

const sections = SiteSection.fromJSON(
	stubbedSections,
	stubbedBlogs.map(section => Blog.fromJSON(section)),
	stubbedSpecialSections.map(section => SpecialSection.fromJSON(section))
).getRenderableList();

const blogTypesNames = {
	mainBlog: 'Main GMG blog',
	verticalBlog: 'Vertical',
	simpleBlog: 'Community (non-GMG) blog',
	noBlog: 'Non blog specific pages'
};

const blogTypes = {
	mainBlog: {
		name: 'gizmodo',
		blogGroup: 'gizmodo'
	},
	verticalBlog: {
		displayName: 'io9',
		blogGroup: 'gizmodo',
		logo: {
			id: 'veoxklw8coulpkai27fa'
		}
	},
	simpleBlog: {
		displayName: 'Simple blog'
	},
	noBlog: null
};

const LongPage = styled.div`
	height: 300rem;
	background: #e5e5e5;
	width: 100%;
`;

storiesOf('4. Components|Navigation/Header', module)
	.addDecorator(withDocs(README))
	.add('Header', () => {
		const blogType = select('Blog type', blogTypesNames, 'mainBlog');

		return (
			<Header
				pageType={select('PageType', pageTypes, 'frontpage')}
				sections={sections}
				blog={blogTypes[blogType]}
				title={text('Title', '')}
				subTitle={text('Subtitle', 'Subtitle')}
				shouldShowVideo={boolean('Should show video section?', true)}
				scrollDetected={boolean('Scroll back version?', false)}
				showNewsletterSignup={true}
				currentUser={null}
				features={{}}
				logout={noop}
				onLoginRequired={noop}
				{...globalProps}
				userBlogs={[]}
			/>
		);
	})
	.add('Header on main GMG blogs', () => {
		return (
			<div style={{width: '100%'}}>
				{Object.keys(Themes).map((blog =>
					<Theme key={blog} blog={blog}>
						<Header
							pageType={select('PageType', pageTypes, 'frontpage')}
							blog={createBlog(blog)}
							subTitle={text('Subtitle', 'Subtitle')}
							sections={sections}
							shouldShowVideo={boolean('Should show video section?', true)}
							scrollDetected={false}
							showNewsletterSignup={true}
							currentUser={null}
							features={{}}
							logout={noop}
							onLoginRequired={noop}
							{...globalProps}
							userBlogs={[]}
						/>
					</Theme>
				))}
			</div>
		);
	});

storiesOf('4. Components|Navigation/Header', module)
	.add('Header scroll back', () => {
		/* eslint-disable max-len */
		return (
			<LongPage>
				<HeaderWithScroll
					blog={createBlog('gizmodo')}
					pageType='frontpage'
					sections={sections}
					showNewsletterSignup={true}
					currentUser={null}
					features={{}}
					logout={noop}
					onLoginRequired={noop}
					{...globalProps}
					userBlogs={[]}
				/>
				<div style={{maxWidth: 960, margin: '0 auto'}}>
Another iPhone day is now behind us, and even the most skeptical Apple fans might be asking themselves, “Was that it?!” We got three new iPhones and a new Apple Watch. That’s it.
To be reasonable, 2018 is an off-year for Apple. It’s an “s” year, a time when the company bumps specs rather than completely overhauling its iPhones. Apple announced two new iPhones with an “s” after the name: the iPhone Xs and the iPhone Xs Max. The third device is called the iPhone XR, which represents a new naming scheme, and might be the most interesting of the bunch. And again, being reasonable, the Apple Watch did get its first ever redesign. Everything Apple announced this year still seems a little underwhelming, though‚ despite the fact that the sheer number of new specs seems a little bit overwhelming.
However, Apple failed to announce a lot of things that a lot of people expected, including a new iPad Pro with Face ID, a cheap MacBook, and a release date for its long-awaited AirPower charging pad. Oh well. Let’s break down what Apple did announce.
This is the one that had to happen. A year after Apple revealed the iPhone X before letting everyone know that it wasn’t quite ready for primetime, the company announced a solid update to the first Face ID-enabled device.
The iPhone Xs looks almost identical to its predecessor. There’s the same 5.8-inch OLED display that fills up nearly the entire span of the iPhone’s screen, which comes encased in stainless steel and what Apple calls “the most durable front glass ever in a smartphone.” What’s left is the now-famous notch, which houses the same Face ID hardware as before, but Apple says that new software makes Face ID faster than before. The OLED display itself is also supposed to show 60 percent greater dynamic range in HDR photos.
The real gut update of the iPhone Xs is a new A12 Bionic processor that comes in the form of Apple’s first 7-nanometer chip. The new processor comes with a six-core fusion architecture, including two performance cores that Apple says are 15 percent faster. There’s also a four-core GPU that’s supposedly 50 percent faster, and an eight-core Neural Engine that can handle 5 trillion operations per second, compared to the A11 Bionic processor’s 600 billion. Those are all Apple’s bragging numbers, so we’ll have to test it out in processor-hungry environments like games and augmented reality to see if the improvements make a difference. Many trillions of processes per second sure sounds impressive, though.
The other noteworthy upgrade included with the iPhone Xs involves the camera. On the outside, the new iPhone dual-camera system looks a lot like its predecessor, but the components have been updated. There are two new 12-megapixel sensors on the rear camera that are faster and include larger pixels, as well as a new True Tone flash module. Meanwhile, the new A12 Bionic chip offers better image processing, including improved low-light performance and Portrait Mode.
The new iPhone Xs comes in space grey, silver, and an all-new gold finish. You can choose between a 64GB, 256GB, and a new 512GB model. Prices start at $1,000. Pre-orders start Friday, September 21, and the devices ship on Friday, September 28.
This new iPhone represents a familiar trick. It’s just the iPhone Xs but bigger. The size is notable for a couple of reasons, though. First, Apple released the iPhone X in only one size: 5.8-inches. Second, the iPhone Xs Max’s 6.5-inch display is the biggest Apple has ever released for an iPhone.
The device itself is about the same size as an iPhone 8 Plus, but it incorporates the same bezel-free design as the iPhone X and iPhone Xs. That means it comes with Face ID as well as all the same hardware upgrades as the iPhone Xs, including the A12 Bionic processor, improved camera, and 512GB storage option. Based on Apple’s presentation, however, the only thing that the iPhone Xs Max offers besides the bigger screen is a bigger battery. Apple says it’s the biggest one it’s ever offered on an iPhone.
The iPhone Xs Max comes in all the same colors and storage options as the iPhone Xs. The device starts at $1,000 and ships alongside the iPhone Xs.
This one’s kinda kooky! Earning the famous “one more thing” billing at the Apple event, the iPhone XR looks a lot like the 5.8-inch iPhone Xs, except it’s a little bit bigger and a lot cheaper. It also comes in many colors.
The iPhone XR comes with a 6.1-inch LCD display that comes in the familiar notched design, wrapped up in an aluminum frame and the new more durable glass. It’s notched because this iPhone has Face ID and no home button, just like its pricier siblings. Apple calls the new LCD a “Liquid Retina” display that’s supposed to look better than its predecessors. The iPhone XR also lacks a second rear camera, but Apple found a way to pull off Portrait Mode using software, thanks to the A12 Bionic processor which is included in this cheaper model.
So the iPhone XR is a lot like the iPhone Xs, except it has an LCD screen, an aluminum frame, and only one camera. That doesn’t sound so bad when you consider the fact that this device starts at $750, which is cheaper than the launch price of the iPhone 8. (The iPhone 8 now starts at $600, and the iPhone 7 starts at $450.) You can also get the iPhone XR in six pretty colors: white, black, blue, red, yellow, and coral.
Unfortunately, you will have to wait for this intriguing, cheaper iPhone. The iPhone XR will be available for preorder on October 19 and will hit stores on October 26.
The fourth generation Apple Watch is presented as the sleekest health device on the market. There’s an improved accelerometer that not only knows if you’ve fallen down but also how you did it (e.g. trip, slip, straight up lost it). The updated heart rate sensor, which is encased in a ceramic shell with sapphire crystal, will also tell you more about how your heart beats and will even make it easy to print out those records and take them to your doctor. The device has been certified by the FDA.
On top of the health stuff, the Apple Watch is just a little better and nicer on all other fronts. It comes in slightly larger 40mm and 44mm that importantly have 30 percent more screen real estate. They also have a new Digital Crown with haptic feedback that will now buzz back at you as you turn it. The secondary button now sits flush with the case, too.
The Apple Watch Series 4 starts at $400 for the GPS-only model and $500 for the GPS-plus-cellular model. (That bumps the price of the Series 3 back to $280 and up.) The fourth generation watch comes in with a silver, gold, or space grey aluminum case. You can get stainless steel in silver, space black, and a new gold color. Apple will start taking orders on the Series 4 watches September 14, and the devices will start shipping September 21.
				</div>
			</LongPage>
		);
		/* eslint-enable max-len */
	});

storiesOf('4. Components|Navigation/Header/Elements', module)
	.add('SectionBrowser', () => {
		return (
			<SectionBrowser sections={sections} enableStore blog={createBlog('Kotaku')} />
		);
	});
