// @flow
import type {Author} from '../types';

type VersionId = string;

type PostVersion = {
	versionId: VersionId,
	author: Author,
	createdAt: number,
	isRevert: boolean,
	isLast: boolean,
	status: string,
	recoverVersion: (id: VersionId) => void
};

type CurrentPostVersion = {
	currentUser: string
};

type RawPostVersionList = {
	// TODO update unsealed object to one of the Post types
	[id: string]: {}
};

type PostVersionList = Array<PostVersion>;

export type {
	VersionId,
	PostVersion,
	CurrentPostVersion,
	RawPostVersionList,
	PostVersionList
};
