// @flow

import * as React from 'react';
import cx from 'classnames';
import styled from 'styled-components';
import { EnsureDefaultTheme } from '../theme';

import InlineNodes from '../postbody/inline-node';

import type { InlineNode } from 'postbody/InlineNode';
type Props = {
	editable?: boolean,
	caption: Array<InlineNode>,
};

const Caption = styled.figcaption`
	margin-top: 0.5rem;
	font-family: ${props => props.theme.typography.utility.fontFamily};
	font-size: 15px;
	line-height: 21px;
	color: ${props => props.theme.color.gray};
	text-align: left;

	figcaption + & {
		margin-top: 0;
	}
`;

const CaptionContainer = (props: Props) => {
	const { caption, editable } = props;
	const contentEditable = editable ? { contentEditable: true} : {};

	return (
		<EnsureDefaultTheme>
			<Caption
				className={cx('caption', { placeholder: !caption.length && editable, js_caption: editable})}
				data-placeholder={editable ? 'Caption (optional)' : undefined}
				{...contentEditable}
				suppressContentEditableWarning={editable}
			>
				<InlineNodes nodes={caption} renderer={editable ? 'editor' : 'web'} />
			</Caption>
		</EnsureDefaultTheme>
	);
};

export default CaptionContainer;
