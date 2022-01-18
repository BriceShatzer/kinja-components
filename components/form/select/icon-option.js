/* @flow */

import * as React from 'react';
import { DefaultOptionLayout } from './toggle-option';
import Icon19 from '../../icon19/icon19';

type Props = {
	icon: React.Element<typeof Icon19>,
	selected?: boolean,
	stringRepresentation: string,
	onSelect?: () => void
};

const IconOption = (props: Props) => (
	<DefaultOptionLayout>
		{props.icon}
		<span>{props.stringRepresentation}</span>
	</DefaultOptionLayout>
);

export default IconOption;
