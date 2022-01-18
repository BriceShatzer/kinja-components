/* @flow */

import * as React from 'react';
import type { FunctionOrClassComponent } from '../../../utils/types';

type DragAndDropProps = {
	isDraggable?: boolean,
	setCardSwapState?: (draggedItemIndex: number, droppedItemIndex: number) => void
}

export default function DragAndDrop<Props: DragAndDropProps, State>(WrappedComponent: FunctionOrClassComponent<Props, State>
): Class<React.Component<$Diff<Props, DragAndDropProps>>> {

	return class DragAndDropHOC extends React.PureComponent<$Diff<Props, DragAndDropProps>> {

		static displayName = `DragAndDrop(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

		ondragstart = (event: SyntheticDragEvent<*>) => {
			event.dataTransfer.setData('draggedItemIndex', event.currentTarget.dataset.index);
		}

		ondragend = (event: SyntheticDragEvent<*>) => {
			event.currentTarget.style.opacity = 1;
		}

		ondragover = (event: SyntheticDragEvent<*>) => {
			event.preventDefault();
			event.currentTarget.style.opacity = 0.5;
		}

		ondragenter = (event: SyntheticDragEvent<*>) => {
			event.preventDefault();
		}

		ondragleave = (event: SyntheticDragEvent<*>) => {
			event.currentTarget.style.opacity = 1;
		}

		ondrop = (event: SyntheticDragEvent<*>) => {
			event.preventDefault();
			const draggedItemIndex = event.dataTransfer.getData('draggedItemIndex');
			const droppedItemIndex = event.currentTarget.dataset.index;
			if (this.props.setCardSwapState) {
				this.props.setCardSwapState(draggedItemIndex, droppedItemIndex);
			}

			// reset dropped item index to default opacity
			event.currentTarget.style.opacity = 1;
		}

		render() {
			const dragEvents = this.props.isDraggable ? {
				draggable: true,
				onDragStart: this.ondragstart,
				onDragEnter: this.ondragenter,
				onDragEnd: this.ondragend,
				onDragOver: this.ondragover,
				onDragLeave: this.ondragleave,
				onDrop: this.ondrop
			} : null;

			return <WrappedComponent {...this.props} dragEvents={dragEvents} />;
		}
	};
}
