// @flow

import * as React from 'react';
import { mount } from 'enzyme';

import { KinjaMetaProvider, withKinjaMeta } from './';
import type { KinjaMetaInjectedProps } from './';

describe('<KinjaMetaProvider />', () => {
	it('passes kinja metadata and preserves component props', () => {
		const BaseComponent = (props: {customContent: string} & KinjaMetaInjectedProps) => (
			<div>
				<h1>{props.kinjaMeta.config && props.kinjaMeta.config.insetPrefix}</h1>
				<p>{props.customContent}</p>
			</div>
		);

		const BaseComponentWithMetaData = withKinjaMeta(BaseComponent);

		const MiddleComponent = () => (
			<div>
				<span>Don&apos;t mind me I&apos;m just here doing nothing</span>
				<BaseComponentWithMetaData customContent={'World!'} />
			</div>
		);

		const providerProps = {
			config: {
				insetPrefix: 'Hello'
			}
		};

		const wrapper = mount(
			<KinjaMetaProvider value={providerProps} >
				<MiddleComponent />
			</KinjaMetaProvider>
		);

		expect(wrapper.getDOMNode()).toMatchSnapshot();
	});
});
