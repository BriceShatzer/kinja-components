import * as React from 'react';
import ReviewInset from './reviewInset';
import { mount } from 'enzyme';

const sampleReview = {
	category: 'Movies',
	text: [{
		label: 'Director',
		value: 'Hayao Miyazaki'
	}, {
		label: 'Release Date',
		value: 2001
	}],
	image: {
		id: 'ikwum2k9iayoepoyql5p',
		format: 'jpg'
	},
	score: 'A+',
	subcategory: 'Miyazaki movies',
	title: 'Spirited Away'
};

describe('<ReviewInset />', () => {
	it('should render in center by default', () => {
		const result = mount(<ReviewInset {...sampleReview} />);
		expect(result.getDOMNode()).toMatchSnapshot();
	});
	it('should render with left alignment', () => {
		const result = mount(<ReviewInset {...sampleReview} alignment="Left" />);
		expect(result.getDOMNode()).toMatchSnapshot();
	});
	it('should render in the editor', () => {
		const result = mount(<ReviewInset {...sampleReview} editable />);
		expect(result.getDOMNode()).toMatchSnapshot();
	});
});
