// @flow

import * as React from 'react';
import styled, {css} from 'styled-components';
import {compact, flatten, find} from 'lodash';
import ChevronRightIcon from '../icon19/ChevronRight';
import type {LevelState} from './types';
import {chevronMargin,
	currentPathIconMargin,
	defaultIcon,
	footerPathMaxWidth,
	folderWidth,
	footerPathMaxChar
} from './consts';

type Props = {
	levels: Array<LevelState>,
	withIcon?: boolean,
	placeholder?: string,
	isFooter?: boolean,
	isVideo?: boolean,
	toggleTooltip: (e: SyntheticMouseEvent<HTMLElement>) => void
};

const Wrapper = styled.div`
	display: flex;
	align-items: center;
`;

const CurrentPathPart = styled.div`
	color: #222;
`;

const IconWrapper = styled.div`
	margin: 0 ${currentPathIconMargin}px 0 0;

	${props => props.nudgeUp && css`
		position: relative;
		top: -2px;
	`}
`;

const AvatarWrapper = styled.div`
	margin-right: ${currentPathIconMargin}px;
	width: 18px;
`;

const ChevronWrapper = styled(IconWrapper)`
	top: -1px;
	margin: 0 ${chevronMargin}px;
`;

const MainText = styled.div`
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	max-width: ${props => props.maxWidth}px;
`;

function getSelectedItemForLevel(level: LevelState) {
	if (level.selection) {
		return find(level.items, item => {
			return item.id === level.selection;
		});
	} else {
		return null;
	}
}

export default function CurrentPath(props: Props) {
	let maxWidth = folderWidth;

	if (!props.levels) {
		return null;
	}

	const {levels,
		withIcon,
		placeholder,
		isFooter,
		toggleTooltip
	} = props;

	let path = levels.map((level, index) => {
		const selected = getSelectedItemForLevel(level);
		return selected ? {name: selected.name, key: index, icon: selected.icon, avatar: selected.avatar} : null;
	});

	path = compact(path);
	const shouldShowPathTooltip = path.length && path.map(item => item.name).join('').length > footerPathMaxChar;

	if (shouldShowPathTooltip) {
		maxWidth = footerPathMaxWidth / path.length;
	}

	if (!path.length) {
		return placeholder || null;
	}

	const ownIcon = path[0].icon;
	const avatar = path[0].avatar;
	const icon = ownIcon || defaultIcon(props);

	return (
		<Wrapper>
			{withIcon && icon && !avatar && <IconWrapper nudgeUp={!ownIcon}>{icon}</IconWrapper>}
			{avatar && !isFooter && <AvatarWrapper>{avatar}</AvatarWrapper>}
			{flatten(path.map((part, index) => {
				const isLast = index === path.length - 1;
				const pathName = <CurrentPathPart
					data-shouldshowtooltip={shouldShowPathTooltip}
					data-tooltipname={part.name}
					data-tooltipoffset={isFooter ? 15 : 0}
					onMouseEnter={toggleTooltip}
					onMouseLeave={toggleTooltip}>
					{shouldShowPathTooltip ? <MainText maxWidth={maxWidth}>{part.name}</MainText> : part.name}
				</CurrentPathPart>;
				return (
					<React.Fragment key={part.key}>
						{pathName}
						{!isLast &&
							<ChevronWrapper>
								<ChevronRightIcon />
							</ChevronWrapper>
						}
					</React.Fragment>
				);
			}))}
		</Wrapper>
	);
}
