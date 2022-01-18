// @flow

import * as React from 'react';
import styled from 'styled-components';

import media from '../../style-utils/media';

const AdMobile = styled.div`
	padding: 0;
	margin: 0 -${props => props.theme.columnPadding};
	background: transparent;
	text-align: center;
`;

const AdMobileInner = styled.div`
	padding: 0;
	margin-bottom: 1.875rem;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const AdLabel = styled.p`
	padding-top: 10px;
	font-family: ${props => props.theme.typography.headline.fontFamily};
	font-size: 14px;
	color: ${props => props.theme.color.midgray};
	letter-spacing: 0.1rem;
	border-top: 1px solid ${props => props.theme.color.lightgray};
	text-align: center;
	text-transform: uppercase;
	margin-bottom: 0;
	width: 100%;

	${media.smallOnly`
		margin-left: ${props => props.theme.columnPadding};
		margin-right: ${props => props.theme.columnPadding};
	`}
`;

const AdContainer = styled.div`
	display: flex;
	justify-content: center;
	max-width: 320px;
	margin: 10px 0 20px;
	background-color: transparent;
`;

const AdLabelBottom = styled.p`
	border-bottom: 1px solid ${props => props.theme.color.lightgray};
	margin-bottom: 0;
	width: 100%;
	
	${media.smallOnly`
		margin-left: ${props => props.theme.columnPadding};
		margin-right: ${props => props.theme.columnPadding};
	`}
`;

type DataJson = {
	targeting: {
		page: string,
		postId?: string,
		pos: string,
		tags?: ?Array<string>,
		category: Array<string>,
		forcedAdZone: string
	}
}

type AmpJson = {
	vendors: {
		indexexchange: {SITE_ID: ?string},
		medianet: {CID: ?string}
	}
}

const AmpAdSlot = ({
	dataSlot,
	ampJson,
	dataJson
}: {
	dataSlot: string,
	ampJson: AmpJson,
	dataJson: DataJson
}) => {
	return (
		<AdMobile amp-access="NOT scroll.scroll">
			<AdMobileInner>
				<AdLabel>
					Advertisement
				</AdLabel>
				<AdContainer>
					<amp-ad
						width={300}
						height={250}
						type="doubleclick"
						data-loading-strategy="prefer-viewability-over-views"
						data-slot={dataSlot}
						rtc-config={JSON.stringify(ampJson)}
						json={JSON.stringify(dataJson)}>
					</amp-ad>
				</AdContainer>
				<AdLabelBottom></AdLabelBottom>
			</AdMobileInner>
		</AdMobile>
	);
};

export default AmpAdSlot;
