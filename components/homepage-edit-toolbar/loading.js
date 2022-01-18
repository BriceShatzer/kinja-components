/* @flow */

import * as React from 'react';
import Button from '../button19';
import Close from '../icon19/Close';
import { Container, Title } from './homepage-edit-toolbar';
import EnsureDefaultTheme from '../theme/ensureDefaultTheme';

type Props = {|
	onCancel: () => void,
|};

export default function HomepageEditToolbarLoading(props: Props) {
	return (
		<EnsureDefaultTheme>
			<Container>
				<Title>Loading the homepage editor...</Title>
				<Button	isSmall	icon={<Close />} labelPosition="after" variant="tertiary" label="Cancel" onClick={props.onCancel} />
			</Container>
		</EnsureDefaultTheme>
	);
}