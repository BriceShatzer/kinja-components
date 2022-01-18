// @flow

import * as React from 'react';
import cx from 'classnames';
import ReviewBox, { ReviewBoxWrapper } from '../../review/review-box/ReviewBox';
import { LazyResponsiveImage } from '../../elements/image';
import type { ReviewBoxJSON } from 'postbody/blockNodes/ReviewBox';
import type TypedTagData from 'kinja-magma/models/TypedTagData';
import type StoryType from 'kinja-magma/models/StoryType';
import styled, {css} from 'styled-components';
import media from 'kinja-components/style-utils/media';
import { EnsureDefaultTheme } from 'kinja-components/components/theme';
import {
	withPlatform,
	type PlatformInjectedProps
} from '../../hoc/context';

type Props = {
	// Whether we are inside an editor and should display additional class names
	editable?: boolean,
	categoryData?: ?TypedTagData,
	subcategoryData?: ?TypedTagData,
	storyType?: ?StoryType
}
& PlatformInjectedProps
& $Diff<ReviewBoxJSON, { type: string }>

const ReviewInsetWrapper = styled.aside`
	clear: left;

	${props => props.alignment === 'Center' && css`
		margin-top: 30px;
		margin-bottom: 30px;
	`}

	${props => props.alignment === 'Left' && css`
		${media.smallOnly`
			margin-top: 30px;
			margin-bottom: 30px;
		`}
		
		${media.mediumUp`
			float: left;
			margin-top: 0.5rem;
			margin-right: ${props => props.theme.columnGutter};
			margin-bottom: 2rem;
			${ReviewBoxWrapper} {
				width: 320px;
			}
		`}
	`}

	${props => props.alignment === 'Fullbleed' && css`
		margin-top: 30px;
		margin-bottom: 30px;
		${media.largeUp`
			${ReviewBoxWrapper} {
				max-width: 100%;
			}
		`}
	`}
`;

export function ReviewBoxInset({
	alignment = 'Center',
	categoryData,
	subcategoryData,
	storyType,
	text,
	image,
	score,
	title,
	editable,
	hide,
	platform
}: Props) {
	const reviewImageComponent = image ?
		// $FlowFixMe - props is incompatible with empty ?
		<LazyResponsiveImage
			id={image.id}
			format={image.format}
			width={512}
			height={288}
			croppedImage
			sizes={'(max-width: 520px) 470px, 800px'}
		/>
		: undefined;
	const alignmentClass = `align--${alignment.toLowerCase()}`;

	const blockNodeProps = {
		alignment,
		text,
		image,
		score,
		title,
		hide
	};

	const contentEditable = platform === 'amp' ? {} : { contentEditable: false};

	return (
		<EnsureDefaultTheme>
			<ReviewInsetWrapper
				{...contentEditable}
				className={cx(alignmentClass, 'js_lazy-image', {'reviewbox-inset js_inset': editable})}
				alignment={alignment}
				data-reviewdata={editable && JSON.stringify(blockNodeProps)}
			>
				{!hide && (
					<ReviewBox
						{...blockNodeProps}
						imageComponent={reviewImageComponent}
						categoryData={categoryData}
						subcategoryData={subcategoryData}
						storyType={storyType}
					/>
				)}
			</ReviewInsetWrapper>
		</EnsureDefaultTheme>
	);
}

export default withPlatform(ReviewBoxInset);
