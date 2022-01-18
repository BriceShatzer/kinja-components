/* @flow */

import * as React from 'react';
import ReactDOM from 'react-dom';
import { action, boolean, storiesOf, withDocs, text, select } from 'base-storybook';
import { imageFormatFromString } from 'postbody/Image';

// $FlowFixMe
import TabGroup from './tabGroup';
import Image, { LazyResponsiveImage } from './image';
import Video from './video';
import README from './README.md';
// $FlowFixMe
import FixedToolbar from './fixed-toolbar';
import Button from '../buttons';
import styled from 'styled-components';
import Notification from './notification';

const { TabBar, Tabs, TabItem } = TabGroup;

const ScrollContainer = styled.section`
	height: 300vh;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 20px;
`;

const Stage = styled.section`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const RegularImageWrapper = styled.div`
	position: relative;
	width: 500px;
	max-height: 500px;
	overflow: hidden;
`;

const PaddedImageWrapper = styled(RegularImageWrapper)`
	div {
		padding-bottom: 62.5%;
	}
`;

const returnImage = imageComponent => {
	return <RegularImageWrapper>{imageComponent}</RegularImageWrapper>;
};

storiesOf('3. Elements|Tabs', module)
	.addDecorator(withDocs(README))
	.addDecorator(getStory => {
		require('./story.sass');
		return getStory();
	})
	.add('Tabs', () => (
		<Tabs onChange={action('Selected List Item Value')}>
			<TabItem hidden value="staff" label="Staff" selected index={0} onClick={action('Tab Item Click')} />
			<TabItem count={55} value="community" label="Community" index={1} onClick={action('Tab Item Click')} />
			<TabItem count={105} value="pending" label="Pending" index={2} onClick={action('Tab Item Click')} />
		</Tabs>
	));

storiesOf('3. Elements|Tabs', module)
	.addDecorator(withDocs(README))
	.add('Tab Bar', () => (
		<TabBar activeTab="Music" onChange={action('Tab has changed')} tabs={['Music', 'Video', 'Text', 'Image']} />
	));

storiesOf('3. Elements|Image', module)
	.addDecorator(withDocs(README))
	.addDecorator(getStory => {
		require('./story.sass');
		return getStory();
	})
	.add('Image', () => (
		returnImage(
			<Image id="gddzmaj7aqo4q5sra51l" />)
	))
	.add('Image: animated', () => (
		returnImage(
			<Image id="gddzmaj7aqo4q5sra51l" format={imageFormatFromString('gif')} />)
	))
	.add('Image: lazy responsive rendered in a wrapper with padding bottom', () => {
		return <PaddedImageWrapper><LazyResponsiveImage id="szpkuzpbcf1ohvnn0f7d" /></PaddedImageWrapper>;
	})
	.add('Image: responsive image, no lazy', () => returnImage(<LazyResponsiveImage id="gddzmaj7aqo4q5sra51l" noLazy />))
	.add('Image: parallax',
		() => returnImage(<LazyResponsiveImage id="gddzmaj7aqo4q5sra51l" format={imageFormatFromString('gif')} isParallax noLazy/>))
	.add('Image: srcset responsive', () => returnImage(<LazyResponsiveImage id="gddzmaj7aqo4q5sra51l" noLazy />))
	.add('Image: with background', () => returnImage(<LazyResponsiveImage id="gfq1v2eoyswvybzxtqjn" />))
	.add('Image: without background', () => returnImage(<LazyResponsiveImage id="gfq1v2eoyswvybzxtqjn" showBackground={false} />));

storiesOf('3. Elements|Toolbar/Fixed Toolbar', module)
	.addDecorator(withDocs(README))
	.addDecorator(getStory => {
		require('./story.sass');
		return getStory();
	})
	.add('Fixed Toolbar', () => (
		<ScrollContainer>
			<p>scroll down; toolbar stays still</p>
			<FixedToolbar>
				<Button label="Button" />
			</FixedToolbar>
		</ScrollContainer>
	));

storiesOf('3. Elements|Video', module)
	.add('Video', () => {
		return <Video noLazy id="gddzmaj7aqo4q5sra51l" transform="CenteredWideExtraLarge" />;
	})
	.add('Video (lazy)', () => <Video id="gddzmaj7aqo4q5sra51l" />);

const renderNotification = () => {
	const notificationContainer = document.createElement('div');
	window.document.body.appendChild(notificationContainer);

	ReactDOM.render(
		<Notification
			message={text('Message', 'This is a notification')}
			dismissable={boolean('dismissable', true)}
			type={select('type', ['default', 'error', 'success', 'alert'], 'success')}
			fullWidth={boolean('fullWidth', false)}
		/>,
		notificationContainer
	);
};

storiesOf('3. Elements|Notification', module).add('Notification', () => (
	<div>
		<Stage>
			<Button label="Show Notification" onClick={renderNotification} />
		</Stage>
	</div>
));
