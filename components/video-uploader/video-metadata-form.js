/* @flow */

import * as React from 'react';
import Button from '../buttons';
import {
	Option,
	Select,
	Textarea,
	Textfield,
	Tagfield,
	Toggle,
	validators
} from  '../form';
import FileField from '../form/filefield';
import styled from 'styled-components';
import media from '../../style-utils/media';
import type { VideoMetadataFields, Caption, Program } from 'kinja-magma/api/video';
import type { VideoMetaJSON } from 'kinja-magma/models/VideoMeta';
import UploadingAnimation from './uploading';

const { required } = validators;

export type Props = {
	onCancel: () => void,
	onSubmit: (id: string, formValues: VideoMetadataFields, captionFile: ?File) => Promise<*>,
	isFinished?: boolean,
	isErrored?: boolean,
	message?: string,
	enableCaptionUpload: boolean,
	initialFormValues?: ?VideoMetadataFields,
	getPrograms: () => Promise<Array<Program>>,
	onProgramError: () => void,
	getVideoInfo?: () => Promise<VideoMetaJSON>,
	videoId?: ?string
};

type State = {
	errors: {
		title?: string,
		description?: string,
		programId?: string
	},
	programs: Array<Program>,
	uploadingAnimationStateTransition: boolean,
	fields: VideoMetadataFields,
	captions: Array<Caption>,
	captionFile: ?File,
	videoId: string
};

const Container = styled.div`
	width: 100%;
	overflow: hidden;
	background: #fff;

	${media.mediumUp`
		max-width: 400px;
	`}
`;

const Header = styled.h4`
	font-weight: normal;
	text-align: center;
`;

const ButtonGroup = styled.div`
	margin-top: 30px;
	text-align: center;
`;

const CancelButton = styled(Button)`
	margin-right: 15px;
`;

const ToggleLabel = styled.div`
	div {
		font-size: 14px;
		line-height: 17px;
	}
`;

const CaptionTrack = styled.div`
	display: flex;
	align-items: center;
	border-radius: 5px;
	background-color: #f5f5f5;
	padding: 6px 10px;
	margin-bottom: 10px;
`;

const Headline = styled.div`
	color: #4d4d4d;
	font-size: 16px;
	line-height: 21px;
	margin: 15px 0;
`;

const requiredFields = {
	title: 'Title is required',
	description: 'Description is required',
	programId: 'Program or video series is required'
};

const defaultFields = {
	title: '',
	description: '',
	tags: [],
	monetizable: true,
	programId: ''
};

export class VideoMetadataForm extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			errors: {},
			uploadingAnimationStateTransition: !(props.isFinished || props.isErrored),
			fields: {...defaultFields, ...props.initialFormValues},
			captions: [],
			captionFile: null,
			programs: [],
			videoId: props.videoId ? props.videoId : ''
		};
	}

	componentDidMount() {
		this.getFields();
		this.getPrograms();
	}

	getFields() {
		if (this.props.getVideoInfo) {
			this.props.getVideoInfo()
				.then(({ id, title, description, tags, programId, monetizable, captions }) => this.setState({
					videoId: id,
					fields: {
						title,
						description: description || '',
						tags: tags || [],
						programId: programId || '',
						monetizable
					},
					captions
				}));
		}
	}

	getPrograms() {
		this.props.getPrograms()
			.then(programs => {
				const programId = this.getSelectedProgramId(programs);

				this.setState(prevState => ({
					programs,
					fields: {
						...prevState.fields,
						programId
					}
				}));
			}, this.props.onProgramError);
	}

	getSelectedProgramId(programs: Array<Program>) {
		let program: ?Program;

		// if editing video and programId already exists
		if (this.state.fields.programId) {
			program = programs.find(_ => _.id === this.state.fields.programId);
		}

		return program ? program.id : '';
	}

	onInputChange = (field: string) => (value: mixed) => this.setState(prevState => ({
		fields: {
			...prevState.fields,
			[field]: value
		}
	}));

	onTitleChange = this.onInputChange('title');

	onDescriptionChange = this.onInputChange('description');

	onTagsChange = this.onInputChange('tags');

	onProgramIdChange = this.onInputChange('programId');

	onMonetizableChange = this.onInputChange('monetizable');

	onCaptionFileChange = (e: SyntheticInputEvent<HTMLInputElement>) => this.setState({
		captionFile: e.target.files[0]
	});

	onCancelClick = () => this.setState({
		errors: {},
		fields: defaultFields
	}, this.props.onCancel);

	onSubmitClick = () => {
		const errors = this.validate();

		return this.setState({ errors }, () => {
			if (!Object.keys(errors).length) {
				return this.props.onSubmit(this.state.videoId, this.state.fields, this.state.captionFile);
			}
		});
	}

	validate() {
		const errors = {};

		Object.keys(requiredFields).forEach(field => {
			const validateField = required.required(requiredFields[field]);
			const error = validateField(this.state.fields[field]);
			if (error) {
				errors[field] = error;
			}
		});

		return errors;
	}

	renderProgramOptions(): React.Node {
		return this.state.programs.map(({ id, title }: Program) =>
			<Option key={id} value={id} stringRepresentation={title} />
		);
	}

	renderCaptionsField(): React.Node {
		const caption = this.state.captions.reverse().find(({ format }) => format === 'srt' || format === 'vtt');

		return (
			<div>
				<Headline>Caption (optional)</Headline>
				{caption &&
					<CaptionTrack>
						<span>{`${caption.label} - ${caption.id}.${caption.format}`}</span>
					</CaptionTrack>
				}
				<FileField
					accept=".srt, .vtt"
					name="captions"
					onChange={this.onCaptionFileChange}
				/>
			</div>
		);
	}

	render() {
		const isEditingNewVideo = !this.props.getVideoInfo;

		return (
			<Container>
				<Header>Edit video info</Header>
				{isEditingNewVideo &&
					<UploadingAnimation
						finished={this.props.isFinished}
						errored={this.props.isErrored}
						message={this.props.message}
						stateTransition={this.state.uploadingAnimationStateTransition}
					/>
				}
				<Textfield
					onChange={this.onTitleChange}
					value={this.state.fields.title}
					error={this.state.errors.title}
					name="title"
					description="Title"
				/>
				<Textarea
					onChange={this.onDescriptionChange}
					value={this.state.fields.description}
					error={this.state.errors.description}
					name="description"
					label="Description"
					autogrow
				/>
				<Tagfield
					onChange={this.onTagsChange}
					name="tags"
					description="Tags"
					tags={this.state.fields.tags}
				/>
				<Select
					height={200}
					onChange={this.onProgramIdChange}
					description="Program or video series"
					value={this.state.fields.programId}
					error={this.state.errors.programId}
					labelUnderField
					predictive
				>
					<Option
						key="default"
						value=""
						stringRepresentation={this.state.programs.length ? 'Choose a program' : 'Loading…'}
					/>
					{this.renderProgramOptions()}
				</Select>
				<Toggle
				/* eslint-disable max-len */
					label={
						<ToggleLabel>
							Monetizable
							<div>Monetizable videos can have pre-roll ads and appear in video recirculation modules. We can&apos;t monetize content created by others, like clips or screencaps from other channels.</div>
						</ToggleLabel>
					}
					/* eslint-enable max-len */
					name='monetizable'
					onChange={this.onMonetizableChange}
					checked={this.state.fields.monetizable}
				/>
				{this.props.enableCaptionUpload && this.renderCaptionsField()}
				<footer>
					<ButtonGroup>
						<CancelButton
							onClick={this.onCancelClick}
							label={isEditingNewVideo ? 'Fill out later' : 'Cancel'}
							weight="secondary"
							small
						/>
						<Button
							onClick={this.onSubmitClick}
							label="Save video info"
							weight="primary"
							small
						/>
					</ButtonGroup>
				</footer>
			</Container>
		);
	}
}

export default VideoMetadataForm;
