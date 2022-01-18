// @flow
import SpecialSectionModel from 'kinja-magma/models/SpecialSection';

import { featuredMediaImage } from '../impact-header/consts';
import Blog from 'kinja-magma/models/Blog';
import { TextNode } from 'postbody/InlineNode';
import Paragraph from 'postbody/blockNodes/Paragraph';
import ImageNode from 'postbody/blockNodes/ImageNode';
import Header from 'postbody/blockNodes/Header';
import ImpactHeader from 'postbody/blockNodes/ImpactHeader';
import Lunchbox from 'kinja-magma/models/Lunchbox';
import LunchboxParagraph from 'kinja-magma/models/LunchboxParagraph';
import SimpleImage from 'kinja-magma/models/SimpleImage';
import { createBlogId, createUserId, createPostId } from 'kinja-magma/models/Id';

// blogs won't be a dependency of V1 since we're changing the special sections model
const blog = new Blog({
	aboutPostId: createPostId(1819653457),
	adsTxtEnabled: true,
	alternativeFiledToText: 'SEE MORE: ',
	avatar: new SimpleImage({ id: 'eti2h1r4wg0bqxctxenl', format: 'png' }),
	blogGroup: 'theonion',
	canonicalHost: 'www.theonion.com',
	commentsDisabled: true,
	createTimeMillis: 1497896715463,
	defaultAdNetworkId: 4246,
	defaultAdSiteName: 'gm.theonion',
	description: 'America’s Finest News Source',
	directRssFeed: false,
	displayName: 'The Onion',
	facebookScreenName: 'theonion',
	fbAppId: null,
	fbPagesId: '20950654496',
	followedBlogIds: [],
	oogleAnalyticsID: 'UA-223393-1',
	googleSiteVerification: null,
	hideAuthorInfo: true,
	hideImageAttributions: true,
	hideRecommendations: true,
	hideViewcounts: true,
	hosts: ['x-ptuuwztzhzib9b-onion.kinja.com', 'theonion.com', 'onion.com', 'www.onion.com'],
	id: createBlogId(1636079510),
	instagramScreenName: 'theonion',
	isCommerce: false,
	isGmgBlog: true,
	isOnionModularEnabled: true,
	language: 'en',
	locale: 'en-US',
	logo: null,
	name: 'theonion',
	navigationGroup: 'fmg',
	noindex: false,
	numberOfInfiniteScrollArticles: 10,
	ownerId: createUserId('481757999'),
	parentId: null,
	pianoProdAid: null,
	pianoSandboxAid: null,
	pinterestVerification: null,
	properties: {
		facebookScreenName: 'theonion',
		hideAuthorInfo: true,
		logoLink: 'https://x.kinja-static.com/assets/images/logos/newsletter/onion-500px.png',
		aboutPostId: createPostId(1819653457)
	},
	recircGroup: 'fmgSatire',
	replyAuthorName: null,
	robotsAllowed: true,
	status: 'ENABLED',
	timezone: 'America/Chicago',
	timezoneOffset: -18000000,
	twitterScreenName: 'theonion',
	youtubeUrl: null
});
const impactHeader = new ImpactHeader({
	media: featuredMediaImage,
	overlay: 'Black',
	titleAlignment: 'Below'
});

const textNodes1 = [new TextNode('Lunchbox.Layouts.ImageText.HeaderParagraph.Left')];
const imageNode1 = new ImageNode({
	id: 'tscqkiavefq37idpvl5g',
	format: 'png',
	width: 1920,
	height: 1080,
	alignment: 'Bleed',
	caption: [],
	syndicationRights: false,
	attribution: []
});
const header1 = new Header({
	level: 2,
	alignment: 'Center',
	value: textNodes1
});
const paragraphTextNodes1 = [new TextNode(' has header, paragraph and image')];
const paragraph1 = new LunchboxParagraph(
	{ paragraph: new Paragraph(paragraphTextNodes1), alignment: 'Center' }
);

const lunchbox1Props = new Lunchbox({
	header: header1,
	image: imageNode1,
	paragraph: paragraph1,
	layout: Lunchbox.Layouts.ImageText.HeaderParagraph.Left
});

const header2TextNodes = [new TextNode('Lunchbox.Layouts.Text.HeaderParagraph')];
const header2 = new Header({
	level: 2,
	alignment: 'Center',
	value: header2TextNodes
});
const paragraph2TextNodes = [new TextNode('paragraph text node')];
const lunchbox2Props = new Lunchbox({
	header: header2,
	paragraph: new LunchboxParagraph(
		{ paragraph: new Paragraph(paragraph2TextNodes) }
	),
	layout: Lunchbox.Layouts.Text.HeaderParagraph
});
const lunchbox3Props = new Lunchbox({
	image: new ImageNode({
		id: 'f0muensvmiumojyfwfwu',
		format: 'jpg',
		height: 400,
		width: 600,
		alignment: 'Bleed',
		caption: [],
		syndicationRights: false,
		attribution: []
	}),
	layout: Lunchbox.Layouts.Image.Bleed
});
const customContent = [lunchbox1Props, lunchbox2Props, lunchbox3Props];

const specialSectionStub = new SpecialSectionModel({
	blogId: blog.id,
	blog,
	domainBlogId: createBlogId(1),
	sponsoredPostIds: [],
	editorialPostIds: [],
	blockedPostIds: [],
	repeatBackground: false,
	editorialSectionHeading: 'More Stories',
	isHighlightPostExpanded: false,
	editorialBlogIds: [],
	editorialTags: [],
	editorialPostIdsGenerated: [],
	isManualEditorial: false,
	impactHeader,
	customContent
});
export default specialSectionStub;
