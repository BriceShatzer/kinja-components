// @flow

import * as React from 'react';
import styled from 'styled-components';

import { LazyResponsiveImage } from 'kinja-components/components/elements/image';
import { imageFormatFromString } from 'postbody/Image';
import truncate from 'html-truncate';
import { EnsureDefaultTheme } from 'kinja-components/components/theme';
import createTranslate from '../../translator';
import translations from './translations';
import { withKinjaMeta, type KinjaMetaInjectedProps } from '../../hoc/context';
import {
	CommerceInset,
	NewCommerceInsetHeader,
	ContentWrapper,
	CommerceInsetMisc,
	CommerceInsetDiscLight
} from './link-preview-commerce';
import type Image from 'kinja-magma/models/Image';


/**
 * Styled components
 */
const Wrapper = styled.aside``;

const CommerceRow = styled.div`
	display: flex;
	width: 100%;
	align-items: flex-start;
`;

const CommerceColumn = styled.div`
	width: 66%;
`;

const PostInset = styled(CommerceInset)`
	padding: 10px;
	margin: 2rem auto;
`;

const LazyImageWrapper = styled.div`
	position: relative;
	width: 33%;
	min-width: 100px;
	margin-right: 0.5rem;

	&& img,
	&& amp-img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
`;

type Props = {
	url: string,
	headline: string,
	image: ?Image
}

/**
 * Component that renders a link preview inset for an amazon or similar third party vendor's url
 */
function CommercePostPreview(props: Props & KinjaMetaInjectedProps & {
	showDetails?: boolean // Whether to show details like image, CTA etc. True in the case of CommerceCondensed style
}) {
	const {
		url,
		headline,
		image,
		kinjaMeta
	} = props;

	const gaTrackingLabel = `${kinjaMeta.permalinkUrl || ''}`;

	const gaTrackingData = ()=> JSON.stringify(
		[
			['Mobile Commerce Inset Post Clicks', 'Mobile commerce inset - post click', gaTrackingLabel],
			['ns:unique', 'Mobile Commerce Inset Post Clicks', 'Mobile commerce inset - post click', gaTrackingLabel]
		]
	);

	// const image: Image | null = preparedLink.images.length ? preparedLink.images[0] : null;
	const translate = createTranslate(translations, kinjaMeta.language);

	return (
		<EnsureDefaultTheme>
			<Wrapper>
				<PostInset>
					<CommerceRow>
						{/* Image */}
						{image && <LazyImageWrapper className="js_lazy-image">
							<LazyResponsiveImage
								id={image.id}
								width={image.width}
								height={image.height * 1.5}
								format={imageFormatFromString(image.format || '')}
								sizes="320px"
								transform="CommerceInset"
							/>
						</LazyImageWrapper>
						}
						{/* Content */}
						<CommerceColumn>
							<ContentWrapper>
								<NewCommerceInsetHeader nomargin>
									<h2 dangerouslySetInnerHTML={{__html: truncate(headline, 65, { truncateLastWord: false })}}></h2>
								</NewCommerceInsetHeader>
							</ContentWrapper>
							<CommerceInsetMisc>
								<CommerceInsetDiscLight>
									<a href={url} data-ga={gaTrackingData()}>{translate('Read on The Inventory')}</a>
								</CommerceInsetDiscLight>
							</CommerceInsetMisc>
						</CommerceColumn>
					</CommerceRow>
				</PostInset>
			</Wrapper>
		</EnsureDefaultTheme>
	);
}

export default withKinjaMeta(CommercePostPreview);
