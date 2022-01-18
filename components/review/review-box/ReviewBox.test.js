/* eslint no-unused-expressions: 0 */

import * as React from 'react';
import { mount } from 'enzyme';
import ReviewBox from './ReviewBox';

const stubElement = ({
	alignment,
	category,
	imageComponent,
	text,
	score,
	subcategory,
	title = 'Title'
} = {
	text: []
}) => (
	<ReviewBox
		alignment={alignment}
		category={category}
		imageComponent={imageComponent}
		text={text}
		score={score}
		subcategory={subcategory}
		title={title}
	/>
);

describe('<ReviewBox />', () => {
	it('renders by default', () => {
		const wrapper = mount(stubElement());
		expect(wrapper).toMatchSnapshot();
	});

	it('renders all props', () => {
		const wrapper = mount(stubElement({
			alignment: 'Left',
			category: 'category',
			imageComponent: (<div />),
			text: [{
				label: 'foo',
				value: 'bar'
			}, {
				label: 'baz',
				value: 'boo'
			}],
			score: 'A',
			subcategory: 'subcategory'
		}));
		expect(wrapper).toMatchSnapshot();
	});
});
