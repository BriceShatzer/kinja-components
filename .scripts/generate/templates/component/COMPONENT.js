/* @flow */

import * as React from 'react';
import styled from 'styled-components';

type Props = {
	/* ... */
};

type State = {
	count: number
};

const StyledDiv = styled.div`
	background: papayawhip;
	color: palevioletred;
	text-align: center;
`;

class COMPONENT_NAME extends React.Component<Props, State> {
	constructor(props) {
		super(props);

		this.state = {
			count: 0
		};
	}

	componentDidMount() {
		setInterval(() => {
			this.setState(prevState => ({
				count: prevState.count + 1
			}));
		}, 1000);
	}

	render() {
		return <StyledDiv>Count: {this.state.count}</StyledDiv>;
	}
}

export default COMPONENT_NAME;
