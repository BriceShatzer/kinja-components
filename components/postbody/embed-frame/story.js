import * as React from 'react';
import styled from 'styled-components';
import {
	number,
	select,
	boolean,
	storiesOf,
	withDocs
} from 'base-storybook';
import EmbedFrame, {
	Iframe, IframePlaceholder, IframeUnsupported
} from './';
import { ASPECT_RATIOS } from 'postbody/blockNodes/Iframe';
import README from './README.md';
import SimpleImage from 'kinja-magma/models/SimpleImage';
import DeletedEmbedPlaceholder from './deleted-embed-placeholder';
import EnsureDefaultTheme from '../../theme/ensureDefaultTheme';

const embeds = {
	'twitch video': {
		id: '236678628',
		type: 'TwitchVideo'
	},
	'twitch stream': {
		id: 'moonmoon_ow',
		type: 'TwitchStream'
	},
	vimeo: {
		id: '23608259',
		type: 'Vimeo'
	},
	vine: {
		id: 'iIaVBMFtOI5',
		type: 'Vine'
	},
	'youtube video': {
		id: 'I7Tps0M-l64',
		type: 'YoutubeVideo'
	}
};

const iframes = {
	spotify: {
		source: 'https://open.spotify.com/embed/album/7GjVWG39IOj4viyWplJV4H',
		type: 'Spotify',
		width: {
			width: 300,
			unit: 'Pixel'
		},
		height: {
			width: 380,
			unit: 'Pixel'
		}
	}
};

const StoryConatiner = styled.div`
	min-width: 800px;
`;

storiesOf('3. Elements|Post Body/Embed Frame', module)
	.addDecorator(getStory => (
		<StoryConatiner>
			<div className='post-content' style={{width: select('permalinkTemplate', {standard: '636px', featured: '800px'}, 'standard')}}>
				{getStory()}
			</div>
		</StoryConatiner>
	))
	.addDecorator(withDocs(README))
	.add('Embed Frame', () => {
		const nodeOptions = Object.keys(embeds);
		const node = select('Embed Type', nodeOptions, nodeOptions[4]);
		return <EmbedFrame {...embeds[node]} />;
	})
	.add('IFrame', () => {
		const nodeOptions = Object.keys(iframes);
		const node = select('Iframe Type', nodeOptions, nodeOptions[0]);
		const aspectRatioOptions = Object.keys(ASPECT_RATIOS);
		const numberOptions = {
			range: true,
			min: 60,
			max: 800,
			step: 1
		};

		const additionalProps = {
			aspectRatio: ASPECT_RATIOS[select('Aspect Ratio', aspectRatioOptions, aspectRatioOptions[2])],
			height: {
				unit: 'Pixel',
				value: number('Height', 380, numberOptions)
			},
			width: {
				unit: 'Pixel',
				value: number('Width', 300, numberOptions)
			}
		};

		return <Iframe {...iframes[node]} {...additionalProps} />;
	})
	.add('IFramePlaceholder', () => {
		const hasCustomImage = boolean('Has custom image?', false);
		const image = new SimpleImage({
			id: 'cqgdfis1vw0j5zvsss7b',
			format: 'jpg'
		});
		const aspectRatioOptions = Object.keys(ASPECT_RATIOS);
		const aspectRatio = ASPECT_RATIOS[select('Aspect Ratio', aspectRatioOptions, aspectRatioOptions[2])];

		return (
			<IframePlaceholder
				source="http://tools.kinja-labs.com/iframe/galleries/38"
				domain="tools.kinja-labs.com"
				thumbnail={hasCustomImage && image}
				aspectRatio={aspectRatio}
			/>
		);
	})
	.add('IFrameUnsupported', () => {
		return (
			<IframeUnsupported>
				There used to be a Storify embed here, but
				<a href="https://storify.com/faq-eol" target="_blank" rel="noopener noreferrer"> Storify doesn’t exist anymore</a>
			</IframeUnsupported>
		);
	})
	.add('Deleted Image Placeholder', () => {
		const originalContent = {
			format: 'jpg',
			width: number('imageWidth', 458),
			id: 'kxyulp7kfpcnfd6pztxp',
			type: 'Image',
			alignment: select('alignment', ['Left', 'Right', 'Center', 'Bleed', 'FullWidth'], 'Center'),
			height: number('imageHeight', 547)
		};

		return (
			<EnsureDefaultTheme>
				<div>
					<p>Apple pie jelly biscuit apple pie. Bonbon icing jelly-o liquorice. Topping dragée soufflé macaroon jelly jelly beans topping.
						Gummies jelly halvah muffin cookie cheesecake jujubes jelly-o donut.</p>
					<DeletedEmbedPlaceholder originalContent={originalContent} />
					<p>Caramels apple pie sweet soufflé carrot cake jelly wafer jelly apple pie. Jujubes marshmallow candy halvah gummi bears jelly-o
						chocolate jujubes fruitcake. Cookie tart sugar plum. Gummies tootsie roll tiramisu.</p>
				</div>
			</EnsureDefaultTheme>
		);
	});
