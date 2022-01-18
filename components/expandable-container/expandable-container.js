/* @flow */

import * as React from 'react';
import styled, { css } from 'styled-components';

type Props = {
	children?: React.Node,
	className?: string,
	ExpandButton?: (event: {[string]: mixed}) => React.Node,
	truncateLines?: number,
	onClick?: () => void
};

const TruncatedContainer = styled.div`
	display: inherit;
	max-height: ${props => !props.isExpanded ? `${props.truncateLines * (16 * 1.7)}px` : '100%'};
	overflow: ${props => !props.isExpanded ? 'hidden' : 'visible'};
`;

const PostCutOff = styled.div`
	position: relative;
	overflow: ${props => !props.isExpanded ? 'hidden' : 'visible'};
`;

const CutOff = styled.div`
	${props => !props.disabled && css`
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 200px;
		z-index: 15;
		background: linear-gradient(to bottom, #fff0 0, #fff 80%);
		display: flex;
		align-items: flex-end;

		> * {
			flex: 1;
		}
	`}
`;

function ExpandableContainer(props: Props) {
	const { ExpandButton, children } = props;
	const [isExpanded, expand] = React.useState(false);
	const sendGa = (event: Array<string>) => event && global.ga('send', 'event', ...event);
	const onClick = () => {
		expand(true);
		sendGa(['Permalink page click', 'Expand Truncated Post']);
	};
	return (
		<PostCutOff isExpanded={isExpanded}>
			<TruncatedContainer truncateLines={props.truncateLines} isExpanded={isExpanded}>
				{children}
			</TruncatedContainer>
			<CutOff disabled={isExpanded}>
				{!isExpanded && ExpandButton && <ExpandButton onClick={onClick} />}
			</CutOff>
		</PostCutOff>
	);
}

export default ExpandableContainer;
