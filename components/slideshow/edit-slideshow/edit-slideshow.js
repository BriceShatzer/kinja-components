/* @flow */

import React, { Component } from 'react';
import styled from 'styled-components';

import ImageList from '../image-list';
import Button from '../../buttons';
import ButtonGroup, { ButtonGroupItem } from '../../button-group';
import { type SlideshowAspectRatio } from 'postbody/blockNodes/Slideshow';
import createTranslate from '../../translator';
import type { TranslateFunction } from '../../translator';
import type { Locale } from 'kinja-magma/models/Locale';
import translations from '../translations';
import ImageNode from 'postbody/blockNodes/ImageNode';

type State = {
	items: Array<ImageNode>,
	aspectRatio: SlideshowAspectRatio
};

type Props = {
	items: Array<ImageNode>,
	aspectRatio: SlideshowAspectRatio,
	onCancel: () => void,
	onSubmit: State => void,
	language?: Locale
};

const KinjaEditSlideshow = styled.div`
	text-align: center;
`;

const EditSlideshowRatioSelector = styled.div`
	margin-bottom: 30px;
`;

const FormButtons = styled.footer`
	clear: both;
`;

const InlineHelp = styled.p`
	margin-bottom: 15px;
`;

class EditSlideshow extends Component<Props, State> {
	props: Props;
	state: State;
	translate: TranslateFunction;
	handleChange: (Array<ImageNode>) => void;
	switchAspectRatio: (string) => void;
	handleSubmit: () => void;

	constructor(props: Props) {
		super(props);
		this.state = {
			items: props.items,
			aspectRatio: props.aspectRatio
		};
		this.translate = createTranslate(translations, props.language);
		this.handleChange = this.handleChange.bind(this);
		this.switchAspectRatio = this.switchAspectRatio.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillReceiveProps(nextProps: Props) {
		this.setState({
			items: nextProps.items,
			aspectRatio: nextProps.aspectRatio
		});
	}

	handleChange(items: Array<ImageNode>) {
		this.setState({
			items
		});
	}

	switchAspectRatio(aspectRatio: SlideshowAspectRatio) {
		this.setState({
			aspectRatio
		});
	}

	handleSubmit() {
		this.props.onSubmit(this.state);
	}

	render() {
		const { onCancel } = this.props;
		const { items, aspectRatio } = this.state;
		return (
			<KinjaEditSlideshow>
				<h2 className="modal-title">{this.translate('Edit slideshow')}</h2>
				<EditSlideshowRatioSelector>
					<ButtonGroup onChange={this.switchAspectRatio}>
						<ButtonGroupItem label="3:2" value="Photo" selected={aspectRatio === 'Photo'}/>
						<ButtonGroupItem label="16:9" value="Wide" selected={aspectRatio === 'Wide'}/>
					</ButtonGroup>
				</EditSlideshowRatioSelector>
				<InlineHelp className="inline-help">
					{this.translate('Drag slides to rearrange')}
				</InlineHelp>
				<ImageList
					items={items}
					onChange={this.handleChange}
					aspectRatio={aspectRatio}
				/>
				<FormButtons className="form-buttons">
					<Button
						weight='secondary'
						className="form-button"
						label={this.translate('Cancel')}
						onClick={onCancel}
						type="button"
					/>
					<Button
						weight='primary'
						className="form-button"
						label={this.translate('Save slideshow')}
						onClick={this.handleSubmit}
						type="submit"
					/>
				</FormButtons>
			</KinjaEditSlideshow>
		);
	}
}

export default EditSlideshow;
