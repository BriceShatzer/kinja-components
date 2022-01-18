/* eslint-disable flowtype/no-types-missing-file-annotation */

import * as React from 'react';

import { shallow, render } from 'enzyme';

import { TextNode, LinkNode } from 'postbody/InlineNode';
import ImageAttributionComponent, { Licensors } from './image-attribution';

import type { InlineNode } from 'postbody/InlineNode';
import type { AttributionLabel, ImageAttribution } from 'postbody/Image';

function attribute(label?: AttributionLabel, credit?: Array<InlineNode>, source?: Array<InlineNode>): ImageAttribution {
	return {
		label: label ? label : 'Illustration',
		credit: credit ? credit : [new TextNode('credit')],
		source: source ? source : [new TextNode('source')]
	};
}

describe('<ImageAttributionComponent />', () => {

	test('should not render anything if there is no attribution', () => {
		expect(shallow(<ImageAttributionComponent attributions={[]} />)).toMatchSnapshot();
	});

	test('should render image attributions with credit and source', () => {
		const attribution = [
			attribute(undefined, [new TextNode('credit 1')], [new TextNode('source 1')]),
			attribute('Graphic', [new TextNode('credit 2')], [new TextNode('source 2')]),
			attribute(undefined, [new TextNode('credit 3')], [new TextNode('source 3')])
		];

		expect(shallow(<ImageAttributionComponent attributions={attribution} />)).toMatchSnapshot();
	});

	test('should render image attributions with credit only', () => {
		const attribution = [
			attribute(undefined, [new TextNode('credit 1')], []),
			attribute('Graphic', [new TextNode('credit 2')], []),
			attribute(undefined, [new TextNode('credit 3')], [])
		];

		expect(shallow(<ImageAttributionComponent attributions={attribution} />)).toMatchSnapshot();
	});

	test('should render image attributions with source only', () => {
		const attribution = [
			attribute(undefined, [], [new TextNode('source 1')]),
			attribute('Graphic', [], [new TextNode('source 2')]),
			attribute(undefined, [], [new TextNode('source 3')])
		];

		expect(shallow(<ImageAttributionComponent attributions={attribution} />)).toMatchSnapshot();
	});

	test('should render licensors', () => {
		const attribution = [attribute(), attribute(undefined, [], [new TextNode('source 1')])];

		expect(shallow(<Licensors attributions={attribution} />)).toMatchSnapshot();
	});

	test('should render every licensor once', () => {
		const attribution = [attribute(), attribute(), attribute()];

		expect(shallow(<Licensors attributions={attribution} />)).toMatchSnapshot();
	});

	test('should render for the editor and tokenize', () => {
		const anchor = new LinkNode([new TextNode('I am a link')], 'gawker.com');
		const attribution = [attribute(), attribute(null, [anchor]), attribute(null, null, [anchor])];

		expect(render(<ImageAttributionComponent attributions={attribution} tokenize />)).toMatchSnapshot();
	});

	test('should render and not tokenize by defult', () => {
		const anchor = new LinkNode([new TextNode('I am a link')], 'gawker.com');
		const attribution = [attribute(), attribute(null, [anchor]), attribute(null, null, [anchor])];

		expect(render(<ImageAttributionComponent attributions={attribution} />)).toMatchSnapshot();
	});

});
