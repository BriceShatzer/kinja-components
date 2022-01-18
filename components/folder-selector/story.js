/* @flow */

import * as React from 'react';
import {
	boolean,
	storiesOf,
	text,
	withDocs
} from 'base-storybook';
import { omit } from 'lodash';
import styled from 'styled-components';

import FolderSelector from './folder-selector';
import { levels, levelsForMultipleSelection } from './fixtures';
import README from './README.md';

import type { ItemId, Level, SelectedItem } from './types';


type State = {
	message: string,
	cancelMessage: string,
	levels: Array<Level>,
	levelsForMultipleSelection: Array<Level>
}

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;
const Message = styled.div`
	margin-bottom: 18px;
`;

function updateWithCurrentSelection(levels: Array<Level>, selection?: Array<?ItemId>) {
	return levels.map((level, index) => Object.assign({}, level, { selection: selection && selection[index] }));
}

class FolderSelectorPreview extends React.Component<{ multipleSelection: boolean }, State> {
	constructor(props) {
		super(props);

		this.state = {
			message: '[empty]',
			cancelMessage: '',
			levels: levels.map((level, index) => index === 0 ? level : omit(level, ['items', 'selection'])),
			levelsForMultipleSelection
		};
	}

	onSelect = (selection: Array<SelectedItem>) => {
		return Promise.resolve(() => {
			this.setState({
				message: selection.length ? selection.map(level => level.selection).join(' > ') : '[empty]',
				cancelMessage: '',
				levels: updateWithCurrentSelection(this.state.levels, selection.map(level => level.selection && level.selection))
			});
		});
	}

	onCancel = () => {
		this.setState({cancelMessage: ' Last selection was canceled.'});
	}

	render() {
		const { multipleSelection } = this.props;

		return (
			<Wrapper>
				{ multipleSelection
					? <FolderSelector
						levels={this.state.levelsForMultipleSelection}
						multipleSelection={multipleSelection}
						placeholder={text('Placeholder', 'Choose target blogs')}
						onSelect={this.onSelect}
						onCancel={this.onCancel}
					/>
					: <React.Fragment>
						<Message>Callback received the following selection: <strong>{this.state.message}</strong>{this.state.cancelMessage}</Message>
						<FolderSelector
							levels={this.state.levels}
							multipleSelection={multipleSelection}
							onSelect={this.onSelect}
							onCancel={this.onCancel}
						/>
					</React.Fragment>
				}
			</Wrapper>
		);
	}
}

storiesOf('4. Components|FolderSelector', module)
	.addDecorator(withDocs(README))
	.add('FolderSelector', () => (
		<FolderSelectorPreview multipleSelection={boolean('Multiple Selection', false)} />
	));
