/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import LunchboxEditor from 'kinja-components/components/lunchbox/editor';
import WithFloatingToolbar from 'kinja-components/components/toolbar-floating/with-floating-toolbar';
import Button from 'kinja-components/components/buttons/Button';
import { EnsureDefaultTheme } from 'kinja-components/components/theme';
import specialSectionStreamToolbarConfig from './special-section-stream-toolbar-config';
import Lunchbox from 'kinja-magma/models/Lunchbox';

// ICONS
import FeaturedHeaderClassicReversedIcon from 'kinja-components/components/icon19/FeaturedHeaderClassicReversed';

import type { LunchboxEditorProps } from 'kinja-magma/models/Lunchbox';
import type { LunchboxLayoutType } from 'kinja-magma/models/LunchboxLayoutGroup';
import type { HeaderAlignment } from 'postbody/blockNodes/Header';

const SpecialSectionStreamContainer = styled.main`
	width: 100%;
`;

const AddModuleRegion = styled.section`
	display: flex;
	align-items: center;
	justify-content: center;
	border: 1px dashed ${({ theme }) => theme.color.midgray};
	background-color: ${({ theme }) => theme.color.whitesmoke};
	margin-top: 30px;
	button {
		margin: 30px 7.5px;
	}
`;

type Props = {
	customContent: Array<LunchboxEditorProps>,
	updateCustomContent: (props: { customContent: Array<LunchboxEditorProps> }) => void,
	handleMediaUpload: (target: string) => void,
	handleAddLinkToModule: (target: string) => void
};

type newAttributeType =
	| { headerText: string }
	| { paragraphText: string }
	| { currentLayout: LunchboxLayoutType }
	| { textAlignment: HeaderAlignment }
	| { backgroundColor: string }
	| { image: null };

type State = { selectedModule?: string };

export default class SpecialSectionStreamEditor extends React.Component<Props, State> {
	constructor() {
		super();
		this.state = {};
	}

	editModule = (moduleId: string, newAttributes: newAttributeType): void => {
		const { customContent } = this.props;
		const indexOfModuleToEdit = customContent.findIndex(mod => mod.id === moduleId);
		if (indexOfModuleToEdit > -1) {
			// make a copy of the module we want to edit
			const newModule = { ...customContent[indexOfModuleToEdit] };
			// apply updates to the module
			const newEditedModule = { ...newModule, ...newAttributes };
			// never directly edit a prop;
			const newModules = customContent.slice();
			newModules.splice(indexOfModuleToEdit, 1, newEditedModule);
			this.props.updateCustomContent({
				customContent: newModules
			});
		}
	};

	addLunchboxModule = () => {
		const { customContent } = this.props;
		const id = String(Date.now());
		this.props.updateCustomContent({
			customContent: [
				...customContent,
				{
					id,
					currentLayout: Lunchbox.Layouts.ImageText.HeaderParagraph.Left,
					handleUpdateHeader: props => this.editModule(id, props),
					handleUpdateParagraph: props => this.editModule(id, props),
					handleUpdateLayout: props => this.editModule(id, props),
					handleMediaUpload: () => this.props.handleMediaUpload(id)
				}
			]
		});
	};

	deleteModule = (moduleId: string) => {
		const { customContent } = this.props;
		const newModules = customContent.filter(mod => mod.id !== moduleId);
		this.props.updateCustomContent({ customContent: newModules });
	};

	moveModule = (moduleId: string, direction: 'up' | 'down') => {
		const { customContent } = this.props;
		const moduleIndex = customContent.findIndex(mod => mod.id === moduleId);
		if (moduleIndex > -1) {
			const newModules = customContent.slice();
			switch (direction) {
				case 'up': {
					// $FlowFixMe
					[newModules[moduleIndex - 1], newModules[moduleIndex]] = [newModules[moduleIndex], newModules[moduleIndex - 1]];
					this.props.updateCustomContent({ customContent: newModules });
					break;
				}
				case 'down': {
					// $FlowFixMe
					[newModules[moduleIndex + 1], newModules[moduleIndex]] = [newModules[moduleIndex], newModules[moduleIndex + 1]];
					this.props.updateCustomContent({ customContent: newModules });
					break;
				}
				default: {
					break;
				}
			}
		}
	};

	render() {
		const { customContent } = this.props;
		return (
			<EnsureDefaultTheme>
				<SpecialSectionStreamContainer>
					{customContent.map(mod => (
						<WithFloatingToolbar
							key={mod.id}
							toolbarItems={specialSectionStreamToolbarConfig({
								moveModule: this.moveModule,
								deleteModule: this.deleteModule,
								currentModuleId: mod.id,
								addLinkToModule: this.props.handleAddLinkToModule,
								textAlignment: mod.textAlignment || 'Center',
								updateTextAlignment: this.editModule,
								addBackgroundColor: this.editModule,
								customContent
							})}
							showToolbar={mod.id === this.state.selectedModule}
							onClick={() => {
								if (this.state.selectedModule !== mod.id) {
									this.setState({ selectedModule: mod.id });
								}
							}}
						>
							<LunchboxEditor
								handleUpdateHeader={props => this.editModule(mod.id, props)}
								handleUpdateParagraph={props => this.editModule(mod.id, props)}
								handleUpdateLayout={props => this.editModule(mod.id, props)}
								handleMediaUpload={() => this.props.handleMediaUpload(mod.id)}
								deleteImage={() => this.editModule(mod.id, { image: null })}
								showToolbar={mod.id === this.state.selectedModule}
								{...mod}
							/>
						</WithFloatingToolbar>
					))}
					<AddModuleRegion>
						<Button
							label="Add Text or Images"
							icon={<FeaturedHeaderClassicReversedIcon />}
							onClick={this.addLunchboxModule}
							labelPosition="after"
						/>
					</AddModuleRegion>
				</SpecialSectionStreamContainer>
			</EnsureDefaultTheme>
		);
	}
}
