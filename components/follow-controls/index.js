// @flow
import type { UserId, BlogId} from 'kinja-magma/models/Id' ;
import type { UserFollow, UserFollowType } from 'kinja-magma/models/UserFollow' ;

export type FollowControlsProps = {|
	id: UserId | BlogId,
	type: UserFollowType,
	userFollows?: Array<UserFollow>,
	renderLoginModal?: () => void | Promise<void>
|}

export { FollowControls }  from './follow-controls';
