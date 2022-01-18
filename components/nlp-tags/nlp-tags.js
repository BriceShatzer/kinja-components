/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import { EnsureDefaultTheme } from '../theme';

type Tag = {
	name: string,
	type: string,
	salience: number,
	count: number
};

type Props = {
  data: Array<Tag>,
  externalAPI: {
    updatePostModel: (tagName: string) => void
  }
};

type State = {
	items: Array<Tag>
};

const NLPTagListWrapper = styled.div`
	flex-direction: row;
	margin: 0 -2.5rem;
	max-width: 800px;
`;

const NLPTag = styled.div`
	background-color: #f5f5f5;
	color: #0093ec;
	margin: 6px 7.5px;
	width: auto;
	height: 34px;
	padding: 0 2rem;
	border: #aaa 1px solid;
	border-radius: 34px;
	font-size: 14px;
	text-align: center;
	line-height: 34px;
	transition: background-color 0.4s ease-in-out, border-color 0.4s ease-in-out, color 0.4s ease-in-out;
	cursor: pointer;
	font-weight: normal;
	position: relative;
	text-decoration: none;
	display: inline-block;
	letter-spacing: 0.5px;
	&:hover {
		background-color: #0a7bc2;
		color: #fff;
		border: #0a7bc2 1px solid;
	}
`;

const NLPSeparatorDot = styled.span`
	color: #7d7d7d;
	transition: background-color 0.4s ease-in-out, border-color 0.4s ease-in-out, color 0.4s ease-in-out;
	${NLPTag}:hover & {
		color: #fff;
	}
`;

const NLPTagScore = styled.span`
	color: #7d7d7d;
	transition: background-color 0.4s ease-in-out, border-color 0.4s ease-in-out, color 0.4s ease-in-out;
	${NLPTag}:hover & {
		color: #fff;
	}
`;

class NLPTags extends React.Component<Props, State> {
	constructor() {
		super();
		this.state = {
			items: []
		};
	}

	componentWillMount() {
		this.setState({
			items: this.props.data.sort((a, b) => (a.count < b.count) || (a.salience < b.salience) ? 1 : -1)
		});
	}

	removeTag(index: number) {
		const tags = this.state.items;
		this.setState({
			items: tags.filter(function (item, idx) { return idx !== index; })
		});
	}

	render() {
		const { items } = this.state;
		const listItems = items.map((item, index) => {
			return <NLPTag key={item.name} onClick={() => {
				this.props.externalAPI.updatePostModel(item.name);
				this.removeTag(index);
			}} small>{item.name}
				<NLPSeparatorDot> • </NLPSeparatorDot>
				<NLPTagScore>{item.count}</NLPTagScore>
			</NLPTag>;
		});
		return (
			<EnsureDefaultTheme>
				<NLPTagListWrapper>
					{listItems}
				</NLPTagListWrapper>
			</EnsureDefaultTheme>
		);
	}
}

export default NLPTags;
