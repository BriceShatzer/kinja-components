/* @flow */

import React, { Component } from 'react';
import autobind from 'autobind-decorator';
import styled from 'styled-components';

import { EnsureDefaultTheme } from '../../theme';
import createTranslate from '../../translator';
import translations from './translations';
import ReviewBox from '../review-box/ReviewBox';
import Button from '../../buttons';
import Textfield18 from 'kinja-components/components/form/textfield18';
import ImageUpload from '../../form/image-upload';
import { Select, Option } from '../../form/select';
import ReviewData from '../review-data';
import { Loading } from '../../elements/loader';
import imageUrl from 'kinja-images/imageUrl';
import ImageNode from 'postbody/blockNodes/ImageNode';

import type { CloudinaryResponse } from '../../form/image-upload/types';
import type { Image as ImageFormat } from '../../types';
import type { Locale } from 'kinja-magma/models/Locale';
import type { Props as ReviewBoxProps } from '../review-box/ReviewBox';
import type { ReviewText, Grade } from 'postbody/blockNodes/ReviewBox';
import type { TranslateFunction } from '../../translator';


type DefaultProps = {
	canInsertBox: boolean;
};

type Props = {
	initialValues?: ReviewBoxProps,
	language: Locale,
	onCancel: () => void,
	onSubmit: (data: ?ReviewBoxProps, boolean) => void,
	canInsertBox: boolean,
	imageUploader: (image: string | File) => Promise<CloudinaryResponse>
};

type State = {
	data: ReviewBoxProps,
	isImageLoading: boolean,
	showError: boolean
};

const MainSection = styled.div`
	padding-bottom: 30px;
`;

const ReviewDataTitle = styled.h2`
	margin-top: 2rem;
	color: ${props => props.theme.color.darksmoke};
	font-size: 18px;
	line-height: 27px;
	text-align: left;
`;

const SCORES = [undefined, 'A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F'];
const GradeOptions = (translate: TranslateFunction) => SCORES.map(rating =>
	(<Option
		key={rating || ''}
		value={rating}
		stringRepresentation={rating || translate('Select a rating')}
	/>));

class SimpleInsetEditor extends Component<Props, State> {
	defaultProps: DefaultProps;
	props: Props;
	state: State;
	translate: TranslateFunction;
	submitFormWithoutInsert: () => void;
	submitFormWithInsert: () => void;

	constructor(props: Props) {
		super(props);
		if (props.initialValues) {
			this.state = {
				...this.state,
				data: {
					...this.state.data,
					...props.initialValues
				}
			};
		}

		this.translate = createTranslate(translations, props.language);
		this.submitFormWithoutInsert = this.submitFormWithoutInsert.bind(this);
		this.submitFormWithInsert = this.submitFormWithInsert.bind(this);
	}

	static defaultProps = {
		canInsertBox: true,
		language: 'en-US'
	};
	state = {
		data: {
			title: '',
			text: [],
			hide: true,
			alignment: 'Center',
			image: null,
			score: null
		},
		isImageLoading: false,
		showError: false
	};

	validate(): boolean {
		if (!this.state.data.title || !this.state.data.title.trim()) {
			this.setState({
				showError: true
			});
			return false;
		}
		return true;
	}

	submitFormWithoutInsert() {
		if (this.validate()) {
			this.props.onSubmit(this.state.data, false);
		}
	}

	submitFormWithInsert() {
		if (this.validate()) {
			this.props.onSubmit(this.state.data, true);
		}
	}

	@autobind
	handleTitleChange(title: string) {
		this.setState(prevState => ({
			data: {
				...prevState.data,
				title
			},
			showError: false
		}));
	}

	@autobind
	handleImageChange(image: ImageFormat) {
		const imageNode = new ImageNode({
			id: image.id || '',
			format: image.format || 'jpg',
			width: image.width || 0,
			height: image.height || 0
		});
		const img = new Image();
		img.onload = () => {
			this.setState(prevState => ({
				data: {
					...prevState.data,
					image: imageNode
				},
				isImageLoading: false
			}));
		};
		img.src = image.url || '';
	}

	@autobind
	handleScoreChange(score: Grade) {
		this.setState(prevState => ({
			data: {
				...prevState.data,
				score
			}
		}));
	}

	@autobind
	handleReviewTextChange(text: Array<ReviewText>) {
		this.setState(prevState => ({
			data: {
				...prevState.data,
				text
			}
		}));
	}

	@autobind
	handleUploadStarted() {
		this.setState({
			isImageLoading: true
		});
	}

	@autobind
	handleImageError() {
		this.setState({
			isImageLoading: false
		});
	}

	renderSelect() {
		const value = this.state.data.score ? this.state.data.score : '';
		return (
			<Select onChange={this.handleScoreChange} value={value} height={200}>
				{GradeOptions(this.translate)}
			</Select>
		);
	}

	renderForm() {
		const { imageUploader } = this.props;
		const {
			title,
			image,
			text
		} = this.state.data;

		const imagesAsNeededByUploader = image ? {
			id: image.id,
			format: image.format,
			url: imageUrl(image.id, 'KinjaCenteredLargeAuto', image.format)
		} : undefined;

		return (
			<div>
				<div className="form-group flex-row">
					<div className="flex-row__column small-4">
						<h3 className="form-group_label">{this.translate('Title')}</h3>
					</div>
					<div className="flex-row__column small-8">
						<Textfield18
							error={this.state.showError ? this.translate('Please specify a review title.') : ''}
							onChange={this.handleTitleChange}
							name="title"
							value={title}
						/>
					</div>
				</div>

				<div className="form-group flex-row">
					<div className="flex-row__column small-4">
						<h3 className="form-group_label">{this.translate('Image')}</h3>
					</div>
					<div className="flex-row__column small-8">
						<ImageUpload
							name="image"
							description=""
							imageUploader={imageUploader}
							onChange={this.handleImageChange}
							onError={this.handleImageError}
							onUploadStarted={this.handleUploadStarted}
							value={imagesAsNeededByUploader}
						/>
					</div>
				</div>

				<div className="form-group flex-row">
					<div className="flex-row__column small-4">
						<h3 className="form-group_label">{this.translate('Rating')}</h3>
					</div>

					<div className="flex-row__column small-8">
						{this.renderSelect()}
					</div>
				</div>

				<div className="form-group flex-row">
					<div className="flex-row__column small-12">
						<ReviewDataTitle>{this.translate('Review data')}</ReviewDataTitle>
						<ReviewData name="text" value={text} onChange={this.handleReviewTextChange} />
					</div>
				</div>
			</div>
		);
	}

	render() {
		const { onCancel, canInsertBox } = this.props;
		const { isImageLoading } = this.state;
		let imageComponent;
		if (isImageLoading) {
			imageComponent = <Loading />;
		} else if (this.state.data.image) {
			const url = imageUrl(this.state.data.image.id, 'KinjaCenteredLargeAuto', this.state.data.image.format);
			imageComponent = <img src={url} alt={this.state.data.title} />;
		}

		return (
			<EnsureDefaultTheme>
				<div className="review-inset-editor">
					<h2 className="modal-title">{this.translate('Edit review')}</h2>
					<MainSection className="flex-row">
						<div className="flex-row__column small-12 large-auto">
							{this.renderForm()}
						</div>
						<div className="flex-row__column flex-row__column--fixed">
							<ReviewBox
								{...this.state.data}
								imageComponent={imageComponent}
							/>
						</div>
					</MainSection>
					<div className="form-buttons">
						<Button
							weight='secondary'
							className="form-button"
							label={this.translate('Cancel')}
							onClick={onCancel}
							type="button"
						/>
						<Button
							weight='primary'
							className="form-button review-inset-editor__save-button"
							label={this.translate('Save review')}
							onClick={this.submitFormWithoutInsert}
							type="submit"
							disabled={isImageLoading}
						/>
						{canInsertBox &&
							<Button
								weight='primary'
								className="form-button review-inset-editor__save-and-insert-button"
								label={this.translate('Save and insert box')}
								onClick={this.submitFormWithInsert}
								type="submit"
								disabled={isImageLoading}
							/>
						}
					</div>
				</div>
			</EnsureDefaultTheme>
		);
	}
}

export default SimpleInsetEditor;
