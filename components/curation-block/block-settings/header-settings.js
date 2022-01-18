// @flow

import * as React from 'react';
import styled from 'styled-components';
import Checkbox, { Wrapper as CheckboxWrapper } from '../../form/checkbox/checkbox';
import Textfield from '../../form/textfield18';
import isValidUrl from '../utils/isValidUrl';
import { SectionHeader, Column, ColumnWrapper } from './components';
import ImagePicker from 'kinja-components/components/form/image-picker';
import uploadImage from 'kinja-magma/api/uploadImage';
import type { TopHeader } from 'kinja-magma/models/CurationBlock';
import type { SimpleImageJSON } from 'kinja-magma/models/SimpleImage';

const Container = styled.div`

	${CheckboxWrapper} {
		margin-bottom: 2rem;
	}
`;

type Props = {|
	defaultHeader?: ?TopHeader,
	onChange: (TopHeader | null | Error) => void
|}

function isValidHeader(header: TopHeader): boolean {
	const linkIsValid = !header.customHeaderLink || !header.customHeaderLink.url || isValidUrl(header.customHeaderLink.url);
	return !!(header.title && linkIsValid);
}

export default function HeaderSettings(props: Props) {
	const { defaultHeader, onChange } = props;
	const [showHeader, setShowHeader] = React.useState(!!props.defaultHeader);
	const [values, setValues] = React.useState<TopHeader>({
		title: defaultHeader ? defaultHeader.title : '',
		links: defaultHeader ? defaultHeader.links : [],
		customHeaderLink: defaultHeader ? defaultHeader.customHeaderLink : {
			url: '',
			text: ''
		},
		logo: defaultHeader ? defaultHeader.logo : undefined
	});
	// Update state when the default header changes (can happen when autofill changes)
	React.useEffect(() => {
		if (!defaultHeader) {
			return;
		}
		setShowHeader(true);
		setValues(values => ({
			...values,
			...defaultHeader
		}));
	}, [defaultHeader]);
	const onShowHeaderChange = React.useCallback(() => {
		const newShowHeader = !showHeader;
		setShowHeader(newShowHeader);
		if (newShowHeader && isValidHeader(values)) {
			return onChange(values);
		}
		if (newShowHeader && !isValidHeader(values)) {
			return onChange(new Error());
		}
		return onChange(null);
	}, [onChange, showHeader, values]);

	const onTitleChange = React.useCallback((title: string) => {
		const newHeader = {
			...values,
			title
		};
		setValues(newHeader);
		if (isValidHeader(newHeader)) {
			return onChange(newHeader);
		}
		return onChange(new Error());
	}, [onChange, values]);

	const onLinkChange = React.useCallback((url: string) => {
		const newHeader = {
			...values,
			customHeaderLink: {
				...values.customHeaderLink,
				url
			}
		};
		setValues(newHeader);
		if (isValidHeader(newHeader)) {
			return onChange(newHeader);
		}
		return onChange(new Error());
	}, [onChange, values]);

	const onCustomLinkTextChange = React.useCallback((text: string) => {
		const newHeader = {
			...values,
			customHeaderLink: {
				...values.customHeaderLink,
				text
			}
		};
		setValues(newHeader);
		if (isValidHeader(newHeader)) {
			return onChange(newHeader);
		}
		return onChange(new Error());
	}, [onChange, values]);

	const onLogoChange = React.useCallback((logo?: SimpleImageJSON | null) => {
		const newHeader = {
			...values,
			logo
		};

		setValues(newHeader);
		if (isValidHeader(newHeader)) {
			return onChange(newHeader);
		}
		return onChange(new Error());
	}, [onChange, values]);

	return (
		<Container>
			<SectionHeader>Header</SectionHeader>
			<Checkbox
				label="Show header"
				checked={showHeader}
				onChange={onShowHeaderChange}
			/>
			{showHeader && (
				<ColumnWrapper>
					<Column>
						<Textfield
							name="header-title"
							label="Header title text"
							inlineHelp="Appears on the left"
							value={values.title}
							onChange={onTitleChange}
							error={values.title ? '' : 'This field is required.'}
						/>
						<ImagePicker
							label="Header logo"
							transform="BlogLogoTall"
							defaultValue={values.logo}
							onChange={onLogoChange}
							imageUploader={uploadImage}
							inlineHelp="Optional. Appears in the title's spot when set. The image must be at least 120px tall."
						/>
					</Column>
					<Column>
						<Textfield
							name="header-link"
							label="Link URL"
							inlineHelp="Optional. When set, the header title will be a link and a secondary link will appear on the right."
							value={values.customHeaderLink ? values.customHeaderLink.url : ''}
							onChange={onLinkChange}
							error={values.customHeaderLink ? (
								!values.customHeaderLink.url || isValidUrl(values.customHeaderLink.url) ? '' : 'Invalid url'
							) : ''}
						/>
						<Textfield
							name="header-link-text"
							label="Secondary link text"
							inlineHelp="Appears on the right, if there is a link URL set."
							value={values.customHeaderLink ? values.customHeaderLink.text : ''}
							onChange={onCustomLinkTextChange}
						/>
					</Column>
				</ColumnWrapper>
			)}
		</Container>

	);
}