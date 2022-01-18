// @flow

import type { UserId } from 'kinja-magma/models/Id';
import type User from 'kinja-magma/models/User';
import type CurationHeartbeat, { HeartbeatUser } from 'kinja-magma/models/CurationHeartbeat';
import FormattedTime from 'kinja-components/utils/DateTime';

export type ConcurrentEditWarningType = 'OverwriteWarning' | 'ConcurrentEditingWarning';

export type UserWithTimestamp = {
	lastEditAction?: number,
	editor: User,
	updatedBy?: boolean
}

export type EditorWarning = {
	activePeers: Array<HeartbeatUser>,
	updatedBy?: ?UserId,
	warningType: ConcurrentEditWarningType
};

export const inactiveTresholdMillis = 5 * 60 * 1000;
const { getTimestampFromBackendDate } = FormattedTime;

export function isNewWarningGreater(
	currentWarningLevel: ConcurrentEditWarningType | null,
	newWarningLevel: ConcurrentEditWarningType | null
) {
	if (!currentWarningLevel) {
		return (Boolean(newWarningLevel));
	}

	if (currentWarningLevel === 'ConcurrentEditingWarning') {
		return newWarningLevel === 'OverwriteWarning';
	} else if (currentWarningLevel === 'OverwriteWarning') {
		return false;
	}
}

export default function shouldShowWarning(
	{
		updatedAt,
		updatedBy,
		currentEditors
	}: CurationHeartbeat,
	currentUserId: UserId,
	prevUpdatedAt: number | null
): EditorWarning | null {
	const activePeers = currentEditors.filter(user => (
		user.userId !== currentUserId
		&& Date.now() - getTimestampFromBackendDate(user.lastHeartbeat) < inactiveTresholdMillis
	));

	if (activePeers.length) {
		const updatedAtTimestamp = getTimestampFromBackendDate(updatedAt);
		const isOverwriteWarning = updatedBy !== currentUserId && prevUpdatedAt && updatedAtTimestamp > prevUpdatedAt;
		const warningType = isOverwriteWarning ? 'OverwriteWarning' : 'ConcurrentEditingWarning';

		return {
			activePeers: activePeers.filter(p => p.userId !== currentUserId),
			updatedBy: isOverwriteWarning ? updatedBy : null,
			warningType
		};
	} else {
		return null;
	}
}
