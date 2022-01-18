// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import CurationHeadline from './svg/Curation/Curation-Headline.svg';

const CurationHeadlineIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<CurationHeadline/>
	</Icon19>;

export default CurationHeadlineIcon;
