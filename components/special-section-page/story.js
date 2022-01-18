/* @flow */

import * as React from 'react';
import { storiesOf, withDocs, action, text, boolean, WithState, select } from 'base-storybook';
import SpecialSection, { SpecialSectionStream } from './read-only';
import specialSectionStub from './stubs';
import README from './README.md';
import {
	SpecialSectionMediaUploadModal,
	SpecialSectionConfirmationModal,
	SpecialSectionAddLinkModal
} from './editor/modals';
import { SpecialSectionPublishingTools, SpecialSectionToolbar, SpecialSectionEditor } from './editor';
import KinjaVideo from 'postbody/blockNodes/KinjaVideo';
import SimpleImage from 'kinja-magma/models/SimpleImage';

const imageUploaderMock = () =>
	Promise.resolve({
		public_id: 'foo',
		url: 'www.foo.foo',
		format: 'jpg',
		width: 50,
		height: 50
	});

const videoUploaderMock = () =>
	Promise.resolve(
		new KinjaVideo('3498576', new SimpleImage({ id: 'qkam8bvngxnuhotufwno', format: 'jpg' }), {
			alignment: 'Bleed',
			isLooping: false
		})
	);

const relatedStoriesApiMock = {
	resolveItem: () => Promise.resolve(),
	tagSuggestions: () => Promise.resolve({ relatedTags: [], relevantTags: [], storyTypes: [] }),
	storySuggestions: () => Promise.resolve()
};

storiesOf('4. Components|Post Promotion/Special Section Page', module)
	.addDecorator(withDocs(README))
	.add('Special sections stream', () => {
		return <SpecialSectionStream customContent={[]} />;
	})
	.add('special sections page', () => {
		const { blog, domainBlogId, impactHeader } = specialSectionStub;
		return (
			<SpecialSection
				blog={blog}
				domainBlogId={domainBlogId}
				impactHeader={impactHeader}
				adsEnabled={boolean('Ads Enabled', false)}
				customContent={[]}
			/>
		);
	})
	.add('image upload modal', () => {
		return (
			<SpecialSectionMediaUploadModal
				isOpen={true}
				onClose={action('close modal')}
				imageUploader={imageUploaderMock}
				videoResolver={videoUploaderMock}
				onUpload={() => {}}
				type={select('Upload type', { image: 'Image', video: 'Video'}, 'Image')}
			/>
		);
	})
	.add('confirmation modal', () => {
		return (
			<SpecialSectionConfirmationModal
				isOpen={true}
				onClose={action('close modal')}
				text={text('modal text', 'Are you sure you want to publish this special section?')}
				buttonProps={[
					{
						label: 'Cancel',
						iconName: 'close',
						weight: 'secondary',
						onClick: action('click cancel'),
						labelPosition: 'after'
					},
					{
						label: 'Publish',
						iconName: 'site-default',
						onClick: action('click publish'),
						labelPosition: 'after'
					}
				]}
			/>
		);
	})
	.add('add link modal', () => {
		return (
			<SpecialSectionAddLinkModal
				isOpen
				onClose={action('close modal')}
				onSave={action('save modal state')}
				forUrls={action('test if url belongs to gmg')}
			/>
		);
	})
	.add('special section toolbar', () => {
		return (
			<SpecialSectionToolbar
				handleSave={action('save clicked')}
				handleCancel={action('cancel clicked')}
				didError={boolean('did error', false)}
				handleSettings={action('settings clicked')}
			/>
		);
	})
	.add('special section publishing tools', () => {
		return (
			<WithState initialState={{ isPublished: false }}>
				{({ isPublished }, setState) => (
					<SpecialSectionPublishingTools
						isPublished={isPublished}
						handlePublish={() => setState({ isPublished: !isPublished })}
						handleEdit={action('edit')}
						handleSettings={action('settings clicked')}
					/>
				)}
			</WithState>
		);
	})
	.add('special section editor', () => {
		return (
			<SpecialSectionEditor
				blogName={text('special section blog name', 'Blog Name')}
				relatedStoriesApi={relatedStoriesApiMock}
				isPublished={false}
				impactHeader={specialSectionStub.impactHeader}
				publishSpecialSection={() => Promise.resolve()}
				saveSpecialSection={() => Promise.resolve()}
				imageUploader={imageUploaderMock}
				title={text('special section title', 'A Very Special Section')}
				customContent={[]}
				videoResolver={videoUploaderMock}
				forUrls={() => Promise.resolve([])}
			/>
		);
	});
