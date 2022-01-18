// @flow

import React from 'react';
import styled from 'styled-components';

import ConversationTool from '../conversation-tool';
import Toggle from 'kinja-components/components/form/toggle';
import Button19 from 'kinja-components/components/button19';
import QAndAControlsModal from './qanda-controls-modal';
import { UserAvatar } from 'kinja-components/components/user-avatar';
import SimpleImage from 'kinja-magma/models/SimpleImage';
import Close from 'kinja-components/components/icon19/Close';
import ConverstationButton from 'kinja-components/components/permalink/conversation-button';
import createTranslate from 'kinja-components/components/translator';
import translations from '../translations';

import type DiscussionSettings, { DiscussionStatus } from 'kinja-magma/models/DiscussionSettings';
import type { Locale } from 'kinja-magma/models/Locale';
import type { Participant } from 'kinja-magma/models/DiscussionSettings';
import type { Props as AvatarUploaderProps } from 'kinja-components/components/avatar-uploader/avatar-uploader';
import type { SubmitType } from './qanda-controls-modal';


const RemoveAvatar = styled.div`
	position: absolute;
	top: 0;
	left: 32px;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 20px;
	height: 20px;
	background-color: ${({ theme }) => theme.color.white};
	border: 1px solid ${({ theme }) => theme.color.gray};
	border-radius: 20px;
	transition: all 0.3s;
	cursor: pointer;

	svg {
		width: 12px;
	}

	:hover {
		border-color: ${({ theme }) => theme.color.darksmoke};
	}
`;

const AvatarImageWrapper = styled.div`
	border-radius: 50%;
	overflow: hidden;
`;

const AvatarWrapper = styled.div`
	position: relative;
	width: 44px;
	height: 44px;
`;

const NameWrapper = styled.div`
	width: 100%;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
`;

const ParticipantItem = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	max-width: 100px;
	margin: 0 10px;
`;

const ParticipantContainer = styled.div`
	display: flex;
	justify-content: center;
	padding: 20px 0 0;
`;

const StyledButton = styled(Button19)`
	margin: 30px auto;
`;

const ConverstationButtonContainer = styled.div`
	max-width: 636px;
	margin: 0 auto;
`;


type QAndAControlsStatus = 'Disabled' | 'Queued' | 'In Progress' | 'Closed';
type SortType = 'asc' | 'desc';
type Ref = {
	current: null | HTMLDivElement
};

type Props = {
	avatarUploaderProps: AvatarUploaderProps,
	discussionSetting: DiscussionSettings,
	locale: Locale,
	getParticipants: () => Promise<Array<Participant>>,
	onModalSubmit: SubmitType => Promise<*>,
	onChange: (status: DiscussionStatus, sort: SortType) => void,
	onConversationButtonClick: () => void,
	onReloadClick: () => void,
	onRevokeInvite: string => void,
	participants?: Array<Participant>,
	shouldScroll?: boolean
}

type DefaultProps = {
	locale: Locale
}

type State = {
	hasStatusChanged: boolean,
	isModalOpen: boolean,
	participants: Array<Participant>,
	sort: SortType,
	status: QAndAControlsStatus
}

export default class QAndAControls extends React.Component<Props, State> {
	containerRef: Ref = React.createRef();
	static defaultProps: DefaultProps = {
		locale: 'en-US'
	}

	state = {
		hasStatusChanged: false,
		isModalOpen: false,
		participants: this.props.participants || [],
		sort: this.props.discussionSetting.sort,
		status: this.props.discussionSetting.mode === 'QA' ? this.getQAndAStatus(this.props.discussionSetting.status) : 'Disabled'
	};

	componentDidMount() {
		if (window && this.props.shouldScroll && this.containerRef.current) {
			window.scrollTo({ top: this.containerRef.current.offsetTop - 300, behavior: 'smooth' });
		}
	}

	getNewParticipants = () => {
		this.props.getParticipants().then(participants => {
			this.setState({ participants });
		});
	}

	removeParticipant = (participant: SubmitType | Participant, participantIndex: number) => {
		this.setState({ participants: this.state.participants.filter((p, index) => index !== participantIndex) },
			() => this.props.onRevokeInvite(participant.screenName));
	}

	onButtonClick = () => {
		this.setState({ isModalOpen: true });
	}

	onModalClose = () => {
		this.setState({ isModalOpen: false });
	}

	onStatusChange = (status: QAndAControlsStatus) => {
		this.setState({ hasStatusChanged: true, status }, () => {
			this.props.onChange(this.getDiscussionStatus(status), this.state.sort);
		});
	}

	onStaffCanAnswerChange = (isToggleOn: boolean) => {
		this.setState({ hasStatusChanged: true, sort: isToggleOn ? 'asc' : 'desc' }, () => {
			this.props.onChange(this.getDiscussionStatus(this.state.status), this.state.sort);
		});
	}

	getQAndAStatus(status: DiscussionStatus): QAndAControlsStatus {
		switch (status) {
			case 'InProgress':
				return 'In Progress';
			case 'Completed':
				return 'Closed';
			default:
				return status;
		}
	}

	getDiscussionStatus(status: QAndAControlsStatus): DiscussionStatus {
		switch (status) {
			case 'In Progress':
				return 'InProgress';
			case 'Closed':
				return 'Completed';
			default:
				return status;
		}
	}

	onReloadClick = () => {
		this.props.onReloadClick();
	}

	render() {
		const { avatarUploaderProps, locale, onConversationButtonClick } = this.props;
		const { hasStatusChanged, isModalOpen, participants, sort, status } = this.state;
		const translate = createTranslate(translations, locale);
		const statuses: Array<QAndAControlsStatus> = ['Disabled', 'Queued', 'In Progress', 'Closed'];
		const isQAndAActive = status === 'Queued' || status === 'In Progress';

		const footerContent = isQAndAActive ? (
			<React.Fragment>
				<span>{translate('Staff can answer questions')}</span>
				<Toggle checked={sort === 'asc'}
					name="Staff Can Answer Toggle"
					onChange={this.onStaffCanAnswerChange}
					small />
			</React.Fragment>
		) : null;

		return (
			<div ref={this.containerRef}>
				<ConversationTool activeStatus={status}
					footerContent={footerContent}
					hasStatusChanged={hasStatusChanged}
					locale="en-US"
					onChange={this.onStatusChange}
					onReloadClick={this.onReloadClick}
					statuses={statuses}
					translatedStatuses={statuses.map(status => translate(status))}
					title={translate('The Conversation is now')}
				>
					{participants && participants.length ? (
						<ParticipantContainer>
							{participants.map((participant, index) => {
								const { avatar } = participant;
								const avatarImage = new SimpleImage({
									id: avatar && avatar.id ? avatar.id : '17jcxnuqmm7depng',
									format: avatar && avatar.format ? avatar.format  : 'png'
								});

								return (
									<ParticipantItem key={participant.screenName}>
										<AvatarWrapper>
											<AvatarImageWrapper>
												<UserAvatar image={avatarImage}
													size="44px"
													square={true}
													transform="AvatarSmallAuto"
												/>
											</AvatarImageWrapper>
											<RemoveAvatar onClick={() => this.removeParticipant(participant, index)}><Close /></RemoveAvatar>
										</AvatarWrapper>
										<NameWrapper title={participant.screenName}>{participant.screenName}</NameWrapper>
									</ParticipantItem>
								);
							})}
						</ParticipantContainer>
					) : null}
					{isQAndAActive && (
						<StyledButton label={translate('Invite Participant')} onClick={this.onButtonClick} />
					)}
				</ConversationTool>

				<ConverstationButtonContainer>
					<ConverstationButton label={translate('Ask a question')} onClick={onConversationButtonClick} />
				</ConverstationButtonContainer>

				<QAndAControlsModal getNewParticipants={this.getNewParticipants}
					avatarUploaderProps={avatarUploaderProps}
					isOpen={isModalOpen}
					onClose={this.onModalClose}
					onSubmit={this.props.onModalSubmit}
				/>
			</div>
		);
	}
}