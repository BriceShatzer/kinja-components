/* @flow */

import * as React from 'react';
import imageUrl from 'kinja-images/imageUrl';
import styled, { css } from 'styled-components';

import Button19 from '../button19';
import placeholderImage from 'kinja-images/placeholderImage';
import { Toggle, Textarea, Textfield18 } from '../form';
import media from '../../style-utils/media';
import Analytics from '../hoc/analytics';
import { EnsureDefaultTheme } from '../theme';
import Modal from '../modal';
import ImageUpload from '../form/image-upload';
import { stripHTML } from '../../utils';

import type { AnalyticsInjectedProps } from '../hoc/analytics';
import type { Image as ImageType } from '../types';


type Props = AnalyticsInjectedProps & {
	spliceToBlogHomePage: boolean,
	hideFromRss: boolean,
	autoRepostDisabled: boolean,
	canAutoRepostToParent: boolean,
	headTitleTag: string,
	socialShareSettings: boolean,
	sharingMainImage: ImageType,
	mainTitle: string,
	socialHeadline: string,
	socialDescription: string,
	amazonUrl: string,
	amazonPrice: string,
	amazonPromoCode: string,
	externalAPI: {
		imageUploader: (target: string | File) => Promise<*>,
		updatePostModel: (*) => void
	},
	// When passed the placeholder image will be blog themed.
	blogGroup?: string
};

type State = {
	headTitleTag: string,
	shareTitle: string,
	socialDescription: string,
	amazonUrl: string,
	amazonPrice: string,
	amazonPromoCode: string,
	headTitleTag: string,
	hideFromRss: boolean,
	autoRepostDisabled: boolean,
	isImageModalOpen: boolean,
	sharingMainImage: ImageType
};

const Wrapper = styled.div`
	display: ${props => props.flex ? 'flex' : 'block'};
	width: ${props => props.width ? props.width : '100%'};
	align-items: ${props => props.alignitems ? props.alignitems : 'center'};
	justify-content: ${props => props.justifycontent ? props.justifycontent : 'default'};
	margin-top: ${props => props.margintop ? props.margintop : '0px'};
	margin-bottom: ${props => props.marginbottom ? props.marginbottom : '0px'};

	input {
		color: ${props => props.theme.color.darksmoke} !important;
	}

	.fielddescription {
		top: ${props => props.fielddescriptiontop ? props.fielddescriptiontop : '0px'};
	}

	.field {
		margin-bottom: 15px;
	}

	${media.smallOnly`
		display: block;
		width: 100%;
		margin-bottom: 10px;

		label {
			padding: 0;
		}
	`}
`;

const SocialSettingsHeader = styled.h6`
	font-size: 16px;
	font-weight: bold;
	text-transform: none;
	margin-top: 10px;
	padding-top: 20px;
	color: ${props => props.theme.color.black};
	${props => props.bordertop && css`
		border-top: 1px solid ${props.theme.color.lightgray};
	`}
`;

const Description = styled.div`
	font-size: 14px;
	margin-top: 10px;
	width: 100%;
	color: ${props => props.theme.color.midgray};
	${props => props.border && css`
		border-top: 1px solid ${props.theme.color.lightgray};
	`}
`;

const AmazonPriceRow = styled.div`
	display: flex;
	margin-left: -12px;
`;

const AmazonPriceDollar = styled.span`
	margin-right: 3px;
	margin-top: -2px;
`;

class DistributionTools extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		const { hideFromRss,
			autoRepostDisabled,
			headTitleTag,
			socialHeadline,
			socialDescription,
			amazonUrl,
			amazonPrice,
			amazonPromoCode,
			sharingMainImage
		} = this.props;

		this.state = {
			hideFromRss,
			autoRepostDisabled,
			headTitleTag: stripHTML(headTitleTag),
			shareTitle: stripHTML(socialHeadline),
			socialDescription,
			amazonUrl,
			amazonPrice,
			amazonPromoCode,
			isImageModalOpen: false,
			sharingMainImage
		};
	}

	setInRss = () => {
		this.setState(prevState => {
			this.props.ga('Post Editor', 'Hide post from RSS', !prevState.hideFromRss ? 'Toggle on' : 'Toggle off');
			return {
				hideFromRss: !prevState.hideFromRss
			};
		});
	}

	spliceToBlogHomePage = () => {
		this.setState(prevState => {
			this.props.ga('Post Editor', 'Splice to blog homepage', !prevState.autoRepostDisabled ? 'Toggle on' : 'Toggle off');
			return {
				autoRepostDisabled: !prevState.autoRepostDisabled
			};
		});
	}

	componentDidUpdate = (prevProps: Props, prevState: State) => {
		if (this.state.isImageModalOpen !== prevState.isImageModalOpen) {
			return;
		}
		this.props.externalAPI.updatePostModel(this.state);
	}

	toggleImageModal = () => {
		if (!this.state.isImageModalOpen) {
			this.props.ga('Post Editor', 'Share Image Upload');
		}
		return this.setState(prevState => ({
			isImageModalOpen: !prevState.isImageModalOpen
		}));
	}

	handleImageChange = (image: ImageType) => {
		this.toggleImageModal();
		this.setState(() => ({
			sharingMainImage: image
		}));
	}

	autoPopulate = (evt: SyntheticInputEvent<HTMLInputElement>) => {
		const name = evt.target.name;
		const placeholder = evt.target.placeholder;

		switch (name) {
			case 'Search Optimized Title':
				if (!this.state.headTitleTag && placeholder) {
					this.setState({
						headTitleTag: placeholder
					});
				}
		}
	}

	render() {
		const { sharingMainImage } = this.state;
		const { canAutoRepostToParent } = this.props;

		const imageId = sharingMainImage && sharingMainImage.id;
		const sharingMainImageUrl = imageId ? imageUrl(imageId, 'KinjaCenteredLargeAutoFrozen', sharingMainImage.format) : '';

		return <EnsureDefaultTheme>
			<React.Fragment>
				<Wrapper borderbottom>
					<Toggle
						checked={this.state.hideFromRss}
						label='Hide post from RSS'
						name="rss-toggle"
						onChange={this.setInRss}
						small={true}
					/>
					{canAutoRepostToParent && <Toggle
						checked={!this.state.autoRepostDisabled}
						label='Splice to Blog Homepage'
						name="blog-toggle"
						onChange={this.spliceToBlogHomePage}
						small={true}
					/>}
				</Wrapper>

				<Wrapper marginbottom='30px'>
					<SocialSettingsHeader bordertop>Search Engine Settings</SocialSettingsHeader>
					<Textfield18
						onClick={this.autoPopulate}
						value={this.state.headTitleTag}
						name={'Search Optimized Title'}
						onChange={value => this.setState({ headTitleTag: value })}
						label={'Search Optimized Title (57-63 characters)'}
						counter={true}
						limit={63}
					/>
				</Wrapper>

				<Wrapper marginbottom='30px'>
					<SocialSettingsHeader bordertop>Social Share Settings</SocialSettingsHeader>
					<Wrapper flex justifycontent='space-between' alignitems='flex-start' margintop='35px'>
						<Wrapper width='40%'>
							<a href="#" onClick={this.toggleImageModal}>
								<img src={sharingMainImageUrl ? sharingMainImageUrl : placeholderImage(this.props.blogGroup)} />
							</a>
							<Wrapper margintop='10px'>
								<Button19 className="js_social-image" onClick={this.toggleImageModal} variant='secondary' label='Change' isSmall />
							</Wrapper>
							<Description border>Social Image</Description>
						</Wrapper>
						<Wrapper width='50%' fielddescriptiontop='5px'>
							<Textarea
								autogrow
								label='Share Title (max. 70 characters)'
								name='Share Title'
								onChange={value => this.setState({ shareTitle: stripHTML(value) })}
								value={this.state.shareTitle}
								counter={true}
								limit={70}
							/>
							<Textarea
								autogrow
								label='Social Description (max. 260 characters)'
								name='Social Description'
								onChange={value => this.setState({ socialDescription: stripHTML(value) })}
								value={this.state.socialDescription}
								counter={true}
								limit={260}
							/>
						</Wrapper>
					</Wrapper>
				</Wrapper>

				<Wrapper marginbottom='30px'>
					<SocialSettingsHeader bordertop>Other Settings</SocialSettingsHeader>
					<Textarea
						autogrow
						label='Amazon URL'
						name='Amazon URL'
						onChange={value => this.setState({ amazonUrl: stripHTML(value) })}
						value={this.state.amazonUrl}
					/>
					<AmazonPriceRow>
						<AmazonPriceDollar>$</AmazonPriceDollar>
						<Textarea
							autogrow
							label='Amazon Price (Optional)'
							name='Amazon Price'
							onChange={value => this.setState({ amazonPrice: stripHTML(value) })}
							value={this.state.amazonPrice}
						/>
					</AmazonPriceRow>
					<Textarea
						autogrow
						label='Amazon Promo Code (Optional)'
						name='Amazon Promo Code'
						onChange={value => this.setState({ amazonPromoCode: stripHTML(value) })}
						value={this.state.amazonPromoCode}
					/>
				</Wrapper>

				<Modal
					fullscreen
					isOpen={this.state.isImageModalOpen}
					onClose={this.toggleImageModal}
				>
					<ImageUpload
						name="cardImage"
						imageUploader={this.props.externalAPI.imageUploader}
						onChange={this.handleImageChange}
					/>
				</Modal>
			</React.Fragment>
		</EnsureDefaultTheme>;
	}
}

export default Analytics(DistributionTools);
