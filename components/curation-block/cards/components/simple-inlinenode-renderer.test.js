import simpleInlineNodes from './simple-inlinenode-renderer';
import { TextNode, LinkNode, LineBreakNode } from 'postbody/InlineNode';

describe('<InlineNode />', () => {

	describe('should render text', () => {
		it('should render italic', () => {
			const result = simpleInlineNodes([new TextNode('Kinja', ['Italic'])]);
			expect(result).toMatchSnapshot();
		});
		it('should ignore links, linebreaks and other styles', () => {
			const result = simpleInlineNodes([
				new TextNode('Kinja', ['Italic', 'Underline']),
				new LineBreakNode(),
				new LinkNode([new TextNode('This is link')], 'href')
			]);
			expect(result).toMatchSnapshot();
		});
	});
});
