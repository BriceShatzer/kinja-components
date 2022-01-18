// @flow

import styled from 'styled-components';
import { gridValue } from '../grid-utils';
import media from 'kinja-components/style-utils/media';
import { PermalinkPostWrapper } from 'kinja-components/components/post-elements/permalink-post/permalink-post';

const FeaturedContentContainer = styled.div`
	width: 100%;
	max-width: ${props => props.withStandardGrid ? gridValue.small('6c') : props.theme.featuredContentWidth};
	
	${media.mediumOnly`
		max-width: ${props => props.withStandardGrid ? gridValue.medium('6c') : props.theme.featuredContentWidth};
	`}

	${media.largeOnly`
		max-width: ${props => props.withStandardGrid ? gridValue.large('8c') : props.theme.featuredContentWidth};
	`}

	${media.xlargeOnly`
		max-width: ${props => props.withStandardGrid ? gridValue.xlarge('10c') : props.theme.featuredContentWidth};
	`}

	${media.xxlargeUp`
		max-width: ${props => props.withStandardGrid ? gridValue.xxlarge('10c') : props.theme.featuredContentWidth};
	`}

	margin: auto;
	padding: 0 ${props => props.withStandardGrid ? '' : props.theme.columnPadding};

	${PermalinkPostWrapper} {

		${media.xlargeOnly`
			max-width: ${props => props.withStandardGrid ? gridValue.xlarge('10c') : props.theme.featuredContentWidth};
		`}

		${media.xxlargeUp`
			max-width: ${props => props.withStandardGrid ? gridValue.xxlarge('10c') : props.theme.featuredContentWidth};
		`}
	}
`;

export default FeaturedContentContainer;
