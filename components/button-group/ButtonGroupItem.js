/* @flow */

import * as React from 'react';

import Button from '../buttons/Button';
import type { Props as ButtonProps } from '../buttons/Button';

type Props = {
	selected?: boolean, // Whether the button should be selected by default
	value: string // identifier
};

const ButtonGroupItem = (props: ButtonProps & Props) => {
	const { icon, selected, ...rest } = props;

	const buttonIcon = icon
		// $FlowFixMe - because of HOC ElementConfig we cannot clone an element
		? React.cloneElement(icon, { color: selected ? 'white' : 'primary' })
		: undefined;

	const weight = selected ? 'primary' : 'secondary';

	return <Button weight={weight} icon={buttonIcon} {...rest} selected={selected} />;
};

export default ButtonGroupItem;
