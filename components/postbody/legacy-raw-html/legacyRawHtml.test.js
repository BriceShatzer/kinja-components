import * as React from 'react';
import LegacyRawHtml from './legacyRawHtml';
import { shallow } from 'enzyme';

const sampleHtmlString = '<div class="sample">This is <b>rich</b> text</div>';

describe('<LegacyRawHtml />', () => {
	it('should render html', () => {
		const result = shallow(<LegacyRawHtml value={sampleHtmlString} />);
		expect(result).toMatchSnapshot();
	});
});
