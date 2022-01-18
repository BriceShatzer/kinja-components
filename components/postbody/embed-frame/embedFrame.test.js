import * as React from 'react';
import EmbedFrame from './';
import { shallow } from 'enzyme';

describe('<EmbedFrame />', () => {
	it('should render an embed iframe', () => {
		const props = {
			id: 'I7Tps0M-l64',
			type: 'YoutubeVideo',
			aspectRatio: 'Fixed'
		};

		const result = shallow(<EmbedFrame {...props} />);
		expect(result).toMatchSnapshot();
	});
});