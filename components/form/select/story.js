/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import {
	storiesOf,
	withDocs,
	boolean,
	action,
	text,
	select,
	number
} from 'base-storybook';

import Select from './select';
import Option from './option';
import BlogOption from './blog-option';
import README from './README.md';

const normal = [
	(<Option key="null" value="" stringRepresentation="No Language" emptyValue />),
	(<Option key="en" value="en" stringRepresentation="English" />),
	(<Option key="es" value="es" stringRepresentation="Spanish" />),
	(<Option key="hu" value="hu" stringRepresentation="Hungarian" />)
];

const blogOptions = [
	(<Option
		key="noblog"
		value=""
		stringRepresentation="No blog"
		emptyValue
	/>),
	(<BlogOption
		key="gizmodo"
		value="gizmodo"
		stringRepresentation="Gizmodo"
		icon={'gizmodo'}
	/>),
	(<BlogOption
		key="avclub"
		value="avclub"
		stringRepresentation="avclub"
		icon={'avclub'}
	/>),
	(<BlogOption
		key="kinja"
		value="kinja"
		stringRepresentation="Blog with no icon"
	/>)
];

const optionNameToComponents = name => {
	switch (name) {
		case 'Blogs':
			return blogOptions;
		default:
			return normal;
	}
};

// Helper class to handle the controlled Select component
class WrappedSelect extends React.Component<{}, { value: any }> {
	state = {
		value: null
	}
	render() {
		const options = select('Options', ['Normal', 'Blogs'], 'Normal');
		const { value } = this.state;
		return (
			<Select
				name="test"
				description={options === 'Normal' ? 'Language' : 'Blog'}
				predictive={boolean('Predictive', false)}
				simplified={boolean('Simplified (for mobile devices)')}
				onChange={newValue => {
					this.setState({
						value: newValue
					});
					action('Change')(newValue);
				}}
				error={text('Error message')}
				value={value}
				disabled={boolean('Disabled')}
				height={number('Height', 300)}
				labelPosition={select('Label Position', ['', 'below', 'above'])}
			>
				{optionNameToComponents(options)}
			</Select>
		);
	}
}

const StoryWrap = styled.div`
	label {
		max-width: 400px;
	}
`;

storiesOf('3. Elements|Form/Select', module)
	.addDecorator(withDocs(README))
	.add('Select', () => {
		return (
			<StoryWrap>
				<WrappedSelect />
			</StoryWrap>
		);
	});
