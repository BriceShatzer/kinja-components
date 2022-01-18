// @flow //
import * as React from 'react';
import styled from 'styled-components';
import { some, isPlainObject } from 'lodash';

import Analytics, { type AnalyticsInjectedProps } from '../hoc/analytics';
import { EnsureDefaultTheme } from '../theme';

// $FlowFixMe
import Image from 'kinja-components/components/card/image';


// ICONS
import AddIcon from '../icon19/Plus';
import TrashcanIcon from '../icon19/Trashcan';

import Button from '../buttons';
import { Toggle, Select, Option, Textfield18 } from '../form';
import { SelectLabel } from '../form/select';
import { KinjaFormFieldWrapper } from '../form/textfield18/textfield';
import { capitalizeString, isEmptyAttribution, removeQueryStringParam } from '../../utils';

import { type InlineNodeJSON } from 'postbody/InlineNode';
type UrlErrors = {
	sourceLink?: boolean,
	creditLink?: boolean
};

type AttributionData = {
	index?: number,
	source: string,
	sourceLink?: string,
	label: string,
	credit: string,
	creditLink?: string
};

type AttributionEditorState = {
	caption: string,
	attributionData: Array<AttributionData>,
	syndicationRights: boolean,
	showErrors: boolean,
	urlErrors: Array<UrlErrors>
};

type OnCompleteProps = {
	caption: string,
	attributionNodes: Array<any>,
	syndicationRights: boolean
};

type AttributionEditorProps = {
	attribution: Array<AttributionData>,
	caption: string,
	image: {
		id: string,
		format?: string
	},
	syndicationRights?: boolean,
	exportInlineNodes: (html: HTMLElement) => Array<InlineNodeJSON>,
	onComplete: (data: OnCompleteProps) => void,
	onCancel: () => void,
	checkUrl: ({url: string}) => Promise<*>,
	urlValidationOn: boolean
} & AnalyticsInjectedProps;

const ImageAttributionWrapper = styled.div`
	figcaption {
		position: relative;
		font-family: ${props => props.theme.typography.headline.fontFamily};
		-webkit-font-smoothing: antialiased;
		color: ${props => props.theme.color.gray};
		font-size: 15px;
		line-height: 21px;
		text-align: left;
		margin-top: 0.5rem;
		display: block;
		&:last-child {
			margin-top: 0;
			color: ${props => props.theme.color.gray};
		}
	}
	span {
		-webkit-font-smoothing: antialiased;
	}

	.right {
		float: right;
	}

	.syndication-toggle {
		margin-bottom: 20px;
	}

	.left {
		float: left;
	}

	.help-link {
		cursor: help;
	}
`;

const AttributionFormContainer = styled.div`
	margin-top: 30px;
	max-width: 640px;
	position: relative;

	text-align: left;
	span {
		.error {
			color: ${props => props.theme.color.error};
		}
	}

	.single-row {
		position: relative;
		.remove-button {
			display: none;
		}
		.add-row-button {
			bottom: 5px;
			padding: 0 1rem !important;
			right: 0;
			svg {
				width: 11px;
				height: 11px;
				margin-right: 5px;
			}
		}
	}
	.multiple-rows {
		position: relative;
		.remove-button {
			position: absolute;
			bottom: 5px;
			right: 50px;
			height: 32px;
			line-height: 32px;
			padding: 0 14px;
			margin-left: 40px;
		}
	}
	.add-row-button {
		position: absolute;
		bottom: 5px;
		right: 0;
		height: 32px;
		line-height: 32px;
		padding: 0 6px;
	}
`;

const ImageAttributionFooter = styled.footer`
	input[type=submit] {
		border-radius: 21px;
	}
`;

export class ImageAttributionEditor extends React.Component<AttributionEditorProps, AttributionEditorState> {
	constructor(props: AttributionEditorProps) {
		super(props);
		const attributions = this.props.attribution.map((attribution: AttributionData, index) => ({ ...attribution, index }));
		this.state = {
			caption: this.props.caption !== '<br>' && this.props.caption !== '' ? this.props.caption : 'Include an image caption',
			attributionData: attributions.length ? attributions : [{ index: 0, label: '', source: '', credit: '' }],
			syndicationRights: this.props.syndicationRights || false,
			showErrors: false,
			urlErrors: []
		};
	}

	addEmptyRow = () => {
		this.props.ga('Post Editor', 'Add Additional Image Credit');
		const attributionData = [
			...this.state.attributionData,
			{
				label: '',
				source: '',
				credit: '',
				index: this.state.attributionData.length
			}
		];
		this.setState({ attributionData });
	};

	removeAttribution = (rowIndex: number) => {
		this.props.ga('Post Editor', 'Remove Image Credit');
		const attributionData = this.state.attributionData.filter((item: AttributionData) => item.index !== rowIndex);
		this.setState({
			attributionData
		});
	};

	updateAttributionFormRow = (newRow: AttributionData) => {
		const attributionData = this.state.attributionData.map(oldRow => (oldRow.index === newRow.index ? newRow : oldRow));
		this.setState({ attributionData });
	};

	toggleSyndicationRights = () => {
		const syndicationRights = !this.state.syndicationRights;
		this.setState({ syndicationRights });
	};

	getAttributionNodes = (): Array<{ label: string, credit: Array<InlineNodeJSON>, source: Array<InlineNodeJSON> }> =>
		this.state.attributionData
			.filter(({ label, credit, source }) => (label && credit) || (label && source))
			.map(({ label, credit, creditLink, source, sourceLink }) => {
				const creditNode = document.createElement('span');

				if (credit) {
					let creditHtml = credit;
					let creditUrl = creditLink;
					if (creditUrl && creditUrl !== '') {
						if (creditUrl.match(/_ga=/)) {
							creditUrl = removeQueryStringParam(creditUrl, '_ga');
						}

						creditHtml = `<a href="${creditUrl}" target="_blank">${credit}</a>`;
					}
					creditNode.innerHTML = creditHtml;
				}

				const sourceNode = document.createElement('span');
				if (source) {
					let sourceHtml = source;
					let sourceUrl = sourceLink;
					if (sourceUrl && sourceUrl !== '') {
						if (sourceUrl.match(/_ga=/)) {
							sourceUrl = removeQueryStringParam(sourceUrl, '_ga');
						}

						sourceHtml = `<a href="${sourceUrl}" target="_blank">${source}</a>`;
					}
					sourceNode.innerHTML = sourceHtml;
				}

				return {
					label,
					credit: this.props.exportInlineNodes(creditNode),
					source: this.props.exportInlineNodes(sourceNode)
				};
			});

	validateURLsForRow = async (rowData: AttributionData) => {
		const errors = {
			sourceLink: false,
			creditLink: false
		};
		const rowWithFinalUrls = Object.assign({}, rowData);
		const urlProtocolRegExp = /^(https?:|ftp:|#|\/)/;
		const emailProtocolRegExp = /^mailto:/;

		await Promise.all(Object.keys(errors).map(async type => {
			let urlToCheck = rowData[type];
			let isEmail = false;

			if (!urlToCheck) {
				errors[type] = false;
				return;
			}

			if (!urlProtocolRegExp.test(urlToCheck) && /@/.test(urlToCheck)) {
				if (!emailProtocolRegExp.test(urlToCheck)) {
					urlToCheck = 'mailto:' + urlToCheck;
				}

				isEmail = true;
			}

			if (!isEmail) {
				try {
					const { url } = await this.props.checkUrl({ url: encodeURIComponent(urlToCheck.trim()) });
					// We chose to rewrite links with the `url` property, which is the full, "normalized" address.
					// There's also a `location` property if there was a redirect;
					// we're currently ignoring it as it can ruin affiliate links.

					// The URL is valid
					errors[type] = false;

					rowWithFinalUrls[type] = url;
				} catch {
					// The URL does not exist
					errors[type] = true;
				}
			} else {
				rowWithFinalUrls[type] = urlToCheck;
			}
		}));

		return { rowWithFinalUrls, errors };
	}

	validateURLsForAllRows = async () => {
		const urlErrors = [];

		for (const [index, row] of this.state.attributionData.entries()) {
			const { rowWithFinalUrls, errors } = await this.validateURLsForRow(row);

			this.updateAttributionFormRow(rowWithFinalUrls);
			urlErrors[index] = errors;
		}

		return urlErrors;
	}

	shouldShowEmptyFieldError = () => {
		return this.state.attributionData.find((row: AttributionData) => (row.credit === '' && row.source === '') || row.label === '');
	}

	resetUrlErrors = (index: number, key: string) => {
		const urlErrors = this.state.urlErrors.slice(0);

		if (isPlainObject(urlErrors[index])) {
			urlErrors[index][key] = false;
		} else {
			urlErrors[index] = {[key]: false};
		}

		this.setState({urlErrors});
	}

	saveChanges = async () => {
		let urlErrors = [];

		if (this.props.urlValidationOn) {
			urlErrors = await this.validateURLsForAllRows();
		}

		const shouldShowErrors = some(urlErrors, row => some(row)) || this.shouldShowEmptyFieldError();

		if (shouldShowErrors && !isEmptyAttribution(this.state.attributionData)) {
			this.setState({ showErrors: true, urlErrors });
		} else {
			this.props.ga('Post Editor', 'Save Image Credit and Caption');
			const { caption, syndicationRights } = this.state;
			this.props.onComplete({
				caption: caption === 'Include an image caption' ? '' : caption,
				attributionNodes: this.getAttributionNodes(),
				syndicationRights
			});
		}
	};

	render() {
		const { image } = this.props;
		const EmptyRow = () => (
			<AttributionFormRow
				source={''}
				credit={''}
				label={''}
				removeAttribution={this.removeAttribution}
				updateRowData={this.updateAttributionFormRow}
				showErrors={this.state.showErrors}
				resetUrlErrors={() => {}}
				addEmptyRow={this.addEmptyRow}
				index={0}
				key="empty"
			/>
		);

		const DynamicButton = () => {
			const hasMultipleRows = this.state.attributionData.length > 1;
			return (
				<Button
					className="add-row-button"
					weight={'tertiary'}
					small={!hasMultipleRows}
					label={hasMultipleRows ? '' : 'Add Another'}
					icon={<AddIcon />}
					onClick={this.addEmptyRow}
					key="add-button"
				/>
			);
		};

		return (
			<EnsureDefaultTheme>
				<ImageAttributionWrapper id="image-component-wrapper">
					<>
						<Image
							noAnimate
							id={image && image.id}
							format={image && image.format}
							noLazy
							relative
							withPermalink={false}
							attributionData={this.getAttributionNodes()}
							caption={this.state.caption}
							isEditor
							captionOnBlur={captionEvent => {
								this.props.ga('Post Editor', 'Edit Image Caption', 'In Modal');
								const caption = captionEvent.length ? captionEvent : 'Include an image caption';
								this.setState({ caption });
							}}
							captionOnClick={event => {
								const { target } = event;
								const caption = target.innerHTML;
								if (caption === 'Include an image caption') {
									target.innerHTML = '';
								}
							}}
							withAttribution
							noLink
						/>
						<AttributionFormContainer>
							<div className="syndication-toggle">
								<Toggle
									checked={this.state.syndicationRights}
									name="syndicationRights"
									onChange={isToggled => {
										const toggleState = isToggled ? 'Toggle On' : 'Toggle Off';
										this.props.ga('Post Editor', 'Syndicate Image', toggleState);
										this.toggleSyndicationRights();
									}}
									label={
										<React.Fragment>
											Syndication: Toggle on if photo is from AP/Getty, or if image is original in-house art.&nbsp;
											<a
												className="help-link"
												target="_blank"
												rel="noopener noreferrer"
												href="https://sites.google.com/fusion.net/fusion-media-group-wiki/photo-credits"
											>
												Guidelines
											</a>
										</React.Fragment>
									}
								/>

							</div>
							<div className={this.state.attributionData.length > 1 ? 'multiple-rows' : 'single-row'}>
								{this.state.attributionData.length ? (
									this.state.attributionData.map((row: AttributionData, index: number) => (
										<AttributionFormRow
											index={index}
											credit={row.credit}
											source={row.source}
											creditLink={row.creditLink}
											sourceLink={row.sourceLink}
											label={row.label}
											showErrors={this.state.showErrors}
											urlErrors={this.state.urlErrors[index]}
											resetUrlErrors={this.resetUrlErrors}
											removeAttribution={() => this.removeAttribution(index)}
											updateRowData={this.updateAttributionFormRow}
											addEmptyRow={this.addEmptyRow}
											// eslint-disable-next-line react/no-array-index-key
											key={`${row.label || ''}${index}`}
										/>
									))
								) : (
									<EmptyRow />
								)}
								<DynamicButton />
							</div>
						</AttributionFormContainer>
					</>
					<ImageAttributionFooter className="js_modal-actions">
						<input type="button" onClick={this.props.onCancel} className="button secondary" value="Cancel" />
						<input onClick={this.saveChanges} type="submit" className="button" value="Save" />
					</ImageAttributionFooter>
				</ImageAttributionWrapper>
			</EnsureDefaultTheme>
		);
	}
}

const ImageAttributionRow = styled.div`
	&::after {
		visibility: hidden;
		display: block;
		font-size: 0;
		content: " ";
		clear: both;
		height: 0;
	}
	display: block;
	clear: both;
	position: relative;
	margin: 10px 0 35px;

	.attribution-form-textfields {
		float: left;
		&:last-of-type {
			margin-left: 20px;
		}
		label {
			span {
				color: ${props => props.theme.color.error} !important;
			}
		}
	}

	label:first-child {
		margin-left: 0;
		span {
			color: ${props => props.theme.color.darksmoke};
		}
		div:not(.select-component) {
			color: ${props => props.theme.color.error};
			-webkit-font-smoothing: antialiased;
		}
	}

	select {
		margin-left: 0;
	}
	${SelectLabel} {
		max-width: 120px;
	}
	.attribution-form-figcaption {
		float: left;
		width: inherit;
		margin: 0 10px;
		border-bottom: 1px solid ${props => props.theme.color.black};
	}
	label {
		width: inherit;
	}
	input[type="text"] {
		width: 230px;
		font-size: 1rem;
		line-height: 1.75rem;
		padding-top: 5px;
	}
`;

type AttributionFormRowProps = {
	index: number,
	credit: string,
	creditLink?: string,
	source: string,
	sourceLink?: string,
	label: string,
	showErrors: boolean,
	urlErrors?: UrlErrors,
	updateRowData: (oldRow: AttributionData) => void,
	removeAttribution: (rowId: number) => void,
	addEmptyRow: () => void,
	resetUrlErrors: (index: number, key: string) => void
};
const AttributionFormRow = (props: AttributionFormRowProps) => {
	const selectOptions = [
		<Option key="null" value="" stringRepresentation="Select Type" emptyValue />,
		<Option key="gif" value="gif" stringRepresentation="Gif" />,
		<Option key="graphic" value="graphic" stringRepresentation="Graphic" />,
		<Option key="illustration" value="illustration" stringRepresentation="Illustration" />,
		<Option key="image" value="image" stringRepresentation="Image" />,
		<Option key="photo" value="photo" stringRepresentation="Photo" />,
		<Option key="screenshot" value="screenshot" stringRepresentation="Screenshot" />
	];

	const errorTypes = {
		label: 'Select a Type',
		credit: 'Enter a credit',
		source: 'Enter a source',
		url: 'URL is invalid'
	};

	const shouldShowTextError = props.showErrors && props.credit === '' && props.source === '';
	const shouldShowLabelError = props.showErrors && props.label === '';
	const shouldShowUrlError = props.showErrors && props.urlErrors && some(props.urlErrors);
	return (
		<ImageAttributionRow>
			<KinjaFormFieldWrapper>
				<Select
					value={props.label ? props.label.toLowerCase() : ''}
					onChange={(newValue: string) => {
						props.updateRowData({ ...props, label: capitalizeString(newValue) });
					}}
					error={shouldShowLabelError ? errorTypes.label : ''}
				>
					{selectOptions}
				</Select>
			</KinjaFormFieldWrapper>
			<div className="attribution-form-textfields">
				<Textfield18
					label="Credit"
					placeholder="Author of image"
					name="credit"
					value={props.credit || ''}
					onChange={credit => {
						props.updateRowData({ ...props, credit });
					}}
					error={shouldShowTextError ? errorTypes.credit : ''}
				/>
				<Textfield18
					name="credit-url"
					type="text"
					label="Credit URL (optional)"
					placeholder="Paste URL from browser bar"
					value={props.creditLink || ''}
					onChange={creditLink => {
						props.updateRowData({ ...props, creditLink });
					}}
					onBlur={() => {props.resetUrlErrors(props.index, 'creditLink');}}
					error={(shouldShowUrlError && props.urlErrors && props.urlErrors.creditLink) ? errorTypes.url : ''}
				/>
			</div>
			<div className="attribution-form-textfields">
				<Textfield18
					label="Source"
					placeholder="Image licensor or copyright owner"
					name="source"
					value={props.source || ''}
					onChange={source => {
						props.updateRowData({ ...props, source });
					}}
					error={shouldShowTextError ? errorTypes.source : ''}
				/>
				<Textfield18
					name="source-url"
					type="text"
					label="Source URL (optional)"
					placeholder="Paste URL from browser bar"
					value={props.sourceLink || ''}
					onChange={sourceLink => {
						props.updateRowData({ ...props, sourceLink });
					}}
					onBlur={() => {props.resetUrlErrors(props.index, 'sourceLink');}}
					error={(shouldShowUrlError && props.urlErrors && props.urlErrors.sourceLink) ? errorTypes.url : ''}
				/>
			</div>
			<Button className="remove-button" weight="tertiary" onClick={props.removeAttribution} icon={<TrashcanIcon />} label="" />
		</ImageAttributionRow>
	);
};

export default Analytics(ImageAttributionEditor);
