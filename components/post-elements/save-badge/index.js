/* @flow */

import * as React from 'react';
import cx from 'classnames';
import SaveBadge from './save-badge';
import type { SaveBadgeProps } from './save-badge';

type StateProps = {
	postId: string,
	postPermalink: string
};

const StateContainer = ({ data, children }: {
	data: SaveBadgeProps & StateProps,
	children: React.Node
}) => (
	<div
		className={cx('js_save-badge', data.className)}
		data-state={JSON.stringify(data)}
		data-post-id={data.postId}
		data-post-permalink={data.postPermalink}
	>
		{children}
	</div>
);

export const StatefulSaveBadge = (props: SaveBadgeProps & StateProps): React.Node => (
	<StateContainer data={props} {...props}>
		<SaveBadge {...props} />
	</StateContainer>
);

export default SaveBadge;
