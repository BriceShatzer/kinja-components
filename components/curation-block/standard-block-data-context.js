// @flow
import * as React from 'react';
import type CategorizedPost from 'kinja-magma/models/CategorizedPost';
import { CurationStandardBlock } from 'kinja-magma/models/CurationBlock';
import { type User } from 'kinja-magma/models/User';
import { type PostId } from 'kinja-magma/models/Id';

type Context = {|
	categorizedPosts: Array<CategorizedPost>,
	block: CurationStandardBlock,
	isSatire: boolean,
	authors: { [PostId]: Array<User> },
	indexesForNonLazyloadedImages: Array<number>
|}

const StandardBlockDataContext = React.createContext<Context>({
	categorizedPosts: [],
	block: CurationStandardBlock.fromJSON({
		type: 'Standard',
		layout: {
			type: 'FourCardModular'
		},
		autofill: {
			categoryId: 1,
			type: 'CategoryAutofill'
		},
		cards: []
	}),
	isSatire: false,
	authors: {},
	indexesForNonLazyloadedImages: []
});

const { Provider, Consumer } = StandardBlockDataContext;

export default StandardBlockDataContext;

export {
	Consumer,
	Provider
};