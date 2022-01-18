import calculateExcerpt, { appendReadMoreLink } from './calculateExcerpt';
import Paragraph from 'postbody/blockNodes/Paragraph';
import { TextNode } from 'postbody/InlineNode';
import Post from 'kinja-magma/models/Post';
import ImageNode from 'postbody/blockNodes/ImageNode';

describe('Read more link', () => {
	const shortParagraphText = 'Short paragraph';
	const longParagraphText = 'This paragraph is more than 320 characters long! ' + (new Array(320)).map(() => 'a');
	it('appendReadMoreLink appends a read more link to a paragraph', () => {
		expect(appendReadMoreLink(new Paragraph([new TextNode(shortParagraphText)]), 'url', [['ga', 'event']])).toMatchSnapshot();
	});
	it('correctly displays Read more when the post is truncated, has no headline or image', () => {
		const post = new Post({
			body: [
				new Paragraph([new TextNode(longParagraphText)])
			],
			permalinkHost: 'gizmodo.com',
			permalinkPath: '/somepermalinkurl'
		});
		expect(calculateExcerpt(post, 4)).toMatchSnapshot();
	});
	it('doesn\'t display Read more when the post is not truncated', () => {
		const post = new Post({
			body: [
				new Paragraph([new TextNode(shortParagraphText)])
			]
		});
		expect(calculateExcerpt(post, 4)).toMatchSnapshot();
	});
	it('displays Read more when there is no headline or image, but there are more paragraphs', () => {
		const post = new Post({
			body: [
				new Paragraph([new TextNode(shortParagraphText)]),
				new Paragraph([new TextNode(longParagraphText)])
			]
		});
		expect(calculateExcerpt(post, 4)).toMatchSnapshot();
	});
	it('doesn\'t display Read more when the post has a headline', () => {
		const post = new Post({
			body: [
				new Paragraph([new TextNode(longParagraphText)])
			],
			headline: 'Hey ima headline'
		});
		expect(calculateExcerpt(post, 4)).toMatchSnapshot();
	});
	it('doesn\'t display Read more when the post has an image', () => {
		const post = new Post({
			body: [
				new ImageNode({}),
				new Paragraph([new TextNode(longParagraphText)])
			]
		});
		expect(calculateExcerpt(post, 4)).toMatchSnapshot();
	});
});