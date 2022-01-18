/* @flow */
import * as React from 'react';
import {
	storiesOf,
	withDocs
} from 'base-storybook';

import Byline from './byline';
import README from './README.md';

import post from '../../../__stubs__/stubbedPost.json';


storiesOf('3. Elements|Post Elements/Byline', module)
	.addDecorator(withDocs(README))
	.add('Byline', () => <Byline index={0} authors={post.authors} pageType="frontpage" post={post} />);
