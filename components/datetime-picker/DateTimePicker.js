/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import { DateTime } from 'luxon';

import { EnsureDefaultTheme } from 'kinja-components/components/theme';
import DatePicker, { Container as DatePickerContainer } from './date-picker';
import TimePicker, { Container as TimePickerContainer } from './time-picker';
import { TextBox } from './ampm-switcher';
import { KinjaTextFieldAutoGrow } from 'kinja-components/components/form/textfield18';
import ReloadIcon from 'kinja-components/components/icon19/Reload';
import { get24Hour } from './helpers';

import type { DateObject, TimeObject } from './types';


export const Container = styled.div`
	display: flex;
	align-items: flex-end;

	${DatePickerContainer} {
		margin-right: 16px;
	}

	${TimePickerContainer} {
		margin-right: 8px;
	}

	${KinjaTextFieldAutoGrow} {
		padding: 0;
		color: ${props => props.theme.color.gray};
		border-bottom-color: ${props => props.theme.color.gray};

		&:hover {
			color: ${props => props.theme.color.gray};
		}

		& input {
			color: ${props => props.theme.color.gray};
		}
	}

	${TextBox} {
		color: ${props => props.theme.color.gray};
		border-bottom-color: ${props => props.theme.color.gray};
	}

	svg {
		margin-bottom: 2px;
		cursor: pointer;
	}
`;

const OffSetContainer = styled.div`
	padding-bottom: 2px;
	margin-right: 4px;
	font-size: 13px;
	line-height: 18px;
	color: ${props => props.theme.color.gray};
`;


type Props = {
	timemillis: number,
	timezone: string,
	onDateChange: (timemillis: number) => void
}

type DefaultProps = {
	timezone: string
};

type State = {
	isDatePickerOpen: boolean,
	meridiem: string,
	timemillis: number,
	offset: string,
	minute: number,
	hour: number,
	day: number,
	month: number,
	year: number
}


class DateTimePicker extends React.Component<Props,State> {
	static defaultProps: DefaultProps = {
		timezone: 'America/New_York'
	};

	constructor(props: Props) {
		super(props);
		this.state = {
			isDatePickerOpen: false,
			...this.resolveStateFromMillis(props.timemillis, props.timezone)
		};
	}

	resolveStateFromMillis(timemillis: number, timezone: string) {
		const date = DateTime.fromMillis(timemillis, { zone: timezone });

		return {
			meridiem: date.toFormat('a').toLowerCase(),
			timemillis,
			offset: date.toFormat('ZZZZ'),
			minute: date.minute,
			hour: date.hour,
			day: date.day,
			month: date.month,
			year: date.year
		};
	}

	setCalendarDisplay = (isShown: boolean) => {
		this.setState({
			isDatePickerOpen: isShown
		});
	}

	onDateChange = (dateObject: DateObject) => {
		const { year, month, day } = dateObject;
		const { hour, minute } = this.state;
		const zone = this.props.timezone;

		const timemillis = DateTime.fromObject({
			year, month, day, hour, minute, zone
		}).toMillis();

		this.setState({ day, month, year, timemillis }, () => {
			this.props.onDateChange(timemillis);
		});
	}

	onTimeChange = (timeObject: TimeObject) => {
		const { hour, minute, meridiem } = timeObject;
		const { year, month, day } = this.state;
		const zone = this.props.timezone;
		const timemillis = DateTime.fromObject({
			year, month, day, hour: get24Hour(hour, meridiem), minute, zone
		}).toMillis();

		this.setState({ hour, minute, meridiem, timemillis }, () => {
			this.props.onDateChange(timemillis);
		});
	}

	onReset = () => {
		const currentMillis = DateTime.local().toMillis();
		this.setState(this.resolveStateFromMillis(currentMillis, DateTime.local().toFormat('z')), () => {
			this.props.onDateChange(currentMillis);
		});
	}

	render() {
		const { offset, timemillis } = this.state;
		const { timezone } = this.props;

		return (
			<EnsureDefaultTheme>
				<Container>
					<DatePicker
						timemillis={timemillis}
						timezone={timezone}
						onDateChange={this.onDateChange}
					/>
					<TimePicker
						timemillis={timemillis}
						timezone={timezone}
						onTimeChange={this.onTimeChange}
					/>
					<OffSetContainer>{offset}</OffSetContainer>
					<ReloadIcon onClick={this.onReset} />
				</Container>
			</EnsureDefaultTheme>
		);
	}
}


export default DateTimePicker;