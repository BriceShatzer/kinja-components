/* @flow */

import * as React from 'react';
import {
	storiesOf,
	withDocs,
	action
} from 'base-storybook';
import CurationToolbar from './curation-toolbar';
import README from './README.md';

type State = { isEditMode: boolean };

class ToolbarContainer extends React.Component<*, State> {
	constructor(props) {
		super(props);
		this.state = { isEditMode: false };
	}
	render() {
		return (
			<CurationToolbar
				isEditMode={this.state.isEditMode}
				toggleHandler={() => {
					this.setState(prevState => ({
						isEditMode: !prevState.isEditMode
					}), action('toggle'));
				}}
				saveHandler={action('save')}
			/>
		);
	}
}

storiesOf('4. Components|Post Promotion/Curation/Curation Toolbar', module)
	.addDecorator(withDocs(README))
	.add('CurationToolbar', () => (
		<ToolbarContainer />
	));
