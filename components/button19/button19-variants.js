/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';
import { EnsureDefaultTheme } from '../theme';
import Icon19 from '../icon19/icon19';

const getAmazonButtonColor = ({theme}) => {
	const { amazon, darksmoke, midgray, white } = theme.color;

	return ({
		default: {
			border: amazon,
			fill: amazon,
			text: darksmoke
		},
		disabled: {
			border: midgray,
			fill: midgray,
			text: white
		},
		hover: {
			border: darken(0.05, amazon),
			fill: darken(0.05, amazon),
			text: darksmoke
		},
		focus: {
			border: darken(0.1, amazon),
			fill: darken(0.1, amazon),
			text: darksmoke
		},
		active: {
			border: darken(0.15, amazon),
			fill: darken(0.15, amazon),
			text: darksmoke
		}
	});
};

const getFacebookButtonColor = ({theme}) => {
	const { facebook, white, midgray } = theme.color;

	return ({
		default: {
			border: facebook,
			fill: facebook,
			text: white
		},
		disabled: {
			border: midgray,
			fill: midgray,
			text: white
		},
		hover: {
			border: darken(0.05, facebook),
			fill: darken(0.05, facebook),
			text: white
		},
		focus: {
			border: darken(0.1, facebook),
			fill: darken(0.1, facebook),
			text: white
		},
		active: {
			border: darken(0.15, facebook),
			fill: darken(0.15, facebook),
			text: white
		}
	});
};

const getTwitterButtonColor = ({theme}) => {
	const { twitter, white, midgray } = theme.color;

	return ({
		default: {
			border: twitter,
			fill: twitter,
			text: white
		},
		disabled: {
			border: midgray,
			fill: midgray,
			text: white
		},
		hover: {
			border: darken(0.05, twitter),
			fill: darken(0.05, twitter),
			text: white
		},
		focus: {
			border: darken(0.1, twitter),
			fill: darken(0.1, twitter),
			text: white
		},
		active: {
			border: darken(0.15, twitter),
			fill: darken(0.15, twitter),
			text: white
		}
	});
};

const getCommerceButtonColor = ({theme}) => {
	const { commerce, white, midgray } = theme.color;

	return ({
		default: {
			border: commerce,
			fill: commerce,
			text: white
		},
		disabled: {
			border: midgray,
			fill: midgray,
			text: white
		},
		hover: {
			border: darken(0.05, commerce),
			fill: darken(0.05, commerce),
			text: white
		},
		focus: {
			border: darken(0.1, commerce),
			fill: darken(0.1, commerce),
			text: white
		},
		active: {
			border: darken(0.15, commerce),
			fill: darken(0.15, commerce),
			text: white
		}
	});
};

const Label = styled.label`
	cursor: pointer;
	font-size: ${props => props.isSmall ? '1rem' : '1.125rem'};
	line-height: ${props => props.isSmall ? '1.25rem' : '1.5rem'};

	:not(:first-child) {
		margin-left: 0.25rem;
	}

	:not(:last-child) {
		margin-right: 0.25rem;
	}
`;

const StrongLabel = styled(Label)`
	font-weight: bold;
	float: left;
	:not(:last-child) {
		margin-right: 0;
	}
`;

const NormalLabel = styled(Label)`
	float: right;
`;

const AmazonButtonWrapper = styled.button`
	background-color: ${props => getAmazonButtonColor(props).default.fill};
	border: 1px solid ${props => getAmazonButtonColor(props).default.border};
	border-radius: 0.3125rem;
	color: ${props => getAmazonButtonColor(props).default.text};
	display: flex;
	align-items: center;
	padding: ${props => props.isSmall ? '0.3125rem 0.375rem' : '0.4375rem 0.625rem'};
	${props => props.isRightRail && `
  		padding: 0.4375rem 2.25rem;
 	`};
	min-height: ${props => props.isSmall ? '2rem' : '2.5rem'};

	${Label} {
		color: ${props => getAmazonButtonColor(props).default.text};
	}

	:hover {
		background-color: ${props => getAmazonButtonColor(props).hover.fill};
		border: 1px solid ${props => getAmazonButtonColor(props).hover.border};
		color: ${props => getAmazonButtonColor(props).hover.text};

		${Label} {
			color: ${props => getAmazonButtonColor(props).hover.text};
		}
	}

	:disabled {
		background-color: ${props => getAmazonButtonColor(props).disabled.fill};
		border: 1px solid ${props => getAmazonButtonColor(props).disabled.border};
		color: ${props => getAmazonButtonColor(props).disabled.text};
		cursor: default;

		${Label} {
			color: ${props => getAmazonButtonColor(props).disabled.text};
			cursor: default;
		}
	}

	:focus {
		background-color: ${props => getAmazonButtonColor(props).focus.fill};
		border: 1px solid ${props => getAmazonButtonColor(props).focus.border};
		color: ${props => getAmazonButtonColor(props).focus.text};

		${Label} {
			color: ${props => getAmazonButtonColor(props).focus.text};
		}
	}

	:enabled:active {
		background-color: ${props => getAmazonButtonColor(props).active.fill};
		border: 1px solid ${props => getAmazonButtonColor(props).active.border};
		color: ${props => getAmazonButtonColor(props).active.text};

		${Label} {
			color: ${props => getAmazonButtonColor(props).active.text};
		}
	}
`;

const FacebookButtonWrapper = styled.button`
	background-color: ${props => getFacebookButtonColor(props).default.fill};
	border: 1px solid ${props => getFacebookButtonColor(props).default.border};
	border-radius: 0.3125rem;
	color: ${props => getFacebookButtonColor(props).default.text};
	display: flex;
	align-items: center;
	padding: ${props => props.isSmall ? '0.3125rem 0.375rem' : '0.4375rem 0.625rem'};
	min-height: ${props => props.isSmall ? '2rem' : '2.5rem'};

	${Label} {
		color: ${props => getFacebookButtonColor(props).default.text};
	}

	:hover {
		background-color: ${props => getFacebookButtonColor(props).hover.fill};
		border: 1px solid ${props => getFacebookButtonColor(props).hover.border};
		color: ${props => getFacebookButtonColor(props).hover.text};

		${Label} {
			color: ${props => getFacebookButtonColor(props).hover.text};
		}
	}

	:disabled {
		background-color: ${props => getFacebookButtonColor(props).disabled.fill};
		border: 1px solid ${props => getFacebookButtonColor(props).disabled.border};
		color: ${props => getFacebookButtonColor(props).disabled.text};
		cursor: default;

		${Label} {
			color: ${props => getFacebookButtonColor(props).disabled.text};
			cursor: default;
		}
	}

	:focus {
		background-color: ${props => getFacebookButtonColor(props).focus.fill};
		border: 1px solid ${props => getFacebookButtonColor(props).focus.border};
		color: ${props => getFacebookButtonColor(props).focus.text};

		${Label} {
			color: ${props => getFacebookButtonColor(props).focus.text};
		}
	}

	:enabled:active {
		background-color: ${props => getFacebookButtonColor(props).active.fill};
		border: 1px solid ${props => getFacebookButtonColor(props).active.border};
		color: ${props => getFacebookButtonColor(props).active.text};

		${Label} {
			color: ${props => getFacebookButtonColor(props).active.text};
		}
	}
`;

const TwitterButtonWrapper = styled.button`
	background-color: ${props => getTwitterButtonColor(props).default.fill};
	border: 1px solid ${props => getTwitterButtonColor(props).default.border};
	border-radius: 0.3125rem;
	color: ${props => getTwitterButtonColor(props).default.text};
	display: flex;
	align-items: center;
	padding: ${props => props.isSmall ? '0.3125rem 0.375rem' : '0.4375rem 0.625rem'};
	min-height: ${props => props.isSmall ? '2rem' : '2.5rem'};

	${Label} {
		color: ${props => getTwitterButtonColor(props).default.text};
	}

	:hover {
		background-color: ${props => getTwitterButtonColor(props).hover.fill};
		border: 1px solid ${props => getTwitterButtonColor(props).hover.border};
		color: ${props => getTwitterButtonColor(props).hover.text};

		${Label} {
			color: ${props => getTwitterButtonColor(props).hover.text};
		}
	}

	:disabled {
		background-color: ${props => getTwitterButtonColor(props).disabled.fill};
		border: 1px solid ${props => getTwitterButtonColor(props).disabled.border};
		color: ${props => getTwitterButtonColor(props).disabled.text};
		cursor: default;

		${Label} {
			color: ${props => getTwitterButtonColor(props).disabled.text};
			cursor: default;
		}
	}

	:focus {
		background-color: ${props => getTwitterButtonColor(props).focus.fill};
		border: 1px solid ${props => getTwitterButtonColor(props).focus.border};
		color: ${props => getTwitterButtonColor(props).focus.text};

		${Label} {
			color: ${props => getTwitterButtonColor(props).focus.text};
		}
	}

	:enabled:active {
		background-color: ${props => getTwitterButtonColor(props).active.fill};
		border: 1px solid ${props => getTwitterButtonColor(props).active.border};
		color: ${props => getTwitterButtonColor(props).active.text};

		${Label} {
			color: ${props => getTwitterButtonColor(props).active.text};
		}
	}
`;

const CommerceButtonWrapper = styled.button`
	background-color: ${props => getCommerceButtonColor(props).default.fill};
	border: 1px solid ${props => getCommerceButtonColor(props).default.border};
	border-radius: 0.3125rem;
	color: ${props => getCommerceButtonColor(props).default.text};
	display: flex;
	align-items: center;
	padding: ${props => props.isSmall ? '0.3125rem 0.375rem' : '0.4375rem 0.625rem'};
	${props => props.isRightRail && `
  		padding: 0.4375rem 2.25rem;
 	`};
	min-height: ${props => props.isSmall ? '2rem' : '2.5rem'};

	${Label} {
		color: ${props => getCommerceButtonColor(props).default.text};
	}

	:hover {
		background-color: ${props => getCommerceButtonColor(props).hover.fill};
		border: 1px solid ${props => getCommerceButtonColor(props).hover.border};
		color: ${props => getCommerceButtonColor(props).hover.text};

		${Label} {
			color: ${props => getCommerceButtonColor(props).hover.text};
		}
	}

	:disabled {
		background-color: ${props => getCommerceButtonColor(props).disabled.fill};
		border: 1px solid ${props => getCommerceButtonColor(props).disabled.border};
		color: ${props => getCommerceButtonColor(props).disabled.text};
		cursor: default;

		${Label} {
			color: ${props => getCommerceButtonColor(props).disabled.text};
			cursor: default;
		}
	}

	:focus {
		background-color: ${props => getCommerceButtonColor(props).focus.fill};
		border: 1px solid ${props => getCommerceButtonColor(props).focus.border};
		color: ${props => getCommerceButtonColor(props).focus.text};

		${Label} {
			color: ${props => getCommerceButtonColor(props).focus.text};
		}
	}

	:enabled:active {
		background-color: ${props => getCommerceButtonColor(props).active.fill};
		border: 1px solid ${props => getCommerceButtonColor(props).active.border};
		color: ${props => getCommerceButtonColor(props).active.text};

		${Label} {
			color: ${props => getCommerceButtonColor(props).active.text};
		}
	}
`;

export type Props = {
	isDisabled?: boolean,
	icon?: React.Element<typeof Icon19>,
	label?: React.Node,
	labelPosition?: 'before' | 'after',
	isSmall?: boolean,
	onClick?: () => void,
	isRightRail?: boolean,
	smallText?: string,
	largeText?: string,
	newDesign?: boolean,
	mobileCommerce?: boolean
};

export const AmazonButton19 = (props: Props) => {
	const {
		icon,
		isDisabled,
		isRightRail,
		smallText,
		largeText,
		label = '',
		labelPosition = 'before',
		isSmall = false,
		newDesign = false,
		...rest
	} = props;

	const buttonContent = newDesign ? (<span><StrongLabel isSmall={isSmall}>{largeText}</StrongLabel>
		<NormalLabel isSmall={isSmall}>{smallText}</NormalLabel></span>) : (<Label isSmall={isSmall}>{label}</Label>);

	return (
		<EnsureDefaultTheme>
			<AmazonButtonWrapper isRightRail={isRightRail} isSmall={isSmall} isDisabled={isDisabled} {...rest}>
				{labelPosition === 'after' && icon}
				{buttonContent}
				{labelPosition === 'before' && icon}
			</AmazonButtonWrapper>
		</EnsureDefaultTheme>
	);
};

export const CommerceButton19 = (props: Props) => {
	const {
		icon,
		isDisabled,
		label = '',
		labelPosition = 'before',
		isSmall = false,
		mobileCommerce,
		...rest
	} = props;

	return (
		<EnsureDefaultTheme>
			<CommerceButtonWrapper isSmall={isSmall} isDisabled={isDisabled} {...rest}>
				{labelPosition === 'after' && icon}
				<Label isSmall={isSmall}>{label}</Label>
				{labelPosition === 'before' && icon}
			</CommerceButtonWrapper>
		</EnsureDefaultTheme>
	);
};

export const FacebookButton19 = (props: Props) => {
	const {
		icon,
		isDisabled,
		label = '',
		labelPosition = 'before',
		isSmall = false,
		...rest
	} = props;

	return (
		<EnsureDefaultTheme>
			<FacebookButtonWrapper isSmall={isSmall} isDisabled={isDisabled} {...rest}>
				{labelPosition === 'after' && icon}
				{label && <Label isSmall={isSmall}>{label}</Label>}
				{labelPosition === 'before' && icon}
			</FacebookButtonWrapper>
		</EnsureDefaultTheme>
	);
};

export const TwitterButton19 = (props: Props) => {
	const {
		icon,
		isDisabled,
		label = '',
		labelPosition = 'before',
		isSmall = false,
		...rest
	} = props;

	return (
		<EnsureDefaultTheme>
			<TwitterButtonWrapper isSmall={isSmall} isDisabled={isDisabled} {...rest}>
				{labelPosition === 'after' && icon}
				{label && <Label isSmall={isSmall}>{label}</Label>}
				{labelPosition === 'before' && icon}
			</TwitterButtonWrapper>
		</EnsureDefaultTheme>
	);
};
