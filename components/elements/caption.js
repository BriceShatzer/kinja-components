// @flow

import * as React from 'react';
import classnames from 'classnames';
import styled from 'styled-components';
import { EnsureDefaultTheme } from '../theme';

const GrayFig = styled.figcaption`
	color: ${props => props.theme.color.gray};
`;

const Caption = ({ dangerouslySetInnerHTML, isEditable, onBlur, onClick, children }: {
	dangerouslySetInnerHTML: {
		__html: string
	},
	isEditable: boolean,
	onBlur: (event: SyntheticMouseEvent<HTMLElement>) => void,
	onClick: (event: SyntheticMouseEvent<HTMLElement>) => void,
	children: React.Node
}) => {
	const placeholderText = dangerouslySetInnerHTML && dangerouslySetInnerHTML.__html === 'Include an image caption' ? 'placeholder' : '';

	if (dangerouslySetInnerHTML) {
		return (
			<EnsureDefaultTheme>
				<GrayFig
					className={classnames('component-caption', placeholderText)}
					contentEditable={isEditable}
					dangerouslySetInnerHTML={dangerouslySetInnerHTML}
					onBlur={event => onBlur(event.target.innerHTML)}
					onClick={event => onClick(event)}
				/>
			</EnsureDefaultTheme>
		);
	}

	return (
		<EnsureDefaultTheme>
			<GrayFig
				className={classnames('component-caption', placeholderText)}
				contentEditable={isEditable}
				onBlur={event => onBlur(event.target.innerHTML)}
				onClick={event => onClick(event)}
			>
				{children}
			</GrayFig>
		</EnsureDefaultTheme>
	);
};

export default Caption;
