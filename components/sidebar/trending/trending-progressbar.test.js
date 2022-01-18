// @flow

import React from 'react';
import { mount } from 'enzyme';

import TrendingProgressBar from './trending-progressbar';

describe('TrendingProgressBar', () => {
	it('should render', () => {
		const wrapper = mount(
			<TrendingProgressBar
				count={3}
				activeItem={0}
				resetLoop={false}
				onNextTick={() => {}}
			/>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it('should call onNextTick on animation end', () => {

		const onNextTick = jest.fn();
		const wrapper = mount(
			<TrendingProgressBar
				count={3}
				activeItem={0}
				resetLoop={false}
				onNextTick={onNextTick}
			/>
		);

		wrapper.simulate('animationEnd');

		expect(onNextTick).toHaveBeenCalledTimes(1);
	});
});
