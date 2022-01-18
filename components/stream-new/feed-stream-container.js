// @flow
import styled from 'styled-components';
import media from '../../style-utils/media';

export const FeedStreamContainer = styled.div`

	/*
		This exists and is toggled by a prop because PostTools on dekstop
		are positioned *gasp* outside the boundaries of a StoryCard!
		This padding is needed only when PostTools are rendered.
	*/
	${media.smallOnly`
		padding: ${props => props.isV2 && '0 auto'};
	`}

	${media.mediumUp`
		padding-right: ${props => (props.padded && !props.isV2) && '82px'};
		padding: ${props => props.isV2 && '0 0 0 66px'};
	`}

	${media.xlargeUp`
		padding: ${props => props.isV2 && '0 18px 0 66px'};
	`}

	/*
		Stream item padding and borders.
	*/
	> article {
		padding-bottom: 30px;
		&:not(:first-of-type) {
			padding-top: 30px;
		}
		&:not(:last-of-type) {
			border-bottom: 1px solid ${props => props.theme.color.lightgray};
		}
	}

	> *:first-child {
		padding-top: 0;
	}

	.instream-native-video--frontpage {
		padding-top: 30px;
		padding-bottom: 30px;
		border-bottom: 1px solid ${props => props.theme.color.lightgray};
	}

	.ad-container {
		padding-top: 30px;
		padding-bottom: 30px;
		border-bottom: 1px solid ${props => props.theme.color.lightgray};
	}

	.inline-ad-container {
		border-bottom: 1px solid ${props => props.theme.color.lightgray};
		padding: 0;
	}

	.ad-mobile {
		padding: 20px 0;
		margin: 0;
	}

	/*
	 * Rare case if we have an empty block in the stream, we should hide it
	*/
	> *:empty {
		display: none;
	}
`;
