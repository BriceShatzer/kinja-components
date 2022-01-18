/* @flow */

/*
 * Curation Module's Frontpage Card Item: Server/Edit mode hybrid
 */

import * as React from 'react';
import shortid from 'shortid';
import { isEmpty } from 'lodash';
import styled, {css} from 'styled-components';
import classnames from 'classnames';

/**
 * TODO: remove render props from the Card component. Once this is done
 * 	we can properly type it and remove it from flow ignore
 */
// $FlowFixMe
import { Card } from 'kinja-components/components/card';
// $FlowFixMe
import Headline from 'kinja-components/components/card/headline';
// $FlowFixMe
import StoryType from 'kinja-components/components/card/story-type';
// $FlowFixMe
import Image from 'kinja-components/components/card/image';
// $FlowFixMe
import ReadMore from 'kinja-components/components/card/read-more';
// $FlowFixMe
import Excerpt from 'kinja-components/components/card/excerpt';
// $FlowFixMe
import { Author } from 'kinja-components/components/card/authors';

import media from '../../../style-utils/media';
import InlineAdContainer,{ OuterAdContainer } from 'kinja-components/components/ad-slot/inline-ad-container';
import {
	MobileCurationAd
} from 'kinja-components/components/ad-slot/ads';
import { getPostBlogGroupFromPost } from 'kinja-components/utils';

import Button19 from 'kinja-components/components/button19';

// Icons
import CurationTertiaryFour from '../../icon19/CurationEqualFour';
import CurationTertiaryOne from '../../icon19/CurationHeadline';

import { type CurationItemProps } from 'kinja-magma/models/CurationItem';
import type { CurationCustomOptions } from 'kinja-components/components/types';

const AddItemsButtonWrapper = styled.div`
	position: absolute;
	bottom: 20px;
	right: 0;

	button {
		transform: rotate(90deg);

		svg {
			height: 27px;
			margin-bottom: 0;
		}
	}
`;

const MobileAdContainer = styled.div`
	border-bottom: 1px solid ${props => props.theme.color.lightgray};
	margin-bottom: 2rem;

	${media.largeUp`
		display: none;
	`}
	${OuterAdContainer} {
		margin: 0;
	}
`;

const TertiaryWithItemsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	position: relative;
	border-bottom: none;
	margin-bottom: inherit;
	max-height: inherit;
`;

const MultipleTertiaryItemWrapper = styled.div`
	display: flex;

	.image-container-wrapper {
		width: 30%;
		margin-right: 10px;
	}

	video {
		width: 100%;
	}

	h5 {
		${props => props.isOnion && css`
			font-family: ${props.theme.typography.serif.fontFamily};
		`}
		font-weight: ${props => props.isSatire ? 'bold' : 'normal'};
		font-size: ${props => props.isOnion ? '16' : '18'}px;
		margin-bottom: 0;
	}
`;

const MultipleTertiaryItemTextWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 70%;
	padding-bottom: 20px;

	.item-author {
		font-size: 14px;
		color: ${props => props.theme.color.gray};
	}

	${media.mediumDown`
		padding-bottom: 0px;
	`}
`;


const ChildrenWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 100%;
`;

const tertiaryGaDesktopEvent = (contentType: string, zoneIndex: number, permalink: string) => {
	return `[["Curation Module", "Modular Layout ${contentType} Click - Tertiary list - column ${zoneIndex + 1} of 3","${permalink})", {"metric15":1}]]`;
};

const tertiaryGaMobileEvent = (contentType: string, layoutGroup: string, permalink: string, itemIndex: number) => {
	return `[["Curation Module", "Mobile Modular Layout ${contentType} Click - list item ${itemIndex + 4} of 7 units", "${permalink}", {"metric15":1}]]`;
};


const zonePosition = (zoneSize: string) => {
	switch (zoneSize) {
		case 'box':
			return 'Secondary';
		case 'tall':
			return 'Tertiary';
		case 'big':
			return 'Primary';
		default:
			return 'Secondary';
	}
};

const regularGaDesktopEvent = (contentType: string,
	layoutGroup: string,
	zoneSize: string,
	zoneIndex: number,
	itemIndex: number,
	// $FlowFixMe
	itemsLength: number,
	zonesLength: number,
	permalink: string) => {
	// $FlowFixMe
	const positionType = layoutGroup === 'Modular' ? `${zonePosition(zoneSize)} - column` : 'position';
	// $FlowFixMe
	const firstItemInZoneClicked = itemIndex === 0;
	const positionIndexModifier = ((): number => {
		if (layoutGroup === 'Equal') {
			if (firstItemInZoneClicked) {
				return 1;
			}
			return 4;
		}
		return 1;
	})();
	const positionIndex = zoneIndex + positionIndexModifier;
	// $FlowFixMe
	const numberOfItemsOrZones = layoutGroup === 'Equal' && itemsLength === 6 ? itemsLength : zonesLength;
	// $FlowFixMe
	layoutGroup = layoutGroup === 'Equal' ? 'Classic' : layoutGroup;

	// $FlowFixMe
	return `[["Curation Module",
		"${layoutGroup} Layout ${contentType} Click - ${positionType} ${positionIndex} of ${numberOfItemsOrZones}", "${permalink}", {"metric15":1}]]`;
};

const regularGaMobileEvent = (contentType: string,
	layoutGroup: string,
	zoneSize: string,
	zoneIndex: number,
	itemIndex: number,
	// $FlowFixMe
	itemsLength: number,
	zonesLength: number,
	permalink: string) => {
	const positionType = layoutGroup === 'Modular' ? zonePosition(zoneSize) : 'list';
	const itemIdx = itemIndex + 1;
	let positionIndex;

	if (layoutGroup === 'Modular' && zoneSize === 'big') {
		positionIndex = 1; // always on top on mobile
	} else if (layoutGroup === 'Modular' && zoneSize === 'box') {
		positionIndex = 1 + itemIdx; // if box and Modular, always after the 1st
	// $FlowFixMe
	} else if (layoutGroup === 'Equal' && itemsLength > 4) {
		positionIndex = zoneIndex * 2 + itemIdx;
	} else if (layoutGroup === 'Equal') {
		positionIndex = zoneIndex + 1;
	} else {
		positionIndex = itemIdx;
	}

	// $FlowFixMe
	layoutGroup = layoutGroup === 'Equal' ? 'Classic' : layoutGroup;

	// $FlowFixMe
	return `[["Curation Module",
		"Mobile ${layoutGroup} Layout ${contentType} Click - ${positionType} item ${positionIndex} of ${itemsLength} units", "${permalink}", {"metric15":1}]]`;
};

type CurationItemComponentProps = {
	model: CurationItemProps,
	layoutGroup: string,
	isEditMode: boolean,
	isEditing: (model: *) => boolean,
	itemIndex: number,
	zoneIndex: number,
	zoneSize: string,
	cardOnBlur: (evt: MouseEvent, model: CurationItemProps, itemIndex: number, tertiaryIndex?: number) => mixed,
	cardOnClick: (evt: MouseEvent, model: CurationItemProps, itemIndex: number, tertiaryIndex?: number) => mixed,
	activeCard: *,
	activeItem: number | null,
	activeTertiary: number | null,
	disableAds?: boolean,
	draggable?: boolean,
	curationCustomOptions: CurationCustomOptions,
	layoutSpecificProps: *,
	numberOfItems: number,
	numberOfZones: number
}

const FrontPageCard = (props: CurationItemComponentProps) => {
	const { model,
		layoutGroup,
		isEditMode,
		isEditing,
		itemIndex,
		zoneIndex,
		zoneSize,
		cardOnBlur,
		cardOnClick,
		activeCard,
		activeItem,
		activeTertiary,
		disableAds,
		draggable,
		curationCustomOptions,
		layoutSpecificProps,
		numberOfItems,
		numberOfZones
	} = props;

	const {
		deleteItemModel,
		gridConfig,
		handleItemImageChange,
		saveCardStateChange,
		addEmptyItemsToTertiary,
		imageUploader,
		relinkItemModel,
		setItemsOnPaste,
		setCardSwapState
	} = layoutSpecificProps || {};

	const { isOnion,
		isSatire,
		hideAuthorInfo
	} = curationCustomOptions;

	const cardModel = model.items && model.hasChildren && zoneSize !== 'tall' ? model.items[0] : model;
	// $FlowFixMe
	const isEmptyCard = (isEmpty(cardModel) || cardModel.url) && isEditMode;
	// $FlowFixMe
	const isEmptyCardWithError = cardModel && cardModel.isInvalid;
	const isTertiaryWithChildren = cardModel.hasChildren && zoneSize === 'tall';
	let imageSizes = '(max-width: 450px) 100vw, (max-width: 850px) 240px, 420px';

	if (zoneSize === 'big') {
		imageSizes = '(max-width: 450px) 100vw, (max-width: 850px) 800px, 800px';
	}

	if (zoneSize === 'hero') {
		imageSizes = '(max-width: 320px) 100vw, (max-width: 850px) 100vw, 100vw';
	}

	const headlineClass = (headline: string) => {
		const headlineLength = headline.length;
		const h = 'headline';

		if (headlineLength < 21) {
			return `short-${h}`;
		} else if (headlineLength < 105) {
			return `medium-${h}`;
		} else {
			return `long-${h}`;
		}
	};

	/* eslint-disable no-nested-ternary */
	return <Card
		deleteItemModel={deleteItemModel}
		handleItemImageChange={handleItemImageChange}
		imageUploader={imageUploader}
		isEditMode={isEditMode}
		isEditing={isEditing(cardModel)}
		itemIndex={itemIndex}
		model={cardModel}
		onBlur={event => !isTertiaryWithChildren ? cardOnBlur(event, cardModel, itemIndex) : null}
		onClick={event => !isTertiaryWithChildren ? cardOnClick(event, cardModel, itemIndex) : null}
		relinkItemModel={relinkItemModel}
		withToolbar
		zoneIndex={zoneIndex}
		draggable={draggable}
		saveCardStateChange={saveCardStateChange}
		setCardSwapState={setCardSwapState}
		multipleItems={model.hasChildren}
	>
		{({
			EmptyCard,
			StoryCard,
			Toolbar,
			cardState,
			handleEditableContent,
			handleEditableContentInput,
			isEditMode,
			isEditing,
			model
		}) => {
			const showTertiaryAddItemsButton = zoneSize === 'tall' && isEditMode;
			// EMPTY CARD
			if (isEmptyCard) {
				return (
					<React.Fragment>
						<EmptyCard
							isEditMode={isEditMode}
							setItemsOnPaste={setItemsOnPaste}
							itemIndex={itemIndex}
							zoneIndex={zoneIndex}
							url={model ? model.url : null}
							fullHeight
						/>
						{showTertiaryAddItemsButton && <AddItemsButtonWrapper>
							<Button19
								data-itemindex={itemIndex}
								data-zoneindex={zoneIndex}
								onClick={addEmptyItemsToTertiary}
								data-togglemultiple={true}
								data-childrentogglebutton={true}
								icon={<CurationTertiaryFour />}
								isSmall
							/>
						</AddItemsButtonWrapper>}
					</React.Fragment>
				);

			// EMPTY CARD WITH ERROR
			} else if (isEmptyCardWithError) {
				return (
					<EmptyCard
						error={model.error}
						errorMessage={model.errorMessage}
						isEditMode={isEditMode}
						isInvalid={model.isInvalid}
						itemIndex={itemIndex}
						setItemsOnPaste={setItemsOnPaste}
						zoneIndex={zoneIndex}
						fullHeight
					/>
				);
			// TERTIARY WITH CHILDREN
			} else if (isTertiaryWithChildren) {
				// map all child items
				const tertiaryChildren = model.items.map((model, index) => {
					const {id,
						headline,
						permalink,
						securePermalink,
						author,
						authors = []
					} = model;

					const isAnimated = model.curationImage
						? model.curationImage.format.toUpperCase() === 'GIF' : false;
					const isEmptyCard = isEmpty(model) || model.url;
					const isEmptyCardWithError = model && model.isInvalid;

					if (isEmptyCard) {
						return (<EmptyCard
							key={shortid.generate()}
							isEditMode={isEditMode}
							setItemsOnPaste={setItemsOnPaste}
							itemIndex={itemIndex}
							zoneIndex={zoneIndex}
							tertiaryChildIndex={index}
							url={model ? model.url : null}
						/>);
					} else if (isEmptyCardWithError) {
						return (<EmptyCard
							error={model.error}
							errorMessage={model.errorMessage}
							isEditMode={isEditMode}
							isInvalid={model.isInvalid}
							itemIndex={itemIndex}
							setItemsOnPaste={setItemsOnPaste}
							zoneIndex={zoneIndex}
							tertiaryChildIndex={index}
						/>);
					} else {
						const authorValue = authors && authors.length ? authors[0] : author;
						const authorUrl = `https://kinja.com/${authorValue.screenName}`;
						const postBlogGroup = getPostBlogGroupFromPost(model);
						const showAuthorOrByline = !isSatire;
						const articleHref = (permalink || securePermalink || '');
						const activeToolbar = activeItem === itemIndex && activeTertiary === index;
						return (
							<StoryCard
								id={id}
								key={shortid.generate()}
								cardState={cardState}
								isEditMode={isEditMode}
								isEditing={isEditing}
								itemIndex={itemIndex}
								model={model}
								zoneIndex={zoneIndex}
								postBlogGroup={postBlogGroup}
								isTertiaryChild
								onBlur={event => cardOnBlur(event, cardModel, itemIndex, index)}
								onClick={event => cardOnClick(event, cardModel, itemIndex, index)}
								activeTertiary={activeTertiary}
								activeCard={activeCard !== null}
								index={index}
							>
								<React.Fragment>
									{isEditing && activeToolbar && <Toolbar tertiaryChildIndex={index} />}
									<MultipleTertiaryItemWrapper isSatire={isSatire} isOnion={isOnion}
										data-commerce-source="curation">
										<Image id={model.curationImage && model.curationImage.id}
											format={model.curationImage && model.curationImage.format}
											sizes={
												'(max-width: 450px) 100vw, (max-width: 850px) 420px, 420px'}
											croppedImage
											relative
											noAnimate={!isAnimated}
											withSrcset
											href={articleHref}
											isEditMode={isEditMode}
											ga={!isEditMode &&
											tertiaryGaDesktopEvent('Story',
												zoneIndex, articleHref)}
											gaMobile={!isEditMode && tertiaryGaMobileEvent('Story',
												layoutGroup,
												articleHref,
												index)}
										/>
										<MultipleTertiaryItemTextWrapper>
											<Headline
												value={headline}
												error={model.invalidTitle}
												permalink={permalink}
												securePermalink={securePermalink}
												isEditable
												isEditing={isEditMode}
												tertiaryChildIndex={index}
												handleEditableContent={handleEditableContent}
												handleEditableContentInput={handleEditableContentInput}
												tag={'h5'}
												withPermalink={!isEditMode}
												truncateAt={isSatire ? 118 : 100}
												layoutGroup={gridConfig.layout.group}
												isSatire={isSatire}
												ga={!isEditMode &&
												tertiaryGaDesktopEvent('Story',
													zoneIndex,
													articleHref)}
												gaMobile={!isEditMode &&
												tertiaryGaMobileEvent('Story',
													layoutGroup,
													articleHref,
													index)}
											/>
											{showAuthorOrByline && (
												<div className='content-meta__byline'>
													{model.showByline && model.byline ? (
														<span>{model.byline}</span>
													) : !hideAuthorInfo ? (
														<div className='item-author'>
															<Author author={authorValue}
																withPermalink={!isEditMode}
																ga={!isEditMode &&
																tertiaryGaDesktopEvent('Author',
																	zoneIndex,
																	authorUrl)}
																gaMobile={!isEditMode &&
																tertiaryGaMobileEvent('Author',
																	layoutGroup,
																	authorUrl,
																	index)}
															/>
														</div>
													) : null}
												</div>
											)}
										</MultipleTertiaryItemTextWrapper>
									</MultipleTertiaryItemWrapper>
								</React.Fragment>
							</StoryCard>);
					}
				});

				return (<TertiaryWithItemsWrapper
					className='js_curation-tertiary-child-item'
					data-id={model.id || null}>
					{!isEditMode && !disableAds &&
						<MobileAdContainer>
							<InlineAdContainer hideBorder>
								<MobileCurationAd />
							</InlineAdContainer>
						</MobileAdContainer>
					}
					<Headline
						value={model.headline}
						isEditable
						isEditing={isEditMode}
						handleEditableContent={handleEditableContent}
						handleEditableContentInput={handleEditableContentInput}
						tag={'h5'}
						withPermalink={false}
						truncateAt={100}
						layoutGroup={gridConfig.layout.group}
						error={model.invalidTitle}
					/>
					<ChildrenWrapper>{tertiaryChildren}</ChildrenWrapper>
					{showTertiaryAddItemsButton && <AddItemsButtonWrapper>
						<Button19
							data-itemindex={itemIndex}
							data-zoneindex={zoneIndex}
							data-togglemultiple={false}
							data-childrentogglebutton={true}
							onClick={addEmptyItemsToTertiary}
							icon={<CurationTertiaryOne />}
							isSmall
						/>
					</AddItemsButtonWrapper>}
				</TertiaryWithItemsWrapper>);

			// REGULAR CARD
			} else {
				const headlineClasses
					= `content-meta__headline ${model.headline ? headlineClass(model.headline) : ''}`;
				const { id,
					headline,
					permalink,
					securePermalink,
					author,
					authors = [],
					plainTextExcerpt
				} = model;
				const postBlogGroup = getPostBlogGroupFromPost(model);
				const isAnimated = model.curationImage
					? model.curationImage.format && model.curationImage.format.toUpperCase() === 'GIF' : false;
				const authorValue = authors && authors.length ? authors[0] : author;
				// NOTE: This can still be a placeholder. You have to remove a card then exit edit mode, and bumm everything here is undefined.
				const authorUrl = authorValue ? `https://kinja.com/${''}` : '#';
				const articleHref = (permalink || securePermalink || '');
				const storyTypeUrl = model.storyType ?
					`https://${model.defaultBlogHost}/c/${model.storyType.canonical}` : '';
				const showAuthorOrByline = !isOnion;
				const showReadMoreOrExcerpt = zoneSize === 'tall' || zoneSize === 'big';
				const truncHeadlineChar = zoneSize === 'box' ? 118 : 150;

				return (
					<div
						className={classnames('curation-module__item js_curation-item', {
							[zoneSize]: true
						})}
						data-id={model.id || null}
						data-commerce-source="curation"
					>
						{isEditing && Toolbar && !model.hasChildren ? <Toolbar /> : null}
						<StoryCard
							id={id}
							cardState={cardState}
							isEditMode={isEditMode}
							isEditing={isEditing}
							itemIndex={itemIndex}
							model={model}
							zoneIndex={zoneIndex}
							postBlogGroup={postBlogGroup}
						>
							{layoutGroup === 'Equal' ? (
								<div className='curation-module__item__wrapper'>
									<Image id={model.curationImage && model.curationImage.id}
										format={model.curationImage && model.curationImage.format}
										sizes={'(max-width: 450px) 100vw, (max-width: 850px) 800px, 420px'}
										croppedImage
										noAnimate={!isAnimated}
										withSrcset
										title={headline}
										href={articleHref}
										isEditMode={isEditMode}
										ga={!isEditMode &&
										regularGaDesktopEvent('Story',
											layoutGroup,
											zoneSize,
											zoneIndex,
											itemIndex,
											numberOfItems,
											numberOfZones,
											articleHref)}
										gaMobile={!isEditMode &&
										regularGaMobileEvent('Story',
											layoutGroup,
											zoneSize,
											zoneIndex,
											itemIndex,
											numberOfItems,
											numberOfZones,
											articleHref)}
									/>
									<div className='content-wrapper'>
										{model.storyType && gridConfig.items && (
											<div className='content-meta__storyType'>
												<StoryType
													storyType={model.storyType}
													withPermalink={!isEditMode}
													tall
													large
													ga={!isEditMode &&
													regularGaDesktopEvent('Story Type',
														layoutGroup,
														zoneSize,
														zoneIndex,
														itemIndex,
														gridConfig.items.length,
														numberOfZones,
														storyTypeUrl)}
													gaMobile={!isEditMode &&
													regularGaMobileEvent('Story Type',
														layoutGroup,
														zoneSize,
														zoneIndex,
														itemIndex,
														numberOfItems,
														numberOfZones,
														storyTypeUrl)}
												/>
											</div>
										)}
										<div className={headlineClasses}>
											<Headline
												value={headline}
												error={model.invalidTitle}
												permalink={permalink}
												securePermalink={securePermalink}
												isEditable
												isEditing={isEditMode}
												handleEditableContent={handleEditableContent}
												handleEditableContentInput={handleEditableContentInput}
												tag={'h6'}
												withPermalink={!isEditMode}
												truncateAt={truncHeadlineChar}
												layoutGroup={layoutGroup}
												ga={!isEditMode &&
													regularGaDesktopEvent('Story',
														layoutGroup,
														zoneSize,
														zoneIndex,
														itemIndex,
														numberOfItems,
														numberOfZones,
														articleHref)}
												gaMobile={!isEditMode &&
												regularGaMobileEvent('Story',
													layoutGroup,
													zoneSize,
													zoneIndex,
													itemIndex,
													numberOfItems,
													numberOfZones,
													articleHref)}
											/>
										</div>
										{showAuthorOrByline && (
											<div className='content-meta__byline'>
												{model.showByline && model.byline ? (
													<span>{model.byline}</span>
												) : !hideAuthorInfo ? (
													<div className='item-author'>
														<Author author={authorValue}
															withPermalink={!isEditMode}
															ga={!isEditMode &&
															regularGaDesktopEvent('Author',
																layoutGroup,
																zoneSize,
																zoneIndex,
																itemIndex,
																numberOfItems,
																numberOfZones,
																authorUrl)}
															gaMobile={!isEditMode &&
															regularGaMobileEvent('Author',
																layoutGroup,
																zoneSize,
																zoneIndex,
																itemIndex,
																numberOfItems,
																numberOfZones,
																authorUrl)}
														/>
													</div>
												) : null}
											</div>
										)}
									</div>
								</div>
							) : isOnion ? (
								<div className='curation-module__item__wrapper'>
									<Image id={model.curationImage && model.curationImage.id}
										format={model.curationImage && model.curationImage.format}
										sizes={imageSizes}
										noAnimate={!isAnimated}
										withSrcset
										href={articleHref}
										title={headline}
										isEditMode={isEditMode}
									/>
									<div className='content-wrapper'>
										{model.storyType ? zoneSize === 'hero' && (
											<div className='content-meta__storyType'>
												<StoryType
													storyType={model.storyType}
													withPermalink={!isEditMode}
													outlined
													tall
													ga={!isEditMode &&
													regularGaDesktopEvent('Story Type',
														layoutGroup,
														zoneSize,
														zoneIndex,
														itemIndex,
														numberOfItems,
														numberOfZones,
														storyTypeUrl)}
													gaMobile={!isEditMode &&
													regularGaMobileEvent('Story Type',
														layoutGroup,
														zoneSize,
														zoneIndex,
														itemIndex,
														numberOfItems,
														numberOfZones,
														storyTypeUrl)}
												/>
											</div>
										) : null}
										<div className={headlineClasses}>
											<Headline
												value={headline}
												error={model.invalidTitle}
												permalink={permalink}
												securePermalink={securePermalink}
												isEditable
												isEditing={isEditMode}
												handleEditableContent={handleEditableContent}
												handleEditableContentInput={handleEditableContentInput}
												tag={zoneSize !== 'box' && zoneSize !== 'tall' ? 'h3' : 'h6'}
												withPermalink={!isEditMode}
												truncateAt={zoneSize !== 'box' &&
													zoneSize !== 'tall' ? 150 : truncHeadlineChar}
												layoutGroup={layoutGroup}
												ga={!isEditMode &&
													regularGaDesktopEvent('Story', layoutGroup,
														zoneSize,
														zoneIndex,
														itemIndex,
														numberOfItems,
														numberOfZones,
														articleHref)}
												gaMobile={!isEditMode &&
												regularGaMobileEvent('Story', layoutGroup,
													zoneSize,
													zoneIndex,
													itemIndex,
													numberOfItems,
													numberOfZones,
													articleHref)}
											/>
										</div>
										{showReadMoreOrExcerpt && (
											<div className='content-meta__excerpt'>
												<Excerpt
													value={plainTextExcerpt}
													isEditable
													isEditing={isEditing}
													truncateAt={370}
													handleEditableContent={handleEditableContent}
													handleEditableContentInput={handleEditableContentInput}
												/>
											</div>
										)}
										{showReadMoreOrExcerpt && (
											<div className='content-meta__byline'>
												<ReadMore withPermalink={!isEditMode} href={articleHref} />
											</div>
										)}
									</div>
								</div>
							) : (
								<div className='curation-module__item__wrapper'>
									<Image id={model.curationImage && model.curationImage.id}
										format={model.curationImage && model.curationImage.format}
										sizes={imageSizes}
										noAnimate={!isAnimated}
										withSrcset
										href={articleHref}
										title={headline}
										isEditMode={isEditMode}
										ga={!isEditMode &&
										regularGaDesktopEvent('Story',
											layoutGroup,
											zoneSize,
											zoneIndex,
											itemIndex,
											numberOfItems,
											numberOfZones,
											articleHref)}
										gaMobile={!isEditMode &&
										regularGaMobileEvent('Story',
											layoutGroup,
											zoneSize,
											zoneIndex,
											itemIndex,
											numberOfItems,
											numberOfZones,
											articleHref)}
									/>
									<div className='content-wrapper'>
										{model.storyType ? (zoneSize !== 'box' && zoneSize !== 'tall') && (
											<div className='content-meta__storyType'>
												<StoryType storyType={model.storyType}
													withPermalink={!isEditMode}
													outlined
													tall
													dark={zoneSize === 'hero'}
													ga={!isEditMode &&
													regularGaDesktopEvent('Story Type',
														layoutGroup,
														zoneSize,
														zoneIndex,
														itemIndex,
														numberOfItems,
														numberOfZones,
														storyTypeUrl)}
													gaMobile={!isEditMode &&
														regularGaMobileEvent('Story Type',
															layoutGroup,
															zoneSize,
															zoneIndex,
															itemIndex,
															numberOfItems,
															numberOfZones,
															storyTypeUrl)}
												/>
											</div>
										) : null}
										<div className={headlineClasses}>
											<Headline
												value={headline}
												error={model.invalidTitle}
												permalink={permalink}
												securePermalink={securePermalink}
												isEditable
												isEditing={isEditMode}
												handleEditableContent={handleEditableContent}
												handleEditableContentInput={handleEditableContentInput}
												tag={zoneSize !== 'box' && zoneSize !== 'tall' ? 'h3' : 'h6'}
												withPermalink={!isEditMode}
												truncateAt={zoneSize !== 'box' &&
													zoneSize !== 'tall' ? 150 : truncHeadlineChar}
												layoutGroup={layoutGroup}
												ga={!isEditMode &&
												regularGaDesktopEvent('Story', layoutGroup,
													zoneSize,
													zoneIndex,
													itemIndex,
													numberOfItems,
													numberOfZones,
													articleHref)}
												gaMobile={!isEditMode &&
												regularGaMobileEvent('Story',
													layoutGroup,
													zoneSize,
													zoneIndex,
													itemIndex,
													numberOfItems,
													numberOfZones,
													articleHref)}
											/>
										</div>
										{zoneSize === 'tall' && (
											<div className='content-meta__excerpt'>
												<Excerpt
													value={plainTextExcerpt}
													isEditable
													isEditing={isEditing}
													truncateAt={370}
													handleEditableContent={handleEditableContent}
													handleEditableContentInput={handleEditableContentInput}
												/>
											</div>
										)}
										<div className='content-meta__byline'>
											{model.showByline && model.byline ? (
												<span>{model.byline}</span>
											) : !hideAuthorInfo ? (
												<div className='item-author'>
													<Author author={authorValue}
														withPermalink={!isEditMode}
														ga={!isEditMode &&
														regularGaDesktopEvent('Author',
															layoutGroup,
															zoneSize,
															zoneIndex,
															itemIndex,
															numberOfItems,
															numberOfZones,
															authorUrl)}
														gaMobile={!isEditMode &&
														regularGaMobileEvent('Author',
															layoutGroup,
															zoneSize,
															zoneIndex,
															itemIndex,
															numberOfItems,
															numberOfZones,
															authorUrl)}
													/>
												</div>
											) : null}
										</div>
									</div>
								</div>)}
						</StoryCard>
						{showTertiaryAddItemsButton && <AddItemsButtonWrapper>
							<Button19
								data-itemindex={itemIndex}
								data-zoneindex={zoneIndex}
								data-togglemultiple={true}
								onClick={addEmptyItemsToTertiary}
								data-childrentogglebutton={true}
								icon={<CurationTertiaryFour />}
								isSmall
							/>
						</AddItemsButtonWrapper>}
					</div>
				);
			}
		}}
	</Card>;
	/* eslint-enable no-nested-ternary */
};

export default FrontPageCard;
