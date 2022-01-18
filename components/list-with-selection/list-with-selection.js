/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import autobind from 'autobind-decorator';
import isEqual from 'lodash/isEqual';

type DefaultProps = {
	allowNavigation: boolean
};
type Props<C> = {
	children: React.ChildrenArray<C>,
	onSelect: (C, Event) => void,
	allowNavigation?: boolean,
	height?: number,
	selectionKeys?: Array<string>
};
type State = {
	selectionIndex: number
};

const List = styled.ul`
	background: white;
	border: 1px solid #e5e5e5;
	width: 100%;
	overflow-y: scroll;
	z-index: 501;
	position: relative;
	margin: 0;

	${ props => `max-height: ${props.height || 400}px;` }
`;

const ListItem = styled.li`
	padding: 5px 10px;
	color: #222;
	cursor: pointer;
	outline: none;

	&:hover {
		background: #e5e5e5;
	}

	${ props => props.isSelected && 'background: #e5e5e5;' }
`;

/**
 * The C type parameter represents any type of component you want to include as children of the list
 */
class ListWithSelection<C: React.Element<any>> extends React.Component<Props<C>, State> {
	static defaultProps: DefaultProps = {
		allowNavigation: false
	};
	state = {
		selectionIndex: 0
	};
	selectionHandlers: Array<(Event) => void> = [];
	listElement: ?HTMLElement;
	listItemElements: Array<?HTMLElement> = [];

	constructor(props: Props<C>) {
		super(props);
		this.selectionHandlers = React.Children.map(
			props.children, child => this.selectItem.bind(this, child)
		);
	}

	componentWillReceiveProps(nextProps: Props<C>) {
		if (!isEqual(nextProps.children, this.props.children)) {
			this.selectionHandlers = React.Children.map(
				nextProps.children, child => this.selectItem.bind(this, child)
			);
			this.setState({
				selectionIndex: 0
			});
		}
	}

	componentDidMount() {
		document.addEventListener('keydown', this.handleKeyDown);
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.handleKeyDown);
	}

	selectItem(item: C, event: Event) {
		this.props.onSelect(item, event);
	}

	@autobind
	handleKeyDown(event: KeyboardEvent) {
		const { selectionIndex } = this.state;
		const { children, allowNavigation } = this.props;
		if (!allowNavigation) {
			return;
		}
		if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'Enter') {
			event.preventDefault();
		}
		if (event.key === 'ArrowDown' && React.Children.count(children) > 0) {
			const maxIndex = React.Children.count(children) - 1;
			const newSelectionIndex = selectionIndex < maxIndex ? selectionIndex + 1 : maxIndex;
			this.setState({
				selectionIndex: newSelectionIndex
			}, () => {
				// If the selected element is out of scroll view, move the scroll
				const item = this.listItemElements[this.state.selectionIndex];
				const list = this.listElement;
				if (item && list && item.offsetTop > (list.clientHeight + list.scrollTop) - item.clientHeight) {
					list.scrollTop = (item.offsetTop - list.clientHeight) + item.clientHeight;
				}
			});
		}
		if (event.key === 'ArrowUp' && React.Children.count(children) > 0) {
			const newSelectionIndex = selectionIndex > 0 ? selectionIndex - 1 : 0;
			this.setState({
				selectionIndex: newSelectionIndex
			}, () => {
				// If the selected element is out of scroll view, move the scroll
				const item = this.listItemElements[this.state.selectionIndex];
				const list = this.listElement;
				if (item && list && item.offsetTop < list.scrollTop) {
					list.scrollTop = item.offsetTop;
				}
			});
		}
		if (event.key === 'Enter' && React.Children.count(children) > 0) {
			this.selectionHandlers[this.state.selectionIndex](event);
		}

		if (this.props.selectionKeys) {
			this.props.selectionKeys.forEach(selectionKey => {
				if (event.key === selectionKey && React.Children.count(children) > 0) {
					event.preventDefault();
					this.selectionHandlers[this.state.selectionIndex](event);
				}
			});
		}
	}

	render() {
		const { height, children } = this.props;
		const { selectionIndex } = this.state;
		return (
			<List ref={el => { this.listElement = el; }} height={height}>
				{React.Children.map(children, (item, index) => item && (
					<ListItem
						key={item.key}
						onClick={this.selectionHandlers[index]}
						role="option"
						aria-selected={selectionIndex === index}
						isSelected={selectionIndex === index }
						tabIndex="-1"
						ref={el => { this.listItemElements[index] = el; }}
					>
						{item}
					</ListItem>
				))}
			</List>
		);
	}
}

export default ListWithSelection;
