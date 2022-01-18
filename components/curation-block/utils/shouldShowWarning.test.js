// @flow

import shouldShowWarning, { inactiveTresholdMillis, isNewWarningGreater } from './shouldShowWarning';
import CurationHeartbeat, { type HeartbeatUser } from 'kinja-magma/models/CurationHeartbeat';
import { createUserId, type UserId } from 'kinja-magma/models/Id';
import FormattedTime from 'kinja-components/utils/DateTime';

const now = Date.now(); // The current time - used to check if other users are currently active
jest.spyOn(Date, 'now').mockImplementation(() => now);
const prevUpdatedAt = now - 1; // The time of the last homepage update - used to check for new updates

const prevUpdateFormatted = new FormattedTime({ timestamp: prevUpdatedAt }).getBackendFormattedDate;
const newUpdateFormatted = new FormattedTime({ timestamp: prevUpdatedAt + 1 }).getBackendFormattedDate;
const activeUserLastHeartbeatFormatted =  new FormattedTime({ timestamp: now - inactiveTresholdMillis + 1 }).getBackendFormattedDate;
const inactiveUserLastHeartbeatFormatted = new FormattedTime({ timestamp: now - inactiveTresholdMillis - 1 }).getBackendFormattedDate;

const userId1 = createUserId('5876237249237204999');
const userId2 = createUserId('5876237249237204000');

const currentUser = {
	userId: userId1,
	lastHeartbeat: '2020-03-03T09:30:07.869-05:00[America/New_York]',
	lastEditAction: '2020-03-03T09:29:00.955-05:00[America/New_York]'
};

const getHeartbeat = (props: {
	updatedAt?: string,
	updatedBy?: UserId,
	otherUsers?: Array<HeartbeatUser>
} = {}) => {
	const { updatedAt, updatedBy, otherUsers = [] } = props;

	return new CurationHeartbeat({
		updatedAt: updatedAt || '2020-03-03T09:27:17.712-05:00[America/New_York]',
		updatedBy: updatedBy || userId1,
		currentEditors: [currentUser, ...otherUsers]
	});
};

describe('shouldShowWarning', () => {
	it('should return null if there are no concurrent editors', () => {
		const result = shouldShowWarning(getHeartbeat(), currentUser.userId, prevUpdatedAt);
		expect(result).toBe(null);
	});

	it('should return null if there are no concurrent editors who are active', () => {
		const someoneWhoIsntMe = Object.assign({}, currentUser, {
			userId: userId2,
			lastHeartbeat: inactiveUserLastHeartbeatFormatted
		});
		const heartbeatWithInactiveConcurrentUser = getHeartbeat({ otherUsers: [someoneWhoIsntMe] });

		const result = shouldShowWarning(heartbeatWithInactiveConcurrentUser, currentUser.userId, prevUpdatedAt);
		expect(result).toBe(null);
	});

	describe('There are active concurrent editors', () => {
		it('should return "ConcurrentEditingWarning" if there are no new updates', () => {
			const someoneWhoIsntMe = Object.assign({}, currentUser, {
				userId: userId2,
				lastHeartbeat: activeUserLastHeartbeatFormatted
			});
			const heartbeatWithNoNewUpdates = getHeartbeat({
				otherUsers: [someoneWhoIsntMe],
				updatedAt: prevUpdateFormatted
			});

			const result = shouldShowWarning(heartbeatWithNoNewUpdates, currentUser.userId, prevUpdatedAt);
			result && expect(result.warningType).toBe('ConcurrentEditingWarning');
		});

		it('should return "OverwriteWarning" if the page was saved after prevUpdatedAt', () => {
			const someoneWhoIsntMe = Object.assign({}, currentUser, {
				userId: userId2,
				lastHeartbeat: activeUserLastHeartbeatFormatted
			});
			const heartbeatWithNewUpdates = getHeartbeat({
				otherUsers: [someoneWhoIsntMe],
				updatedAt: newUpdateFormatted,
				updatedBy: someoneWhoIsntMe.userId
			});

			const result = shouldShowWarning(heartbeatWithNewUpdates, currentUser.userId, prevUpdatedAt);
			result && expect(result.warningType).toBe('OverwriteWarning');
		});
	});
});

describe('isNewWarningGreater', () => {
	describe('when there is no current warning', () => {
		it('should return false if there is no new warning', () => {
			const currentWarning = null;
			const newWarning = null;
			expect(isNewWarningGreater(currentWarning, newWarning)).toBe(false);
		});

		it('should return true if the new warning is ConcurrentEditingWarning', () => {
			const currentWarning = null;
			const newWarning = 'ConcurrentEditingWarning';
			expect(isNewWarningGreater(currentWarning, newWarning)).toBe(true);
		});

		it('should return true if the new warning is OverwriteWarning', () => {
			const currentWarning = null;
			const newWarning = 'OverwriteWarning';
			expect(isNewWarningGreater(currentWarning, newWarning)).toBe(true);
		});
	});

	describe('when the current warning is ConcurrentEditingWarning', () => {
		it('should return false if there is no new warning', () => {
			const currentWarning = 'ConcurrentEditingWarning';
			const newWarning = null;
			expect(isNewWarningGreater(currentWarning, newWarning)).toBe(false);
		});

		it('should return false if the new warning is ConcurrentEditingWarning', () => {
			const currentWarning = 'ConcurrentEditingWarning';
			const newWarning = 'ConcurrentEditingWarning';
			expect(isNewWarningGreater(currentWarning, newWarning)).toBe(false);
		});

		it('should return true if the new warning is OverwriteWarning', () => {
			const currentWarning = 'ConcurrentEditingWarning';
			const newWarning = 'OverwriteWarning';
			expect(isNewWarningGreater(currentWarning, newWarning)).toBe(true);
		});
	});

	describe('when the current warning is OverwriteWarning', () => {
		it('should return false if there is no new warning', () => {
			const currentWarning = 'OverwriteWarning';
			const newWarning = null;
			expect(isNewWarningGreater(currentWarning, newWarning)).toBe(false);
		});

		it('should return false if the new warning is ConcurrentEditingWarning', () => {
			const currentWarning = 'OverwriteWarning';
			const newWarning = 'ConcurrentEditingWarning';
			expect(isNewWarningGreater(currentWarning, newWarning)).toBe(false);
		});

		it('should return false if the new warning is OverwriteWarning', () => {
			const currentWarning = 'OverwriteWarning';
			const newWarning = 'OverwriteWarning';
			expect(isNewWarningGreater(currentWarning, newWarning)).toBe(false);
		});
	});
});
