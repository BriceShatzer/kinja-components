// @flow

import * as React from 'react';
import {
	storiesOf,
	withDocs,
	withThemes,
	text
} from 'base-storybook';
import BlockQuote from './blockquote';
import README from './README.md';

storiesOf('3. Elements|Post Body/BlockQuote', module)
	.addDecorator(withThemes)
	.addDecorator(withDocs(README))
	.add('BlockQuote', () => {
		const textToShow = text('Text', 'This is a memorable quote from the article.');
		return (
			<BlockQuote>
				<p>
					{textToShow}
				</p>
			</BlockQuote>
		);
	});
