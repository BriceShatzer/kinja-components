// @flow

import type { CurationDefaultLayouts } from '../types';

const getDefaultLayouts = (config: CurationDefaultLayouts) => config;

export default getDefaultLayouts([{
	group: 'Headline',
	cardinality: 1,
	zones: [
		{
			dimension: '1fr',
			numberOfItems: 1
		}
	]
},
{
	group: 'Modular',
	cardinality: 3,
	zones: [
		{
			dimension: '2fr',
			numberOfItems: 1
		},
		{
			dimension: '1fr',
			numberOfItems: 2
		}
	]
},
{
	group: 'Modular',
	cardinality: 4,
	zones: [
		{
			dimension: '2fr',
			numberOfItems: 1
		},
		{
			dimension: '1fr',
			numberOfItems: 2
		},
		{
			dimension: '1fr',
			numberOfItems: 1
		}
	]
},
{
	group: 'Equal',
	cardinality: 3,
	zones: [
		{
			dimension: '1fr',
			numberOfItems: 1
		},
		{
			dimension: '1fr',
			numberOfItems: 1
		},
		{
			dimension: '1fr',
			numberOfItems: 1
		}
	]
},
{
	group: 'Equal',
	cardinality: 4,
	zones: [
		{
			dimension: '1fr',
			numberOfItems: 1
		},
		{
			dimension: '1fr',
			numberOfItems: 1
		},
		{
			dimension: '1fr',
			numberOfItems: 1
		},
		{
			dimension: '1fr',
			numberOfItems: 1
		}
	]
},
{
	group: 'Equal',
	cardinality: 6,
	zones: [
		{
			dimension: '1fr',
			numberOfItems: 2
		},
		{
			dimension: '1fr',
			numberOfItems: 2
		},
		{
			dimension: '1fr',
			numberOfItems: 2
		}
	]
}]);
