// @flow

import * as React from 'react';
import {
	storiesOf,
	withDocs,
	select
} from 'base-storybook';
import Heading from './heading';
import { TextNode } from 'postbody/InlineNode';
import README from './README.md';

const value = [new TextNode('My Dreams of Owning '), new TextNode('The Matrix', ['Italic']), new TextNode(' Phone Can Finally Be Fulfilled')];
const value2 = [new TextNode('TOP TECH DEALS')];

storiesOf('3. Elements|Post Body/Heading', module)
	.addDecorator(withDocs(README))
	.add('Heading', () => {
		const level = parseInt(select('Level', {
			[2]: 'h2',
			[3]: 'h3',
			[4]: 'h4'
		}, 4));
		const icon = level === 3 ? select('Commerce Icon', {
			'None': 'None',
			'Top': 'Top',
			'Beauty': 'Beauty',
			'Tech': 'Tech',
			'Gaming': 'Gaming',
			'Multimedia': 'Multimedia',
			'Home': 'Home',
			'Lifestyle': 'Lifestyle'
		}, null) : null;
		return (
			<div>
				<Heading
					value={level === 3 && icon !== 'None' && icon !== null ? value2 : value}
					alignment={select('Alignment', {
						Left: 'Left',
						Center: 'Center',
						Right: 'Right'
					}, 'Left')}
					level={level}
					icon={(icon: any)}
				/>
			</div>
		);
	});
