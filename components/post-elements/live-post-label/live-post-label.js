// @flow

import React from 'react';
import styled, { keyframes } from 'styled-components';

import createTranslate from '../../translator';
import type { Locale } from 'kinja-magma/models/Locale';
import translations from './translations';

const rotate = keyframes`
	0% {
		opacity: 0;
	}

	25% {
		opacity: 1;
	}

	75% {
		opacity: 1;
	}

	100% {
		opacity: 0;
	}
`;

const Label = styled.span`
	font-size: ${props => props.withStackedLabel ? '10px' : '14px'};
	letter-spacing: ${props => props.withStackedLabel ? '0.21px' : 'inherit'};
	font-weight: bold;
	text-transform: uppercase;
	color: ${props => props.theme.color.error};

	&::before {
		display: ${props => props.withStackedLabel ? 'flex' :  'inline-block'};
		content: '';
		width: 10px;
		height: 10px;
		border-radius: 10px;
		background-color: ${props => props.theme.color.error};
		margin: ${props => props.withStackedLabel ? '0 auto' : '0 6px 0 0'};
		animation: ${rotate} 4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
	}
`;

type Props = {
	locale: Locale,
	withStackedLabel: boolean,
	className?: string
};

const LivePostLabel = (props: Props) => {
	const translate = createTranslate(translations, props.locale);
	const liveText = translate('Live');
	const className = props.className;

	return (
		<Label className={className} withStackedLabel={props.withStackedLabel}>
			{liveText}
		</Label>
	);
};

LivePostLabel.defaultProps = {
	locale: 'en-US',
	withStackedLabel: false
};


export default LivePostLabel;
