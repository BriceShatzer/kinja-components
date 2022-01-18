/* @flow */

import * as React from 'react';
import { shallow } from 'enzyme';

import { TextNode, LinkNode } from 'postbody/InlineNode';
import { RoundupItem } from 'postbody/blockNodes/Roundup';
import Roundup from './roundup';

const props = {
	intro: null,
	hideBlogInfo: false,
	items: [
		new RoundupItem(
			new LinkNode(
				[new TextNode('Ditch The Dating Apps: 5 Real-Life Places To Meet My Wife')],
				'https://www.clickhole.com/ditch-the-dating-apps-5-real-life-places-to-meet-my-wi-1832472134'
			),
			new TextNode('ClickHole')
		),
		new RoundupItem(
			new LinkNode(
				[new TextNode('Tips For Playing Anthem')],
				'https://kotaku.com/tips-for-playing-anthem-1832821302'
			),
			new TextNode('Kotaku')
		),
		new RoundupItem(
			new LinkNode(
				[new TextNode('Who do you want to win at the Oscars?')],
				'https://film.avclub.com/who-do-you-want-to-win-at-the-oscars-1832785878'
			),
			new TextNode('The A.V. Club')
		),
		new RoundupItem(
			new LinkNode(
				[new TextNode('DoorDash Is a Bunch of Snakes')],
				'https://gizmodo.com/doordash-are-a-bunch-of-snakes-1832805573'
			),
			new TextNode('Gizmodo')
		)
	]
};

describe('<Roundup />', () => {
	it('should render by default', () => {
		const wrapper = shallow(<Roundup {...props}/>);
		expect(wrapper).toMatchSnapshot();
	});
});
