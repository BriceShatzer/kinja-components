/* @flow */

import * as React from 'react';
import { type CardIndex } from '../undo-stack';

export type DragAndDropProps = {|
	isDraggable?: boolean,
	onDrop: (CardIndex) => void,
	onDragEnter?: () => void,
	onDragStart?: (CardIndex) => void,
	onDragEnd?: () => void,
	targetOpacityEffects?: boolean
|}

export type DragAndDropInjectedProps = {|
	eventProps: {
		draggable?: true,
		onDragStart?: (event: SyntheticDragEvent<HTMLElement>) => void,
		onDragEnter?: (event: SyntheticDragEvent<HTMLElement>) => void,
		onDragEnd?: (event: SyntheticDragEvent<HTMLElement>) => void,
		onDragOver?: (event: SyntheticDragEvent<HTMLElement>) => void,
		onDragLeave?: (event: SyntheticDragEvent<HTMLElement>) => void,
		onDrop: (event: SyntheticDragEvent<HTMLElement>) => void
	}
|}

export default function DragAndDrop<Com: React.ComponentType<*>>(
	WrappedComponent: Com
): React.ComponentType<$Diff<React.ElementConfig<Com>, DragAndDropInjectedProps>> {

	function DragAndDropHOC(props: React.ElementConfig<Com>) {
		const { targetOpacityEffects = true } = props;

		const ondragstart = (event: SyntheticDragEvent<HTMLElement>) => {
			const currentIndex = event.currentTarget.dataset.index;
			event.dataTransfer.setData('draggedItemIndex', currentIndex);

			if (props.onDragStart) {
				props.onDragStart(currentIndex);
			}
		};

		const ondragend = (event: SyntheticDragEvent<HTMLElement>) => {
			if (targetOpacityEffects) {
				event.currentTarget.style.opacity = '1';
			}

			if (props.onDragEnd) {
				props.onDragEnd();
			}
		};

		const ondragover = (event: SyntheticDragEvent<HTMLElement>) => {
			event.preventDefault();

			if (targetOpacityEffects) {
				event.currentTarget.style.opacity = '0.5';
			}
		};

		const ondragenter = (event: SyntheticDragEvent<HTMLElement>) => {
			if (props.onDragEnter) {
				event.currentTarget.style.opacity = '1';
				props.onDragEnter();
			}
		};

		const ondragleave = (event: SyntheticDragEvent<HTMLElement>) => {
			if (targetOpacityEffects) {
				event.currentTarget.style.opacity = '1';
			}
		};

		const ondrop = (event: SyntheticDragEvent<HTMLElement>) => {
			// Browsers are inconsistent about firing onDragEnd when
			// onDrop also fires. This ensures onDragEnd always fires
			// before the drop logic runs.
			ondragend(event);

			event.preventDefault();
			const droppedItemIndex = event.currentTarget.dataset.index;

			if (!droppedItemIndex) {
				props.onDrop();
				event.currentTarget.style.opacity = '1';
				return;
			}

			const [toBlock, toCard] = droppedItemIndex.split(',').map(index => parseInt(index));

			props.onDrop([toBlock, toCard]);

			// reset dropped item index to default opacity
			event.currentTarget.style.opacity = '1';
		};

		const dragEvents = {
			draggable: true,
			onDragStart: ondragstart,
			onDragEnter: ondragenter,
			onDragEnd: ondragend,
			onDragOver: ondragover,
			onDragLeave: ondragleave,
			onDrop: ondrop
		};

		return <WrappedComponent {...props} eventProps={dragEvents} />;
	}

	DragAndDropHOC.displayName = `DragAndDrop(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

	return DragAndDropHOC;
}
