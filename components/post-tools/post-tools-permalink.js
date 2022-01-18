// @flow

import * as React from 'react';
import styled from 'styled-components';

import { DropdownItem } from '../dropdown';
import { EnsureDefaultTheme } from '../theme';
import type { BlogId } from 'kinja-magma/models/Id';
import type { PostToolsCallbacks} from './';
import Pencil from '../icon19/Pencil';
import Embiggen from '../icon19/Embiggen';
import Mail from '../icon19/Mail';
import ExternalLink from '../icon19/ExternalLink';
import Video from '../icon19/Video';
import Bubble from '../icon19/Bubble';
import StarCircle from '../icon19/StarCircle';
import MoveVertical from '../icon19/MoveVertical';

/*
 * Permalink page PostTools dropdown contents
 */
export const PostToolsPermalink = ({
	editClickHandler,
	embiggenClickHandler,
	sendToEditorsClickHandler,
	promoteClickHandler,
	shareClickHandler,
	initializeInArticleAdTools,
	changeInArticleVideoClickHandler,
	toggleConversationToolsClickHandler,
	sharedToBlogId,
	isEmbiggened
}: PostToolsCallbacks & {
	sharedToBlogId: ?BlogId,
	isEmbiggened: boolean
}) => (
	<EnsureDefaultTheme>
		<React.Fragment>
			{editClickHandler && <DropdownItem
				onClick={editClickHandler}
				icon={<Pencil/>}
				title="Edit"
			/>}
			{embiggenClickHandler && <DropdownItem
				isActive={isEmbiggened}
				onClick={() => embiggenClickHandler(isEmbiggened)}
				icon={<Embiggen/>}
				title="Embiggen"
			/>}
			{sendToEditorsClickHandler && <DropdownItem
				onClick={sendToEditorsClickHandler}
				icon={<Mail/>}
				title="Send to Editors"
			/>}
			{promoteClickHandler && <DropdownItem
				onClick={promoteClickHandler}
				icon={<StarCircle/>}
				title="Promote"
			/>}
			{shareClickHandler && <DropdownItem
				onClick={shareClickHandler}
				icon={<ExternalLink/>}
				title={`${sharedToBlogId ? 'Unshare' : 'Share to Kinja'}`}
			/>}
			{initializeInArticleAdTools && <DropdownItem
				onClick={initializeInArticleAdTools}
				icon={<MoveVertical/>}
				title="Move Ad Slots"
			/>}
			{changeInArticleVideoClickHandler && <DropdownItem
				onClick={changeInArticleVideoClickHandler}
				icon={<Video/>}
				title="Change In-Article Video"
			/>}
			{toggleConversationToolsClickHandler && <DropdownItem
				onClick={toggleConversationToolsClickHandler}
				icon={<Bubble/>}
				title="Toggle Conversation Tools"
			/>}
		</React.Fragment>
	</EnsureDefaultTheme>
);

export const PermalinkToolContainer = styled.div`
	display: flex;
	width: 100%;
	overflow-y: hidden;
	overflow-x: auto;
`;

export const PermalinkUserTools = styled.div`
	display: flex;
	position: relative;
`;

export const PermalinkShareTools = styled.div`
	height: 40px;
`;
