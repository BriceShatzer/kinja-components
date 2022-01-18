// @flow

import * as React from 'react';

type Props = {
	initialState: {},
	children: (any, any) => React.Node
}

type State = {}

export default class WithState extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = this.props.initialState;
	}

	render() {
		return this.props.children(this.state, this.setState.bind(this));
	}
}
