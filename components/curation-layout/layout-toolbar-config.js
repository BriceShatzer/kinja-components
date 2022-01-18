// @flow

import * as React from 'react';
import type { CurationLayout, LayoutCardinality } from 'kinja-components/components/types';

// ICONS
import CurationHeadlineIcon from '../icon19/CurationHeadline';
import CurationModularThreeIcon from '../icon19/CurationModularThree';
import CurationModularFourIcon from '../icon19/CurationModularFour';
import CurationEqualThreeIcon from '../icon19/CurationEqualThree';
import CurationEqualFourIcon from '../icon19/CurationEqualFour';
import CurationEqualSixIcon from '../icon19/CurationEqualSix';

type LayoutOptions = {
	group: string,
	cardinality?: LayoutCardinality
};

const layoutToolbarConfig = (activated: CurationLayout, onClickFn: *) => {
	function isActive(activated: CurationLayout, which: LayoutOptions): boolean {
		if (!activated || !which) {
			return false;
		}
		if (which.group && which.cardinality) {
			return activated.group === which.group && activated.cardinality === which.cardinality;
		}
		return activated.group === which.group;
	}

	return {
		headline: {
			title: 'Headline',
			icon: <CurationHeadlineIcon />,
			onClick: () => {},
			active: isActive(activated, { group: 'Headline' }),
			children: [
				{
					title: 'Headline',
					options: {
						group: 'Headline',
						cardinality: 1
					},
					icon: <CurationHeadlineIcon />,
					active: isActive(activated, { group: 'Headline', cardinality: 1 }),
					children: [],
					onClick: onClickFn
				}
			]
		},
		modular: {
			title: 'Modular',
			icon: <CurationModularThreeIcon />,
			onClick: () => {},
			active: isActive(activated, { group: 'Modular' }),
			children: [
				{
					title: 'Three',
					options: {
						group: 'Modular',
						cardinality: 3
					},
					active: isActive(activated, { group: 'Modular', cardinality: 3 }),
					icon: <CurationModularThreeIcon />,
					onClick: onClickFn
				},
				{
					title: 'Four',
					options: {
						group: 'Modular',
						cardinality: 4
					},
					active: isActive(activated, { group: 'Modular', cardinality: 4 }),
					icon: <CurationModularFourIcon />,
					onClick: onClickFn
				}
			]
		},
		equal: {
			title: 'Equal',
			icon: <CurationEqualThreeIcon />,
			onClick: () => {},
			active: isActive(activated, { group: 'Equal' }),
			children: [
				{
					title: 'Three',
					options: {
						group: 'Equal',
						cardinality: 3
					},
					active: isActive(activated, { group: 'Equal', cardinality: 3 }),
					disabled: true,
					icon: <CurationEqualThreeIcon />,
					onClick: onClickFn
				},
				{
					title: 'Four',
					options: {
						group: 'Equal',
						cardinality: 4
					},
					active: isActive(activated, { group: 'Equal', cardinality: 4 }),
					icon: <CurationEqualFourIcon />,
					onClick: onClickFn
				},
				{
					title: 'Six',
					options: {
						group: 'Equal',
						cardinality: 6
					},
					active: isActive(activated, { group: 'Equal', cardinality: 6 }),
					icon: <CurationEqualSixIcon />,
					onClick: onClickFn
				}
			]
		}
	};
};

export default layoutToolbarConfig;
