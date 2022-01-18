/* @flow */

import * as React from 'react';
import styled from 'styled-components';

import { EnsureDefaultTheme } from '../theme';


const ItemGroupWrapper = styled.div``;


type Props = {
	children: React.ChildrenArray<React.Element<any>>,
	childrenProps?: Object,
	htmlElement?: string | React.Node,
	onChange: string => void
}

type State = {
	selected: string
}

class ItemGroup extends React.PureComponent<Props, State> {
	clickHandlers: Array<string => void>;

	constructor(props: Props) {
		super(props);
		this.state = {
			selected: ''
		};
	}

	componentWillMount() {
		this.clickHandlers = [];
		React.Children.forEach(this.props.children, child => {
			if (child.props && child.props.selected) {
				this.setState({ selected: child.props.value });
			}
			this.clickHandlers.push(this.handleClick.bind(this, child.props.value));
		});
	}

	handleClick = (value: string) => {
		if (value !== this.state.selected) {
			this.setState({
				selected: value
			}, () => {
				if (this.props.onChange) {
					this.props.onChange(value);
				}
			});
		}
	}

	render() {
		const {
			children,
			childrenProps,
			htmlElement
		} = this.props;

		const selectedValue = this.state.selected;

		const buttonGroupItems = React.Children.map(children, (child, index) => {
			const selected = child.props.value === selectedValue;

			return React.cloneElement(child, {
				...childrenProps,
				selected,
				onClick: this.clickHandlers[index]
			});
		});

		const ItemGroupWrapperElement = ItemGroupWrapper.withComponent(htmlElement || 'div');

		return (
			<EnsureDefaultTheme>
				<ItemGroupWrapperElement {...this.props}>
					{buttonGroupItems}
				</ItemGroupWrapperElement>
			</EnsureDefaultTheme>
		);
	}
}


export default ItemGroup;
