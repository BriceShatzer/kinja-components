/* @flow */

import React, { Component } from 'react';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

import Slide from '../slide';
import { type SlideshowAspectRatio } from 'postbody/blockNodes/Slideshow';
import ImageNode from 'postbody/blockNodes/ImageNode';

type ImageInstance = {
	image: ImageNode,
	load: boolean,
	onDelete: ImageNode => void,
	aspectRatio: SlideshowAspectRatio,
	initialIndex: number
};

type Props = {
	items: Array<ImageNode>,
	onChange: Array<ImageNode> => void,
	aspectRatio: SlideshowAspectRatio
};

const EditSlideshowList = styled.ul`
	position: relative;
	width: 100%;
	height: 100%;
	list-style: none;
	padding: 0;
	margin: 0;
	max-width: none;

	> * {
		background: white;
		padding: 15px;
		float: left;
		width: 210px;
	}
`;

// This class is added in the edit slideshow modal while dragging a single slide
// Need to increase z index so it appears over the modal
const DraggableSlideStyle = createGlobalStyle`
	.kinja-slide--dragging {
		z-index: 120;
	}
`;

export const SortableImageItem = SortableElement(Slide);

export const SortableGrid = SortableContainer(({
	items
}) => (
	<EditSlideshowList>
		{items.map((item, index) => (
			<SortableImageItem
				key={`item-${item.initialIndex}`}
				index={index}
				{...item}
			/>
		))}
	</EditSlideshowList>
));

class ImageList extends Component<Props, void> {
	props: Props;
	handleDelete: ImageNode => void;
	onSortEnd: ({ oldIndex: number, newIndex: number }) => void;
	items: Array<ImageInstance>;

	constructor(props: Props) {
		super(props);
		this.createDeleteHandlers(props);
		this.onSortEnd = this.onSortEnd.bind(this);
	}

	componentWillReceiveProps(nextProps: Props) {
		this.createDeleteHandlers(nextProps);
	}

	createDeleteHandlers(props: Props) {
		this.items = props.items.map((item, index) => ({
			image: item,
			load: true,
			fullscreenEnabled: false,
			onDelete: this.handleDelete.bind(this, item),
			aspectRatio: props.aspectRatio,
			initialIndex: index // Needed to give some kind of id to the images to be used as key
		}));
	}

	onSortEnd({ oldIndex, newIndex }: { oldIndex: number, newIndex: number }) {
		this.props.onChange(arrayMove(this.props.items, oldIndex, newIndex));
	}

	handleDelete(item: ImageNode) {
		const { items } = this.props;
		const itemInList = items.find(i => i.id === item.id);
		if (!itemInList) {
			return;
		}
		const index = items.indexOf(itemInList);
		this.props.onChange([
			...items.slice(0, index),
			...items.slice(index + 1)
		]);
	}

	render() {
		return (
			<React.Fragment>
				<DraggableSlideStyle/>
				<SortableGrid
					items={this.items}
					onSortEnd={this.onSortEnd}
					helperClass="kinja-slide--dragging"
					useWindowAsScrollContainer
					axis="xy"
					distance={5}
				/>
			</React.Fragment>
		);
	}
}

export default ImageList;
