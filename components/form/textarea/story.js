/* @flow */

import React, { Component } from 'react';
import {
	action,
	number,
	storiesOf,
	text,
	boolean,
	withDocs
} from 'base-storybook';

import Textarea from './Textarea';
import README from './README.md';

class StatefulTextarea extends Component<{ autogrow?: boolean }, { value: string }> {
	constructor(props) {
		super(props);
		this.props = props;
		this.state = { value: '' };
	}
	render() {
		return (
			<Textarea
				autogrow={this.props.autogrow}
				error={text('error', '')}
				label={text('label', 'Sample Label')}
				name="bio"
				onChange={value => this.setState({ value }, () => action('onChange')(this.state.value))}
				value={this.state.value}
				rows={number('rows', 3)}
				counter={boolean('Character counter', false)}
				limit={number('Character limit')}
			/>
		);
	}
}

storiesOf('3. Elements|Form/Text Area', module)
	.addDecorator(withDocs(README))
	.add('Textarea (basic)', () => (
		<StatefulTextarea />
	))
	.add('Textarea (autogrow)', () => (
		<StatefulTextarea autogrow/>
	));
