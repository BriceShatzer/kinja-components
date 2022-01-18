/* @flow */

import * as React from 'react';
import queryString from 'query-string';
import styled from 'styled-components';
import { Toggle } from '../form';

const ToggleContainer = styled.div`
	display: flex;
	flex-direction: column;

	.field {
		display: flex;
		flex-direction: row-reverse;
		justify-content: flex-start;
		margin-bottom: 32px;
		width: fit-content;

		.fielddescription {
			align-items: center;
			color: ${props => props.theme.color.black};
			display: inline-flex;
			margin-right: 10px;
			top: auto;
		}
	}
`;

const AdSwitch = () => {
	const { adzone, ...otherParams } = queryString.parse(location.search);

	const toggleAds = () => {
		if (!adzone) {
			location.search = queryString.stringify({ adzone: 'kinjatest' });
		} else {
			location.search = queryString.stringify(otherParams);
		}
	};

	return (
		<ToggleContainer>
			<Toggle checked={!!adzone} label="Activate ad zones" name="ad-zones-toggle" onChange={toggleAds} />
		</ToggleContainer>
	);
};

export default AdSwitch;
