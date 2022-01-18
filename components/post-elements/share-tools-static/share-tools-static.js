// @flow

import * as React from 'react';
import styled, { css } from 'styled-components';

import media from '../../../style-utils/media';
import Theme from 'kinja-components/components/theme';
import { gridValue } from '../../grid-utils';
import PermalinkBelowPostSubtitle from 'kinja-components/components/post-elements/permalink-below-post-subtitle';
import { ShareToolbarContainer } from 'kinja-components/components/share-toolbar';
import MailFilled from 'kinja-components/components/icon19/MailFilled';
import Button from 'kinja-components/components/buttons';
import { StyledButton } from './reply-button';
import Link from 'kinja-components/components/elements/link';
import getShareToolsContents from 'kinja-magma/client/hydration/post-tools/utils/get-share-tools-contents';
import createTranslate from 'kinja-components/components/translator';
import translations from './translations';

import type { BlogThemeName } from 'kinja-components/components/theme/theme';
import type { Locale } from 'kinja-magma/models/Locale';
import type { PostShareUrls } from 'kinja-components/components/post-tools';
import type { ShareToolsPosition } from 'kinja-magma/client/hydration/post-tools/utils/analytics';


const StyledShareToolsContainer = styled(ShareToolbarContainer)`
	display: inline-block;

	${media.smallOnly`
		width: 100%;
		max-width: 100%;
	`}
`;

const PermalinkBelowPostSubtitleMobile = styled(PermalinkBelowPostSubtitle)`
	display: none;
	border-bottom: 2px solid ${({ theme }) => theme.color.midgray};
	text-align: left;
`;

const ReplyContainer = styled.div`
	float: right;
	text-align: right;
`;

const SubscriptionButton = styled(Button)`
	border-radius: 3px;
	padding: 0 1rem;
	border-color: ${({ theme }) => theme.color.midgray};

	:hover,
	:active,
	:focus {
		border-color: ${({ theme }) => theme.color.midgray};
	}
`;

const SubscriptionContainer = styled.div`
	text-align: right;
`;

const BelowPostItem = styled.div`
	margin: 2.5rem auto 0;
	max-width: ${props => props.withStandardGrid ? '100%' : props.theme.postContentMaxWidth};

	${({ withSubscriptionButton }) => (withSubscriptionButton) && css`
		display: flex;
		justify-content: space-between;
	`}
	${media.smallOnly`

		${ReplyContainer} {
			width: 100%;
			margin-top: 36px;

			${PermalinkBelowPostSubtitle}:first-child {
				display: none;
			}
		}

		${PermalinkBelowPostSubtitleMobile} {
			display: block;
		}

		${StyledButton} {
			width: 100%;
		}
	`}

	${media.mediumUp`
		${PermalinkBelowPostSubtitleMobile} {
			display: none;
		}
	`}

	${media.largeOnly`
		max-width: ${props => props.withStandardGrid ? gridValue.large('6c') : props.theme.postContentMaxWidth};
	`}

	${media.xlargeOnly`
		max-width: ${props => props.withStandardGrid ? gridValue.xlarge('6c') : props.theme.postContentMaxWidth};
	`}

	${props => props.wideRail ? css`
		${media.xxlargeOnly`
			max-width: ${props => props.withStandardGrid ? gridValue.xxlarge('6c') : props.theme.postContentMaxWidth};
		`}
		${media.xxxlargeUp`
			max-width: ${props => props.withStandardGrid ? gridValue.xxxlarge('6c') : props.theme.postContentMaxWidth};
		`}
	` : css`
		${media.xxlargeUp`
			max-width: ${props => props.withStandardGrid ? gridValue.xxlarge('6c') : props.theme.postContentMaxWidth};
		`}
	`}
`;


const ShareToolsStatic = ({
	blogTheme,
	locale,
	postShareUrls,
	shareToolsPosition,
	withSubscriptionButton,
	withStandardGrid,
	wideRail
}: {
	blogTheme: BlogThemeName,
	locale: Locale,
	postShareUrls: PostShareUrls,
	shareToolsPosition: ShareToolsPosition,
	withSubscriptionButton: boolean,
	withStandardGrid: boolean,
	wideRail: boolean
}) => {
	const translate = createTranslate(translations, locale);

	return (
		<BelowPostItem
			withStandardGrid={withStandardGrid}
			withSubscriptionButton={withSubscriptionButton}
			wideRail={wideRail}
		>
			<div>
				<PermalinkBelowPostSubtitle>{translate('Share This Story')}</PermalinkBelowPostSubtitle>
				<StyledShareToolsContainer position={shareToolsPosition}>
					{getShareToolsContents(
						{...postShareUrls, emailShareUrl: `${postShareUrls.emailShareUrl}%26utm_campaign=${shareToolsPosition}`},
						shareToolsPosition
					)}
				</StyledShareToolsContainer>
			</div>
			{withSubscriptionButton && (
				<SubscriptionContainer>
					<PermalinkBelowPostSubtitle>{translate('Get our newsletter')}</PermalinkBelowPostSubtitle>
					<Theme blog={blogTheme}>
						<Link events={[['Permalink page click', 'Subscribe button click']]} href="/newsletter" target="_blank">
							<SubscriptionButton
								icon={<MailFilled />}
								label={translate('Subscribe')}
								labelPosition="after"
								weight="secondary"
							/>
						</Link>
					</Theme>
				</SubscriptionContainer>
			)}
		</BelowPostItem>
	);
};

ShareToolsStatic.defaultProps = {
	locale: 'en-US'
};

export default ShareToolsStatic;
