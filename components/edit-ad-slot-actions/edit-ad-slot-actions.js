/* @flow */

import * as React from 'react';
import Button from '../buttons';
import { Saving } from '../elements/loader';
import styled from 'styled-components';
import media from '../../style-utils/media';

// ICONS
import CheckmarkIcon from '../icon19/Checkmark';
import ReloadIcon from '../icon19/Reload';



const MobileIconHider = styled.span`
	${
	media.mediumDown`
		svg {
			display: none;
			visibility: hidden;
		}
		svg[name="reload"] + span {
			margin-left: 0;
		}
	`}
`;

export type EditAdSlotActionsProps = {
	onCancel: () => void,
	onSave: () => Promise<*>,
	onReset: () => void
};

type State = {
	isSaving: boolean
};

export default class EditAdSlotActions extends React.Component<EditAdSlotActionsProps, State> {
	constructor() {
		super();
		this.state = { isSaving: false };
	}

	onSave = () => {
		this.setState(
			() => ({ isSaving: true }),
			() => {
				this.props.onSave().then(() => {
					this.setState(() => ({ isSaving: false }));
				});
			}
		);
	};

	render() {
		const SaveButton = () =>
			this.state.isSaving ? <Saving isSaving /> : <Button label="Save" labelPosition="after" onClick={this.onSave} icon={
				<CheckmarkIcon />
			} margin="0 5px"/>;
		return (
			<React.Fragment>
				<Button weight={'secondary'} label="Cancel" onClick={this.props.onCancel} margin="0 5px"/>
				<MobileIconHider>
					<Button weight={'secondary'} label="Reset" onClick={this.props.onReset} icon={
						<ReloadIcon />
					} labelPosition="after" margin="0 5px"/>
				</MobileIconHider>
				<SaveButton />
			</React.Fragment>
		);
	}
}
