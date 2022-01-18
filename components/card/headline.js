/* @flow */

import * as React from 'react';
import truncate from 'html-truncate';
import Permalink from './permalink';
import styled from 'styled-components';
import { stripHTMLWithRegex } from '../../utils/string';

type Props = {
	value: string,
	permalink: string,
	securePermalink: string,
	isEditing: boolean,
	isEditable: boolean,
	layoutGroup: string,
	tag: string,
	truncateAt: number,
	withPermalink: boolean,
	tertiaryChildIndex?: number,
	error?: boolean,
	isSatire?: boolean,
	handleEditableContent: (data: { state: string, prev: string }, evt: *) => void,
	handleEditableContentInput: (data: { truncateAt: number }, evt: *) => void,
	ga?: Array<*>,
	gaMobile?: Array<*>
};

function getHeadlineBottomMargin(props) {
	if (props.isModularLayout) {
		if (props.isTertiaryHeadline) {
			return '5px';
		}
		return '1rem';
	}
	return 0;
}

const HeadlineWrapper = styled.section`
	padding: 0;
	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		margin-bottom: ${getHeadlineBottomMargin};
		font-weight: ${props => props.isTertiaryHeadline && !props.isSatire ? 'normal' : 'bold'};
		border-bottom: ${props => props.error ? `1px solid ${props.theme.color.error}` : 'none'};
	}
`;

const HeadlineError = styled.div`
	color: ${props => props.theme.color.error};
`;

class Headline extends React.Component<Props> {
	constructor(props: Props) {
		super(props);

		this.state = {
			error: this.props.error
		};
	}

	onClick = () => {
		if (this.state.error) {
			this.setState({
				error: false
			}, () => {
				this.headlineTag.focus();
			});
		}
	}

	render() {
		const {
			value,
			permalink,
			securePermalink,
			isEditing,
			isEditable,
			layoutGroup,
			tag,
			truncateAt = 0,
			withPermalink,
			tertiaryChildIndex,
			handleEditableContent,
			handleEditableContentInput,
			error,
			isSatire,
			ga,
			gaMobile,
			openInNewTab
		} = this.props || {};

		const isValidTag = tag => /^h[1-7]|div$/.test(tag);
		const HeadlineTag = isValidTag(tag) ? tag : 'h2';
		const title = value ? stripHTMLWithRegex(value) : '';
		const href = permalink ? permalink : securePermalink;
		const target = openInNewTab ? '_blank' : undefined;
		const isTertiaryHeadline = Boolean(tertiaryChildIndex) || tertiaryChildIndex === 0;
		const isModularLayout = layoutGroup === 'Modular';

		// don't show headline for old posts without one on server render
		if (!value && !isEditing) {
			return null;
		}

		if (!isEditing) {
			return (
				<Permalink
					title={title}
					href={href}
					unlink={!withPermalink}
					ga={ga}
					gaMobile={gaMobile}
					target={ target }
				>
					<HeadlineWrapper
						error={error}
						equalLayout={layoutGroup === 'Equal'}
						isTertiaryHeadline={isTertiaryHeadline}
						isModularLayout={isModularLayout} isSatire={isSatire}
					>
						<HeadlineTag dangerouslySetInnerHTML={{ __html: truncateAt ? truncate(value, truncateAt) : value }} />
					</HeadlineWrapper>
				</Permalink>
			);
		}

		if (isEditing && isEditable) {
			const onBlur = handleEditableContent && handleEditableContent.bind(null, {
				state: 'headline',
				prev: value,
				tertiaryChildIndex
			});
			const onInput = handleEditableContentInput && handleEditableContentInput.bind(null, {
				truncateAt
			});

			return (
				<HeadlineWrapper error={error}>
					{<HeadlineTag
						ref={headlineTag => {this.headlineTag = headlineTag;}}
						tabIndex={0}
						contentEditable
						onInput={onInput}
						onBlur={onBlur}
						onClick={this.onClick}
						dangerouslySetInnerHTML={{__html: truncateAt && !error && value ? truncate(value, truncateAt) : value}}
					/>}
					{error && <HeadlineError>Enter valid title</HeadlineError>}
				</HeadlineWrapper>
			);
		}
	}
}

export default Headline;
