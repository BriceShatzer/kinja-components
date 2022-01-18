// @flow

import * as React from 'react';
import {
	storiesOf,
	withDocs,
	withThemes,
	select,
	text,
	boolean
} from 'base-storybook';
import PullQuote from './pull-quote';
import { TextNode } from 'postbody/InlineNode';
import README from './README.md';

storiesOf('3. Elements|Post Body/Pull Quote', module)
	.addDecorator(withThemes)
	.addDecorator(withDocs(README))
	.add('Pull Quote', () => {
		const textToShow = text('Text', 'This is a memorable quote from the article.');
		const alignment = select('Alignment', {
			Left: 'Left',
			Center: 'Center'
		}, 'Center');
		return (
			<PullQuote alignment={alignment} value={[new TextNode(textToShow)]} disableBranding={boolean('Disable branding', false)} />
		);
	});
