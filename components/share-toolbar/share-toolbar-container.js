// @flow

import * as React from 'react';
import cx from 'classnames';

import type { ShareToolsPosition } from 'kinja-magma/client/hydration/post-tools/utils/analytics';

export const shareToolsClassname = 'js_share-tools';

const ShareToolbarContainer = ({
	className, position, children
}: {
	className?: string,
	position: ShareToolsPosition,
	children: ?React.Element<*>
}) => (
	<div
		className={cx(shareToolsClassname, className)}
		data-position={position}
	>
		{children}
	</div>
);

export default ShareToolbarContainer;
