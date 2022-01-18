// @flow

import * as React from 'react';
import styled from 'styled-components';
import Modal from '../../modal';
import { Container as ModalContainer }  from '../../modal/modal';
import { ChildrenWrapper } from '../../modal/modal';
import ErrorFilled from 'kinja-components/components/icon19/ErrorFilled';
import ArrowLeft from 'kinja-components/components/icon19/ArrowLeft';
import ArrowRight from 'kinja-components/components/icon19/ArrowRight';
import Checkmark from 'kinja-components/components/icon19/Checkmark';
import Close from 'kinja-components/components/icon19/Close';
import Button19 from 'kinja-components/components/button19';
import UserList from './UserList';
import { gridValue } from 'kinja-components/components/grid-utils';
import media from 'kinja-components/style-utils/media';

import { type ConcurrentEditWarningType, type UserWithTimestamp } from '../utils/shouldShowWarning';

type Props = {
	preloaded?: boolean,
	type: ConcurrentEditWarningType,
	isOpen: boolean,
	editors: Array<UserWithTimestamp>,
	blogName: string,
	onSave: () => void,
	onCancel: () => void,
	onCancelEditing?: () => void
}

const WarningIcon = styled(ErrorFilled)`
	color: ${props => props.theme.color.error};

	svg {
		width: calc(${props => props.theme.typography.utility.lineHeights.xlarge} * 2);
		height: calc(${props => props.theme.typography.utility.lineHeights.xlarge} * 2);
	}
`;

const CloseIcon = styled(Close)`
	position: absolute;
	top: 0;
	right: 0;
	cursor: pointer;
`;

const Paragraph = styled.p`
	margin: 1rem 0;
	font-size: ${props => props.theme.typography.utility.fontSizes.medium};
	line-height: ${props => props.theme.typography.utility.lineHeights.medium};
	color: ${props => props.theme.color.darkgray};
	text-align: center;
`;

const WarningFooter = styled.footer`
	display: flex;
	justify-content: space-between;
	width: 100%;
	margin-top: 1rem;
	border-top: 1px solid ${props => props.theme.color.midgray};
	padding-top: 2rem;
`;

const Container = styled.div`
	${ChildrenWrapper} {
		width: 100%;
	}

	${ModalContainer} {
		${media.largeOnly`
			width: ${gridValue.large('6c2g')};
			padding: ${gridValue.large('1g')};
		`}
		${media.xlargeOnly`
			width: ${gridValue.xlarge('6c2g')};
			padding: ${gridValue.xlarge('1g')};
		`}
		${media.xxlargeUp`
			width: ${gridValue.xxlarge('6c2g')};
			padding: ${gridValue.xxlarge('1g')};
		`}
	}
`;

const ContainerInner = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
	width: 100%;
	align-items: center;

	h1 {
		margin-bottom: 0;
	}
`;

const messages = {
	ConcurrentEditingWarning: {
		leading: blogName => `Someone is already editing ${blogName}'s homepage.`,
		trailing: [
			'If they save after you do, they might overwrite your changes.',
			<br key="br" />,
			'If possible, talk to them and ask them to exit the editor.'
		],
		userListTitle: 'Users editing the homepage'
	},
	OverwriteWarning: {
		// eslint-disable-next-line no-unused-vars
		leading: blogName => 'The homepage was changed since you started editing.',
		trailing: [
			'If you save now, you will overwrite those changes.',
			<br key="br" />,
			'Cancel and restart editing to avoid this.'
		],
		userListTitle: 'Homepage last saved by'
	}
};

export default function ConcurrentEditingWarning(props: Props) {
	const { preloaded,
		isOpen,
		blogName,
		type,
		editors,
		onSave,
		onCancel,
		onCancelEditing
	} = props;

	return (
		<Container>
			<Modal
				isOpen={isOpen}
				transparent={!preloaded}
				showBackground={preloaded}
				regular={true}>

				<ContainerInner>
					<CloseIcon onClick={props.onCancel} />
					<WarningIcon />
					{preloaded && <h1>Heads up!</h1>}
					<Paragraph>{messages[type].leading(blogName)}</Paragraph>
					<UserList
						type={type}
						users={type === 'OverwriteWarning' ? editors.filter(e => e.updatedBy) : editors}
						title={messages[type].userListTitle} />
					<Paragraph>{messages[type].trailing}</Paragraph>
					<WarningFooter>
						{preloaded ? <Button19
							onClick={onCancelEditing}
							label={'Cancel editing'}
							icon={<ArrowLeft />}
							labelPosition="after"
						/> : <Button19
							onClick={onCancel}
							label={'Cancel'}
							icon={<ArrowLeft />}
							labelPosition="after" />}
						{preloaded ? <Button19
							onClick={onCancel}
							label="Proceed anyway"
							variant="secondary"
							labelPosition="after"
							icon={<ArrowRight />}
						/> : <Button19
							onClick={onSave}
							label="Save homepage anyway"
							variant="secondary"
							labelPosition="after"
							icon={<Checkmark />}
						/>}
					</WarningFooter>
				</ContainerInner>

			</Modal>
		</Container>
	);
}
