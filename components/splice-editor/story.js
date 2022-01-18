/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import { DateTime } from 'luxon';
import {
	action,
	boolean,
	storiesOf,
	withDocs
} from 'base-storybook';

import SpliceEditor from './splice-editor';
import Confirmation from './confirmation';
import LastSharedPanel, { UnshareModal } from './last-shared-panel';
import README from './README.md';

import { levelsForMultipleSelection } from '../folder-selector/fixtures';
import author from 'kinja-components/__stubs__/stubbedAuthorResponse.json';
import {
	currentBlog,
	currentPost,
	lastSharedBlogs,
	selectedBlogs
} from './fixtures';


const Container = styled.div`
	width: 800px;
	max-width: 800px;
	padding: 10px;
	margin: 0 auto;
`;

storiesOf('4. Components|Splice Editor', module)
	.addDecorator(withDocs(README))
	.add('Splice Editor', () => {
		const lastSharedProps = {
			lastSharedBlogs,
			onUnshare: action('Unshare from blog')
		};

		return (
			// $FlowFixMe:
			<SpliceEditor
				{...boolean('wasShared', true) ? lastSharedProps : null}
				authors={[author]}
				blog={currentBlog}
				inModal={boolean('inModal', false)}
				levels={levelsForMultipleSelection}
				onCancel={action('onCancel')}
				onShare={action('onShare')}
				pageType="permalink"
				post={currentPost}
				timemillis={DateTime.local().toMillis()}
				timezone={DateTime.local().toFormat('z')}
			/>
		);
	})

	.add('Confirmation', () => {
		return (
			// $FlowFixMe
			<Confirmation
				selectedBlogs={selectedBlogs}
				timemillis={DateTime.local().toMillis()}
				timezone={DateTime.local().toFormat('z')}
			/>
		);
	})

	.add('Last Shared Panel', () => {
		return (
			<Container>
				<LastSharedPanel
					lastSharedBlogs={lastSharedBlogs}
					onUnshare={action('Unshare from blog')}
					timezone={DateTime.local().toFormat('z')}
				/>
			</Container>
		);
	})

	.add('Unshare Modal', () => {
		return <UnshareModal
			displayName="Kotaku"
			isOpen
			onClose={action('Close modal')}
			onSubmit={action('Okay clicked')}
		/>;
	});