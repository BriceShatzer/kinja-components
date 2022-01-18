/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import { DateTime } from 'luxon';

import { EnsureDefaultTheme } from 'kinja-components/components/theme';
import media from 'kinja-components/style-utils/media';
import { BlogAvatarWrapper } from 'kinja-components/components/blog-avatar';
import createTranslate from 'kinja-components/components/translator';
import translations from '../translations';

import type { Item } from '../';


const Title = styled.p`
	text-align: center;
	font-size: 18px;
	line-height: 22px;
	color: ${props => props.theme.color.black};
`;

const BlogContainer = styled.div`
	display: inline-flex;
	align-items: left;
	flex-direction: column;
	padding-top: 48px;
	margin: 0 auto;
	max-width: 500px;
`;

const BlogItem = styled.div`
	display: flex;
	align-items: center;

	&:not(:last-child) {
		margin-bottom: 18px;
	}

	${BlogAvatarWrapper} {
		align-self: flex-start;
		flex-shrink: 0;
		width: 20px;
		height: 20px;
		margin-top: 1px;
	}
`;

const BlogName = styled.span`
	max-width: 230px;
	margin-left: 5px;
	font-size: 20px;
`;

const ShareAt = styled.div`
	position: relative;
	align-self: flex-start;
	margin-left: auto;
	padding-left: 41px;
	font-size: 18px;
	white-space: nowrap;

	&::before {
		content: '';
		position: absolute;
		left: 10px;
		top: calc(50% - 1px);
		width: 21px;
		border-bottom: solid 1px ${props => props.theme.color.midgray};
	}
`;
const Offset = styled.span`
	font-size: 14px;
	line-height: 18px;
	align-self: flex-end;
`;

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 400px;

	${media.mediumUp`
		width: auto;

		${ShareAt} {
			padding-left: 80px;

			&::before {
				width: 60px;
			}
		}

		${BlogName} {
			margin-left: 11px;
		}
	`}
`;


function getSharedTimeText(timemillis: number, zone: string) {
	const date = DateTime.fromMillis(timemillis, { zone }).toFormat('D');
	const hour = DateTime.fromMillis(timemillis, { zone }).toFormat('h');
	const minute = DateTime.fromMillis(timemillis, { zone }).toFormat('mm');
	const meridiem = DateTime.fromMillis(timemillis, { zone }).toFormat('a').toLowerCase();
	const offset = DateTime.fromMillis(timemillis, { zone }).toFormat('ZZZZ');
	const dateString = `${date} ${hour}:${minute}${meridiem} `;

	return <ShareAt>{dateString}<Offset>{offset}</Offset></ShareAt>;
}


type Props = {
	isFuture: boolean,
	locale: string,
	selectedBlogs: Array<Item>,
	timemillis: number,
	timezone: string
};

const Confirmation = (props: Props) => {
	const { isFuture, locale, selectedBlogs, timemillis, timezone } = props;
	const translate = createTranslate(translations, locale);
	const defaultMessage = selectedBlogs.length === 1
		? 'Are you sure you want to share to this site?'
		: 'Are you sure you want to share to these sites?';
	const scheduleMessage = selectedBlogs.length === 1
		? 'Are you sure you want to schedule a share to this site?'
		: 'Are you sure you want to schedule a share to these sites?';

	return (
		<EnsureDefaultTheme>
			<Container>
				<Title>{translate(isFuture ? scheduleMessage : defaultMessage)}</Title>
				<BlogContainer>
					{selectedBlogs.map(blog=> {
						return (
							<BlogItem key={blog.id}>
								{blog.icon}
								<BlogName>{blog.name}</BlogName>
								{getSharedTimeText(timemillis, timezone)}
							</BlogItem>
						);
					})}
				</BlogContainer>
			</Container>
		</EnsureDefaultTheme>
	);
};


Confirmation.defaultProps = {
	locale: 'en-US',
	timezone: 'America/New_York'
};

export default Confirmation;