// @flow

import * as React from 'react';
import styled from 'styled-components';
import Textfield from '../../form/textfield18';
import { CardContainer } from './static-card';
import EditorContext from '../editor-context';
import DragAndDropHOC, { type DragAndDropProps, type DragAndDropInjectedProps } from '../hoc/drag-and-drop';

export const Container = styled(CardContainer)`
	border: 1px dashed ${props => props.theme.color.midgray};
	padding: 1rem;
	margin-bottom: 1rem;
	background: ${props => props.theme.color.white};
`;

type Props = {|
	blockIndex: number,
	index: number,
	className?: string,
	...DragAndDropProps,
	...DragAndDropInjectedProps
|};

function EmptyCard(props: Props) {
	const { blockIndex, index, className, eventProps } = props;
	const { addPost, cardErrors, loadingCards, editMode } = React.useContext(EditorContext);
	const error = cardErrors[[blockIndex, index]];
	const isLoading = loadingCards.find(card => card[0] === blockIndex && card[1] === index);

	return (
		<Container
			className={className}
			data-index={[blockIndex, index]}
			// Passing down events from DragAndDropHOC
			{...eventProps}
			draggable={editMode === 'CardEditing'}
		>
			<Textfield
				name="addarticle"
				inlineHelp="Paste article url"
				label="Add article"
				status={isLoading ? 'loading' : 'default'}
				disabled={!!isLoading}
				onChange={url => {
					addPost([props.blockIndex, props.index], url);
				}}
				error={error || undefined}
				className="js_homepage-textfield"
			/>
		</Container>
	);
}

export default DragAndDropHOC(EmptyCard);
