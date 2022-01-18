// @flow

import * as React from 'react';
import styled, { css } from 'styled-components';

import { EnsureDefaultTheme } from 'kinja-components/components/theme';
import RadioGroup, { ButtonWrapper as RadioGroupWrapper } from 'kinja-components/components/form/radio-group';
import Radio, { Checkmark, Input, Label, Wrapper as RadioWrapper} from 'kinja-components/components/form/radio';
import { ToggleWrapper } from 'kinja-components/components/form/toggle';
import ChevronDown from 'kinja-components/components/icon19/ChevronDown';
import Reload from 'kinja-components/components/icon19/Reload';
import { IconWrapper } from 'kinja-components/components/icon19/icon19';
import createTranslate from 'kinja-components/components/translator';
import translations from './translations';

import type { Locale } from 'kinja-magma/models/Locale';


const Title = styled.h5`
	margin: 24px 0 0;
	font-weight: normal;
	color: ${({ theme }) => theme.color.gray};
	transition: margin linear 0.3s;

	strong {
		color: ${({ theme }) => theme.color.darksmoke};
	}
`;

const Subtitle = styled.aside`
	font-size: 14px;
	color: ${({ theme }) => theme.color.gray};
`;

const ButtonWrapper = styled.div`
	margin: 25px auto;
`;

const Line = styled.div`
	flex-grow: 1;
	width: 100%;
	height: 2px;
	margin: 10px 4px 0;
	content: '';
	background-color: ${({ active, theme }) => active ? theme.color.black : theme.color.gray};
`;

export const FooterContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 40px;
	background-color: ${({ theme }) => theme.color.whitesmoke};

	label {
		color: ${({ theme }) => theme.color.darkgray};
	}

	> *:not(${ToggleWrapper}) {
		margin-right: 12px;
		color: ${({ theme }) => theme.color.darkgray};
	}
`;
export const Alert = styled.div`
	position: relative;
	padding: 0.5rem;
	background-color: ${({ theme }) => theme.color.alert};

	${IconWrapper} {
		position: absolute;
		right: 10px;
		top: 10px;
		cursor: pointer;
	}
`;

const ChevronWrapper = styled.div`
	position: absolute;
	padding: 9px;
	right: 0;
	top: 0;
	cursor: pointer;
	transition: transform ease-in-out 0.3s;
`;

const Container = styled.div`
	position: relative;
	max-width: 636px;
	max-height: 700px;
	margin: 20px auto;
	border: 1px solid ${({ theme }) => theme.color.lightgray};
	text-align: center;
	overflow: hidden;
	transition: all linear 0.3s;

	${({ isOpen }) => !isOpen && css`
		max-height: 42px;

		${Title} {
			margin-top: 10px;
		}

		${ChevronWrapper} {
			transform: rotate3d(1, 0, 0, 180deg);
		}
	`}

	${ButtonWrapper} {
		${({ activeChild, theme }) => css`
			${RadioWrapper}:nth-of-type(${`-n+${activeChild}`}) {
				${Checkmark} {
					border-color: ${theme.color.black};
				}

				${Input}:checked ~ ${Checkmark}::after {
					background-color: ${theme.color.black};
				}

				${Label} {
					color: ${theme.color.black};
				}
			}
		`}
	}

	${Label} {
		white-space: nowrap;
	}

	${RadioGroupWrapper} {
		display: flex;
		justify-content: space-between;
		width: 350px;
		margin: 0 auto;
	}

	${Checkmark} {
		display: block;
		position: relative;
		padding: 10px;
	}

	${Input} {
		display: block;
	}

	${RadioWrapper} {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 24px;
		padding-left: 0;
	}
`;

type Props<StatusType> = {
	activeStatus: string,
	children?: ?*,
	footerContent: ?React.Element<*>,
	hasStatusChanged: boolean,
	locale: Locale,
	onChange: StatusType => void,
	onReloadClick: () => void,
	statuses: Array<StatusType>,
	subtitle?: string,
	title: string,
	translatedStatuses: Array<string>
}

type State = {
	isOpen: boolean
}

export default class ConversationTools<StatusType> extends React.Component<Props<StatusType>, State> {
	state = {
		isOpen: true
	}

	onChevronClick = () => {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}

	render() {
		const { activeStatus, children, hasStatusChanged, locale, footerContent, onReloadClick, statuses, subtitle, title, translatedStatuses } = this.props;
		const activeChildIndex: number = statuses.findIndex(status => status === activeStatus) + 1;
		const translate = createTranslate(translations, locale);

		return (
			<EnsureDefaultTheme>
				<Container activeChild={activeChildIndex} isOpen={this.state.isOpen}>
					<Title>{title}: <strong>{activeStatus}</strong></Title>
					{subtitle && (
						<Subtitle>{subtitle}</Subtitle>
					)}

					<ButtonWrapper>
						<RadioGroup name="conversation-tool" onChange={this.props.onChange}>
							{statuses.reduce((acc, status, index) => {
								const radioElement = (
									<Radio key={`radio-${new String(status).toString()}`}
										label={translatedStatuses[index]}
										checked={status === activeStatus}
										value={status}
									/>
								);
								if (statuses.indexOf(status) === statuses.length - 1) {
									return acc.concat(radioElement);
								}
								return acc.concat(radioElement, <Line active={activeChildIndex >= index + 2} key={`line-${new String(status).toString()}`}/>);
							}, [])}
						</RadioGroup>
					</ButtonWrapper>

					{children && children}

					{footerContent && (
						<FooterContainer>
							{footerContent}
						</FooterContainer>
					)}

					{hasStatusChanged && (
						<Alert>
							<span>{translate('Your changes have been saved. Reload the page to view them.')}</span>
							<Reload onClick={onReloadClick}/>
						</Alert>
					)}

					<ChevronWrapper onClick={this.onChevronClick}>
						<ChevronDown />
					</ChevronWrapper>
				</Container>
			</EnsureDefaultTheme>
		);
	}
}