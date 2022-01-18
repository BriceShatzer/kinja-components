// @flow

import * as React from 'react';
import { useState, useEffect } from 'react';

import styled from 'styled-components';

import media from 'kinja-components/style-utils/media';

const PANELS = [
	{
		name: 'Primary Panel',
		resources: [
			{
				name: '16:9 Aspect Ratio',
				resource: 'https://app.specless.tech/api/1/creative/snapshot/ptc8tD/0006/primary-panel.png?q=low'
			},
			{
				name: '1:1 Aspect Ratio',
				resource: 'https://app.specless.tech/api/1/creative/snapshot/ptc8tD/0006/primary-panel/1by1.png?w=450&h=450&q=low'
			},
			{
				name: '3:1 Aspect Ratio',
				resource: 'https://app.specless.tech/api/1/creative/snapshot/ptc8tD/0006/primary-panel/3by1.png?w=1200&h=400&q=low'
			}
		]
	},
	{
		name: 'Leave Behind',
		resources: [
			{
				name: 'Large',
				resource: 'https://serve.specless.tech/upload/1/creative/_opt:' +
						'c_crop,f_png,w_2793,h_152,x_988,y_2642/ptc8tD/assets/' +
						'ck7bu0f82000f___egcj8r9a_NationalGeographic_Superhero.png'
			},
			{
				name: 'Small',
				resource: 'https://serve.specless.tech/upload/1/creative/_opt:' +
						'c_crop,f_png,w_1903,h_152,x_1433,y_3035/ptc8tD/assets/' +
						'ck7bu0f82000f___egcj8r9a_NationalGeographic_Superhero.png'
			},
			{
				name: 'Wide',
				resource: 'https://serve.specless.tech/upload/1/creative/_opt:' +
						'c_crop,f_png,w_4187,h_151,x_291,y_2250/ptc8tD/assets/' +
						'ck7bu0f82000f___egcj8r9a_NationalGeographic_Superhero.png'
			}
		]
	}
];

const UnstyledHeader = ({ className, children }) => {
	return (
		<header className={className}>
			{children}
			<hr />
		</header>
	);
};
const Header = styled(UnstyledHeader)`
	width: 100%;

	h5 {
		text-align: center;
		margin: 0.5rem;
	}
	hr {
		margin-top: 0;
	}
`;

const UnstyledAdEditorSection = ({className, title, children }) => {
	return (<article className={ className }>
		<Header><h5>{ title }</h5></Header>
		{ children }
	</article>);
};
const AdEditorSection = styled(UnstyledAdEditorSection)`
	box-sizing: border-box;

	flex-grow: ${({ flexGrow }) => flexGrow};
	height: auto;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;

	box-shadow: 2px 0 5px 0 rgb(110, 110, 110);
`;

const UnstyledElem = ({className, title, imgUrl, onClick }) => {
	return (
		<section className={className} onClick={onClick}>
			<div>
				<Background />
				<picture>
					<img src={imgUrl} />
				</picture>
			</div>

			<header><h6>{ title }</h6></header>
		</section>
	);
};
const Elem = styled(UnstyledElem)`
	width: 112px;
	height: 112px;

	${media.largeUp`
		width: 130px;
    	height: 130px;
	`}

	${media.xlargeUp`
		width: 160px;
    	height: 160px;
	`}

	display: flex;
	flex-flow: column;
	justify-content: flex-start;
	align-items: center;

	> div {
		position: relative;
		width: 70%;
		height: 70%;
		display: flex;
		justify-content: center;
		flex-direction: column;
	}

	> header {
		border: 0;
		margin: 0;
		padding: 0.4rem;
		text-align: center;
		height: 30%;
		width: 100%;
	}

	> header h6 {
		font-size: 0.8rem;
		font-weight: thin;
		margin: 0;
	}
`;

const Background = styled.div`
	position: absolute;
	z-index: -1;
	width: 100%;
	height: 100%;
	border: 0;

	background-image: url('https://app.specless.tech/app/assets/img/checker.png');
	background-repeat: repeat;
	opacity: 0.05;
`;

const UnstyledPreview = ({ className, name, resource }) => (
	<section className={className}>
		<header><h6>{name}</h6></header>
		<picture>
			<img src={resource}/>
		</picture>
	</section>
);

const Preview = styled(UnstyledPreview)`
	h6 {
		padding-left: 1rem;
	}
`;

export type PANEL = {
    name: string;
    resources: {
        name: string;
        resource: string;
    }[];
}

export const AdEditor = ({ panels = PANELS }: { panels?: PANEL[] }) => {
	const [selectedPanel, setSelectedPanel] = useState(null);
	const [selectedLayout, setSelectedLayout] = useState(null);

	useEffect(setDefaultPanel, []);
	useEffect(setSelectedPanelDefaultLayout, [panels, selectedPanel]);

	return (
		<>
			<AdEditorSection flexGrow={1} title="Panels">
				{
					panels.map(({ name, resources }) => (
						<Elem
							key={name}
							onClick={() => setSelectedPanel(name)}
							title={name}
							imgUrl={ resources.length ? resources[0].resource : '' }
						/>
					))
				}
			</AdEditorSection>
			<AdEditorSection flexGrow={1} title="Layouts">
				<div>
					{
						panels
							.filter(filterSelectedPanel)
							.reduce(flattenLayouts, [])
							.map(({ name, resource }) => (
								<Elem
									key={name}
									onClick={() => setSelectedLayout(name)}
									title={name}
									imgUrl={ resource }
								/>
							))
					}
				</div>
			</AdEditorSection>
			<AdEditorSection flexGrow={20} title="Preview">
				{
					panels
						.filter(filterSelectedPanel)
						.reduce(flattenLayouts, [])
						.filter(filterSelectedLayout)
						.map(({ name, resource }) => (
							<Preview key={name} name={name} resource={resource}/>
						))
				}
			</AdEditorSection>
		</>
	);

	function setSelectedPanelDefaultLayout() {
		const layouts = panels.filter(filterSelectedPanel).reduce(flattenLayouts, []);
		const defaultLayout = layouts.length > 0 ? layouts[0] : null;

		if (!defaultLayout) { return; }
		setSelectedLayout(defaultLayout.name);
	}

	function setDefaultPanel() {
		const defaultPanel = panels.length > 0 ? panels[0] : null;

		if (!defaultPanel) { return; }
		setSelectedPanel(defaultPanel.name);
	}

	function filterSelectedPanel({ name }) {
		return name === selectedPanel;
	}

	function flattenLayouts(accum, { resources }) {
		return [...accum, ...resources];
	}

	function filterSelectedLayout({ name }) {
		return name === selectedLayout;
	}
};
