// @flow

import * as React from 'react';
import type { Autofill } from 'kinja-magma/models/CurationBlock';
import RadioGroup from '../../form/radio-group';
import Radio from '../../form/radio';
import Textfield from '../../form/textfield18';
import isValidUrl from '../utils/isValidUrl';
import parseFeed from '../utils/parseFeed';
import { Container, SectionHeader, Column, ColumnWrapper } from './components';
import getAutofillMeta from './getAutofillMeta';

type Props = {|
	defaultAutofill?: ?Autofill,
	onChange: (Autofill | null | Error) => void,
	onHeaderValues: ({
		title: string,
		url: string
	}) => void // Called when we have a successful autofill change, and the header should be populated
|}

export default function AutofillSettings(props: Props) {
	const { onChange, onHeaderValues } = props;
	const [isAutofill, setIsAutofill] = React.useState(!!props.defaultAutofill);
	const [autofillUrl, setAutofillUrl] = React.useState('');
	const [value, setValue] = React.useState(props.defaultAutofill); // Keeping valid autofill value for when switching back and forth
	const [error, setError] = React.useState<string | null>(null);
	const [isLoading, setIsLoading] = React.useState(false);

	React.useEffect(() => {
		if (props.defaultAutofill) {
			getAutofillMeta(props.defaultAutofill)
				.then(data => setAutofillUrl(data.url))
				.catch(err => console.error(err));
		}
	}, [props.defaultAutofill]);

	const onIsAutofillChange = React.useCallback((isAutofill: boolean) => {
		setIsAutofill(isAutofill);
		if (isAutofill && value) {
			onChange(value);
		} else if (isAutofill) {
			onChange(new Error());
		} else {
			onChange(null);
		}
	}, [onChange, value]);

	const onURLChange = React.useCallback((url: string) => {
		setValue(null);
		setAutofillUrl(url);
		if (!isValidUrl(url)) {
			onChange(new Error());
			return setError('Invalid url');
		}
		setError('');
		setIsLoading(true);
		onChange(new Error());
		parseFeed(url).then(autofill => {
			if (autofill) {
				// On a valid autofill, fetch header information to populate default values
				getAutofillMeta(autofill).then(autofillData => {
					setValue(autofill);
					setIsLoading(false);
					onChange(autofill);
					onHeaderValues(autofillData);
				})
					.catch(() => {
						// If this call fails, we just don't fill the header, but the autofill should still work
						setValue(autofill);
						setIsLoading(false);
						onChange(autofill);
					});
			} else {
				setIsLoading(false);
				onChange(new Error());
				setError('Unable to parse provided feed');
			}
		})
			.catch(() => {
				setIsLoading(false);
				onChange(new Error());
				setError('An unexpected error happened');
			});
	}, [onChange, onHeaderValues]);

	return (
		<Container>
			<SectionHeader>Stories</SectionHeader>
			<ColumnWrapper>
				<Column>
					<RadioGroup name="autofill" onChange={onIsAutofillChange}>
						<Radio
							checked={!isAutofill}
							label="Add stories manually"
							value={false}
						/>
						<Radio
							checked={isAutofill}
							label="Add stories automatically"
							inlineHelp="Stories are automatically fetched from a vertical, story type, category or tag."
							value={true}
						/>
					</RadioGroup>
				</Column>
				{isAutofill && (
					<Column>
						<Textfield
							name="autofill-url"
							label="Add stories from"
							inlineHelp="Paste the URL of a blog, vertical, story type, category or tag"
							value={autofillUrl}
							onChange={onURLChange}
							error={error || ''}
							status={isLoading ? 'loading' : 'default'}
						/>
					</Column>
				)}
			</ColumnWrapper>
		</Container>

	);
}