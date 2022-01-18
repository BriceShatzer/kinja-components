import * as React from 'react';
import ReplyInset from './reply-inset';
import { mount } from 'enzyme';

const link = {
	meta: {
		postId: 5
	}
};

describe('<ReviewInset />', () => {
	it('should render when a link is provided', () => {
		const result = mount(
			<ReplyInset
				link={link}
				originalLink="https://google.com"
				insetPrefix="https://api.kinja.com"
			/>
		);
		expect(result.getDOMNode()).toMatchSnapshot();
	});
	it('should render when postId is not available', () => {
		const result = mount(
			<ReplyInset
				link={{}}
				originalLink="https://google.com"
				insetPrefix="https://api.kinja.com"
			/>
		);
		expect(result.getDOMNode()).toMatchSnapshot();
	});
});