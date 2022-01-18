// @flow

import React from 'react';
import styled from 'styled-components';
import { DateTime } from 'luxon';

import { EnsureDefaultTheme } from 'kinja-components/components/theme';
import media from 'kinja-components/style-utils/media';

import CollapsibleBox, { ContentWrapper } from 'kinja-components/components/collapsible-box/collapsible-box';
import RadioGroup from 'kinja-components/components/form/radio-group';
import Radio from 'kinja-components/components/form/radio';
import DatePicker, { CalendarWrapper } from 'kinja-components/components/datetime-picker/date-picker/DatePicker';
import { CalendarContainer } from 'kinja-components/components/datetime-picker/calendar/Calendar';
import { ButtonWrapper } from 'kinja-components/components/buttons/Button';
import ChevronRight from 'kinja-components/components/icon19/ChevronRight';
import {
	KinjaTextField,
	KinjaFormFieldWrapper,
	KinjaTextFieldWrapper
} from 'kinja-components/components/form/textfield18';
import createTranslate from 'kinja-components/components/translator';
import translations from 'kinja-components/components/search-page/translations';

import type { BlogThemeName } from 'kinja-components/components/theme/theme';
import type { DateFilterObject } from 'kinja-components/components/search-page/types';
import type { DateObject } from 'kinja-components/components/datetime-picker/types';
import type { Locale } from 'kinja-magma/models/Locale';


const Divider = styled.div`
	display: flex;
	align-items: flex-end;
`;

const DateRange = styled.div``;

const DateRangeContainer = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 14px;

	${DateRange} {
		width: 42%;

		${CalendarWrapper} {
			max-width: calc(100vw - 2px);
		}

		&:first-of-type {
			${CalendarWrapper} {
				left: -16px;
			}
		}

		&:last-of-type {
			${CalendarWrapper} {
				left: auto;
				right: -17px;
			}
		}
	}

	${CalendarWrapper} {
		padding: 20px;
	}

	${CalendarContainer} {
		margin-bottom: 0;
	}

	${ButtonWrapper} {
		display: none;
	}
`;

export const Container = styled.div`
	${ContentWrapper} {
		overflow: visible;
	}

	${KinjaTextField} {
		font-size: 14px;
		line-height: normal;
		max-width: 100%;
	}

	${KinjaTextFieldWrapper},
	${KinjaFormFieldWrapper} {
		width: 100%;
	}

	${media.mediumUp`
		${DateRange} {
			width: 42%;

			&:first-of-type {
				${CalendarWrapper} {
					left: auto;
					right: -135px;
				}
			}

			&:last-of-type {
				${CalendarWrapper} {
					right: -32px;
				}
			}
		}
	`}
`;


type Props = {
	blogTheme: BlogThemeName,
	dateEnd?: number,
	dateStart?: number,
	defaultChecked?: ?string,
	locale: Locale,
	onChange: DateFilterObject => void,
	currentTimemillis: number,
	timezone: string
}

type DefaultProps = {
	locale: Locale
}

type State = {
	checked: string,
	dateStart: number,
	dateEnd: number
}

export default class DateFilter extends React.Component<Props, State> {
	static defaultProps: DefaultProps = {
		blogTheme: 'default',
		locale: 'en-US',
		timezone: 'America/New_York'
	};
	defaultStartingTime = 915145200000; // 01/01/1999

	state = {
		checked: this.props.defaultChecked || 'Show all stories',
		dateStart: this.props.dateStart || this.defaultStartingTime,
		dateEnd: this.props.dateEnd || this.props.currentTimemillis
	}

	onChange = (label: string) => {
		this.setState({
			checked: label
		}, () => {
			this.props.onChange({
				checked: this.state.checked,
				dateStart: this.getTimemillisFromLabel(label),
				dateEnd: null
			});
		});
	}

	onCustomDateChange = (dateObject: DateObject, type: 'from' | 'to') => {
		const timemillis = DateTime.fromObject({...dateObject, zone: this.props.timezone}).toMillis();

		this.setState(type === 'from'
			? { dateStart: timemillis }
			: { dateEnd: timemillis }, () => {
			this.props.onChange({
				checked: this.state.checked,
				dateStart: this.state.dateStart,
				dateEnd: this.state.dateEnd
			});
		});
	}

	getTimemillisFromLabel(label: string) {
		const currentTimemillis = new Date(Date.now());
		const translate = createTranslate(translations, this.props.locale);

		switch (label) {
			case translate('Last 24 hours'):
				return currentTimemillis - 86400000; // 24 hours in milliseconds
			case translate('Last 48 hours'):
				return currentTimemillis - 172800000; // 48 hours in milliseconds
			case translate('Past week'):
				return currentTimemillis - 604800000; // 7 days in milliseconds
			case translate('Past month'):
				return currentTimemillis - 2592000000; // 30 days in milliseconds
			default:
				return this.defaultStartingTime;
		}
	}

	render() {
		const { blogTheme, locale, timezone } = this.props;
		const translate = createTranslate(translations, locale);

		return (
			<EnsureDefaultTheme>
				<Container>
					<CollapsibleBox title={translate('Filter by date')} isStatic >
						<RadioGroup
							name="datefilter"
							onChange={this.onChange}
						>
							<Radio label={translate('Show all stories')} checked={this.state.checked === 'Show all stories'} value="Show all stories" />
							<Radio label={translate('Last 24 hours')} checked={this.state.checked === 'Last 24 hours'} value="Last 24 hours" />
							<Radio label={translate('Last 48 hours')} checked={this.state.checked === 'Last 48 hours'} value="Last 48 hours" />
							<Radio label={translate('Past week')} checked={this.state.checked === 'Past week'} value="Past week" />
							<Radio label={translate('Past month')} checked={this.state.checked === 'Past month'} value="Past month" />
							<Radio label={translate('Specify date range')} checked={this.state.checked === 'Specify date range'} value="Specify date range"/>
						</RadioGroup>
						{this.state.checked === translate('Specify date range') &&
							<DateRangeContainer>
								<DateRange>
									<DatePicker
										autoGrow={false}
										blogTheme={blogTheme}
										isPastSelectionEnabled
										label={translate('From')}
										timemillis={this.state.dateStart}
										timezone={timezone}
										onDateChange={(dateObject: DateObject) => this.onCustomDateChange(dateObject, 'from')}
									/>
								</DateRange>
								<Divider><ChevronRight /></Divider>
								<DateRange>
									<DatePicker
										autoGrow={false}
										blogTheme={blogTheme}
										isPastSelectionEnabled
										label={translate('To')}
										timemillis={this.state.dateEnd}
										timezone={timezone}
										onDateChange={(dateObject: DateObject) => this.onCustomDateChange(dateObject, 'to')}
									/>
								</DateRange>
							</DateRangeContainer>
						}
					</CollapsibleBox>
				</Container>
			</EnsureDefaultTheme>
		);
	}
}