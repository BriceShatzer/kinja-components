// @flow
import * as React from 'react';
import styled, {css} from 'styled-components';

import { EnsureDefaultTheme } from '../../theme';

type Props = {
	html: string,
	error?: string,
	description: string,
	className?: string,
	onChange?: string => mixed
}

const CaptionContainer = styled.figcaption`
	width: 100%;
	min-width: 150px;
	padding-bottom: 0.1rem;
	border-bottom: ${props => props.theme.color.gray} 1px solid;
`;

const FieldDescription = styled.span`
	display: block;
	position: relative;
	top: 5px;
	transition: color 0.2s ease-in-out;
	color: ${props => props.theme.color.gray};
	line-height: 1.1rem;

	${props => props.error && css`
		color: ${props => props.theme.color.error};
		margin-bottom: 5px;
	`}
`;

class EditableCaption extends React.Component<Props> {
	htmlEl: ?HTMLElement;
	lastHtml: string;
	shouldComponentUpdate(nextProps: Props) {
		const { htmlEl } = this;

		if (!htmlEl) {
			return true;
		}
		return nextProps.html !== htmlEl.innerHTML || this.props.error !== nextProps.error;
	}

	componentDidUpdate() {
		const { htmlEl } = this;

		if (htmlEl && this.props.html !== htmlEl.innerHTML) {
			htmlEl.innerHTML = this.props.html;
		}
	}

	emitChange = () => {
		if (!this.htmlEl) {
			return;
		}
		const html = this.htmlEl.innerHTML;
		if (this.props.onChange && html !== this.lastHtml) {
			this.props.onChange(html);
		}
		this.lastHtml = html;
	}

	render() {
		const { error, description } = this.props;

		return (
			<EnsureDefaultTheme>
				<div className={this.props.className}>
					<CaptionContainer
						contentEditable
						onInput={this.emitChange}
						onBlur={this.emitChange}
						ref={e => this.htmlEl = e}
						dangerouslySetInnerHTML={{ __html: this.props.html }} />
					<FieldDescription error={!!error}>
						{error || description}
					</FieldDescription>
				</div>
			</EnsureDefaultTheme>
		);
	}
}

export default EditableCaption;
