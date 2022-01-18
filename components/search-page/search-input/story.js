import * as React from 'react';
import styled from 'styled-components';
import {
	storiesOf,
	withDocs
} from 'base-storybook';

import { shuffle } from 'lodash';

import SearchCtrl from './searchCtrl';
import README from './README.md';

const Wrapper = styled.div`
	min-width: 800px;
`;

const Suggestions = [
	'Bacon', 'Butter', 'Frisbies', 'Calambria', 'Flat Bread'
];

const externalAPI = {
	fetchSuggestions: () => Promise.resolve(shuffle(Suggestions))
};

storiesOf('4. Components|Search', module)
	.addDecorator(withDocs(README))
	.add('Search Form Controller', () => {
		return <Wrapper><SearchCtrl externalAPI={externalAPI} /></Wrapper>;
	});