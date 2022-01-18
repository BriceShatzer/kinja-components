// @flow
import type { Element, ComponentType, Node } from 'react';

export type DropdownOptions = {
	align?: 'left' | 'right' | 'center' | 'fullwidth',
	/*
		turn toggle-on-click and toggle-on-hover behaviours on and off separately
	*/
	upwards?: boolean,
	useClick?: boolean,
	useHover?: boolean
}

export type DropdownProps = {
	/*
		See/update README and story.js
	*/
	isOpen?: boolean,
	onClick?: (SyntheticEvent<*>) => void,
	onOpen?: (SyntheticEvent<*>) => void,
	onClose?: (SyntheticEvent<*> | MouseEvent) => void,
	onMouseEnter?: (SyntheticEvent<*>) => void,
	onMouseLeave?: (SyntheticEvent<*>) => void,

	onClickOutside?: (SyntheticEvent<*>) => void,
	/*
		The Dropdown component doesn't render anything visible to the user,
		dropdown 'drawer' border and the trigger element should be passed as props.
	*/
	trigger?: ComponentType<*> | Element<*>,
	dropdownContainer?: ComponentType<*>,
	/*
		Configuration
	*/
	options?: DropdownOptions,
	/*
		These are the actual contents of the dropdown 'drawer'.
	*/
	children: Node
}

export * from './dropdown.js';
export * from './dropdown-item.js';
