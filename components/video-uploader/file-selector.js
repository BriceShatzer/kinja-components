/* @flow */

import React, { Component } from 'react';
import Button from '../buttons';
import FileField from '../form/filefield';
import styled from 'styled-components';

type Props = {
	onCancel: () => void,
	onSubmit: (video: File) => void,
	title: string,
	file?: ?File
};

type State = {
	file?: ?File
}

const Headline = styled.div`
	color: #000;
	font-size: 18px;
	line-height: 22px;
	margin: 15px 0;
`;

const ActionButtonGroup = styled.div`
	text-align: center;
`;

const CancelButton = styled(Button)`
	margin-right: 15px;
`;
CancelButton.displayName = 'CancelButton';

export class FileSelector extends Component<Props, State> {
	state = {};

	constructor(props: Props) {
		super(props);

		const { file } = props;
		if (file) {
			this.state = { file };
		}
	}

	onFileChange = (event: SyntheticInputEvent<HTMLInputElement>) => this.setState({ file: event.target.files[0] });

	onCancelClick = () => this.props.onCancel();

	onInsertClick = () => {
		const { file } = this.state;
		if (file) {
			this.props.onSubmit(file);
		}
	}

	render() {
		return (
			<div>
				<Headline>{this.props.title}</Headline>
				<FileField
					name="file"
					onChange={this.onFileChange}
				/>
				<ActionButtonGroup>
					<CancelButton onClick={this.onCancelClick} label='Cancel' weight='secondary' small />
					<Button disabled={!this.state.file} onClick={this.onInsertClick} label="Insert" weight="primary" small />
				</ActionButtonGroup>
			</div>
		);
	}
}

export default FileSelector;
