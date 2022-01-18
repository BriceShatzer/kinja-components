// @flow

import * as React from 'react';
import Textfield from '../../../form/textfield18';
import Button from '../../../buttons';
import KinjaVideo from 'postbody/blockNodes/KinjaVideo';
import { validators } from '../../../form';
type Props = {
	onCancel: () => void,
	onUpload: (video: KinjaVideo) => void,
	videoResolver: string => Promise<KinjaVideo>
};

type State = {
	value: string,
	error: string
};

export default class SpecialSectionVideoResolver extends React.Component<Props, State> {
	constructor() {
		super();
		this.state = {
			value: '',
			error: ''
		};
	}

	handleSubmit = () => {
		const error = validators.format.kinjaVideoUrl()(this.state.value);
		if (error) {
			return this.setState({ error });
		}
		return this.props
			.videoResolver(this.state.value)
			.then(this.props.onUpload)
			.catch(() => this.setState({ error: 'Link fetch failed. Please try another link.' }));
	};

	render() {
		const { onCancel } = this.props;
		const { error, value } = this.state;
		return (
			<React.Fragment>
				<Textfield
					name={'videoUrl'}
					inlineHelp={'Input a valid Kinja video url.'}
					label={'Add A Video.'}
					onChange={value => this.setState({ value })}
					error={error}
					value={value}
				/>
				<div>
					<Button onClick={this.handleSubmit} label={'Save'} />
					<Button onClick={onCancel} label={'Cancel'} weight="secondary" />
				</div>
			</React.Fragment>
		);
	}
}
