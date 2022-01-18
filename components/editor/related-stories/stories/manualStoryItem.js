/* @flow */

import * as React from 'react';
import { EnsureDefaultTheme } from '../../../theme';
import styled from 'styled-components';

import type { FauxPost } from './../types';

// $FlowFixMe
import { EmptyCard } from '../../../card';
import { FloatingToolbar } from '../../../toolbar-floating';

type Props = {
	className?: string,
	itemIndex?: string,
	isInvalid?: boolean,
	errorMessage?: string,
	post?: FauxPost,
	setItemsOnPaste?: (url: string, itemIndex: string) => void
}

const CustomErrorWrapper = styled.div`
	color: ${props => props.theme.color.error};
	position: absolute;
	top: 120px;
	left: 0;
	width: 100%;
	z-index: 1;
	font-size: 0.9rem;
	line-height: 1.1rem;
`;

const StyledFloatingToolbar = styled(FloatingToolbar)`
	position: absolute;
	top: 2%;
	left: 2%;
	visibility: hidden;
	padding: 4px 0;
`;

const StoryItem = styled.div`
	flex: 0 1 31.5%;
	text-align: left;
	position: relative;
	width: 31.5%;
	
	&:hover {
		${StyledFloatingToolbar} {
			visibility: visible;
		}
	}
`;

type ErrorProps = {
	message: string
};

const CustomError = (props: ErrorProps) => {
	return <CustomErrorWrapper>{ props.message }</CustomErrorWrapper>;
};

const ManualStoryItem = (props: Props) => {

	const setItemsOnPaste = (index, zoneindex, url: string) => {
		if (props.setItemsOnPaste && props.itemIndex) {
			props.setItemsOnPaste(url, props.itemIndex);
		}
	};

	const setItemsOnSubmit = (index, url: string) => {
		if (props.setItemsOnPaste && props.itemIndex) {
			props.setItemsOnPaste(url, index);
		}
	};

	const permalink = props.post && props.post.permalink ? props.post.permalink : '';

	return (
		<EnsureDefaultTheme>
			<StoryItem className={props.className}>
				<EmptyCard
					className={props.className}
					url={permalink}
					isInvalid={props.isInvalid}
					errorMessage={props.errorMessage}
					itemIndex={props.itemIndex}
					setItemsOnPaste={setItemsOnPaste}
					setItemsOnSubmit={setItemsOnSubmit}
					customError={CustomError}
					customHeight={true}
					isEditMode={true} />
			</StoryItem>
		</EnsureDefaultTheme>
	);
};

export default ManualStoryItem;
