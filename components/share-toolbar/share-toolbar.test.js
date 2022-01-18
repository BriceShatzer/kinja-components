/* @flow */

import * as React from 'react';
import { mount } from 'enzyme';
import FacebookIcon from '../icon19/Facebook';
import { componentStates } from './__fixtures__/componentStates';
import ShareToolbar from './share-toolbar';

describe('<ShareToolbar />', () => {
	it('renders horizontally', () => {
		const wrapper = mount(
			<ShareToolbar {...componentStates.a.props}>
				{({ ToolbarItem, ToolbarButton }) => {
					return (
						<React.Fragment>
							<ToolbarItem>
								<ToolbarButton>
									<FacebookIcon />
								</ToolbarButton>
							</ToolbarItem>
						</React.Fragment>
					);
				}}
			</ShareToolbar>
		);
		expect(wrapper.getDOMNode()).toMatchSnapshot();
	});
});
