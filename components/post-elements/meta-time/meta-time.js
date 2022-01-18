/* @flow */

import React from 'react';
import styled from 'styled-components';

import type { PostId } from 'kinja-magma/models/Id';
import type { PageType } from 'kinja-magma/models/PageType';

import DateTime from '../../../utils/DateTime';
import Link, { Anchor } from '../../elements/link';
import { EnsureDefaultTheme } from '../../theme';
import createTranslate from '../../translator';
import translations from './translations';
import {
	StreamPostClick,
	KinjaDealsClick,
	ExternalPostClick,
	StreamPostClickKala
} from '../../stream/analytics';
import {
	PermalinkHeaderClick
} from '../../permalink/analytics';

import type { Locale } from 'kinja-magma/models/Locale';


type Props = {
	className?: string,
	index: number,
	isDeals?: boolean,
	isExternalPost?: boolean,
	isScheduled?: boolean,
	isSecondScroll?: boolean,
	locale?: Locale,
	millis: number,
	pageType: PageType,
	permalink: string,
	postId: PostId,
	relativeShort?: boolean,
	timezone?: string,
	customGAEvent?: Array<Array<?string | {[key: string]: mixed}>>
};

export const TimeContainer = styled.time`
	display: inline-block;
	font-size: 14px;
	line-height: 19px;

	${Anchor} {
		color: ${props => props.theme.color.gray};

		:hover {
			color: ${props => props.theme.color.gray};
		}
	}
`;

export const ScheduledTimeContainer = styled(TimeContainer)`
	background-color: ${props => props.theme.color.black};
	padding: 2px 5px 0 5px;

	${Anchor} {
		font-weight: bold;
		color: ${props => props.theme.color.white};
	}
`;


const MetaTime = (props: Props) => {
	const {
		className,
		index,
		isDeals,
		isExternalPost,
		isScheduled,
		isSecondScroll,
		locale,
		millis,
		pageType,
		permalink,
		postId,
		relativeShort,
		timezone,
		customGAEvent
	} = props;

	if (typeof millis !== 'number') {
		return null;
	}

	const datetime = new DateTime({ locale, timestamp: millis, timezone });
	const translate = createTranslate(translations, locale);
	const scheduledLabel = isScheduled ? `${translate('Scheduled')}: ` : '';
	const Container = isScheduled ? ScheduledTimeContainer : TimeContainer;
	const events = [
		(pageType !== 'permalink' ? StreamPostClick(index, permalink, pageType) : PermalinkHeaderClick(permalink, isSecondScroll)),
		(isExternalPost ? ExternalPostClick(index, permalink) : undefined),
		(isDeals ? KinjaDealsClick(index, permalink) : undefined)
	].filter(Boolean);
	const kalaEvent = StreamPostClickKala(postId, pageType);

	return (
		<EnsureDefaultTheme>
			<Container className={className} dateTime={datetime.machineDateTime}>
				<Link href={permalink}
					kalaEvent={kalaEvent}
					events={customGAEvent || events}
					className='js_meta-time'
				>
					{scheduledLabel}{relativeShort ? datetime.relativeDateTimeShort : datetime.relativeDateTime}
				</Link>
			</Container>
		</EnsureDefaultTheme>
	);
};

MetaTime.defaultProps = {
	language: 'en-US'
};


export default MetaTime;
