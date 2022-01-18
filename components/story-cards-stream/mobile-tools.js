/* @flow */

import * as React from 'react';
import styled from 'styled-components';

import media from 'kinja-components/style-utils/media';
import { StatefulSaveBadge } from 'kinja-components/components/post-elements/save-badge';
import { IconWrapper } from '../icon19/icon19';

const StyledSaveBadge = styled(StatefulSaveBadge)``;

const MobileToolsContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	align-self: flex-end;

	/* Stateful Container */
	${StyledSaveBadge} {
		margin-bottom: 0;
	}

	/* SaveBadge Container */
	${StyledSaveBadge} + div {
		flex-flow: row;
	}

	/* Label (adjacent to bookmark svg) */
	${StyledSaveBadge} ${IconWrapper} + div {
		font-size: 14px;
		font-weight: normal;
		display: none;
	}

	${media.mediumUp`
		display: none;

		${StyledSaveBadge} ${IconWrapper} + div {
			display: block;
		}
	`}
`;

type MobileToolsProps = {
	postId: string,
	saveCount?: number,
	isSaved?: boolean,
	hideRecommendations?: boolean
};

function MobileTools({
	postId,
	saveCount = 0,
	isSaved = false,
	hideRecommendations
}: MobileToolsProps) {
	const showSave = hideRecommendations === false;
	return (
		<MobileToolsContainer>
			{showSave && <StyledSaveBadge
				postId={postId}
				saveCount={saveCount}
				isSaved={isSaved}
			/>}
		</MobileToolsContainer>
	);
}

export default MobileTools;
