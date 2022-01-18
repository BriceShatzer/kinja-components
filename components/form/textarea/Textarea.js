/* @flow */

import * as React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import Field from '../field';
import classnames from 'classnames';

type Props = {
	autogrow?: boolean,
	error?: string,
	label?: string,
	name: string,
	onChange: (string, HTMLTextAreaElement) => void,
	rows?: number,
	value?: string,
	counter?: boolean,
	limit?: number,
	fullWidth?: boolean
};

const Textarea = (props: Props) => {
	const {
		autogrow,
		error,
		label,
		name,
		onChange,
		rows = props.autogrow ? 1 : props.rows,
		value = props.value || '',
		counter,
		limit,
		fullWidth,
		...other
	} = props;

	const textareaClasses = classnames(
		autogrow ? 'autogrow-short textarea--multiline' : 'textarea--box');

	const textareaProps = {
		className: textareaClasses,
		id: name,
		name,
		onChange: event => onChange(event.target.value, event.target),
		rows,
		value,
		fullWidth,
		...other
	};

	return (
		<Field label={label} value={value} error={error} counter={counter} limit={limit} fullWidth={fullWidth}>
			{autogrow
				? <TextareaAutosize {...textareaProps} useCacheForDOMMeasurements />
				: <textarea {...textareaProps} />
			}
		</Field>
	);
};

export default Textarea;
