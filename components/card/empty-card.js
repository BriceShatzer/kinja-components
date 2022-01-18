/* @flow */

import * as React from 'react';
import styled, { css } from 'styled-components';
import { EnsureDefaultTheme } from '../theme';
import { Loading } from '../elements/loader';

const EmptyCardWrapper = styled.div`
	&[data-emptycardactive="true"] {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		min-height: ${props => props.fullHeight ? '100%' : '100px'};
		margin-bottom: ${props => props.fullHeight ? '0' : '25px'};
		border: 1px solid;
		border-color: ${props => props.isInvalid && props.customError ? props.theme.color.error : props.theme.color.lightgray};
		padding: 25px;
		background-color: ${props => props.theme.color.white};

		input[type=text] {
			border-bottom: 1px solid;
			border-bottom-color: ${props => props.isInvalid && props.customError ? props.theme.color.error : props.theme.color.lightgray};
			min-width: 75%;
		}
		${props => props.customHeight && css`
			&& {
				min-height: 112px;
				margin-bottom: ${props => props.isInvalid && props.customError ? '50px' : '25px'};
			}
		`}
	}
`;

const ErrorWrapper = styled.div`
	color: ${props => props.theme.color.error};
`;

type Props = {
	isEditMode?: boolean,
	itemIndex: number,
	zoneIndex: number,
	isInvalid?: boolean,
	errorMessage: string,
	error: Object,
	url: string,
	customError?: any;
	setItemsOnPaste: (index: number, zoneindex: number, url: string, tertiaryIndex: number) => void,
	setItemsOnSubmit?: (index: number, url: string) => void,
	fullHeight: boolean,
	customHeight: boolean,
	tertiaryChildIndex: number
}

type State = {
	isLoading: boolean
}

type ErrorProps = {
	message: string
}

const Error = (props: ErrorProps) => {
	const { message } = props;
	return <ErrorWrapper>{message}</ErrorWrapper>;
};

class EmptyCard extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			isLoading: false
		};
	}

	setItemsOnPasteHandler = (event: SyntheticClipboardEvent<*>) => {
		const { index, zoneindex } = event.currentTarget.dataset;
		const url = event.clipboardData.getData('text');
		this.setState({
			isLoading: true
		});
		this.props.setItemsOnPaste(index, zoneindex, url, this.props.tertiaryChildIndex);
	}
	setItemsOnSubmitHandler = (event: SyntheticKeyboardEvent<*>) => {
		const { index } = event.currentTarget.dataset;
		const url = event.currentTarget.value;

		if (event.key === 'Enter' && this.props.setItemsOnSubmit) {
			this.setState({
				isLoading: true
			}, () => {
				if (this.props.setItemsOnSubmit) {
					this.props.setItemsOnSubmit(index, url);
				}
			});
		}
	}
	getErrorComponent(customError: any, errorMessage: string) {
		return customError ? customError({ message: errorMessage }) : <Error message={this.props.errorMessage} />;
	}
	render() {
		const { isEditMode, itemIndex, zoneIndex, isInvalid, url, fullHeight, customError, errorMessage, customHeight } = this.props;
		const { isLoading } = this.state;

		const errorProps = {
			customError,
			isInvalid
		};

		const inputValue = url ? url : '';

		return (
			<EnsureDefaultTheme>
				<EmptyCardWrapper customHeight={customHeight} fullHeight={fullHeight} data-emptycard={true} data-emptycardactive={isEditMode} {...errorProps}>
					{isEditMode && !isLoading &&
						<input
							onPaste={this.setItemsOnPasteHandler}
							onKeyDown={this.setItemsOnSubmitHandler}
							data-index={itemIndex}
							defaultValue={inputValue}
							data-zoneindex={zoneIndex}
							type='text'
							placeholder='ADD URL'/>
					}
					{isLoading && <Loading />}
					{isInvalid && this.getErrorComponent(customError, errorMessage)}
				</EmptyCardWrapper>
			</EnsureDefaultTheme>
		);
	}
}

export default EmptyCard;
