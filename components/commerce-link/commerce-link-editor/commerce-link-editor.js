// @flow

import React from 'react';
import styled from 'styled-components';

import { EnsureDefaultTheme } from '../../theme';
import Textfield18 from 'kinja-components/components/form/textfield18';
import Button from 'kinja-components/components/button19';
import Close from '../../icon19/Close';
import Checkmark from '../../icon19/Checkmark';

type CommerceLinkData = {
	url: string,
	text: string
}

type Props = {
	initialValues?: CommerceLinkData,
	onCancel: () => void,
	onSubmit: (data: CommerceLinkData, boolean) => void
}

const ButtonWrapper = styled.div`
	display: flex;
	justify-content: space-between;
`;

export default function CommerceLinkEditor(props: Props) {
	const { onSubmit, onCancel, initialValues } = props;
	const [showUrlError, setShowUrlError] = React.useState(false);
	const [showTextError, setShowTextError] = React.useState(false);
	const [url, setUrl] = React.useState(initialValues ? initialValues.url : '');
	const [text, setText] = React.useState(initialValues ? initialValues.text : '');
	const isValidUrl = url && url.match('^(mailto:|https?:|ftp:|#|/)');

	const setUrlCallback = React.useCallback(url => {
		setShowUrlError(false);
		setUrl(url);
	}, []);
	const setLabelCallback = React.useCallback(text => {
		setShowTextError(false);
		setText(text);
	}, []);
	const onSubmitCallback = React.useCallback(() => {
		if (url && isValidUrl && text) {
			onSubmit({ url, text }, Boolean(initialValues));
			return;
		}

		if (!url || !isValidUrl) {
			setShowUrlError(true);
		}

		if (!text) {
			setShowTextError(true);
		}
	}, [onSubmit, url, text, isValidUrl, initialValues]);

	let urlError = '';
	if (showUrlError && !isValidUrl) {
		urlError = 'Invalid url.';
	} else if (showUrlError) {
		urlError = 'Please add a url.';
	}

	return (
		<EnsureDefaultTheme>
			<div className="commerce-link-editor">
				<h2>Insert commerce button</h2>
				<Textfield18
					label="Button URL"
					error={urlError}
					onChange={setUrlCallback}
					name="url"
					value={url}
				/>
				<Textfield18
					label="Button text"
					error={showTextError && text === '' ? 'Please add a text.' : ''}
					onChange={setLabelCallback}
					name="label"
					value={text}
				/>
				<ButtonWrapper>
					<Button
						variant="secondary"
						label="Cancel"
						icon={<Close />}
						labelPosition="after"
						onClick={onCancel}
						type="button"
					/>
					<Button
						label={initialValues ? 'Save' : 'Insert'}
						icon={<Checkmark />}
						labelPosition="after"
						onClick={onSubmitCallback}
						type="submit"
					/>
				</ButtonWrapper>
			</div>
		</EnsureDefaultTheme>
	);
}