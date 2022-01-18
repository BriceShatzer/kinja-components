// @flow

import * as React from 'react';
import styled from 'styled-components';
import { MobileCurationAd, HomepageAdContainer } from '../../../ad-slot/ads';
import media from '../../../../style-utils/media';

export const MobileAdWrapper = styled(HomepageAdContainer)`
	${media.largeUp`
		display: none;
	`}
`;

export default function MobileOnlyAd() {
	return (
		<MobileAdWrapper grayBackground>
			<MobileCurationAd />
		</MobileAdWrapper>
	);
}