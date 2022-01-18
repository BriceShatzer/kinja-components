/* @flow */

import * as React from 'react';
import truncate from 'html-truncate';

type Props = {
	value: string,
	truncateAt: number,
	isEditing: boolean,
	isEditable: boolean,
	handleEditableContent: (data: { state: string, prev: string }, evt: *) => void,
	handleEditableContentInput: (data: { truncateAt: number }, evt: *) => void
}

const Excerpt = (props: Props) => {
	const { value,
		truncateAt = 0,
		isEditing,
		isEditable,
		handleEditableContent,
		handleEditableContentInput
	} = props || {};

	if (!value) {
		return null;
	}

	// Truncation options:
	// - should not cut words in the middle (`trnucateLastWord: false`)
	// - length is maxLength (`truncateAt`) minus the `slop` param
	// - slop: tolerance before we give up and just truncate at the maxLength position
	const truncationOptions = {
		truncateLastWord: false,
		slop: 5,
		ellipsis: '…'
	};
	const truncationLength = truncateAt - truncationOptions.slop;
	const excerptText = truncateAt ? truncate(value, truncationLength, truncationOptions) : value;

	if (!isEditing) {
		return (
			<p dangerouslySetInnerHTML={{ __html: excerptText }} />
		);
	}

	if (isEditing && isEditable) {
		const onBlur = handleEditableContent && handleEditableContent.bind(null, {
			state: 'excerpt',
			prev: value
		});
		const onInput = handleEditableContentInput && handleEditableContentInput.bind(null, {
			truncateAt
		});
		return (
			<p
				tabIndex={0}
				contentEditable
				onBlur={onBlur}
				onInput={onInput}
				dangerouslySetInnerHTML={{ __html: excerptText }}
			/>
		);
	}
};

export default Excerpt;
