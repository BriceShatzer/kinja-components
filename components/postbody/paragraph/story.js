// @flow

import * as React from 'react';
import {
	blogGroup,
	storiesOf,
	boolean
} from 'base-storybook';
import styled from 'styled-components';
import ParagraphContainer from './paragraphContainer';
import Theme from 'kinja-components/components/theme';


storiesOf('3. Elements|Post Body/Paragraph', module)
	.add('Paragraph Container', () => {
		const Container = styled.div`
			position: absolute;
			max-width: 636px;
			display: flex;
			flex-direction: row;
			align-items: center;
			height: 100%;
			width: 100%;
			transform: translate(50%);
		`;

		const innerText = () => <span>{`I know the pieces fit 'cause I watched them tumble down
        No fault, none to blame, it doesn't mean I don't desire
        To point the finger, blame the other, watch the temple topple over
		To bring the pieces back together, rediscover communication`}</span>;

		const dropCapEnabled = boolean('show first capital letter', false);

		return (
			<Theme>
				<Container>
					<ParagraphContainer
						dropCapEnabled={dropCapEnabled}
						blogTheme={blogGroup()}>
						{innerText()}
					</ParagraphContainer>
				</Container>
			</Theme>
		);
	});
