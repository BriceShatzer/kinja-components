// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import CurationModularThree from './svg/Curation/Curation-ModularThree.svg';

const CurationModularThreeIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<CurationModularThree/>
	</Icon19>;

export default CurationModularThreeIcon;
