/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import { DateTime } from 'luxon';
import { omit } from 'lodash';

import { EnsureDefaultTheme } from 'kinja-components/components/theme';
import media from 'kinja-components/style-utils/media';
import createTranslate from 'kinja-components/components/translator';
import translations from './translations';

import type { Locale } from 'kinja-magma/models/Locale';
import type { TimeObject } from '../types';

// element's width and height to achive the perfect circle shape on
// the selected time items
const gridDimension = 32;

const TimeWrapper = styled.div`
	display: grid;
	grid-auto-columns: ${`${gridDimension}px`};
	grid-row-gap: 10px;
	grid-column-gap: calc((100% - 6 * ${`${gridDimension}px`}) / 5);
`;

const Title = styled.div`
	grid-row: 1;
	grid-column: 1 / 7;
	width: 100%;
	font-size: 20px;
	text-align: center;
	padding-bottom: 4px;
	user-select: none;
`;

export const Time = styled.span`
	display: flex;
	align-items: center;
	justify-content: center;
	grid-row: ${props => Math.floor(props.index / 6) + 2} / span 1;
	width: ${`${gridDimension}px`};
	height: ${`${gridDimension}px`};
	font-size: 16px;
	line-height: 19px;
	user-select: none;
	cursor: pointer;

	${media.mediumUp`
		grid-row: ${props => Math.floor(props.index / 3) + 2} / span 1;
	`};
`;

export const SelectedTime = styled(Time)`
	border-radius: 50%;
	color: ${props => props.theme.color.white};
	background-color: ${props => props.theme.color.primary};
`;

export const Container = styled.div`
	display: flex;
	flex-direction: column;

	${TimeWrapper}:first-child {
		padding-bottom: 18px;
		border-bottom: 1px solid ${props => props.theme.color.midgray};
	}

	${TimeWrapper}:last-child {
		padding-top: 30px;
	}

	${media.mediumUp`
		width: 310px;
		display: grid;
		grid-template-columns: 50% 50%;

		${TimeWrapper}:first-child {
			padding-right: 27px;
			padding-bottom: 0;
			border-right: 1px solid ${props => props.theme.color.midgray};
			border-bottom: none;
		}

		${TimeWrapper}:last-child {
			grid-column-gap: 14px;
			padding-top: 0;
			padding-left: 27px;
		}

		${Title} {
			grid-column: 1 / 4;
		}
	`}
`;


type Props = {
	locale: Locale,
	timemillis: number,
	timezone: string,
	onTimeChange: (timeObject: TimeObject) => void
}

type DefaultProps = {
	locale: Locale,
	timezone: string,
};

type State = {
	timemillis: number,
	hour: number,
	minute: number
}


class TimeBox extends React.Component<Props,State> {
	static defaultProps: DefaultProps = {
		locale: 'en-US',
		timezone: 'America/New_York'
	};

	constructor(props: Props) {
		super(props);
		this.state = {
			...this.resolveStateFromMillis(this.props.timemillis, this.props.timezone)
		};
	}

	resolveStateFromMillis(timemillis: number, timezone: string) {
		const hour = DateTime.fromMillis(timemillis, { zone: timezone }).hour;
		const minute = this.roundUpToFive(DateTime.fromMillis(timemillis, { zone: timezone }).minute);

		const getHour = hour => {
			if (hour === 0) {
				return { hour: 12 };
			}
			return { hour: hour > 12 ? hour - 12 : hour };
		};

		return {
			timemillis,
			...getHour(hour),
			minute
		};
	}

	getHours = (): React.Node => {
		const listOfHours = Array(12).fill().map((item, index) => 1 + index);

		return listOfHours.map((hour, index) => {
			const TimeComponent = hour === this.state.hour ? SelectedTime : Time;
			return (
				<TimeComponent index={index} key={hour} onClick={this.gotoHour(hour)}>
					{hour}
				</TimeComponent>
			);
		});
	}

	getMinutes = (): React.Node =>{
		const listOfMinutes = Array(12).fill().map((item, index) => index * 5);

		return listOfMinutes.map((minute, index) => {
			const TimeComponent = minute === this.state.minute ? SelectedTime : Time;
			return (
				<TimeComponent index={index} key={minute} onClick={this.gotoMinute(minute)}>
					:{minute.toString().padStart(2, '0')}
				</TimeComponent>
			);
		});
	}

	gotoHour = (selectedHour: number) => (event: SyntheticMouseEvent<>) => {
		event && event.preventDefault();
		const { hour, minute } = this.state;
		const { onTimeChange } = this.props;
		const timemillis = DateTime.fromObject({ hour: selectedHour, minute }).toMillis();

		!(hour === selectedHour) &&
			this.setState({ hour: selectedHour, timemillis }, () => {
				onTimeChange(omit(this.state, 'timemillis'));
			});
	}

	gotoMinute = (selectedMinute: number) => (event: SyntheticMouseEvent<>) => {
		event && event.preventDefault();
		const { hour, minute } = this.state;
		const { onTimeChange } = this.props;
		const timemillis = DateTime.fromObject({ hour, minute: selectedMinute }).toMillis();

		!(minute === selectedMinute) &&
			this.setState({ minute: selectedMinute, timemillis }, () => {
				onTimeChange(omit(this.state, 'timemillis'));
			});
	}

	roundUpToFive(number: number) {
		return Math.ceil(number / 5) * 5;
	}

	render() {
		const { locale } = this.props;

		const translate = createTranslate(translations, locale);
		const hoursTitle = translate('Hours');
		const minutesTitle = translate('Minutes');

		return (
			<EnsureDefaultTheme>
				<Container>
					<TimeWrapper>
						<Title>{hoursTitle}</Title>
						{this.getHours()}
					</TimeWrapper>
					<TimeWrapper>
						<Title>{minutesTitle}</Title>
						{this.getMinutes()}
					</TimeWrapper>
				</Container>
			</EnsureDefaultTheme>
		);
	}
}


export default TimeBox;