/* @flow */

import * as React from 'react';
import styled, { css } from 'styled-components';
import { DateTime } from 'luxon';
import { omit } from 'lodash';

import { Theme } from 'kinja-components/components/theme';
import media from 'kinja-components/style-utils/media';
import calendar, {
	isSameDay,
	isSameMonth,
	getNextMonth,
	getPreviousMonth
} from '../helpers';

// ICONS
import ArrowLeftIcon from '../../icon19/ArrowLeft';
import ArrowRightIcon from '../../icon19/ArrowRight';

import type { BlogThemeName } from 'kinja-components/components/theme/theme';
import type { DateObject } from '../types';


export const CalendarGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	grid-row-gap: 10px;
	grid-column-gap: calc((100% - (7 * 32px)) / 6);
`;

const CalendarHeader = styled(CalendarGrid)`
	grid-template: 40px / repeat(7, 1fr);
	margin-bottom: 10px;
`;

const ArrowContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;

	svg {
		cursor: pointer;
	}
`;

export const CalendarMonth = styled.div`
	grid-column: 2 / 7;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 20px;
	user-select: none;
`;

const CalendarCell = styled.div`
	align-self: center;
	grid-column: ${props => (props.index % 7) + 1} / span 1;
	text-align: center;
	user-select: none;
`;

const CalendarDay = styled(CalendarCell)`
	display: flex;
	justify-content: center;
	align-items: flex-end;
	height: 100%;
	font-size: 12px;
	color: ${props => props.theme.color.darksmoke};
`;

export const CalendarDate = styled(CalendarCell)`
	display: flex;
	align-items: center;
	justify-content: center;
	grid-row: ${props => Math.floor(props.index / 7) + 2} / span 1;
	height: 32px;
	width: 32px;
	border-radius: 50%;
	line-height: 19px;
	font-size: 16px;
	color: ${props => props.theme.color.darksmoke};
	cursor: pointer;

	${props => !props.inMonth && css`
		color: ${props.theme.color.midgray};
	`}
`;

const HighlightedCalendarDate = styled(CalendarDate)`
	position: relative;
	color: ${props => props.theme.color.white};
	background-color: ${props => props.theme.color.primary};
`;

export const CalendarContainer = styled.div`
	width: 100%;

	${media.mediumUp`
		${CalendarGrid} {
			grid-column-gap: 20px;
		}
	`}
`;


type Props = {
	blogTheme: BlogThemeName,
	onDateChange: (selectedDate: DateObject) => void,
	timemillis: number,
	timezone: string
}

type DefaultProps = {
	blogTheme: string,
	timezone: string
}

type State = {
	current: DateTime,
	day: number,
	month: number,
	year: number
}

class Calendar extends React.Component<Props, State> {
	static defaultProps: DefaultProps = {
		blogTheme: 'default',
		timezone: 'America/New_York'
	};

	constructor(props: Props) {
		super(props);
		this.state = {
			...this.resolveStateFromProp(this.props.timemillis, this.props.timezone)
		};
	}

	resolveStateFromDate(date: DateTime) {
		return {
			current: date,
			day: date.day,
			month: date.month,
			year: date.year
		};
	}

	resolveStateFromProp(timemillis: number, timezone: string) {
		return this.resolveStateFromDate(DateTime.fromMillis(timemillis, { zone: timezone }));
	}

	getCalendarDates = () => {
		const { current, month, year } = this.state;
		const calendarMonth = month || current.month;
		const calendarYear = year || current.year;

		return calendar(calendarMonth, calendarYear);
	};

	// Render the month and year header with arrow controls
	// for navigating through months and years
	renderMonthAndYear = () => {
		const { month } = this.state;

		return (
			<CalendarHeader>
				<ArrowContainer onClick={this.handlePrevious}>
					<ArrowLeftIcon />
				</ArrowContainer>
				<CalendarMonth>
					{DateTime.fromObject({ month }).toFormat('LLLL')}
				</CalendarMonth>

				<ArrowContainer onClick={this.handleNext}>
					<ArrowRightIcon />
				</ArrowContainer>
			</CalendarHeader>
		);
	}

	renderDayLabel = (): React.Node => {
		const dayNumbers = Array(7).fill().map((item, index) => 1 + index);
		const sundayNumber = dayNumbers.pop();
		dayNumbers.unshift(sundayNumber);

		return dayNumbers.map((weekday, index) => (
			<CalendarDay key={weekday} index={index}>
				{DateTime.fromObject({ weekday }).toFormat('ccc').toUpperCase()}
			</CalendarDay>
		));
	}

	renderCalendarDate = (date: Array<number | string>, index: number) => {
		const { current, year, month } = this.state;
		const _date = DateTime.fromSQL(date.join('-'));

		// Check if calendar date is same day as currently selected date
		const isCurrent = current && isSameDay(_date, current);

		// Check if calendar date is in the same month as the state month and year
		const inMonth = month && year && isSameMonth(_date, DateTime.fromObject({ year, month, day: 1}));

		const onClick = this.gotoDate(_date);
		const props = { index, inMonth, onClick, title: _date.day };

		// Conditionally render a styled date component
		const DateComponent = isCurrent ? HighlightedCalendarDate : CalendarDate;

		return (
			<DateComponent key={index} {...props}>
				{_date.day}
			</DateComponent>
		);
	}

	gotoDate = (date: DateTime) => (event: SyntheticMouseEvent<>) => {
		event && event.preventDefault();
		const { current } = this.state;
		const { onDateChange } = this.props;

		!(current && isSameDay(date, current)) &&
			this.setState(this.resolveStateFromDate(date), () => {
				onDateChange(omit(this.state, ['current']));
			});
	}

	gotoPreviousMonth = () => {
		const { month, year } = this.state;
		this.setState(getPreviousMonth(month, year));
	}

	gotoNextMonth = () => {
		const { month, year } = this.state;
		this.setState(getNextMonth(month, year));
	}

	handlePrevious = (event: SyntheticMouseEvent<SVGElement>) => {
		event && event.preventDefault();
		this.gotoPreviousMonth();
	}

	handleNext = (event: SyntheticMouseEvent<SVGElement>) => {
		event && event.preventDefault();
		this.gotoNextMonth();
	}

	render() {
		return (
			<Theme blog={this.props.blogTheme}>
				<CalendarContainer>
					{this.renderMonthAndYear()}
					<CalendarGrid>
						{this.renderDayLabel()}
						{this.getCalendarDates().map(this.renderCalendarDate)}
					</CalendarGrid>
				</CalendarContainer>
			</Theme>
		);
	}
}


export default Calendar;
