/* @flow */

import React from 'react';
import styled from 'styled-components';
import {
	StreamVerticalClick
} from 'kinja-components/components/stream/analytics';
import Link from 'kinja-components/components/elements/link';
import StoryTypeLabel from 'kinja-components/components/story-type-label';

const LinkWrapper = styled(Link)`
	&:hover {
		text-decoration: none;
	}
`;

type Props = {
	canonicalHost: ?string,
	index: ?number,
	pageType: ?string,
	displayName: ?string
}

function LabelVertical({
	canonicalHost,
	index,
	pageType,
	displayName
}: Props): React$Node {
	if (!canonicalHost || typeof index !== 'number' || !pageType || !displayName) {
		return null;
	}

	const verticalHost = canonicalHost.replace('http(s)://', '');
	const verticalLink = `https://${verticalHost}`;

	return (
		<React.Fragment>
			<LinkWrapper
				href={verticalLink}
				events={[
					StreamVerticalClick(index, verticalLink, pageType)
				].filter(Boolean)}
			>
				<StoryTypeLabel tag={displayName} />
			</LinkWrapper>
		</React.Fragment>
	);
}

export default LabelVertical;
