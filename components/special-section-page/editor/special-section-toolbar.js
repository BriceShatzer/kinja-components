/* @flow */
import * as React from 'react';
import FixedToolbar from '../../elements/fixed-toolbar';
import Button from '../../buttons/Button';

// ICONS
import CloseIcon from '../../icon19/Close';
import GearIcon from '../../icon19/Gear';
import CheckmarkIcon from '../../icon19/Checkmark';

import { ButtonWithLeftMargin } from './special-section-publishing-tools';

type Props = { handleSave: (props: { redirect?: boolean }) => Promise<*>, didError?: boolean, handleCancel: () => void, handleSettings: () => void};

const SpecialSectionToolbar = ({ handleSave, didError, handleCancel, handleSettings }: Props) => (
	<FixedToolbar>
		<Button
			label="Cancel"
			icon={<CloseIcon />}
			onClick={handleCancel}
			labelPosition="after"
			weight="secondary"
		/>
		<ButtonWithLeftMargin
			label="Settings"
			icon={<GearIcon />}
			onClick={handleSettings}
			labelPosition="after"
			weight="secondary"
		/>
		<ButtonWithLeftMargin
			label="Save"
			onClick={() => {
				// calling handleSave with a false flag to defeat redirect behavior
				handleSave({ redirect: false });
			}}
			variant={didError ? 'error' : undefined}
		/>
		<ButtonWithLeftMargin
			label="Save and Preview"
			icon={<CheckmarkIcon />}
			onClick={() => {
				// calling handleSave with a true flag to refresh the page
				handleSave({ redirect: true });
			}}
			variant={didError ? 'error' : undefined}
			labelPosition="after"
		/>
	</FixedToolbar>
);

export default SpecialSectionToolbar;
