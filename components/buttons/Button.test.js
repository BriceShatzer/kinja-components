import * as React from 'react';
import { mount } from 'enzyme';

import Button from './Button';
import HeartIcon from 'kinja-components/components/icon19/Heart';
import { Theme } from '../theme';

describe('Button', () => {
	// Regular button
	it('should render a regular button', () => {
		const button = mount(<Button label="Regular" />);
		expect(button).toMatchSnapshot();
	});


	// // Regular small button
	it('should render a small regular button', () => {
		const button = mount(<Button label="Regular" small />);
		expect(button).toMatchSnapshot();
	});


	// // Priority modifiers
	it('should have a primary modifier class', () => {
		const button = mount(<Button label="Regular" weight='primary' />);
		expect(button).toMatchSnapshot();
	});

	it('should have a secondary modifier class', () => {
		const button = mount(<Button label="Regular" weight='secondary' />);
		expect(button).toMatchSnapshot();
	});

	it('should have a tertiary modifier class', () => {
		const button = mount(<Button label="Regular" weight='tertiary' />);
		expect(button).toMatchSnapshot();
	});

	it('should be disabled', () => {
		const button = mount(<Button label="Regular" disabled />);
		expect(button).toMatchSnapshot();
	});

	it('should be full width', () => {
		const button = mount(<Button label="Fullwidth" fullwidth />);
		expect(button).toMatchSnapshot();
	});


	// Button variants
	it('should be colorized as commerce button', () => {
		const button = mount(<Button label="Commerce" variant="commerce" />);
		expect(button).toMatchSnapshot();
	});

	it('should be colorized as secondary commerce button', () => {
		const button = mount(<Button label="Commerce" variant="commerce" weight='secondary' />);
		expect(button).toMatchSnapshot();
	});

	it('should be colorized as amazon button', () => {
		const button = mount(<Button label="Amazon" variant="amazon" />);
		expect(button).toMatchSnapshot();
	});

	it('should be colorized as error button', () => {
		const button = mount(<Button label="Error" variant="error" />);
		expect(button).toMatchSnapshot();
	});

	// Button with icon
	it('should have 2 children label and icon-wrapper', () => {
		const button = mount(<Button label="Hearted" weight='primary' icon={<HeartIcon/>} labelPosition="after" />);
		expect(button).toMatchSnapshot();
	});

	it('should have a <span> element child with an Icon component in - label first', () => {
		const button = mount(<Button label="Hearted" weight='primary' icon={<HeartIcon />} labelPosition="before" />);
		expect(button).toMatchSnapshot();
	});

	it('should merge className prop with calculated class names', () => {
		const button = mount(<Button label="Commerce" variant="commerce" className="foo" />);
		expect(button).toMatchSnapshot();
	});

	// Themed button
	it('should render a themed button', () => {
		const button = mount(<Theme blog="avclub"><Button label="The A.V. Club" variant="primary" /></Theme>);
		expect(button).toMatchSnapshot();
	});
});
