/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import Search from 'kinja-components/components/icon19/Search';
import {
	storiesOf,
	withDocs,
	action,
	text,
	boolean
} from 'base-storybook';

import Textfield18 from './textfield';
import README from './README.md';

const KinjaStorybookFieldWrapper = styled.div`
	text-align: left;
	width: ${props => props.width};
`;

class FieldWithError extends React.PureComponent<{}, { error: string }> {
	onChange: () => void;

	state = {};

	constructor(props) {
		super(props);

		this.state.error = '';
		this.onChange = this.onChange.bind(this);
	}

	onChange(value) {
		const tooLong = (value.length <= 30) ? '' : 'Value too long, 30 characters maximum.';
		const tooShort = (value.length >= 5) ? '' : 'Value too short, 5 characters minimum.';

		this.setState({
			error: tooShort || tooLong
		});
	}

	render() {
		return (
			<Textfield18
				name="test2"
				label="Has restrictions"
				inlineHelp="30 characters maximum, minimum 5"
				onChange={this.onChange}
				error={this.state.error}
			/>
		);
	}
}
storiesOf('3. Elements|Form/Text Field', module)
	.addDecorator(withDocs(README))
	.add('Textfield18', () => (
		<KinjaStorybookFieldWrapper width="400px">
			<Textfield18
				name="test"
				label="Username"
				disabled={boolean('Disabled', false)}
				inlineHelp={text('Inline help', 'Make it unique and snappy')}
				onChange={action('Change')}
				error={text('Error message', '')}
			/>
			<Textfield18
				name="test"
				label="Loading"
				disabled={boolean('Disabled', false)}
				inlineHelp={text('Inline help', 'Make it unique and snappy')}
				status='loading'
				onChange={action('Change')}
				error={text('Error message', '')}
			/>
			<Textfield18
				name="test"
				label="Loading and custom icon"
				disabled={boolean('Disabled', false)}
				inlineHelp={text('Inline help', 'Make it unique and snappy')}
				status='loading'
				customIcon={<Search/>}
				onChange={action('Change')}
				error={text('Error message', '')}
			/>
			<FieldWithError />
		</KinjaStorybookFieldWrapper>
	));
