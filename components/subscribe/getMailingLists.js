/* @flow */

import { MAILING_LISTS } from '../../config/consts';

export type MailingListId = number | string;

export type MailingList = {
	key: string,
	name: string,
	id: MailingListId,
	description?: string,
	provider: string
};

const getMailingLists = (blogGroup: string): Array<MailingList> => MAILING_LISTS[blogGroup] || [];

export default getMailingLists;
