/* @flow */

import * as React from 'react';
import values from 'lodash/values';
import keys from 'lodash/keys';
import ReactImageCrop, { makeAspectCrop, getPixelCrop } from 'react-image-crop';
import smartcrop from 'smartcrop';
import autobind from 'autobind-decorator';
import cx from 'classnames';
import styled from 'styled-components';

import ButtonGroup, { ButtonGroupItem } from '../button-group';
import createTranslate from '../translator';
import type { TranslateFunction } from '../translator';
import imageCropperTranslations from './image-cropper-translations';
import type { Locale } from 'kinja-magma/models/Locale';
import { StyledFeedback, FeedbackText } from 'kinja-components/components/elements/feedback';

const DEFAULT_ASPECTS: { [string]: number } = {
	'16:9': 16 / 9,
	custom: 0
};

type PercentCrop = {
	x?: number,
	y?: number,
	width?: number,
	height?: number
};

type Crop = {
	x: number,
	y: number,
	width: number,
	height: number
};

type AspectCrop = {
	aspect?: number
} & Crop;

type Props = {
	src: string,
	language: string,
	widthWarningThreshold?: number,
	heightWarningThreshold?: number,
	minWidth?: number,
	minHeight?: number,
	aspectRatios?: { [string]: number },
	onComplete?: Crop => void,
	onChange?: Crop => void,
	onImageLoad?: Crop => void,
	onAspectChange?: number => void,
	// Initial crop area of the image will be determined by a content aware algorithm
	smartCrop?: boolean
};

type DefaultProps = {
	language: Locale
};

const ImageCropperWrapper = styled.div`
	text-align: center;
`;

/* Fixed height is set to avoid reflow once the feedback appears */
/* Font size and line height re-specified for feedback text to overwrite mantle styles */
const ImageCropperBottom = styled.div`
	display: flex;
	flex-direction: row;
	height: 25px;
	margin-bottom: 1.25rem;

	${StyledFeedback} {
		flex: 0 1 auto;

		${FeedbackText} {
			font-size: 0.875rem;
			line-height: 1.125rem;
		}
	}
`;

/* Line height corresponds with fixed height of parent element */
/* Double ampersand to overwrite mantle styles */
const ImageCropperInfo = styled.p`
	flex: 1 1 auto;
	margin-bottom: 0;
	text-align: left;
	color: ${props => props.theme.color.darkgray};

	&& {
		font-size: 14px;
		line-height: 25px;
	}
`;

const ImageCropperRatioSelector = styled.div`
	display: flex;
	justify-content: center;
	margin-bottom: 1rem;
`;

type State = {
	crop: AspectCrop,
	image?: HTMLImageElement
};

const DEFAULT_CROP = { x: 0, y: 0, width: 100, height: 100 };

function toCropData(crop: Crop, image: HTMLImageElement): Crop {
	const { naturalWidth, naturalHeight } = image;
	return {
		x: crop.x * 100 / naturalWidth,
		y: crop.y * 100 / naturalHeight,
		width: crop.width * 100 / naturalWidth,
		height: crop.height * 100 / naturalHeight
	};
}

class ImageCropper extends React.Component<Props, State> {
	translate: TranslateFunction;
	handleChange: (crop: AspectCrop, pixelCrop: Crop) => void;
	handleComplete: (crop: AspectCrop, pixelCrop: Crop) => void;
	handleImageLoaded: HTMLImageElement => void;
	switchAspect: string => void;
	customButtonLabel: string;

	static defaultProps: DefaultProps = {
		language: 'en-US'
	};

	state = {
		crop: {
			...DEFAULT_CROP,
			aspect: this.getDefaultAspectRatio()
		}
	};

	constructor(props: Props) {
		super(props);

		this.translate = createTranslate(imageCropperTranslations, props.language);
		this.customButtonLabel = this.translate('Custom ratio');
	}

	@autobind
	handleChange(crop: AspectCrop, pixelCrop: Crop): void {
		this.setState({ crop });
		if (this.props.onChange && this.state.image) {
			this.props.onChange(pixelCrop);
		}
	}

	@autobind
	handleComplete(crop: AspectCrop, pixelCrop: Crop): void {
		this.setState({
			crop
		}, () => {
			if (this.props.onComplete && this.state.image) {
				this.props.onComplete(pixelCrop);
			}
		});
	}

	@autobind
	handleImageLoaded(image: HTMLImageElement): void {
		const { onImageLoad } = this.props;
		const { aspect } = this.state.crop;
		const { naturalWidth, naturalHeight } = image;

		const setCrop = crop => {
			this.setState({
				image,
				crop
			}, () => {
				if (onImageLoad) {
					onImageLoad(getPixelCrop(image, crop));
				}
			});
		};

		// Crop with custom aspect ratio
		if (!aspect) {
			setCrop(DEFAULT_CROP);
			return;
		}

		// Crop with set aspect ratio
		const defaultCrop = { x: 0, y: 0, height: 100, aspect };
		const imageAspect = naturalWidth / naturalHeight;
		const aspectCrop = makeAspectCrop(defaultCrop, imageAspect);

		if (this.props.smartCrop) {
			this.smartCrop(aspectCrop, image).then(guess => setCrop({ ...guess, aspect }));
		} else {
			setCrop({ ...aspectCrop, aspect });
		}
	}

	@autobind
	switchAspect(aspectKey: string): void {
		const aspect = this.getAllowedAspectRatios()[aspectKey];
		const { onAspectChange } = this.props;

		const setCrop = (crop: AspectCrop) => {
			this.setState({
				crop
			}, () => {
				if (onAspectChange) {
					onAspectChange(aspect);
				}
			});
		};

		// Crop with custom aspect ratio
		if (!aspect || !this.state.image) {
			setCrop({ ...this.state.crop, aspect });
			return;
		}

		const { x, y, height } = this.state.crop;
		const { image } = this.state;
		const { naturalWidth, naturalHeight } = image;
		const aspectCrop = makeAspectCrop({ x, y, height, aspect }, naturalWidth / naturalHeight);

		if (this.props.smartCrop) {
			this.smartCrop(aspectCrop, image).then(guess => setCrop({ ...guess, aspect }));
		} else {
			setCrop({ ...aspectCrop, aspect });
		}
	}

	smartCrop(crop: PercentCrop, image: HTMLImageElement): Promise<Crop> {
		const pixelCrop = getPixelCrop(image, crop);
		const guess = smartcrop.crop(image, { width: pixelCrop.width, height: pixelCrop.height });
		return guess.then(guess => toCropData(guess.topCrop, image));
	}

	getAllowedAspectRatios(): { [ratio: string]: number } {
		return this.props.aspectRatios ? {
			...this.props.aspectRatios,
			custom: 0
		} : DEFAULT_ASPECTS;
	}

	getDefaultAspectRatio(): number {
		const { aspectRatios = {} } = this.props;
		const customAspectRatios = values(aspectRatios);

		return customAspectRatios.length ? customAspectRatios[0] : DEFAULT_ASPECTS['16:9'];
	}

	/**
	 * The label contains information about the size of the cropped image
	 * and a warning if the resulting image is too small
	 */
	getInfoLabel(): React.Node {
		if (!this.state.image) {
			return (<p>&nbsp;</p>);
		}
		const { widthWarningThreshold, heightWarningThreshold } = this.props;
		const { x, y, width, height } = this.state.crop;
		const crop = getPixelCrop(this.state.image, { x, y, width, height });
		const showWarning =
			(typeof widthWarningThreshold !== 'undefined' && crop.width < widthWarningThreshold) ||
			(typeof heightWarningThreshold !== 'undefined' && crop.height < heightWarningThreshold);
		const classNames = cx('ImageCropper__info');
		return (
			<ImageCropperBottom>
				<ImageCropperInfo className={classNames}>
					{this.translate('Selected area:')} {crop.width} x {crop.height} px
				</ImageCropperInfo>
				{showWarning && <StyledFeedback
					text={this.translate('Choose a bigger area if you want to use this image for social shares.')}
					color='alert'
					arrow='topright'
				/>}
			</ImageCropperBottom>
		);
	}

	getAspectRatioSelector(): React.Element<typeof ButtonGroup> {
		const availableRatios = this.getAllowedAspectRatios();
		const { crop } = this.state;
		const selectedRatio = crop && crop.aspect ? parseInt(crop.aspect * 1000, 10) : null;
		const buttonGroupItems = keys(availableRatios).map(ratio => (
			<ButtonGroupItem
				key={ratio}
				label={ratio === 'custom' ? this.customButtonLabel : String(ratio)}
				selected={selectedRatio === parseInt(availableRatios[ratio] * 1000, 10)}
				value={ratio}
			/>
		));
		return (
			<ButtonGroup onChange={this.switchAspect}>
				{buttonGroupItems}
			</ButtonGroup>
		);
	}

	render() {
		const minWidth = this.state.image && this.props.minWidth ?
			(this.props.minWidth / this.state.image.naturalWidth) * 100 : 0;
		const minHeight = this.state.image && this.props.minHeight ?
			(this.props.minHeight / this.state.image.naturalHeight) * 100 : 0;

		return (
			<ImageCropperWrapper>
				<ImageCropperRatioSelector>
					{this.getAspectRatioSelector()}
				</ImageCropperRatioSelector>
				<p className="inline-help">
					<span>{this.translate('Kinja recirculation modules always use a 16:9 crop.')}</span>
				</p>
				<ReactImageCrop
					crop={{ ...this.state.crop }}
					src={this.props.src}
					onChange={this.handleChange}
					onComplete={this.handleComplete}
					onImageLoaded={this.handleImageLoaded}
					minWidth={minWidth}
					minHeight={minHeight}
					crossorigin="anonymous"
				/>
				{this.getInfoLabel()}
			</ImageCropperWrapper>
		);
	}
}
export default ImageCropper;
