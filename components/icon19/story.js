// @flow

import * as React from 'react';
import styled from 'styled-components';

import {
	storiesOf,
	withDocs
} from 'base-storybook';

import ComponentsGroupedBySize from './components.json';
import README from './README.md';
import { EnsureDefaultTheme } from '../theme';

function requireAll(requireContext) {
	const hash = {};

	requireContext.keys().forEach(key => {
		const moduleName = key.replace('./', '').replace('.js', '');
		hash[moduleName] = requireContext(key);
	});

	return hash;
}

const IconComponents = requireAll(require.context('./', false, /\.js$/));

const IconSizeTitle = styled.h3`
	font-size: 18px;
	margin: 22px 0;
	font-weight: normal;
	color: #666;
`;

const Definition = styled.section`
	border-bottom: dashed 1px ${props => props.theme.color.lightgray};
	padding-bottom: 40px;

	&:last-of-type {
		border: none;
	}
`;

const IconWrapper = styled.div`
	display: flex;
	align-items: center;
	border-radius: 5px;
	background-color: ${props => props.theme.color.whitesmoke};
	padding: 6px 10px;
	margin-bottom: 10px;
	position: relative;
	width: 100%;
	color: ${props => props.theme.color.darksmoke};
`;

const IconName = styled.span`
	margin-left: 26px;
`;

storiesOf('3. Elements|Icon19', module)
	.addDecorator(withDocs(README))
	.add('default', () => {
		const iconSizes = Object.keys(ComponentsGroupedBySize).sort();

		return <EnsureDefaultTheme>
			<div>
				{iconSizes.map(iconSize =>
					<Definition key={iconSize}>
						<div className="row">
							<IconSizeTitle>{iconSize}</IconSizeTitle>
							{ComponentsGroupedBySize[iconSize].map(iconName => {
								return (
									<div key={iconName} className="small-12 medium-6 large-4 columns">
										<IconWrapper>
											{React.createElement(IconComponents[iconName])}
											<IconName>{iconName}</IconName>
										</IconWrapper>
									</div>
								);
							})}
							<div className="small-12 medium-6 large-4 columns"/>
						</div>
					</Definition>
				)}
			</div>
		</EnsureDefaultTheme>;
	});
