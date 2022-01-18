/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import { text, number, boolean, storiesOf, withDocs, blogGroup } from 'base-storybook';
import BlogLogo from './blog-logo';
import AnimatedBlogLogo from './blog-logo-animated';
import README from './README.md';

const BlogLogoWrap = styled.div`
	padding: 20px;
`;

const DarkLogoContainer = styled.div`
	background-color: #222;

	width: 100%;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
`;

const logos = [
	'avclub',
	'clickhole',
	'deadspin',
	'earther',
	'gizmodo',
	'jalopnik',
	'jezebel',
	'kinjadeals',
	'kotaku',
	'lifehacker',
	'splinter',
	'theinventory',
	'theroot',
	'theonion',
	'thetakeout',
	'kinja',
	'kinjavideo',
	'gomedia'
];

const LogoContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
	color: #222;

	${props => props.dark && `
		background-color: #222;
		color: #fff;
	`}
`;

storiesOf('3. Elements|Branding/Blog Logo', module)
	.addDecorator(withDocs(README))
	.add('BlogLogo', () => {
		const blogLogoProps = {
			scale: number('scale', 1),
			monochrome: boolean('monochrome', false)
		};

		return (
			<LogoContainer>
				{logos.map(logo =>
					<BlogLogoWrap key={logo}>
						<BlogLogo name={logo} {...blogLogoProps} />
					</BlogLogoWrap>
				)}
			</LogoContainer>
		);
	})
	.add('Animated BlogLogo', () => {
		let logoName = blogGroup();
		if (logoName === 'default') {
			logoName = 'kinja';
		}
		const animatedProps = {
			name: logoName ,
			white: boolean('white', false),
			options: {
				duration: text('duration', '2000'),
				easing: text('easing', 'easeInOutQuint')
			},
			onFinish: () => console.log('Done animating.')
		};
		const Container = animatedProps.white ? DarkLogoContainer : React.Fragment;
		return (
			<Container>
				<BlogLogoWrap> <AnimatedBlogLogo {...animatedProps} /></BlogLogoWrap>
			</Container>
		);
	});
