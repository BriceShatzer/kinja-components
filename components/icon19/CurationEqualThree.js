// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import CurationEqualThree from './svg/Curation/Curation-EqualThree.svg';

const CurationEqualThreeIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<CurationEqualThree/>
	</Icon19>;

export default CurationEqualThreeIcon;
