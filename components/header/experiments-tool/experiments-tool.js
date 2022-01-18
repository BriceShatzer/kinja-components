// @flow
import * as React from 'react';
import Flask from '../../icon19/Flask';
import Reload from '../../icon19/Reload';
import ExternalLink from '../../icon19/ExternalLink';
import Close24 from '../../icon19/Close24';
import Toggle, { type ToggleInjectedProps } from '../../hoc/toggle';
import type { CustomFeature } from 'kinja-magma/utils/getCustomFeatures';
import styled from 'styled-components';
import { IconCircle } from '../../icon19/icon19';
import { IconWrapper } from '../../icon19/icon19';
import media from '../../../style-utils/media';
import { lighten } from 'polished';

const Container = styled.div`
	overflow: visible;
	position: relative;

	&:hover {
		color: ${props => props.theme.color.primary};
	}
`;

const IconContainer = styled.div`
	display: flex;
	align-items: center;

	${media.mediumDown`
		${props => props.featuresCount > 0 && `
			&::before {
				content: '${props.featuresCount}';
				position: absolute;
				right: 0px;
				top: 0px;
				background: ${props.theme.color.error};
				display: block;
				border-radius: 50%;
				color: ${props.theme.color.white}
				font-size: 12px;
				font-weight: 600;
				line-height: 16px;
				width: 16px;
				height: 16px;
				text-align: center;
			}
		`}
	`}
`;

const IconDescription = styled.span`
	display: none;
	${media.largeUp`
		display: inline;
	`}
`;

const Dropdown = styled.div`
	position: absolute;
	top: calc(100% + 8px);
	right: 0;
	width: 380px;
	background: ${props => props.theme.color.white};
	border-radius: 5px;
	z-index: 99;
	border: 1px solid ${props => props.theme.color.lightgray};
	cursor: default;
	display: flex;
	flex-direction: column;

	${media.mediumDown`
		position: fixed;
		width: 100vw;
		height: 100vh;
		top: 0;
		border-style: none;
		box-shadow: unset;
		overflow-y: scroll;
		-webkit-overflow-scrolling: touch;
		border-radius: 0;
	`}
`;

const DropdownMobileHeader = styled.header`
	border-top: 4px solid ${props => props.theme.color.primary};
	padding: 16px;
	justify-content: space-between;
	font-size: 21px;
	font-weight: 600;
	line-height: 27px;
	display: none;
	color: ${props => props.theme.color.darksmoke};

	${media.mediumDown`
		display: flex;
	`}
`;

const SectionHeader = styled.h1`
	background: ${props => props.theme.color.whitesmoke};
	color: ${props => props.theme.color.darkgray};
	text-transform: uppercase;
	font-size: 14px;
	line-height: 21px;
	margin: 0;
	display: flex;
	justify-content: space-between;
`;

const SectionHeaderName = styled.span`
	padding: 8px 16px;
`;

const List = styled.ul`
	padding: 0 16px;
	margin: 0;
`;

const Item = styled.li`
	padding: 16px 0;
	border-bottom: 1px solid ${props => props.theme.color.whitesmoke};
	font-size: 14px;
	line-height: 17px;
	color: ${props => props.theme.color.gray};

	&:last-child {
		border-bottom: none;
	}
`;

const ItemHeader = styled.h2`
	font-size: 16px;
	line-height: 21px;
	color: ${props => props.theme.darksmoke};
	margin: 0;
`;

const DeleteButton = styled.button`
	color: ${props => props.theme.color.error};
	display: flex;
	text-transform: none;
	padding: 8px 16px;
	cursor: pointer;
	font-size: 14px;
	line-height: 21px;

	${IconWrapper} {
		margin-right: 4px;
	}

	&:hover,
	&:active,
	&:focus {
		color: ${props => props.theme.color.error};
		text-decoration: none;
		background-color: ${props => lighten(0.5, props.theme.color.error)};
	}
`;

const Footer = styled.footer`
	background-color: ${props => props.theme.color.whitesmoke};
	color: ${props => props.theme.color.gray};
	padding: 8px 16px;
	font-size: 14px;
	line-height: 21px;

	${media.mediumDown`
		flex-grow: 1;
	`}
`;

const DashboardLink = styled.a`
	padding-bottom: 8px;
	margin-bottom: 8px;
	border-bottom: 1px solid ${props => props.theme.color.lightgray};
	display: flex;

	${IconWrapper} {
		margin-right: 4px;
	}

	&:last-child {
		padding-bottom: 0;
		margin-bottom: 0;
		border-bottom: none;
	}
`;

type Props = {
	features: Array<CustomFeature>,
	isSuperuser: boolean
} & ToggleInjectedProps

function reloadPageWithQuery(query: string) {
	if (typeof window === 'undefined') {
		return;
	}
	window.location.search = query;
}

function onDelete(features: Array<string>) {
	const querystring = '?' + features.map(f => `${f}=_`).join('&');
	reloadPageWithQuery(querystring);
}

export function ExperimentsTool(props: Props) {
	const { features, isOpen, toggle, close, insideReference, isSuperuser } = props;
	const manualFeatures = features.filter(fs => fs.source === 'USER');
	const abtestFeatures = features.filter(fs => fs.source === 'EXPERIMENT');
	const description = `${features.length} active experiment${features.length > 1 ? 's' : ''}`;

	const footerItems = [
		...(isSuperuser ? [(
			<DashboardLink href="https://kinja.com/features" target="_blank" key="features-link">
				<ExternalLink /> All available feature switches
			</DashboardLink>
		)] : []),
		...(abtestFeatures.length > 0 ? [<span key="goonly">Only G/O Media staff sees this</span>] : [])
	];

	return (
		<Container ref={insideReference}>
			<IconContainer onClick={toggle} featuresCount={features.length}>
				<IconCircle icon={Flask} />
				<IconDescription>{description}</IconDescription>
			</IconContainer>
			{isOpen && (
				<Dropdown>
					<DropdownMobileHeader>
						<IconContainer>
							<IconCircle icon={Flask} />
							{description}
						</IconContainer>
						<Close24 onClick={close} />
					</DropdownMobileHeader>
					{abtestFeatures.length > 0 && (
						<React.Fragment>
							<SectionHeader>
								<SectionHeaderName>
									{`${abtestFeatures.length} running A/B test${abtestFeatures.length > 1 ? 's' : ''}`}
								</SectionHeaderName>
								<DeleteButton onClick={() => reloadPageWithQuery('enable_experiments=off')}>
									<Reload /> Disable A/B tests
								</DeleteButton>
							</SectionHeader>
							<List>
								{abtestFeatures.map(feature => (
									<Item key={feature.name}>
										<ItemHeader>{feature.name}={feature.value}</ItemHeader>
										{feature.description}
									</Item>
								))}
							</List>
						</React.Fragment>
					)}
					{manualFeatures.length > 0 && (
						<React.Fragment>
							<SectionHeader>
								<SectionHeaderName>
									{`${manualFeatures.length} manually enabled FS${manualFeatures.length > 1 ? '-es' : ''}`}
								</SectionHeaderName>
								<DeleteButton onClick={() => onDelete(manualFeatures.map(f => f.name))}>
									<Reload /> Reset FS-es to default
								</DeleteButton>
							</SectionHeader>
							<List>
								{manualFeatures.map(feature => (
									<Item key={feature.name}>
										<ItemHeader>{feature.name}={feature.value}</ItemHeader>
										{feature.description}
									</Item>
								))}
							</List>
						</React.Fragment>
					)}
					{footerItems.length > 0 && (
						<Footer>
							{footerItems}
						</Footer>
					)}
				</Dropdown>
			)}
		</Container>
	);
}

export default Toggle(ExperimentsTool, { isOutsideClickEnabled: true });