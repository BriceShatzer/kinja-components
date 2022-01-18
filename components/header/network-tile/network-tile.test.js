import React from 'react';
import { mount } from 'enzyme';
import NetworkTile from './network-tile';
import Theme from '../../theme';

describe('Network Tile', () => {
	it('should render NetworkTile if provided all minimum valid props', () => {
		const wrapper = mount(
			<Theme>
				<NetworkTile blogName="theonion" url="//theonion.com" />
			</Theme>
		);

		expect(wrapper.find(NetworkTile)).toHaveLength(1);
	});

	it('should render NetworkTile if provided all minimum valid props & optional tagline prop', () => {
		const taglineText = 'America\'s Finest News Source.';
		const wrapper = mount(
			<Theme>
				<NetworkTile
					blogName="theonion"
					tagline={taglineText}
					url="//theonion.com"
				/>
			</Theme>
		);

		expect(wrapper.find(NetworkTile)).toHaveLength(1);
		expect(wrapper.find('span').text() === taglineText);
	});
});
