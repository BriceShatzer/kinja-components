/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import { DateTime } from 'luxon';
import { isEqual } from 'lodash';

import { EnsureDefaultTheme } from 'kinja-components/components/theme';
import media from 'kinja-components/style-utils/media';
import Textfield18, {
	KinjaTextField,
	KinjaTextFieldAutoGrow,
	KinjaFormFieldWrapper
} from 'kinja-components/components/form/textfield18';
import Calendar, { CalendarContainer } from '../calendar/Calendar';
import Button19, { ButtonWrapper } from 'kinja-components/components/button19';
import Toggle from 'kinja-components/components/hoc/toggle';
import { zeroPad } from '../helpers';

import type { BlogThemeName } from 'kinja-components/components/theme/theme';
import type { DateObject } from '../types';
import type { ToggleInjectedProps } from 'kinja-components/components/hoc/toggle';


export const CalendarWrapper = styled.div`
	position: absolute;
	width: 100vw;
	top: ${({ hasLabel }) => hasLabel ? '50px' : '30px'};
	left: -1px;
	padding: 25px 10px;
	border: 1px solid ${({ theme }) => theme.color.midgray};
	background-color: ${({ theme }) => theme.color.white};
	box-shadow: 3px 3px 5px ${({ theme }) => theme.color.lightgray};
	text-align: center;
	z-index: 999;
`;

export const Container = styled.div`
	position: relative;
	display: flex;

	${KinjaFormFieldWrapper} {
		display: flex;
		align-items: ${({ hasLabel }) => hasLabel ? 'flex-start' : 'flex-end'};
		flex-direction: ${({ hasLabel }) => hasLabel ? 'column' : 'row'};
		margin-bottom: 0;
	}

	${KinjaTextFieldAutoGrow},
	${KinjaTextField} {
		min-width: 70px;
		max-width: 80px;
		padding: 0;
		overflow: hidden;
	}

	${CalendarContainer} {
		margin-bottom: 25px;
	}

	${ButtonWrapper} {
		margin: 0 auto;
	}

	${media.mediumUp`
		${CalendarWrapper} {
			width: auto;
			padding: 25px 60px;
			left: -120px;
		}
	`}
`;


type Props = {
	autoGrow: boolean,
	blogTheme: BlogThemeName,
	isPastSelectionEnabled?: boolean,
	label?: string,
	timemillis: number,
	timezone: string,
	onDateChange: (dateObject: DateObject) => void
} & ToggleInjectedProps;

type DefaultProps = {
	autoGrow: boolean,
	blogTheme: string,
	timezone: string
}

type State = {
	timemillis: number,
	day: number,
	month: number,
	year: number,
	customValue: string,
	isActive: boolean
}

class DatePicker extends React.Component<Props,State> {
	input: ?HTMLInputElement;

	static defaultProps: DefaultProps = {
		autoGrow: true,
		blogTheme: 'default',
		timezone: 'America/New_York'
	};

	state = {
		...this.resolveStateFromMillis(this.props.timemillis, this.props.timezone),
		isActive: false
	};

	componentDidUpdate(prevProps: Props) {
		const { timemillis, timezone } = this.props;
		if (prevProps.timemillis !== timemillis) {
			this.setState(this.resolveStateFromMillis(timemillis, timezone));
		}
	}

	resolveStateFromMillis(timemillis: number, timezone: string) {
		const date = DateTime.fromMillis(timemillis, { zone: timezone });
		const { day, month, year } = date;

		return {
			customValue: this.getCustomFormat({ day, month, year }),
			isActive: false,
			timemillis,
			day,
			month,
			year
		};
	}

	onDateChange = (date: DateObject) => {
		const { year, month, day } = date;
		const timemillis = DateTime.fromObject({ year, month, day, zone: this.props.timezone }).toMillis();
		this.setState(this.resolveStateFromMillis(timemillis, this.props.timezone), () => {
			this.props.onDateChange(date);
		});
	}

	onContainerClick = () => {
		if (!this.props.isOpen) {
			this.props.toggle();
		}
	}

	onChange = (inputValue: string) => {
		this.setState({ customValue: inputValue });
	}

	onFocus = () => {
		this.setState({ isActive: true });
	}

	onBlur = () => {
		const { customValue, day, month, year} = this.state;
		const customDate = this.getValidDate(customValue);
		const dateObjectFromState = { day, month, year };

		if (isEqual(customDate, dateObjectFromState)) {
			return;
		} else if (customDate) {
			this.onDateChange(customDate);
		} else {
			this.setState({
				customValue: this.getCustomFormat({ day, month, year }),
				isActive: false
			});
		}
	}

	onKeyDown = (event: SyntheticKeyboardEvent<*>) => {
		if (event.key === 'Enter') {
			const customDate = this.getValidDate(this.state.customValue);
			if (customDate) {
				this.onDateChange(customDate);
				this.input && this.input.blur();
				this.props.close();
			} else {
				this.setState({ isActive: false }, () => {
					this.input && this.input.blur();
					this.props.close();
				});
			}
		}
	}

	getValidDate(value: string) {
		const values = value.match(/\d+/g);
		if (values) {
			const [month, day, year] = values.map(Number);
			const date = DateTime.fromObject({ year, month, day });
			const isAcceptableYear = this.props.isPastSelectionEnabled
				? DateTime.local().year + 10 >= date.year
				: DateTime.local().year + 10 >= date.year && DateTime.local().year <= date.year;

			return date.isValid && isAcceptableYear ? { year, month, day } : null;
		}
		return null;
	}

	getCustomFormat({ day, month, year }: DateObject): string {
		return `${zeroPad(month, 2)}/${zeroPad(day, 2)}/${year}`;
	}

	render() {
		const { blogTheme, close, insideReference, isOpen, label, timezone } = this.props;
		const { customValue, timemillis } = this.state;

		return (
			<EnsureDefaultTheme>
				<Container ref={insideReference} onClick={this.onContainerClick} hasLabel={Boolean(label)}>
					<Textfield18
						autoComplete='off'
						autoGrow={this.props.autoGrow}
						blogTheme={blogTheme}
						forcedActiveStyle={isOpen}
						inputRef={input => { this.input = input; }}
						label={label}
						name="Date Picker"
						onBlur={this.onBlur}
						onChange={this.onChange}
						onKeyDown={this.onKeyDown}
						onFocus={this.onFocus}
						value={customValue}
					/>
					{isOpen &&
						<CalendarWrapper hasLabel={Boolean(label)}>
							<Calendar
								blogTheme={blogTheme}
								timemillis={timemillis}
								timezone={timezone}
								onDateChange={this.onDateChange}
							/>
							<Button19 isSmall label="Save" onClick={close}/>
						</CalendarWrapper>
					}
				</Container>
			</EnsureDefaultTheme>
		);
	}
}


export default Toggle(DatePicker, { isOutsideClickEnabled: true, isDefaultOpen: false });