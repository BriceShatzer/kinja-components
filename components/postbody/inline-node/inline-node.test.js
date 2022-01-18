import * as React from 'react';
import InlineNode from './inline-node';
import { mount } from 'enzyme';
import { TextNode, LineBreakNode, LinkNode } from 'postbody/InlineNode';
import { KinjaMetaProvider } from '../../hoc/context';
import queryString from 'query-string';

describe('<InlineNode />', () => {

	describe('should render text', () => {
		it('should render italic', () => {
			const result = mount(<p><InlineNode nodes={[new TextNode('Kinja', ['Italic'])]} /></p>);
			expect(result.render()).toMatchSnapshot();
		});
		it('should render bold', () => {
			const result = mount(<p><InlineNode nodes={[new TextNode('Kinja', ['Bold'])]} /></p>);
			expect(result.render()).toMatchSnapshot();
		});
		it('should render struck', () => {
			const result = mount(<p><InlineNode nodes={[new TextNode('Kinja', ['Struck'])]} /></p>);
			expect(result.render()).toMatchSnapshot();
		});
		it('should render small', () => {
			const result = mount(<p><InlineNode nodes={[new TextNode('Kinja', ['Small'])]} /></p>);
			expect(result.render()).toMatchSnapshot();
		});
		it('should render code', () => {
			const result = mount(<p><InlineNode nodes={[new TextNode('Kinja', ['Code'])]} /></p>);
			expect(result.render()).toMatchSnapshot();
		});
		it('should render subscript', () => {
			const result = mount(<p><InlineNode nodes={[new TextNode('Kinja', ['Subscript'])]} /></p>);
			expect(result.render()).toMatchSnapshot();
		});
		it('should render superscript', () => {
			const result = mount(<p><InlineNode nodes={[new TextNode('Kinja', ['Superscript'])]} /></p>);
			expect(result.render()).toMatchSnapshot();
		});
		it('should render underline', () => {
			const result = mount(<p><InlineNode nodes={[new TextNode('Kinja', ['Underline'])]} /></p>);
			expect(result.render()).toMatchSnapshot();
		});
		it('should render multiple styles nested', () => {
			const result = mount(<p><InlineNode nodes={[new TextNode('Kinja', ['Bold', 'Italic', 'Small', 'Underline'])]} /></p>);
			expect(result.render()).toMatchSnapshot();
		});
		describe('should merge styles correctly', () => {
			it('should merge subsequent styles', () => {
				const result = mount(<p><InlineNode nodes={[new TextNode('Foo', ['Bold']), new TextNode('Bar', ['Bold'])]} /></p>);
				expect(result.render()).toMatchSnapshot();
			});
			it('should merge nested subsequent styles', () => {
				const result = mount(<p><InlineNode nodes={[
					new TextNode('Foo', ['Bold', 'Italic']),
					new TextNode('Bar', ['Bold', 'Italic'])
				]} /></p>);
				expect(result.render()).toMatchSnapshot();
			});
			it('should merge nested subsequent styles 2', () => {
				const result = mount(<p><InlineNode nodes={[
					new TextNode('Foo', ['Bold', 'Italic']),
					new TextNode('Bar', ['Bold'])
				]} /></p>);
				expect(result.render()).toMatchSnapshot();
			});
			it('should merge nested subsequent styles 3', () => {
				const result = mount(<p><InlineNode nodes={[
					new TextNode('Foo', ['Bold', 'Italic']),
					new TextNode('Bar', ['Bold']),
					new TextNode('42', ['Underline'])
				]} /></p>);
				expect(result.render()).toMatchSnapshot();
			});
			it('should merge nested subsequent styles and group properly', () => {
				const result = mount(<p><InlineNode nodes={[
					new TextNode('Foo', ['Bold']),
					new TextNode('Bar', ['Bold', 'Italic', 'Underline']),
					new TextNode('42', ['Italic', 'Underline']),
					new TextNode('end')
				]} /></p>);
				expect(result.render()).toMatchSnapshot();
			});
		});
	});
	describe('should render line break', () => {
		it('should render a single one', () => {
			const result = mount(<p><InlineNode nodes={[new LineBreakNode()]} /></p>);
			expect(result.render()).toMatchSnapshot();
		});
		it('should insert LB between text nodes', () => {
			const result = mount(<p><InlineNode nodes={[
				new TextNode('Foo'),
				new LineBreakNode(),
				new TextNode('Bar')
			]} /></p>);
			expect(result.render()).toMatchSnapshot();
		});
		it('should not insert into the current open style', () => {
			const result = mount(<p><InlineNode nodes={[
				new TextNode('Foo', ['Underline']),
				new LineBreakNode(),
				new TextNode('Bar', ['Bold'])
			]} /></p>);
			expect(result.render()).toMatchSnapshot();
		});
	});
	describe('should render links', () => {
		it('should render a single link', () => {
			const result = mount(<p><InlineNode nodes={[new LinkNode(
				[new TextNode('Kinja')],
				'#url',
				'_blank'
			)]} /></p>);
			expect(result.render()).toMatchSnapshot();
		});
		it('should render a single link without target', () => {
			const result = mount(<p><InlineNode nodes={[new LinkNode(
				[new TextNode('Kinja')],
				'#url'
			)]} /></p>);
			expect(result.render()).toMatchSnapshot();
		});
		it('should render an internal link with a target', () => {
			const result = mount(<p><InlineNode nodes={[new LinkNode(
				[new TextNode('Kinja')],
				'https://gizmodo.com',
				'_blank'
			)]} /></p>);
			expect(result.render()).toMatchSnapshot();
		});
		it('should render an internal link without a target', () => {
			const result = mount(<p><InlineNode nodes={[new LinkNode(
				[new TextNode('Kinja')],
				'https://gizmodo.com'
			)]} /></p>);
			expect(result.render()).toMatchSnapshot();
		});
		it('should render an external link with a target', () => {
			const result = mount(<p><InlineNode nodes={[new LinkNode(
				[new TextNode('Kinja')],
				'https://example.com',
				'_top'
			)]} /></p>);
			expect(result.render()).toMatchSnapshot();
		});
		it('should render an external link without a target', () => {
			const result = mount(<p><InlineNode nodes={[new LinkNode(
				[new TextNode('Kinja')],
				'https://example.com'
			)]} /></p>);
			expect(result.render()).toMatchSnapshot();
		});
		it('should not apply previous styles on the link', () => {
			const result = mount(<p><InlineNode nodes={[
				new TextNode('Foo', ['Underline']),
				new LinkNode(
					[new TextNode('Kinja')],
					'#url'
				)]
			} /></p>);
			expect(result.render()).toMatchSnapshot();
		});
		it('should not apply previous styles on the link 2', () => {
			const result = mount(<p><InlineNode nodes={[
				new TextNode('Foo', ['Underline']),
				new LinkNode(
					[new TextNode('Kinja')],
					'#url'
				),
				new TextNode('Foo', ['Underline']),
				new LinkNode(
					[new TextNode('Kinja')],
					'#url'
				)]
			} /></p>);
			expect(result.render()).toMatchSnapshot();
		});
		it('should not merge links', () => {
			const result = mount(<p><InlineNode nodes={[
				new LinkNode(
					[new TextNode('Kinja')],
					'#url'
				), new LinkNode(
					[new TextNode('Kinja')],
					'#url'
				)]
			} /></p>);
			expect(result.render()).toMatchSnapshot();
		});
		it('should not merge styled links', () => {
			const result = mount(<p><InlineNode nodes={[
				new LinkNode(
					[new TextNode('Kinja', ['Underline', 'Italic'])],
					'#url'
				), new LinkNode(
					[new TextNode('Kinja', ['Underline', 'Italic'])],
					'#url'
				)]
			} /></p>);
			expect(result.render()).toMatchSnapshot();
		});
		it('should not merge styles outside the link', () => {
			const result = mount(<p><InlineNode nodes={[
				new TextNode('Foo', ['Underline']),
				new LinkNode(
					[new TextNode('Kinja', ['Underline']), new TextNode('Kinja', ['Underline'])],
					'#url'
				), new TextNode('Bar', ['Underline'])]
			} /></p>);
			expect(result.render()).toMatchSnapshot();
		});
		it('should render a single link with bold text', () => {
			const result = mount(<p><InlineNode nodes={[new LinkNode(
				[new TextNode('Kinja', ['Bold'])],
				'#url',
				'_blank'
			)]} /></p>);
			expect(result.render()).toMatchSnapshot();
		});
		it('should filter out javascript links', () => {
			const result = mount(<p><InlineNode nodes={[new LinkNode(
				[new TextNode('Kinja', ['Bold'])],
				'javascript:malicious.code',
				'_blank'
			)]} /></p>);
			expect(result.render()).toMatchSnapshot();
		});
		it('should filter out data: links', () => {
			const result = mount(<p><InlineNode nodes={[new LinkNode(
				[new TextNode('Kinja', ['Bold'])],
				'data:text/html;base64,PHNjcmlwdD5hbGVydChkb2N1bWVudC5kb21haW4pOzwvc2NyaXB0Pg==',
				'_blank'
			)]} /></p>);
			expect(result.render()).toMatchSnapshot();
		});
		it('should render a single link with multiple inline nodes in it', () => {
			const linkText = [
				new TextNode('foo', ['Bold']),
				new TextNode('bar'),
				new LineBreakNode(),
				new TextNode('bar')
			];
			const result = mount(<p><InlineNode nodes={[new LinkNode(
				linkText,
				'#url'
			)]} /></p>);
			expect(result.render()).toMatchSnapshot();
		});
	});
	describe('escaping', () => {
		it('should escape html tags in Text node values', () => {
			const result = mount(<p><InlineNode nodes={[new TextNode('<u>foo</u>')]} /></p>);
			expect(result.render()).toMatchSnapshot();
		});
		it('should escape html tags in Link text', () => {
			const result = mount(<p><InlineNode nodes={[
				new LinkNode([new TextNode('<u>foo</u>')], '#url')
			]} /></p>);
			expect(result.render()).toMatchSnapshot();
		});
		it('should escape double quote in the target property on Link nodes', () => {
			const result = mount(<p><InlineNode nodes={[
				new LinkNode([new TextNode('foo')], '#url', '"bar"')
			]} /></p>);
			expect(result.render()).toMatchSnapshot();
		});
	});
	describe('whitespace', () => {
		it('should replace newline with space', () => {
			const result = mount(<p><InlineNode nodes={[new TextNode('the space\nbetween')]} /></p>);
			expect(result.render()).toMatchSnapshot();
		});
	});
	describe('amazon urls', () => {
		it('should replace amazon urls with tag information', () => {
			const result = mount(
				<KinjaMetaProvider value={{config: { shouldAffiliatizeAmazonUris: true }}}>
					<p>
						<InlineNode
							nodes={[new LinkNode([new TextNode('Kinja')], 'https://amazon.com/dp/B01DFKC2SO')]}
							shouldAffiliatizeAmazonUris
						/>
					</p>
				</KinjaMetaProvider>);
			expect(result.render()).toMatchSnapshot();
		});
		it('should replace amazon urls with tag information when everything is provided', () => {
			const kinjaMeta = {
				amazonAffiliateTag: 'amazonAffiliateTag',
				blogName: 'mborlay',
				blogGroup: 'Blog group',
				isGmgBlog: false,
				authorId: 'authorid',
				postId: 'postid',
				postHeadline: 'posttitle',
				starterPost: true,
				postApproved: true,
				config: {
					shouldAffiliatizeAmazonUris: true
				}
			};
			const url = 'https://www.amazon.com/dp/B0771P9WWQ/';
			const result = mount(
				<KinjaMetaProvider value={kinjaMeta}>
					<p>
						<InlineNode nodes={[new LinkNode([new TextNode('Kinja')], url)]} />
					</p>
				</KinjaMetaProvider>);
			expect(result.render()).toMatchSnapshot();
		});
		it('correct amazon url', () => {
			const kinjaMeta = {
				amazonAffiliateTag: 'amazonAffiliateTag',
				blogName: 'mborlay',
				blogGroup: 'Blog group',
				isGmgBlog: false,
				authorId: 'authorid',
				postId: 'postid',
				postHeadline: 'posttitle',
				starterPost: true,
				postApproved: true,
				config: {
					shouldAffiliatizeAmazonUris: true
				}
			};

			const url = 'https://www.amazon.com/dp/B0771P9WWQ/';
			const result = mount(
				<KinjaMetaProvider value={kinjaMeta}>
					<p>
						<InlineNode nodes={[new LinkNode([new TextNode('Kinja')], url)]} />
					</p>
				</KinjaMetaProvider>);
			expect(queryString.parseUrl(result.find('a').prop('href'))).toMatchSnapshot();
		});
		it('should replace amazon urls with tag information on gmg blog', () => {
			const kinjaMeta = {
				blogName: 'deals',
				blogGroup: 'default',
				isGmgBlog: true,
				authorId: 'authorid',
				postId: 'postid',
				postHeadline: 'posttitle',
				starterPost: true,
				postApproved: true,
				config: {
					shouldAffiliatizeAmazonUris: true
				}
			};
			const result = mount(
				<KinjaMetaProvider value={kinjaMeta}>
					<p>
						<InlineNode nodes={[new LinkNode([new TextNode('Kinja')], 'https://amazon.com/dp/B01DFKC2SO')]} />
					</p>
				</KinjaMetaProvider>);
			expect(result.render()).toMatchSnapshot();
		});
	});
});
