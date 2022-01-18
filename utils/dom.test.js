import * as DOM from './dom';

describe('DOM utils', () => {
	describe('walkTrie', () => {
		// note that <span><strong>guy</strong></span> becomes "guy" and not "<strong>guy</strong>"
		// eslint-disable-next-line max-len
		const INPUT  = '<div>hello <strong>there</strong> <span style="font-size:12px;"><strong>guy</strong></span> but cheese<em>cake</em> <a href="#">wiki wiki</a> <script>console.log("WILD WILD WEST")</script></div>';
		const OUTPUT = '<div>hello <strong>there</strong> guy but cheese<em>cake</em> wiki wiki console.log("WILD WILD WEST")</div>';

		const dummyHTML = (new DOMParser())
			.parseFromString(INPUT, 'text/html')
			.body
			.firstChild;

		const sanitizedTrie = DOM.sanitizeNodes(
			dummyHTML,
			['i', 'em', 'b', 'strong', 'u']
		);

		it('unwraps non-whitelisted child elements from a DOM element', () => {
			expect(
				sanitizedTrie
			).toBeDefined();

			expect(
				sanitizedTrie.outerHTML
			).toEqual(OUTPUT);
		});
	});
});
