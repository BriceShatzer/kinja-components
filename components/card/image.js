/* @flow */

import * as React from 'react';
import { LazyResponsiveImage } from '../elements/image';
import type { ImageFormat } from 'postbody/Image';
import Caption from '../elements/caption';
import Attribution from './attribution';
import Permalink from './permalink';

import type { ImageAttributionType } from 'postbody/Image';

type Props = {
	id?: string,
	format?: ImageFormat,
	width?: number,
	sizes?: string,
	attributionData?: Array<ImageAttributionType>,
	caption?: string,
	isEditor?: boolean,
	captionOnBlur?: string => mixed,
	captionOnClick?: string => mixed,
	croppedImage?: boolean,
	relative?: boolean,
	noAnimate?: boolean,
	withAttribution?: boolean,
	withSrcset?: boolean,
	href?: string,
	isEditMode?: boolean,
	ga?: string,
	gaMobile?: string,
	noLink?: boolean
};

const Image = (props: Props) => {
	const {
		id,
		format,
		width,
		sizes,
		attributionData,
		caption,
		captionOnBlur,
		captionOnClick,
		croppedImage,
		relative = false,
		isEditor = false,
		noAnimate,
		withAttribution,
		href,
		title,
		isEditMode,
		ga,
		gaMobile,
		openInNewTab,
		noLink
	} = props || {};

	const target = openInNewTab ? '_blank' : undefined;

	const responsiveOrRegularImage = <LazyResponsiveImage
		className="image__img"
		key={`img-${id}`}
		id={id}
		format={format}
		width={width}
		sizes={sizes}
		croppedImage={croppedImage}
		relative={relative}
		noAnimate={noAnimate}
		noLazy
	/>;

	const inner = (
		<React.Fragment>
			{responsiveOrRegularImage}
			{caption ? (
				<Caption isEditable={isEditor} dangerouslySetInnerHTML={{ __html: caption }} onBlur={captionOnBlur} onClick={captionOnClick} />
			) : null}
			{withAttribution ? <Attribution isEditor={isEditor} attributions={attributionData} /> : null}
		</React.Fragment>
	);

	return (
		<div className="image-container-wrapper">
			<div className="image-container">
				{noLink ? inner : <Permalink href={href} target={target} title={title} unlink={isEditMode} ga={ga} gaMobile={gaMobile}>{inner}</Permalink>}
			</div>
		</div>
	);
};

export default Image;
