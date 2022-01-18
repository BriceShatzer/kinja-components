// @flow

import FormattedTime from './index';

describe('DateTime', () => {
	const timestamp = 1512136800667;
	const timezone = 'America/New_York';
	const backendDateString = '2017-12-01T09:00:00.667-05:00[America/New_York]';

	const mockDate = timestamp =>
		jest.spyOn(Date, 'now').mockImplementationOnce(() => timestamp);

	it('should give back datetime', () => {
		const formattedTime = new FormattedTime({
			timestamp,
			timezone
		});

		expect(formattedTime.fullDateTime).toBe('12/01/17 9:00AM');
	});

	it('should give back machine datetime', () => {
		const formattedTime = new FormattedTime({
			timestamp,
			timezone
		});

		expect(formattedTime.machineDateTime).toBe('2017-12-01T09:00:00-05:00');
	});

	it('should give future date time', () => {
		mockDate(timestamp - 10);

		const formattedTime = new FormattedTime({
			timestamp,
			timezone
		});

		expect(formattedTime.relativeDateTime).toBe('12/01/17 9:00AM');
	});

	it('should give just now text', () => {
		mockDate(timestamp + 0);

		const formattedTime = new FormattedTime({
			timestamp,
			timezone
		});

		expect(formattedTime.relativeDateTime).toBe('Just now');
	});

	it('should give a minute text', () => {
		mockDate(timestamp + 80000);

		const formattedTime = new FormattedTime({
			timestamp,
			timezone
		});

		expect(formattedTime.relativeDateTime).toBe('A minute ago');
	});

	it('should give few minutes text', () => {
		mockDate(timestamp + 1700000);

		const formattedTime = new FormattedTime({
			timestamp,
			timezone
		});

		expect(formattedTime.relativeDateTime).toBe('28 minutes ago');
	});

	it('should give today text', () => {
		mockDate(timestamp + 42000000);

		const formattedTime = new FormattedTime({
			timestamp,
			timezone
		});

		expect(formattedTime.relativeDateTime).toBe('Today 9:00AM');
	});

	it('should give yesterday text', () => {
		mockDate(timestamp + 100000000);

		const formattedTime = new FormattedTime({
			timestamp,
			timezone
		});

		expect(formattedTime.relativeDateTime).toBe('Yesterday 9:00AM');
	});

	it('should give past week text', () => {
		mockDate(timestamp + 200000000);

		const formattedTime = new FormattedTime({
			timestamp,
			timezone
		});

		expect(formattedTime.relativeDateTime).toBe('Friday 9:00AM');
	});

	it('should give greater than a week text', () => {
		mockDate(timestamp + 600000000);

		const formattedTime = new FormattedTime({
			timestamp,
			timezone
		});

		expect(formattedTime.relativeDateTime).toBe('12/01/17 9:00AM');
	});

	it('should return a timestamp from a backend date', () => {
		const formattedTime = FormattedTime.getTimestampFromBackendDate(backendDateString);

		expect(formattedTime).toBe(timestamp);
	});

	it('should return a backend formatted date from a timestamp', () => {
		const formattedTime = new FormattedTime({ timestamp });

		expect(formattedTime.getBackendFormattedDate).toBe(backendDateString);
	});
});
