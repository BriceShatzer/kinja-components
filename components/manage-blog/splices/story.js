/* @flow */

import * as React from 'react';
import {
	boolean,
	storiesOf,
	withDocs
} from 'base-storybook';
import styled from 'styled-components';

import PromotedSplice from './promoted-splice';
import Splice from './splice';
import README from './README.md';

import post from '../../../__stubs__/stubbedPost.json';
import blog from '../../../__stubs__/gizmodo.json';


const Container = styled.div`
	width: 100%;
	max-width: 740px;
	margin: 0 auto;
`;


storiesOf('4. Components|Manage Blog/Splices', module)
	.addDecorator(withDocs(README))
	// PROMOTED SPLICE
	.add('Promoted Splice', () => <Container><PromotedSplice /></Container>)

	// SPLICE (Article)
	.add('Splice', () => (
		<Container>
			<Splice
				blog={blog}
				index={0}
				hideAuthors={boolean('Hide Authors')}
				locale="en-US"
				post={Object.assign({}, post, { repost: { repostTimeMillis: 1570190748771 }})}
				pageType="frontpage"
				timezone="America/New_York"
			/>
		</Container>
	));
