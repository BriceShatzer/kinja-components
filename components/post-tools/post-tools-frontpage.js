// @flow

import * as React from 'react';
import { DropdownItem } from '../dropdown';
import { EnsureDefaultTheme } from '../theme';
import type { PostToolsData, PostToolsCallbacks } from './';
import Pencil from '../icon19/Pencil';
import Embiggen from '../icon19/Embiggen';
import StarCircle from '../icon19/StarCircle';
import UserRemove from '../icon19/UserRemove';
import UserAdd from '../icon19/UserAdd';
import Disabled from '../icon19/Disabled';

/*
 * Frontpage PostTools dropdown contents
 */
export const PostToolsFrontpage = ({
	editClickHandler,
	embiggenClickHandler,
	promoteClickHandler,
	dismissClickHandler,
	blockClickHandler,
	isDismissed,
	isEmbiggened,
	isBlocked,
	authorIds,
	defaultBlogId,
	defaultBlogDisplayName,
	authorName
}: PostToolsCallbacks & PostToolsData) => {
	const blockTitle = defaultBlogDisplayName ? `Block for ${defaultBlogDisplayName}` : 'Block';
	const unblockTitle = defaultBlogDisplayName ? `Unblock for ${defaultBlogDisplayName}` : 'Unblock';

	return (
		<EnsureDefaultTheme>
			<React.Fragment>
				{editClickHandler && (
					<DropdownItem
						onClick={editClickHandler}
						icon={<Pencil/>}
						title="Edit"
					/>
				)}
				{embiggenClickHandler && (
					<DropdownItem
						isActive={isEmbiggened}
						onClick={() => embiggenClickHandler(isEmbiggened)}
						icon={<Embiggen/>}
						title="Embiggen"
					/>
				)}
				{promoteClickHandler && (
					<DropdownItem
						onClick={promoteClickHandler}
						icon={<StarCircle/>}
						title="Promote"
					/>
				)}
				{dismissClickHandler && (
					<DropdownItem
						onClick={() => dismissClickHandler(isDismissed)}
						icon={isDismissed ? <UserAdd/> : <UserRemove/>}
						title={isDismissed ? 'Undismiss' : 'Dismiss'}
					/>
				)}
				{blockClickHandler && authorName && defaultBlogDisplayName && (
					<DropdownItem
						onClick={() => blockClickHandler({
							userId: authorIds[0],
							blogId: defaultBlogId,
							userName: authorName,
							blogName: defaultBlogDisplayName,
							isBlocked
						})}
						icon={<Disabled/>}
						title={isBlocked ? unblockTitle : blockTitle}
					/>
				)}
			</React.Fragment>
		</EnsureDefaultTheme>
	);
};
