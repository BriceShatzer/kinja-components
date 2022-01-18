// @flow

import * as React from 'react';
import {
	storiesOf,
	withDocs,
	withThemes
} from 'base-storybook';

import README from './README.md';

import HorizontalRule from './horizontalRule';
import Theme from '../../theme';

const brandedStyles = [
	'BrandedA',
	'BrandedB'
];

storiesOf('3. Elements|Post Body/Horizontal Rule', module)
	.addDecorator(withDocs(README))
	.add('Unbranded horizontal rules', () => {
		return (
			<Theme>
				<div style={ {'width': '100%', 'padding': '10px'} }>
					<React.Fragment>
						<p><strong>Stars</strong></p>
						<HorizontalRule style='Stars' containers={[]} />
						<p><strong>Line</strong></p>
						<HorizontalRule style='Line' containers={[]} />
					</React.Fragment>
				</div>
			</Theme>
		);
	});

storiesOf('3. Elements|Post Body/Horizontal Rule', module)
	.addDecorator(withThemes)
	.addDecorator(withDocs(README))
	.add('Branded horizontal rules', () => {
		return (
			<div>
				{brandedStyles.map(brandedStyle => (
					<div key={brandedStyle} style={ {'width': '100%', 'padding': '10px'} }>
						<React.Fragment>
							<p><strong>{brandedStyle}</strong></p>
							<HorizontalRule style={brandedStyle} containers={[]} />
						</React.Fragment>
					</div>
				))}
			</div>
		);

	});
