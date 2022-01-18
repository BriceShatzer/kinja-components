/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import { DateTime } from 'luxon';
import { omit } from 'lodash';

import { EnsureDefaultTheme } from 'kinja-components/components/theme';
import media from 'kinja-components/style-utils/media';
import Textfield18, {
	KinjaTextFieldWrapper,
	KinjaFormFieldWrapper
} from 'kinja-components/components/form/textfield18';
import TimeBox, { Container as TimeBoxContainer } from '../timebox';
import Button19, { ButtonWrapper } from 'kinja-components/components/button19';
import Toggle from 'kinja-components/components/hoc/toggle';
import { zeroPad } from '../helpers';
import AMPMSwitcher from '../ampm-switcher';
import { get12Hour, get24Hour } from '../helpers';

import type { ToggleInjectedProps } from 'kinja-components/components/hoc/toggle';
import type { TimeObject } from '../types';


export const CalendarWrapper = styled.div`
	position: absolute;
	top: 30px;
	left: -1px;
	width: 100vw;
	padding: 25px 60px;
	border: 1px solid ${props => props.theme.color.midgray};
	background-color: ${props => props.theme.color.white};
	box-shadow: 3px 3px 5px ${props => props.theme.color.lightgray};
	text-align: center;
	z-index: 999;
`;

export const Container = styled.div`
	position: relative;
	display: flex;
	align-items: flex-end;

	${KinjaTextFieldWrapper} {
		display: flex;
	}

	${KinjaFormFieldWrapper} {
		margin-right: 8px;
		margin-bottom: 0;
	}

	${TimeBoxContainer} {
		margin-bottom: 42px;
	}

	${ButtonWrapper} {
		margin: 0 auto;
	}

	${media.mediumUp`
		${CalendarWrapper} {
			left: -120px;
			width: auto;
		}

		${TimeBoxContainer} {
			margin-bottom: 25px;
		}
	`}
`;


type Props = {
	timemillis: number,
	timezone: string,
	onTimeChange: (timeObject: TimeObject) => void
} & ToggleInjectedProps;

type DefaultProps = {
	timezone: string
}

type State = {
	timemillis: number,
	meridiem: string,
	minute: number,
	hour: number,
	customValue: string,
	isActive: boolean
}


class TimePicker extends React.Component<Props,State> {
	input: ?HTMLInputElement;

	static defaultProps: DefaultProps = {
		timezone: 'America/New_York'
	};

	constructor(props: Props) {
		super(props);
		this.state = {
			...this.resolveStateFromMillis(this.props.timemillis, this.props.timezone),
			isActive: false
		};
	}

	componentDidUpdate(prevProps: Props) {
		const { timemillis, timezone } = this.props;
		if (prevProps.timemillis !== this.props.timemillis) {
			this.setState(this.resolveStateFromMillis(timemillis, timezone));
		}
	}

	resolveStateFromMillis(timemillis: number, timezone: string) {
		const date = DateTime.fromMillis(timemillis, { zone: timezone });
		const { hour, minute } = date;

		return {
			customValue: this.getCustomFormat({ hour: get12Hour(hour), minute }),
			isActive: false,
			timemillis,
			meridiem: date.toFormat('a').toLowerCase(),
			hour: get12Hour(hour),
			minute
		};
	}

	onTimeChange = (timeObject: TimeObject) => {
		const { hour, minute } = timeObject;
		const { meridiem } = this.state;
		const zone = this.props.timezone;
		const timemillis = DateTime.fromObject({ hour: get24Hour(hour, meridiem), minute, zone }).toMillis();

		this.setState(this.resolveStateFromMillis(timemillis, zone), () => {
			this.props.onTimeChange(omit(this.state, ['customValue', 'isActive', 'timemillis']));
		});
	}

	onTimePickerClick = () => {
		if (!this.props.isOpen) {
			this.props.toggle();
		}
	}

	onAMPMChange = (meridiem: string) => {
		const { hour, minute } = this.state;
		const zone = this.props.timezone;
		const timemillis = DateTime.fromObject({ hour: get24Hour(hour, meridiem), minute, zone }).toMillis();

		this.setState({ meridiem, timemillis }, () => {
			this.props.onTimeChange(omit(this.state, ['customValue', 'isActive', 'timemillis']));
		});
	}

	onChange = (inputValue: string) => {
		this.setState({ customValue: inputValue });
	}

	onFocus = () => {
		this.setState({ isActive: true });
	}

	onBlur = () => {
		const customTime = this.getValidTime(this.state.customValue);
		if (customTime) {
			this.onTimeChange(customTime);
		} else {
			this.setState({
				customValue: this.getCustomFormat({
					hour: get12Hour(this.state.hour),
					minute: this.state.minute
				}),
				isActive: false
			});
		}
	}

	onKeyDown = (event: SyntheticKeyboardEvent<*>) => {
		if (event.key === 'Enter') {
			const customTime = this.getValidTime(this.state.customValue);
			if (customTime) {
				this.onTimeChange(customTime);
				this.input && this.input.blur();
				this.props.close();
			} else {
				this.setState({
					customValue: this.getCustomFormat({
						hour: get12Hour(this.state.hour),
						minute: this.state.minute
					}),
					isActive: false
				}, () => {
					this.input && this.input.blur();
					this.props.close();
				});
			}
		}
	}

	getValidTime(value: string) {
		const values = value.match(/\d+/g);
		if (values) {
			const [hour, minute] = values.map(Number);
			const isHourValid = hour > 0 && hour <= 12;
			const isMinuteValid = minute >= 0 && minute < 60;
			return isHourValid && isMinuteValid ? { hour, minute, meridiem: this.state.meridiem } : null;
		}
		return null;
	}

	getCustomFormat({ hour, minute }): string {
		return `${hour}:${zeroPad(minute, 2)}`;
	}

	render() {
		const { close, insideReference, isOpen, timezone } = this.props;
		const { customValue, timemillis } = this.state;

		return (
			<EnsureDefaultTheme>
				<Container ref={insideReference}>
					<Textfield18
						autoComplete='off'
						autoGrow
						forcedActiveStyle={isOpen}
						inputRef={input => { this.input = input; }}
						name="Date Picker"
						onBlur={this.onBlur}
						onChange={this.onChange}
						onClick={this.onTimePickerClick}
						onFocus={this.onFocus}
						onKeyDown={this.onKeyDown}
						value={customValue}
					/>
					<AMPMSwitcher
						timemillis={timemillis}
						timezone={timezone}
						onChange={this.onAMPMChange}
					/>
					{isOpen &&
						<CalendarWrapper>
							<TimeBox
								timemillis={timemillis}
								timezone={timezone}
								onTimeChange={this.onTimeChange}
							/>
							<Button19 isSmall label="Save" onClick={close}/>
						</CalendarWrapper>
					}
				</Container>
			</EnsureDefaultTheme>
		);
	}
}


export default Toggle(TimePicker, { isOutsideClickEnabled: true, isDefaultOpen: false });
