// @flow

import * as React from 'react';
import styled from 'styled-components';
import {
	action,
	blogGroup,
	storiesOf,
	withDocs
} from 'base-storybook';

import Theme from 'kinja-components/components/theme';
import { LiveblogControls, QAndAControls } from './';
import { QAndAControlsModal } from './qanda-controls';
import LiveblogREADME from './liveblog-controls/README.md';
import QAndAREADME from './qanda-controls/README.md';


const getDiscussion = (mode: 'Liveblog' | 'QA') => ({
	mode,
	postId: '1839250466',
	sort: 'asc',
	staffIncluded: false,
	status: 'InProgress'
});

storiesOf('4. Components|Post Body/Conversation Tools', module)
	.addDecorator(withDocs(LiveblogREADME))
	.add('Liveblog Controls', () => {
		const Container = styled.div`
			width: 100vw;
			max-width: 636px;
			margin: 0 auto;
		`;

		return (
			<Theme blog={blogGroup()}>
				<Container>
					<LiveblogControls
						discussionSetting={getDiscussion('Liveblog')}
						locale="en-US"
						onChange={action('Status has changed')}
						onReloadClick={action('Reload click')}
					/>
				</Container>
			</Theme>
		);
	});


const avatarUploaderProps = {
	imageUploader: () => Promise.resolve({
		public_id: 'wbbot6qcrfa4gmmh4tam',
		url: 'file',
		format: 'gif',
		width: 120,
		height: 120
	}),
	onChange: action('Image Upload Success'),
	onError: action('Image upload error')
};

const onModalSubmit = () => Promise.resolve({
	isSuccessful: true,
	errorText: ''
});

storiesOf('4. Components|Post Body/Conversation Tools', module)
	.addDecorator(withDocs(QAndAREADME))
	.add('Q&A Controls', () => {
		const Container = styled.div`
			width: 100vw;
			max-width: 636px;
			margin: 0 auto;
		`;

		return (
			<Theme blog={blogGroup()}>
				<Container>
					<QAndAControls
						discussionSetting={getDiscussion('QA')}
						locale="en-US"
						onModalSubmit={onModalSubmit}
						onReloadClick={action('Reload click')}
						onChange={action('Status has changed')}
						participants={[]}
						removeParticipant={action('Removed Participant')}
					/>
				</Container>
			</Theme>
		);
	})

	.add('Q&A Controls Modal', () => {
		return (
			<QAndAControlsModal addParticipant={action('Add participant')}
				avatarUploaderProps={avatarUploaderProps}
				isOpen={true}
				onClose={action('onClose click')}
				onSubmit={onModalSubmit}
			/>
		);
	});