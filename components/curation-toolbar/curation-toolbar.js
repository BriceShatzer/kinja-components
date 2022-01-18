/* @flow */

import * as React from 'react';
import Button19 from '../button19';
import PinIcon from '../icon19/Pin';
import CloseIcon from '../icon19/Close';
import styled from 'styled-components';
import {controlsClassName} from '../curation';

type OpenButtonProps = {
	onClick: (hasPermission?: boolean) => void | mixed
}

export const OpenButton = (props: OpenButtonProps) => (
	<Button19 data-openbutton={true}
		icon={<PinIcon />}
		onClick={props.onClick}
		variant='secondary'
	/>
);

const CloseButton = (props: { onClick: () => mixed }) => (
	<Button19 data-closebutton={true}
		icon={<CloseIcon />}
		onClick={props.onClick}
		variant='secondary'
	/>
);

const SaveButton = (props: { onClick: () => mixed }) => (
	<Button19 data-savebutton={true}
		label="Save"
		onClick={props.onClick}

	/>
);

type Props = {
	isEditMode: boolean,
	toggleHandler: () => void
}

export const CurationToolbarWrapper = styled.div`
	button {
		display: inline-flex;
		height: 33px;
		margin: 0 0 0 5px;
		vertical-align: middle;
		line-height: 33px;

		&[data-openbutton=true],
		&[data-closebutton=true] {
			background-color: #fff;
		}

		div {
			font-weight: 200;
			font-size: 13px;
		}
	}

	button + button {
		margin-top: 0;
	}
`;

class CurationToolbar extends React.Component<Props> {
	render() {
		const { isEditMode, toggleHandler } = this.props;

		return (
			<CurationToolbarWrapper className={controlsClassName}>
				{isEditMode ? (
					<React.Fragment>
						<SaveButton  onClick={toggleHandler} />
						<CloseButton onClick={toggleHandler} />
					</React.Fragment>
				) : (
					<OpenButton onClick={toggleHandler} />
				)}
			</CurationToolbarWrapper>
		);
	}
}

export default CurationToolbar;
