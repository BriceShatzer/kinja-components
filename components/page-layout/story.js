// @flow

import React from 'react';
import {
	storiesOf,
	boolean,
	withDocs,
	blogGroup
} from 'base-storybook';

import {
	Page,
	Page19,
	SidebarWrapper,
	SidebarAdModule,
	Main,
	StaticTopbar,
	HorizontalAdContainer
} from './index';
import { Theme } from '../theme';
import InlineNode from '../postbody/inline-node';
import { TextNode, LinkNode } from 'postbody/InlineNode';
import README from './README.md';

const Paragraph =
	<InlineNode nodes={[
		new TextNode('Yesterday, the internet’s favorite code repository, GitHub, was hit by a '),
		new LinkNode([
			new TextNode('record 1.35-terabyte-per-second denial-of-service attack')
		], 'https://www.cyberscoop.com/github-denial-of-service-amplification-attack/'),
		new TextNode('—the most powerful recorded so far. Yet, the website only endured a few minutes of intermittent downtime.')
	]} />;

storiesOf('2. Styles & Utilities|Layout/Page Layout', module)
	.addDecorator(withDocs(README))
	.add('infinite scroll page', () => {
		const featured = boolean('Featured', false);

		return (
			<Theme blog={blogGroup()}>
				<div>
					<HorizontalAdContainer
						position='top'
						desktopAd={<div data-ad-load-state="loaded">
							<img src="https://tpc.googlesyndication.com/simgad/18175599460137699203"/>
						</div>}
					/>
					<Page featured={featured}>
						<SidebarWrapper>
							<SidebarAdModule>
								<div data-ad-load-state="loaded">
									<img src="https://tpc.googlesyndication.com/simgad/3829683368278582804"/>
								</div>
							</SidebarAdModule>
						</SidebarWrapper>
						<Main featured>
							<h1>GitHub, Struck by Record-Breaking DDoS, Walks It Off</h1>
							{Paragraph}
						</Main>
					</Page>
					<HorizontalAdContainer
						position='center'
						desktopAd={<div data-ad-load-state="loaded">
							<img src="https://tpc.googlesyndication.com/simgad/18175599460137699203"/>
						</div>}
						mobileAd={<div data-ad-load-state="loaded">
							<img src="https://tpc.googlesyndication.com/simgad/3829683368278582804"/>
						</div>}
					/>
					<Page featured={featured}>
						<SidebarWrapper>
							<SidebarAdModule>
								<div data-ad-load-state="loaded">
									<img src="https://tpc.googlesyndication.com/simgad/3829683368278582804"/>
								</div>
							</SidebarAdModule>
						</SidebarWrapper>
						<Main featured>
							<h1>GitHub, Struck by Record-Breaking DDoS, Walks It Off</h1>
							{Paragraph}
						</Main>
					</Page>
					<HorizontalAdContainer
						position='bottom'
						desktopAd={<div data-ad-load-state="loaded">
							<img src="https://tpc.googlesyndication.com/simgad/18175599460137699203"/>
						</div>}
					/>
				</div>
			</Theme>
		);
	})
	.add('Page19', () => {

		return (
			<Theme blog={blogGroup()}>
				<div>
					<HorizontalAdContainer
						position='top'
						desktopAd={<div data-ad-load-state="loaded">
							<img src="https://tpc.googlesyndication.com/simgad/18175599460137699203"/>
						</div>}
					/>
					<Page19>
						<SidebarWrapper>
							<SidebarAdModule>
								<div data-ad-load-state="loaded">
									<img src="https://tpc.googlesyndication.com/simgad/3829683368278582804"/>
								</div>
							</SidebarAdModule>
						</SidebarWrapper>
						<Main>
							<h1>GitHub, Struck by Record-Breaking DDoS, Walks It Off</h1>
							{Paragraph}
						</Main>
					</Page19>
				</div>
			</Theme>
		);
	})
	.add('centered page', () => {
		return (
			<Theme blog={blogGroup()}>
				<Page>
					<div>
						<h1>GitHub, Struck by Record-Breaking DDoS, Walks It Off</h1>
						{Paragraph}
					</div>
				</Page>
			</Theme>
		);
	})
	.add('(static) top bar', () => {
		return (
			<Theme blog={blogGroup()}>
				<StaticTopbar blogName={blogGroup()} url='#' />
			</Theme>
		);
	});

storiesOf('2. Styles & Utilities|Layout/Page Layout', module)
	.add('horizontal ad container', () => {
		return (
			<div>
				<h2>Not loaded</h2>
				<HorizontalAdContainer
					position="center"
					desktopAd={<div data-ad-load-state="empty"><div>AD</div></div>}
				/>
				<h2>Loaded</h2>
				<HorizontalAdContainer
					position="center"
					desktopAd={<div data-ad-load-state="loaded"><div>AD</div></div>}
					mobileAd={<div data-ad-load-state="loaded"><div>AD</div></div>}
				/>
			</div>
		);
	});
