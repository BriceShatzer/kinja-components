// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Quote from './svg/Quote.svg';

const QuoteIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Quote/>
	</Icon19>;

export default QuoteIcon;
