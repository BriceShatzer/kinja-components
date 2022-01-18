// @flow
import { exportInlineNodesFromHtmlString } from './simple-inlinenode-exporter';

describe('CurationBlock - Simplified InlineNode exporter', () => {
	it('should parse a simple string', () => {
		expect(exportInlineNodesFromHtmlString('Hello')).toMatchSnapshot();
	});
	it('should parse italics', () => {
		expect(exportInlineNodesFromHtmlString('<i>Italic text</i> normal text')).toMatchSnapshot();
	});
	it('should reject other tags', () => {
		expect(exportInlineNodesFromHtmlString('<strong>Strong text</strong> normal text <a>link</a><script>alert()</script>')).toMatchSnapshot();
	});
	it('should handle nested tags', () => {
		expect(exportInlineNodesFromHtmlString('<strong><i>Strong italic text</i> normal text </strong><i><i>Italic text</i></i>')).toMatchSnapshot();
	});
	it('should merge italic tags', () => {
		expect(exportInlineNodesFromHtmlString('<i>Italic text</i><i> and another</i> and normal text <i> and italic again</i>')).toMatchSnapshot();
	});
});