/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import { DateTime as DT } from 'luxon';
import DateTime from 'kinja-components/utils/DateTime';
import { EnsureDefaultTheme } from 'kinja-components/components/theme';
import Live from 'kinja-components/components/post-elements/live-post-label';

// ICONS
import DealsBox24Icon from '../../icon19/DealsBox24';
import Clock24Icon from '../../icon19/Clock24';
import SharedPost24Icon from '../../icon19/SharedPost24';
import Promotion24Icon from '../../icon19/Promotion24';

import type { Locale } from 'kinja-magma/models/Locale';
import type { RecircGroup } from 'kinja-components/components/types';
import type Blog from 'kinja-magma/models/Blog';
import type Post from 'kinja-magma/models/Post';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	svg {
		color: ${({ theme }) => theme.color.gray};
	}
`;

const Label = styled.div`
	font-family: ${props => props.theme.typography.primary.fontFamily};
	font-size: 10px;
	font-weight: 400;
	letter-spacing: 0.2px;
	color: ${props => props.theme.color.gray};
	text-transform: uppercase;
	text-align: center;
	line-height: 7px;
	margin-top: 8px;
	white-space: nowrap;
`;

type EmblemType =
	| 'default'
	| 'spliceCommerce'
	| 'spliceEditorial'
	| 'splicePromotion'
;

function Emblem(props: {
	type?: EmblemType,
	locale?: Locale,
	theme?: *
}) {
	const icon = {
		default: <Clock24Icon />,
		spliceEditorial: <SharedPost24Icon />,
		spliceCommerce: <DealsBox24Icon />,
		splicePromotion: <Promotion24Icon />
	};
	return icon[props.type || 'default'];
}

type TimestampFormat =
	| 'date'
	| 'relative'
	| 'time'

type TimestampProps = {
	format?: TimestampFormat,
	timestamp: number,
	locale?: Locale,
	timezone?: string
};

function Timestamp(props: TimestampProps) {
	const { timestamp, timezone, locale, format } = props || {};

	const dateTimeInstance = new DateTime({
		timestamp,
		timezone,
		locale
	});

	function getTimestampByFormat(format) {
		switch (format)  {
			case 'time':
				return dateTimeInstance.formattedTime.date.toLocaleString(DT.TIME_SIMPLE);
			case 'date':
				return dateTimeInstance.formattedTime.date.toLocaleString({...DT.DATE_SHORT, year: '2-digit' });
			case 'auto':
			default:
				return dateTimeInstance.relativeDateTimeShort;
		}
	}

	const renderedTimestamp = getTimestampByFormat(format);
	const renderedHHMM = dateTimeInstance.formattedTime.date.toLocaleString(DT.TIME_SIMPLE);
	const isTimeLessThanDay = /future|now|minutes|hours/.test(dateTimeInstance.formattedTime.relative.type);

	return (
		<React.Fragment>
			<Label>{renderedTimestamp}</Label>
			{renderedTimestamp !== getTimestampByFormat('time') && !isTimeLessThanDay && <Label>{renderedHHMM}</Label>}
		</React.Fragment>
	);
}

export type VisualTimestampProps = {
	blog?: Blog,
	defaultBlogGroup?: ?string,
	defaultBlogName?: ?string,
	defaultBlogRecircGroup?: ?RecircGroup,
	isExternal?: boolean,
	isLive?: boolean,
	isNativeAd?: boolean,
	isSpliced?: boolean,
	isSponsored?: boolean,
	locale?: string,
	post?: Post,
	recircGroup?: RecircGroup,
	theme?: *,
	timestamp?: number,
	timestampFormat?: TimestampFormat
};

function VisualTimestamp(props: VisualTimestampProps) {
	const {
		blog,
		defaultBlogGroup,
		defaultBlogRecircGroup,
		isExternal,
		isLive,
		isNativeAd,
		locale,
		post,
		theme,
		timestamp,
		timestampFormat
	} = props || {};

	const isCurrentBlogSameAsRepost = (blog && blog.blogGroup === defaultBlogGroup);

	if (isLive) {
		return (
			<EnsureDefaultTheme>
				<Live locale={locale} theme={theme} withStackedLabel />
			</EnsureDefaultTheme>
		);
	}

	const fmgBusiness = (() => {
		if (isCurrentBlogSameAsRepost) {
			return 'default';
		}
		if (post && post.id !== '0') {
			return 'spliceEditorial';
		}
		return 'splicePromotion';
	})();

	const emblemType = (isNativeAd ? {
		default: 'default',
		fmgNonSatire: isCurrentBlogSameAsRepost ? 'default' : 'spliceEditorial',
		fmgSatire: isCurrentBlogSameAsRepost ? 'default' : 'spliceEditorial',
		partnerEditorial: isCurrentBlogSameAsRepost ? 'default' : 'spliceCommerce',
		fmgBusiness
	} : {
		// default cases (kinja blogs)
		default: !isExternal || isCurrentBlogSameAsRepost ? 'default' : 'spliceEditorial',
		// gizmodo, jezebel, kotaku
		fmgNonSatire: isCurrentBlogSameAsRepost ? 'default' : 'spliceEditorial',
		// clickhole, theonion
		fmgSatire: isCurrentBlogSameAsRepost ? 'default' : 'spliceEditorial',
		// theinventory, kinja deals
		partnerEditorial: !defaultBlogGroup || isCurrentBlogSameAsRepost ? 'default' : 'spliceCommerce',
		// promotions, specialprojectsdesk, studioatgizmodo
		fmgBusiness: !defaultBlogGroup ? 'default' : 'splicePromotion'
	})[defaultBlogRecircGroup || 'default'];

	return (
		<EnsureDefaultTheme>
			<Container type={emblemType}>
				<Emblem locale={locale} type={emblemType} />
				{timestamp && !isNativeAd && <Timestamp locale={locale} format={timestampFormat} timestamp={timestamp} />}
			</Container>
		</EnsureDefaultTheme>
	);
}

export default VisualTimestamp;
