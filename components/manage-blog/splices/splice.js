/* @flow */

import * as React from 'react';
import styled from 'styled-components';

import BlogAvatar from '../../blog-avatar';
import Theme, { matchBlogGroupToTheme } from '../../../components/theme';
import {
	Headline,
	MultipleAuthorsStatic,
	MetaTime
} from '../../post-elements';
import { showByline } from '../../post-elements/multiple-authors-static';
import Link, { Anchor } from '../../elements/link';
import { SimpleHeadline } from '../../post-elements/headline/headline';
import { MultipleAuthorsStaticElement } from '../../post-elements/multiple-authors-static';
import media from '../../../style-utils/media';
import createTranslate from '../../translator';
import translations from './translations';
import { StreamPostClick } from '../../stream/analytics';
import { PlainText } from '../article-card/ArticleCard';

import type { Locale } from 'kinja-magma/models/Locale';
import type Blog from 'kinja-magma/models/Blog';
import type Post from 'kinja-magma/models/Post';
import type { PageType } from 'kinja-magma/models/PageType';


type Props = {
	blog: ?Blog,
	hideAuthors?: boolean,
	index: number,
	locale: Locale,
	pageType: PageType,
	post: Post,
	timezone: string
}


const PostInfoContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;

	${SimpleHeadline} {
		margin: 0;
		text-align: left;
		font-size: 24px;
		font-weight: bold;
		line-height: 32px;
	}

	${Anchor}:hover {
		text-decoration-color: ${props => props.theme.color.black};
	}
`;
const MetaInfoContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;

	/* select the last MultipleAuthorsStaticElement */
	div:last-of-type {
		margin-right: 8px;
	}

	${MultipleAuthorsStaticElement} * {
		color: ${props => props.theme.color.black};
	}
`;

const MetaTimeContainer = styled.span`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	font-size: 14px;
	color: ${props => props.theme.color.gray};
`;

const Container = styled.div`
	display: flex;
	padding: 10px 20px 10px 10px;
	border: 2px solid ${props => props.theme.color.logo};

	> svg {
		flex-shrink: 0;
		align-self: center;
		margin-right: 32px;
	}

	${media.smallOnly`
		flex-direction: column;

		> svg {
			margin: 12px 0;
		}

		${MetaInfoContainer} {
			margin-top: 12px;
			flex-wrap: wrap;
		}

		${MetaTimeContainer} {
			width: 100%;
		}
	`}
`;

const BlogAvatarWrapper = styled.div`
	display: flex;
	justify-content: center;
	height: 60px;
	margin-right: 10px;
`;

const ImageOnly = styled(PlainText)`
	font-size: 19px;
	line-height: 24px;
	font-style: italic;
`;

const SplicedWrapper = styled.span`
	line-height: 17px;
`;


const Splice = (props: Props) => {
	const { blog, index, locale, hideAuthors, pageType, post, timezone } = props;
	const { authors, permalinkHost, plainTextExcerpt, repost, securePermalink } = post;
	const headline = permalinkHost && permalinkHost.includes('kinjaroundup') ? 'Kinja Roundup' : post.formattedHeadline;

	const localeObject = locale ? { locale } : null;
	const isScheduled = post.status === 'SCHEDULED';

	const translate = createTranslate(translations, locale);
	const splicedText = !isScheduled ? <SplicedWrapper>{translate('Spliced')}:&nbsp;</SplicedWrapper> : '';
	const imageOnlyPostText = translate('Image Only Post');

	const blogGroup = blog && blog.properties && blog.properties.blogGroup || '';

	const getTitle = () => {
		if (headline) {
			return <Headline>{headline}</Headline>;
		} else if (plainTextExcerpt) {
			return <PlainText lines={2}>{plainTextExcerpt}</PlainText>;
		} else {
			return <ImageOnly>{imageOnlyPostText}</ImageOnly>;
		}
	};

	// TODO: need to fix multiple authors event index
	return (
		<Theme blog={blog ? blog.blogTheme : 'default'}>
			<Container>
				<BlogAvatarWrapper>
					<BlogAvatar
						name={matchBlogGroupToTheme(blogGroup) === 'default' ? 'kinja' : blogGroup}
						size={60}
						monochrome
					/>
				</BlogAvatarWrapper>
				<PostInfoContainer>
					<Link href={securePermalink}
						events={[StreamPostClick(index, post.securePermalink, pageType)]}
					>
						{getTitle()}
					</Link>
					<MetaInfoContainer>
						{!hideAuthors && post.showByline &&
							<MultipleAuthorsStatic
								index={0}
								authors={authors}
								pageType={pageType}
								postPermalinkRedirect={post.permalinkRedirect}
								postIsDeals={post.isDeals}
								byline={showByline(post.byline, post.showByline) ? post.byline : undefined}
							/>
						}
						{repost && repost.repostTimeMillis &&
							<MetaTimeContainer>
								{splicedText}<MetaTime
									index={0}
									isDeals={post.isDeals}
									isScheduled={isScheduled}
									millis={repost.repostTimeMillis}
									pageType={pageType}
									permalink={securePermalink}
									postId={post.id}
									timezone={timezone}
									{...localeObject} />
							</MetaTimeContainer>
						}
					</MetaInfoContainer>
				</PostInfoContainer>
			</Container>
		</Theme>
	);
};

Splice.defaultProps =  {
	locale: 'en-US',
	pageType: 'manageblog'
};

export default Splice;
