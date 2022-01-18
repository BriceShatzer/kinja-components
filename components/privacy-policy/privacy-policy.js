// @flow

import * as React from 'react';
import styled from 'styled-components';
import media from '../../style-utils/media';

import CloseIcon from '../icon19/Close';

const CloseButton = styled.div`
	position: absolute;
	top: 15px;
	right: 15px;
	z-index: 1;
	cursor: pointer;
`;

const PrivacyContainer = styled.div`
	position: relative;
`;

const Message = styled.div`
	font-size: 16px;
	line-height: 21px;
	margin-bottom: 16px;
	padding: 16px 44px 16px 16px;
	position: relative;
	background-color: #e5e5e5;

	${media.largeUp`
		margin-bottom: 24px;
	`}

	a {
		color: ${p => p.theme.color.primary};
	}
`;

type Props = {
	onClose: () => Promise<?string>
};

type State = {
	hide: boolean
};

class PrivacyPolicy extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			hide: false
		};
	}

	onClose = () => {
		this.props.onClose();
		this.setState({
			hide: true
		});
	}

	render() {
		return (!this.state.hide &&
			<PrivacyContainer>
				<Message>
					We&apos;ve updated our Privacy Policy and our Terms of Service, effective as of December 3, 2019.
					For more information you can view the revised
					Privacy Policy <a target="_blank" rel="noopener noreferrer" href="https://g-omedia.com/privacy-policy/">here</a> and
					Terms of Service <a target="_blank" rel="noopener noreferrer" href="https://g-omedia.com/terms-of-service/">here</a>.
				</Message>
				<CloseButton onClick={this.onClose}>
					<CloseIcon />
				</CloseButton>
			</PrivacyContainer>
		);
	}
}

export default PrivacyPolicy;
