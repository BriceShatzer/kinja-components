/* @flow */

import * as React from 'react';
import {
	blogGroup,
	storiesOf,
	withDocs
} from 'base-storybook';

import Excerpt from './excerpt';
import README from './README.md';

import shortFeedItem from '../../../__stubs__/stubbedStreamPost.json';
import { parseNode } from 'postbody/BlockNode';

storiesOf('3. Elements|Post Elements/Excerpt', module)
	.addDecorator(withDocs(README))
	.add('Excerpt', () => {
		return <Excerpt blogGroup={blogGroup()} postBody={[parseNode(shortFeedItem.post.body[1])]} />;
	});
