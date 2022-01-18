/* @flow */

import * as React from 'react';
import {
	storiesOf,
	withDocs
} from 'base-storybook';
import NLPTags from './nlp-tags';
import README from './README.md';

const externalAPI = {
	updatePostModel: () => {}
};

const properties = {
	data: [
		{'name': 'Particle physics experiments','type': 'OTHER','salience': 0.2286471575498581, 'count': 0},
		{'name': 'particles','type': 'OTHER','salience': 0.10538379848003387, 'count': 0},
		{'name': 'energy','type': 'OTHER','salience': 0.09502826631069183, 'count': 6},
		{'name': 'order','type': 'OTHER','salience': 0.07155416905879974, 'count': 2},
		{'name': 'energies','type': 'OTHER','salience': 0.05568065866827965, 'count': 2},
		{'name': 'Plasma Wakefield Acceleration Experiment','type': 'OTHER','salience': 0.04313283786177635, 'count': 1},
		{'name': 'scientists','type': 'PERSON','salience': 0.028429772704839706, 'count': 4},
		{'name': 'Large Hadron Collider','type': 'OTHER','salience': 0.028249287977814674, 'count': 10},
		{'name': 'Matthew Wing','type': 'PERSON','salience': 0.02442673221230507, 'count': 0},
		{'name': 'kind','type': 'OTHER','salience': 0.022875333204865456, 'count': 0}
	]
};

storiesOf('4. Components|Editor/NLP Tags', module)
	.addDecorator(withDocs(README))
	.add('NLP Tags', () => (
		<NLPTags
			externalAPI={externalAPI}
			{...properties} />
	));
