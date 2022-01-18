// @flow

import * as React from 'react';
import cx from 'classnames';
import styled from 'styled-components';

import ImageAttribution from '../image-attribution';

import type { ImageAttributionType } from 'postbody/Image';
import type { Locale } from 'kinja-magma/models/Locale';

type Props = {
	editable?: boolean,
	hasCaption?: boolean,
	attribution: Array<ImageAttributionType>,
	language?: Locale
}

const Caption = styled.figcaption`
	margin-top: 0.5rem;
	font-family: ${props => props.theme.typography.utility.fontFamily};
	font-size: 15px;
	line-height: 21px;
	color: ${props => props.theme.color.gray};

	figcaption + & {
		margin-top: 0;
	}
`;

const ImageAttributionContainer = (props: Props) => {
	const { attribution, hasCaption, editable, language } = props;
	const AttributionComponent = editable ? 'div' : 'figcaption';

	return (
		<Caption as={AttributionComponent} className={cx({
			'below-caption': hasCaption, 'no-caption': !hasCaption, 'popup-attribution updated': editable })}>
			<ImageAttribution attributions={attribution} tokenize={editable} language={language}/>
		</Caption>
	);
};

export default ImageAttributionContainer;
