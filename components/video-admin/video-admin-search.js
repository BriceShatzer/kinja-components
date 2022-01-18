// @flow
import * as React from 'react';
import styled from 'styled-components';

import createTranslate from 'kinja-components/components/translator';
import translations from '../video-search/translations';
import {
	Textfield18 as TextField,
	Option,
	Select
} from '../form';

import type { Locale } from 'kinja-magma/models/Locale';
import type { Program } from 'kinja-magma/api/video';

type Props = {
	getPrograms: () => Promise<Array<Program>>,
	onSearch: (value: string, program: string) => void,
	searchValue: string,
	searchProgram: string,
	locale?: Locale
};

const Container = styled.div`
	display: flex;
	max-width: 640px;
	> div {
		flex-basis: 50%;
		&:first-child {
			margin-bottom: 0;
			margin-right: 20px;
			padding-top: 14px;
		}
	}
`;

export default function VideoAdminSearch(props: Props) {
	const [programs, setPrograms] = React.useState<Array<Program>>([]);
	const translate = createTranslate(translations, props.locale);

	const renderProgramOptions = (): React.Node => programs.map(({ id, network, title }: Program) =>
		<Option key={id} value={network} stringRepresentation={title} />);

	React.useEffect(() => {
		props.getPrograms()
			.then(programs => {
				setPrograms(programs);
			});
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return <Container>
		<TextField
			name="term"
			label={translate('Search videos')}
			onChange={value => props.onSearch(value, props.searchProgram)}
		/>
		<div>
			<Select
				description="Filter by network"
				onChange={network => props.onSearch(props.searchValue, network)}
				value={props.searchProgram}
				labelPosition="above"
			>
				<Option
					key="default"
					value=""
					stringRepresentation={programs.length ? 'Choose a network' : 'Loading...'}
				/>
				{renderProgramOptions()}
			</Select>
		</div>
	</Container>;
}