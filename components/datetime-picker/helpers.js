/* @flow */

import { DateTime } from 'luxon';


// The current year
const THIS_YEAR: number = DateTime.local().year;

// The current month starting from 1 - 12
// 1 => January, 12 => December
export const THIS_MONTH: number = DateTime.local().month;

// Pads a string value with leading zeroes(0) until length is reached
// For example: zeroPad(5, 2) => "05"
export const zeroPad = (value: number, length: number) => {
	return `${value}`.padStart(length, '0');
};

// Number days in a month for a given year from 28 - 31
const getMonthDays = (month: number = THIS_MONTH, year: number = THIS_YEAR) => {
	return DateTime.local(year, month).daysInMonth;
};

// First day of the month for a given year from 1 - 7
// 1 => Sunday, 7 => Saturday
const getMonthFirstDay = (month: number = THIS_MONTH, year: number = THIS_YEAR) => {
	return parseInt(DateTime.fromObject({ year, month, day: 1 }).toFormat('c')) + 1;
};

// transform 12-hour time to 24-hour
export const get24Hour = (hour: number, meridiem: string) => {
	if (meridiem === 'pm') {
		return hour === 12 ? hour : hour + 12;
	}
	return hour === 12 ? 0 : hour;
};

// transform 24-hour time to 12-hour
export const get12Hour = (hour: number) => {
	if (hour === 0) {
		return 12;
	}
	return hour > 12 ? hour - 12 : hour;
};

// Checks if a value is a date - this is just a simple check
export const isDate = (date: Date) => {
	const isDate = Object.prototype.toString.call(date) === '[object Date]';
	const isValidDate = date && !Number.isNaN(date.valueOf());

	return isDate && isValidDate;
};

// Checks if two date values are of the same month and year
export const isSameMonth = (currentDate: DateTime, basedate: DateTime) => {
	if (!(currentDate.isValid && basedate.isValid)) {
		return false;
	}

	const basedateMonth = basedate.month;
	const basedateYear = basedate.year;

	const dateMonth = currentDate.month;
	const dateYear = currentDate.year;

	return (+basedateMonth === +dateMonth) && (+basedateYear === +dateYear);
};

// Checks if two date values are the same day
export const isSameDay = (currentDate: DateTime, basedate: DateTime) => {
	if (!(currentDate.isValid && basedate.isValid)) {
		return false;
	}

	const basedateDate = basedate.day;
	const basedateMonth = basedate.month;
	const basedateYear = basedate.year;

	const dateDate = currentDate.day;
	const dateMonth = currentDate.month;
	const dateYear = currentDate.year;

	return (+basedateDate === +dateDate) && (+basedateMonth === +dateMonth) && (+basedateYear === +dateYear);
};

// Gets the month and year before the given month and year
// For example: getPreviousMonth(1, 2000) => {month: 12, year: 1999}
// while: getPreviousMonth(12, 2000) => {month: 11, year: 2000}
export const getPreviousMonth = (month: number, year: number) => {
	const prevMonth = (month > 1) ? month - 1 : 12;
	const prevMonthYear = (month > 1) ? year : year - 1;

	return { month: prevMonth, year: prevMonthYear };
};

// Gets the month and year after the given month and year
// For example: getNextMonth(1, 2000) => {month: 2, year: 2000}
// while: getNextMonth(12, 2000) => {month: 1, year: 2001}
export const getNextMonth = (month: number, year: number) => {
	const nextMonth = (month < 12) ? month + 1 : 1;
	const nextMonthYear = (month < 12) ? year : year + 1;

	return { month: nextMonth, year: nextMonthYear };
};

// Get weeks displayed on calendar
const getWeeksToDisplay = (monthDays, monthFirstDay) => {
	return Math.ceil((monthDays + monthFirstDay - 1) / 7);
};

// Calendar builder for a month in the specified year
// Returns an array of the calendar dates.
// Each calendar date is represented as an array => [YYYY, MM, DD]
export default (month: number = THIS_MONTH, year: number = THIS_YEAR) => {
	// Get number of days in the month and the month's first day
	const monthDays = getMonthDays(month, year);
	const monthFirstDay = getMonthFirstDay(month, year);

	// Get number of days to be displayed from previous and next months
	// These ensure a total of 42 days (6 weeks) displayed on the calendar
	const daysFromPrevMonth = monthFirstDay - 1;
	const daysFromNextMonth = (getWeeksToDisplay(monthDays, monthFirstDay) * 7) - (daysFromPrevMonth + monthDays);

	// Get the previous and next months and years
	const { month: prevMonth, year: prevMonthYear } = getPreviousMonth(month, year);
	const { month: nextMonth, year: nextMonthYear } = getNextMonth(month, year);

	// Get number of days in previous month
	const prevMonthDays = getMonthDays(prevMonth, prevMonthYear);

	// Builds dates to be displayed from previous month
	const prevMonthDates = [...new Array(daysFromPrevMonth)].map((n, index) => {
		const day = index + 1 + (prevMonthDays - daysFromPrevMonth);
		return [prevMonthYear, zeroPad(prevMonth, 2), zeroPad(day, 2)];
	});

	// Builds dates to be displayed from current month
	const thisMonthDates = [...new Array(monthDays)].map((n, index) => {
		const day = index + 1;
		return [year, zeroPad(month, 2), zeroPad(day, 2)];
	});

	// Builds dates to be displayed from next month
	const nextMonthDates = [...new Array(daysFromNextMonth)].map((n, index) => {
		const day = index + 1;
		return [nextMonthYear, zeroPad(nextMonth, 2), zeroPad(day, 2)];
	});

	// Combines all dates from previous, current and next months
	return [...prevMonthDates, ...thisMonthDates, ...nextMonthDates];
};