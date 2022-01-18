// @flow
import React from 'react';
import styled from 'styled-components';

import {
	withDocs,
	storiesOf
} from 'base-storybook';

import { gridValue } from './';
import media from 'kinja-components/style-utils/media.js';

import {
	GridOverlay
} from './grid-overlay';

import README from './README.md';

const ExampleContainer = styled.div`
	width: 100vw;
	position: relative;
	* {
		box-sizing: border-box;
	}
`;

/*
	A mock story card. Notice how container and image sizes are not set in the components itself,
	but in parent containers that render the component, making it reusable.
*/
const CardContainer = styled.div`
	margin-top: 20px;
	background: #fafafa;
	display: flex;
`;

const CardImageContainer = styled.div`
	flex-shrink: 0;
`;

const CardContentContainer = styled.div`
`;

const FakeImage169 = styled.div`
	background: #666;
	padding-bottom: 56.25%;
`;

const Page = styled.div`
	margin: 0 auto;
	display: flex;

	${media.smallOnly`
		width: ${gridValue.small('6c')};
	`}

	${media.mediumOnly`
		width: ${gridValue.medium('6c')};
	`}

	${media.largeOnly`
		width: ${gridValue.large('8c')};
	`}

	${media.xlargeOnly`
		width: ${gridValue.xlarge('12c')};
	`}

	${media.xxlargeUp`
		width: ${gridValue.xxlarge('12c')};
	`}
`;

const Sidebar = styled.div`
	flex-shrink: 0;

	${media.largeDown`
		display: none;
	`}

	${media.xlargeOnly`
		width: ${gridValue.xlarge('4c')};
		margin-right: ${gridValue.xlarge('1g')};
	`}

	${media.xxlargeUp`
		width: ${gridValue.xxlarge('4c')};
		margin-right: ${gridValue.xxlarge('1g')};
	`}

	/*
		Card styles in stream
	 */

	${CardContainer} {
		${media.largeDown`
			display: none;
		`}

		${media.xlargeOnly`
			width: ${gridValue.xlarge('4c')};
		`}

		${media.xxlargeUp`
			width: ${gridValue.xxlarge('4c')};
		`}
	}

	${CardImageContainer} {
		${media.largeDown`
			display: none;
		`}

		${media.xlargeOnly`
			margin-right: ${gridValue.xlarge('1g')};
			margin-left: ${gridValue.xlarge('-1g')};
			width: ${gridValue.xlarge('2c1g')};
		`}

		${media.xxlargeUp`
			margin-right: ${gridValue.xxlarge('1g')};
			width: ${gridValue.xxlarge('2c')};
		`}
	}
`;

const Stream = styled.div`
	${media.smallOnly`
		width: ${gridValue.small('6c')};
	`}

	${media.mediumOnly`
		width: ${gridValue.medium('6c')};
	`}

	${media.largeOnly`
		width: ${gridValue.large('8c')};
	`}

	${media.xlargeOnly`
		width: ${gridValue.xlarge('8c')};
	`}

	${media.xxlargeUp`
		width: ${gridValue.xxlarge('8c')};
	`}
	
	/*
		Card styles in stream
	 */

	${CardContainer} {
		${media.smallOnly`
			width: ${gridValue.small('6c')};
		`}

		${media.mediumOnly`
			width: ${gridValue.medium('6c')};
		`}

		${media.largeOnly`
			width: ${gridValue.large('8c')};
		`}

		${media.xlargeOnly`
			width: ${gridValue.xlarge('8c')};
		`}

		${media.xxlargeUp`
			margin-left: auto;
			margin-right: auto;
			width: ${gridValue.xxlarge('6c')};
		`}
	}

	${CardImageContainer} {
		${media.smallOnly`
			margin-left: ${gridValue.small('-1g')};
			margin-right: ${gridValue.small('1g')};
			width: ${gridValue.small('2c1g')};
		`}

		${media.mediumOnly`
			margin-left: ${gridValue.medium('-1g')};
			margin-right: ${gridValue.medium('1g')};
			width: ${gridValue.medium('2c1g')};
		`}

		${media.largeOnly`
			margin-right: ${gridValue.large('1g')};
			width: ${gridValue.large('3c')};
		`}

		${media.xlargeOnly`
			margin-right: ${gridValue.xlarge('1g')};
			width: ${gridValue.xlarge('3c')};
		`}

		${media.xxlargeUp`
			margin-right: ${gridValue.xxlarge('1g')};
			width: ${gridValue.xxlarge('2c')};
		`}
	}
`;


const Card = () => (
	<CardContainer>
		<CardImageContainer><FakeImage169/></CardImageContainer>
		<CardContentContainer>
			<h3>Lorem ipsum dolor sit amet</h3>
			<p>Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...</p>
		</CardContentContainer>
	</CardContainer>
);

storiesOf('2. Styles & Utilities|Layout', module)
	.addDecorator(withDocs(README))
	.add('Kinja Grid Utilities', () => {
		return (
			<ExampleContainer>
				<GridOverlay></GridOverlay>
				<Page>
					<Sidebar>
						<Card></Card>
						<Card></Card>
						<Card></Card>
						<Card></Card>
					</Sidebar>
					<Stream>
						<Card></Card>
						<Card></Card>
						<Card></Card>
						<Card></Card>
					</Stream>
				</Page>
			</ExampleContainer>
		);
	});
