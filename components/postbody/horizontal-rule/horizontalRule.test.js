import * as React from 'react';
import { mount } from 'enzyme';
import HorizontalRule, { getIcon } from './horizontalRule';
import BlockNodeList from '../block-node-list';
import webRenderNode from '../block-node-list/web-render-node';
import HorizontalRuleNode, { styles } from 'postbody/blockNodes/HorizontalRule';
import { BlockQuoteContainer } from 'postbody/ContainerNode';
import { BLOG_GROUPS } from '../../../config/consts';
import { Theme } from '../../theme';

const brandedStyles = [
	'BrandedA',
	'BrandedB'
];

const defaultStyles = [
	'Stars',
	'Line',
	'Squares'
];

describe('<HorizontalRule />', () => {
	const blogs = Object.keys(BLOG_GROUPS);

	defaultStyles.forEach(style => {
		it(`should render ${style} styled hr the same way on all blogs`, () => {
			const defaultResult = mount(<Theme blog={'default'}><HorizontalRule style={style} containers={[]} /></Theme>);
			expect(defaultResult.getDOMNode()).toMatchSnapshot();
			const defaultResultDomNode = defaultResult.getDOMNode();
			blogs.forEach(blog => {
				const brandedResult = mount(<Theme blog={blog}><HorizontalRule style={style} containers={[]} /></Theme>);
				expect(brandedResult.getDOMNode()).toEqual(defaultResultDomNode);
			});
		});
	});

	blogs.forEach(blog => {
		brandedStyles.forEach(style => {
			it(`should render ${style} styled hr on ${BLOG_GROUPS[blog]} if icon for this style is available`, () => {
				const result = mount(<Theme blog={blog}><HorizontalRule style={style} containers={[]} /></Theme>);
				expect(result.getDOMNode()).toMatchSnapshot();
			});
		});
	});

	brandedStyles.forEach(style => {
		it(`should not render branded (${style}) hr on default blogs`, () => {
			const result = mount(<Theme blog={'default'}><HorizontalRule style={style} containers={[]} /></Theme>);
			expect(result.getDOMNode()).toMatchSnapshot();
		});
	});

	brandedStyles.concat(defaultStyles).forEach(style => {
		it(`should have the proper classname on it used by the editor in exporting for style ${style}`, () => {
			const result = mount(<Theme blog={blogs[0]}><HorizontalRule style={style} containers={[]} editable/></Theme>);
			expect(result.getDOMNode()).toMatchSnapshot();
		});
	});

	it('getIcon should handle defauts and fallbacks', () => {
		const iconCollection = {
			'Star': {
				'default': 'defaultStar'
			},
			'Branded': {
				'blogName': 'blogNameBranded'
			}
		};

		// should return the proper icon if it exists
		expect(getIcon(iconCollection, 'default', 'Star')).toBe('defaultStar');
		expect(getIcon(iconCollection, 'blogName', 'Branded')).toBe('blogNameBranded');

		// should return the default icon as a fallback for the current style if there is no icon for the given blogName
		expect(getIcon(iconCollection, 'nonexistent', 'Star')).toBe('defaultStar');

		// should return undefined if there's no default for the given style, or the style doesn't exist
		expect(getIcon(iconCollection, 'nonexistent', 'Branded')).toBe(undefined);
		expect(getIcon(iconCollection, 'blogName', 'NonexistentStyle')).toBe(undefined);
		expect(getIcon(iconCollection, 'default', 'NonexistentStyle')).toBe(undefined);
		expect(getIcon(iconCollection, 'nonexistent', 'NonexistentStyle')).toBe(undefined);
		expect(getIcon(iconCollection, {}, [])).toBe(undefined);
		expect(getIcon(iconCollection)).toBe(undefined);
	});

	it('should be wrapped in containers when used with BlockNodeList', () => {
		const node = new HorizontalRuleNode(
			'Stars',
			[new BlockQuoteContainer()]
		);
		const result = mount(<Theme blog={'default'}><BlockNodeList nodes={[node]} renderNode={webRenderNode} /></Theme>);
		expect(result.getDOMNode()).toMatchSnapshot();
	});
});
