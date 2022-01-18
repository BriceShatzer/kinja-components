import * as React from 'react';
import styled from 'styled-components';
import { storiesOf, withDocs, WithState, boolean, action, select, text } from 'base-storybook';
import ImpactHeader from './impact-header';
import { ImpactHeaderToolbar, ImpactHeaderEditor } from './editor';
import README from './README.md';
import { ImpactHeaderTitleAlignments, ImpactHeaderTitleOverlays, featuredMediaImage } from './consts';
import ImpactHeaderBlocknode from 'postbody/blockNodes/ImpactHeader';

const getLoopingVideoSource = () => Promise.resolve('https://v.kinja-static.com/prod/111638/111638_1080p.mp4');

const toolbarEventHandlers = (state, setState) => ({
	handleAttribution: action('handle attribution'),
	handleCrop: action('handle crop'),
	handleDelete: () => setState({ featuredMedia: null }),
	handleUpdateOverlay: overlay => setState({ overlay }),
	handleUpdateTitleAlignment: titleAlignment => setState({ titleAlignment })
});

const featuredMediaLooping = {
	id: '114971',
	thumbnail: { id: 'hjl9i8sh5ohfygem93po', format: 'jpg' },
	alignment: 'Bleed',
	caption: [],
	isLooping: true,
	type: 'KinjaVideo'
};

const featuredMediaVideo = {
	id: '106965',
	thumbnail: { id: 'qkam8bvngxnuhotufwno', format: 'jpg' },
	alignment: 'Bleed',
	caption: [],
	isLooping: false,
	type: 'KinjaVideo'
};

const fetchVideoMetadata = () => Promise.resolve({
	id: '106965',
	title: 'Sea Turtle Skillfully Finds Food',
	description: 'Sea turtle easily uses limbs to find food.',
	tags: ['gizmodo'],
	monetizable: false,
	videoPage: false,
	videoRecirc: false,
	network: 'gizmodo',
	isLooping: false,
	hasVideo: true,
	hasAudio: true,
	streamingUrl: 'https://kinja-vh.akamaihd.net/i/prod/106965/106965_,180p,270p,406p,720p,1080p,.mp4.csmil/master.m3u8',
	captions: [],
	poster: {
		id: 'qkam8bvngxnuhotufwno',
		format: 'jpg'
	}
});

const HeaderWrapper = styled.div`
	width: 100vw;
`;

storiesOf('4. Components|Post Body/ImpactHeader', module)
	.addDecorator(withDocs(README))
	.add('Featured Post With Image', () => (
		<HeaderWrapper>
			<ImpactHeader
				impactHeader={
					new ImpactHeaderBlocknode({
						media: featuredMediaImage,
						overlay: select('Overlay', Object.keys(ImpactHeaderTitleOverlays), 'Black'),
						titleAlignment: select(
							'Title Alignment',
							Object.keys(ImpactHeaderTitleAlignments),
							ImpactHeaderTitleAlignments.CenterBottom
						)
					})
				}
				isPromoted={boolean('isPromoted')}
				isSponsored={boolean('isSponsored')}
				permalink={text('permalink', 'http://www.kinja.com')}
				title={text('title', 'Special Section')}
			/>
		</HeaderWrapper>
	))
	.add('Featured Post With Looping Video', () => (
		<ImpactHeader
			impactHeader={
				new ImpactHeaderBlocknode({
					media: featuredMediaLooping,
					overlay: select('Overlay', Object.keys(ImpactHeaderTitleOverlays), 'Black'),
					titleAlignment: select(
						'Title Alignment',
						Object.keys(ImpactHeaderTitleAlignments),
						ImpactHeaderTitleAlignments.Below
					)
				})
			}
			getLoopingVideoSource={getLoopingVideoSource}
			isPromoted={boolean('isPromoted')}
			isSponsored={boolean('isSponsored')}
			permalink={text('permalink', 'http://www.kinja.com')}
			title={text('title', 'Special Section')}
		/>
	))
	.add('Full Bleed Video', () => (
		<ImpactHeader
			fetchVideoMetadata={fetchVideoMetadata}
			impactHeader={
				new ImpactHeaderBlocknode({
					media: featuredMediaVideo,
					overlay: select('Overlay', Object.keys(ImpactHeaderTitleOverlays), 'Black'),
					titleAlignment: select(
						'Title Alignment',
						Object.keys(ImpactHeaderTitleAlignments),
						ImpactHeaderTitleAlignments.Below
					)
				})
			}
			isPromoted={boolean('isPromoted')}
			isSponsored={boolean('isSponsored')}
			permalink={text('permalink', 'http://www.kinja.com')}
			title={text('title', 'Special Section')}
		/>
	))
	.add('Just The Toolbar', () => (
		<WithState
			initialState={{
				overlay: ImpactHeaderTitleOverlays.White,
				titleAlignment: ImpactHeaderTitleAlignments.CenterBottom
			}}
		>
			{(state, setState) => (
				<ImpactHeaderToolbar
					fetchVideoMetadata={fetchVideoMetadata}
					eventHandlers={toolbarEventHandlers(state, setState)}
					overlay={state.overlay}
					titleAlignment={state.titleAlignment}
				/>
			)}
		</WithState>
	))
	.add('With Editor', () => (
		<WithState
			initialState={{
				overlay: ImpactHeaderTitleOverlays.White,
				titleAlignment: ImpactHeaderTitleAlignments.CenterBottom,
				featuredMedia: featuredMediaImage
			}}
		>
			{(state, setState) => (
				<ImpactHeaderEditor
					isLoopingVideo={false}
					handleMediaUpload={() => {}}
					toolbarEventHandlers={toolbarEventHandlers(state, setState)}
					overlay={state.overlay}
					titleAlignment={state.titleAlignment}
				>
					{state.featuredMedia ? (
						<ImpactHeader
							impactHeader={
								new ImpactHeaderBlocknode({
									media: state.featuredMedia,
									overlay: state.overlay,
									titleAlignment: state.titleAlignment
								})
							}
							isPromoted={boolean('isPromoted')}
							isSponsored={boolean('isSponsored')}
							permalink={text('permalink', 'http://www.kinja.com')}
							title={text('title', 'Special Section')}
						/>
					) : null}
				</ImpactHeaderEditor>
			)}
		</WithState>
	));
