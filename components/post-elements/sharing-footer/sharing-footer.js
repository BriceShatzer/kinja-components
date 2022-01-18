// @flow

import * as React from 'react';
import styled from 'styled-components';
import Button from '../../buttons';
import Link from '../../elements/link';
import Facebook from '../../icon19/Facebook';
import Twitter from '../../icon19/Twitter';
import media from '../../../style-utils/media';

type SharingFooterSocialMedium = 'Facebook' | 'Twitter';

const PermalinkSharingFooterClick = (medium: SharingFooterSocialMedium) => ['Share Tools', `Share to ${medium} click`, 'Share bar'];

const SharingFooterWrapper = styled.div`
	border-top: ${props => props.theme.color.lightgray} solid 1px;
	position: fixed;
	bottom: 0;
	right: 0;
	width: 100%;
	padding: 6px;
	background: ${props => props.theme.color.white};
	z-index: 20;
`;

const ReversedButton = styled(Button)`
	margin: 0 5px;
	padding: 0 1rem;
	width: 90px;
	height: 28px;
	line-height: unset;

	> div {
		flex-direction: row-reverse;
		justify-content: space-around;
	}

	span {
		margin-left: 6px;
	}

	${media.mediumDown`
		margin: 0 10px;
		width: 120px;
	`}
`;

const SharingFooterContent = styled.div`
	width: 100%;
	max-width: ${p => p.theme.pageWidth};
	margin: 0 auto;
	display: flex;
	justify-content: flex-end;
	padding: 0 ${props => props.theme.columnPadding};

	${media.mediumDown`
		justify-content: center;
	`}
`;

const SharingFooter = ({
	facebookShareUrl,
	twitterShareUrl
}: {
	facebookShareUrl: string,
	twitterShareUrl: string
}) => (
	<SharingFooterWrapper>
		<SharingFooterContent>
			<Link href={facebookShareUrl} target="_blank" events={[PermalinkSharingFooterClick('Facebook')]}>
				<ReversedButton
					icon={<Facebook/>}
					label="Share"
					small
					variant="facebook"
				/>
			</Link>
			<Link href={twitterShareUrl} target="_blank" events={[PermalinkSharingFooterClick('Twitter')]}>
				<ReversedButton
					icon={<Twitter/>}
					label="Tweet"
					small
					variant="twitter"
				/>
			</Link>
		</SharingFooterContent>
	</SharingFooterWrapper>
);

export default SharingFooter;
