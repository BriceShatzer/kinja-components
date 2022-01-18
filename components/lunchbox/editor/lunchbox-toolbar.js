// @flow
import * as React from 'react';
import styled from 'styled-components';
import LayoutToolbar from '../../toolbar-layout';
import type { LunchboxLayoutType } from 'kinja-magma/models/LunchboxLayoutGroup';
import Lunchbox from 'kinja-magma/models/Lunchbox';
import { EnsureDefaultTheme } from '../../theme';
import { LayoutToolbarSubWrapper, LayoutToolbarWrapper } from '../../toolbar-layout/toolbar-layout';

// ICONS
import LunchboxHeadlineIcon from '../../icon19/LunchboxHeadline';
import LunchboxTextIcon from '../../icon19/LunchboxText';
import LunchboxHeadlineTextIcon from '../../icon19/LunchboxHeadlineText';
import LunchboxImageIcon from '../../icon19/LunchboxImage';
import LunchboxImageFullbleedIcon from '../../icon19/LunchboxImageFullbleed';
import LunchboxImageParallaxIcon from '../../icon19/LunchboxImageParallax';
import LunchboxImageHeadlineTextIcon from '../../icon19/LunchboxImageHeadlineText';
import LunchboxHeadlineTextImageIcon from '../../icon19/LunchboxHeadlineTextImage';
import LunchboxTextImageIcon from '../../icon19/LunchboxTextImage';
import LunchboxHeadlineImageIcon from '../../icon19/LunchboxHeadlineImage';
import LunchboxImageHeadlineIcon from '../../icon19/LunchboxImageHeadline';
import LunchboxImageTextIcon from '../../icon19/LunchboxImageText';
import LunchboxHeroHeadlineTextIcon from '../../icon19/LunchboxHeroHeadlineText';
import LunchboxHeroHeadlineIcon from '../../icon19/LunchboxHeroHeadline';
import LunchboxHeroTextIcon from '../../icon19/LunchboxHeroText';
import LunchboxHeadlineHeroIcon from '../../icon19/LunchboxHeadlineHero';
import LunchboxTextHeroIcon from '../../icon19/LunchboxTextHero';
import LunchboxHeadlineTextHeroIcon from '../../icon19/LunchboxHeadlineTextHero';

const ICONS_BY_LAYOUT = {
	[Lunchbox.Layouts.Text.Header]: <LunchboxHeadlineIcon />,
	[Lunchbox.Layouts.Text.Paragraph]: <LunchboxTextIcon />,
	[Lunchbox.Layouts.Text.HeaderParagraph]: <LunchboxHeadlineTextIcon />,
	[Lunchbox.Layouts.Image.Inline]: <LunchboxImageIcon />,
	[Lunchbox.Layouts.Image.Bleed]: <LunchboxImageFullbleedIcon />,
	[Lunchbox.Layouts.Image.Parallax]: <LunchboxImageParallaxIcon />,
	[Lunchbox.Layouts.ImageText.Header.Left]: <LunchboxHeadlineImageIcon />,
	[Lunchbox.Layouts.ImageText.Header.Right]: <LunchboxImageHeadlineIcon />,
	[Lunchbox.Layouts.ImageText.Paragraph.Left]: <LunchboxTextImageIcon />,
	[Lunchbox.Layouts.ImageText.Paragraph.Right]: <LunchboxImageTextIcon />,
	[Lunchbox.Layouts.ImageText.HeaderParagraph.Left]: <LunchboxHeadlineTextImageIcon />,
	[Lunchbox.Layouts.ImageText.HeaderParagraph.Right]: <LunchboxImageHeadlineTextIcon />,
	[Lunchbox.Layouts.Hero.HeaderParagraph.ImageFirst]: <LunchboxHeroHeadlineTextIcon />,
	[Lunchbox.Layouts.Hero.HeaderParagraph.TextFirst]: <LunchboxHeadlineTextHeroIcon />,
	[Lunchbox.Layouts.Hero.Header.ImageFirst]: <LunchboxHeroHeadlineIcon />,
	[Lunchbox.Layouts.Hero.Header.TextFirst]: <LunchboxHeadlineHeroIcon />,
	[Lunchbox.Layouts.Hero.Paragraph.ImageFirst]: <LunchboxHeroTextIcon />,
	[Lunchbox.Layouts.Hero.Paragraph.TextFirst]: <LunchboxTextHeroIcon />
};

const LunchboxToolbarConfig = ({
	currentLayout,
	onClick,
	children
}: {
	currentLayout: LunchboxLayoutType,
	onClick: (props: { currentLayout: LunchboxLayoutType }) => void,
	children: (*) => React.Node
}) =>
	children({
		Image: {
			title: 'Image Only',
			icon: Lunchbox.Layouts.Image.include(currentLayout) ? ICONS_BY_LAYOUT[currentLayout] : ICONS_BY_LAYOUT[Lunchbox.Layouts.Image.Inline],
			onClick: () => {},
			active: Lunchbox.Layouts.Image.include(currentLayout),
			children: [
				{
					title: 'Inline',
					icon: ICONS_BY_LAYOUT[Lunchbox.Layouts.Image.Inline],
					children: [],
					// have to pass down a selected class on all these children
					// because toolbar-layout doesn't support the idea of a 'selected' item !?
					className: currentLayout === Lunchbox.Layouts.Image.Inline ? 'selected' : '',
					onClick: () => onClick({ currentLayout: Lunchbox.Layouts.Image.Inline })
				},
				{
					title: 'Fullbleed',
					icon: ICONS_BY_LAYOUT[Lunchbox.Layouts.Image.Bleed],
					children: [],
					className: currentLayout === Lunchbox.Layouts.Image.Bleed ? 'selected' : '',
					onClick: () => onClick({ currentLayout: Lunchbox.Layouts.Image.Bleed })
				},
				{
					title: 'Parallax',
					icon: ICONS_BY_LAYOUT[Lunchbox.Layouts.Image.Parallax],
					children: [],
					className: currentLayout === Lunchbox.Layouts.Image.Parallax ? 'selected' : '',
					onClick: () => onClick({ currentLayout: Lunchbox.Layouts.Image.Parallax })
				}
			]
		},
		Text: {
			title: 'Text Only',
			icon: Lunchbox.Layouts.Text.include(currentLayout) ? ICONS_BY_LAYOUT[currentLayout] : ICONS_BY_LAYOUT[Lunchbox.Layouts.Text.Paragraph],
			onClick: () => {},
			active: Lunchbox.Layouts.Text.include(currentLayout),
			children: [
				{
					title: 'Heading',
					icon: ICONS_BY_LAYOUT[Lunchbox.Layouts.Text.Header],
					children: [],
					className: currentLayout === Lunchbox.Layouts.Text.Header ? 'selected' : '',
					onClick: () => onClick({ currentLayout: Lunchbox.Layouts.Text.Header })
				},
				{
					title: 'Paragraph',
					icon: ICONS_BY_LAYOUT[Lunchbox.Layouts.Text.Paragraph],
					children: [],
					className: currentLayout === Lunchbox.Layouts.Text.Paragraph ? 'selected' : '',
					onClick: () => onClick({ currentLayout: Lunchbox.Layouts.Text.Paragraph })
				},
				{
					title: 'Head. & Par.',
					icon: ICONS_BY_LAYOUT[Lunchbox.Layouts.Text.HeaderParagraph],
					children: [],
					className: currentLayout === Lunchbox.Layouts.Text.HeaderParagraph ? 'selected' : '',
					onClick: () => onClick({ currentLayout: Lunchbox.Layouts.Text.HeaderParagraph })
				}
			]
		},
		ImageText: {
			title: 'Image & Text',
			icon: Lunchbox.Layouts.ImageText.include(currentLayout)
				? ICONS_BY_LAYOUT[currentLayout]
				: ICONS_BY_LAYOUT[Lunchbox.Layouts.ImageText.HeaderParagraph.Left],
			onClick: () => {},
			active: Lunchbox.Layouts.ImageText.include(currentLayout),
			children: [
				{
					title: 'Heading Left',
					icon: ICONS_BY_LAYOUT[Lunchbox.Layouts.ImageText.Header.Left],
					children: [],
					className: currentLayout === Lunchbox.Layouts.ImageText.Header.Left ? 'selected' : '',
					onClick: () => onClick({ currentLayout: Lunchbox.Layouts.ImageText.Header.Left })
				},
				{
					title: 'Paragraph Left',
					icon: ICONS_BY_LAYOUT[Lunchbox.Layouts.ImageText.Paragraph.Left],
					children: [],
					className: currentLayout === Lunchbox.Layouts.ImageText.Paragraph.Left ? 'selected' : '',
					onClick: () => onClick({ currentLayout: Lunchbox.Layouts.ImageText.Paragraph.Left })
				},
				{
					title: 'H. & P. Left',
					icon: ICONS_BY_LAYOUT[Lunchbox.Layouts.ImageText.HeaderParagraph.Left],
					children: [],
					className: currentLayout === Lunchbox.Layouts.ImageText.HeaderParagraph.Left ? 'selected' : '',
					onClick: () => onClick({ currentLayout: Lunchbox.Layouts.ImageText.HeaderParagraph.Left })
				},
				{
					title: 'Heading Right',
					icon: ICONS_BY_LAYOUT[Lunchbox.Layouts.ImageText.Header.Right],
					children: [],
					className: currentLayout === Lunchbox.Layouts.ImageText.Header.Right ? 'selected' : '',
					onClick: () => onClick({ currentLayout: Lunchbox.Layouts.ImageText.Header.Right })
				},
				{
					title: 'Par. Right',
					icon: ICONS_BY_LAYOUT[Lunchbox.Layouts.ImageText.Paragraph.Right],
					children: [],
					className: currentLayout === Lunchbox.Layouts.ImageText.Paragraph.Right ? 'selected' : '',
					onClick: () => onClick({ currentLayout: Lunchbox.Layouts.ImageText.Paragraph.Right })
				},
				{
					title: 'H. & P. Right',
					icon: ICONS_BY_LAYOUT[Lunchbox.Layouts.ImageText.HeaderParagraph.Right],
					children: [],
					className: currentLayout === Lunchbox.Layouts.ImageText.HeaderParagraph.Right ? 'selected' : '',
					onClick: () => onClick({ currentLayout: Lunchbox.Layouts.ImageText.HeaderParagraph.Right })
				}
			]
		},
		Hero: {
			title: 'Hero & Text',
			icon: Lunchbox.Layouts.Hero.include(currentLayout)
				? ICONS_BY_LAYOUT[currentLayout]
				: ICONS_BY_LAYOUT[Lunchbox.Layouts.Hero.HeaderParagraph.ImageFirst],
			onClick: () => {},
			active: Lunchbox.Layouts.Hero.include(currentLayout),
			children: [
				{
					title: 'Head. Bottom',
					icon: ICONS_BY_LAYOUT[Lunchbox.Layouts.Hero.Header.ImageFirst],
					children: [],
					className: currentLayout === Lunchbox.Layouts.Hero.Header.ImageFirst ? 'selected' : '',
					onClick: () => onClick({ currentLayout: Lunchbox.Layouts.Hero.Header.ImageFirst })
				},
				{
					title: 'Par. Bottom',
					icon: ICONS_BY_LAYOUT[Lunchbox.Layouts.Hero.Paragraph.ImageFirst],
					children: [],
					className: currentLayout === Lunchbox.Layouts.Hero.Paragraph.ImageFirst ? 'selected' : '',
					onClick: () => onClick({ currentLayout: Lunchbox.Layouts.Hero.Paragraph.ImageFirst })
				},
				{
					title: 'H. & P. Bottom',
					icon: ICONS_BY_LAYOUT[Lunchbox.Layouts.Hero.HeaderParagraph.ImageFirst],
					children: [],
					className: currentLayout === Lunchbox.Layouts.Hero.HeaderParagraph.ImageFirst ? 'selected' : '',
					onClick: () => onClick({ currentLayout: Lunchbox.Layouts.Hero.HeaderParagraph.ImageFirst })
				},
				{
					title: 'Heading Top',
					icon: ICONS_BY_LAYOUT[Lunchbox.Layouts.Hero.Header.TextFirst],
					children: [],
					className: currentLayout === Lunchbox.Layouts.Hero.Header.TextFirst ? 'selected' : '',
					onClick: () => onClick({ currentLayout: Lunchbox.Layouts.Hero.Header.TextFirst })
				},
				{
					title: 'Paragraph Top',
					icon: ICONS_BY_LAYOUT[Lunchbox.Layouts.Hero.Paragraph.TextFirst],
					children: [],
					className: currentLayout === Lunchbox.Layouts.Hero.Paragraph.TextFirst ? 'selected' : '',
					onClick: () => onClick({ currentLayout: Lunchbox.Layouts.Hero.Paragraph.TextFirst })
				},
				{
					title: 'H. & P. Top',
					icon: ICONS_BY_LAYOUT[Lunchbox.Layouts.Hero.HeaderParagraph.TextFirst],
					children: [],
					className: currentLayout === Lunchbox.Layouts.Hero.HeaderParagraph.TextFirst ? 'selected' : '',
					onClick: () => onClick({ currentLayout: Lunchbox.Layouts.Hero.HeaderParagraph.TextFirst })
				}
			]
		}
	});

const ToolbarContainer = styled.div`
	left: 0;
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	z-index: 100;
	.selected {
		background-color: ${({ theme }) => theme.color.primary};
		border-color: ${({ theme }) => theme.color.primary};

		svg {
			color: ${({ theme }) => theme.color.white};
		}

		p {
			color: ${({ theme }) => theme.color.white};
		}
	}

	.first-item::after {
		content: '';
		border: none;
		height: 0;
		position: absolute;
		right: 0;
		top: 0;
		width: 0;
		z-index: 0;
	}

	${LayoutToolbarWrapper} {
		display: flex !important;
		&:hover {
			${LayoutToolbarSubWrapper} {
				display: flex !important;
			}
		}
	}

	${LayoutToolbarSubWrapper} {
		display: none !important;
	}
`;

const LunchboxToolbar = (props: { onClick: (props: { currentLayout: LunchboxLayoutType }) => void, currentLayout: LunchboxLayoutType }) => {
	return (
		<EnsureDefaultTheme>
			<LunchboxToolbarConfig {...props}>
				{toolbarConfig => {
					return (
						<ToolbarContainer>
							{Object.keys(toolbarConfig).map((layoutType, index) => {
								const orderProp = {};
								switch (index) {
									case 0: {
										orderProp.isFirst = true;
										break;
									}
									case 3: {
										orderProp.isLast = true;
										break;
									}
									default: {
										orderProp.isBetween = true;
										break;
									}
								}
								return <LayoutToolbar key={layoutType} {...toolbarConfig[layoutType]} {...orderProp} maxItemsPerRow={6} />;
							})}
						</ToolbarContainer>
					);
				}}
			</LunchboxToolbarConfig>
		</EnsureDefaultTheme>
	);
};

export default LunchboxToolbar;
