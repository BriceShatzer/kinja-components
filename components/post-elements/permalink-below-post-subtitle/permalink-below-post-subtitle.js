// @flow

import styled from 'styled-components';

import media from '../../../style-utils/media';

const PermalinkBelowPostSubtitle = styled.h4`
	font-size: 16px;
	line-height: 21px;
	margin-bottom: 1rem;
	text-transform: uppercase;

	${media.smallOnly`
		color: ${props => props.theme.color.gray};
	`}
`;

export default PermalinkBelowPostSubtitle;
