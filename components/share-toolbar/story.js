/* @flow */

import * as React from 'react';
import {
	storiesOf,
	withDocs,
	blogGroup
} from 'base-storybook';
import copy from 'copy-text-to-clipboard';
import Theme from '../theme';
import { componentStates } from './__fixtures__/componentStates';
import ShareToolbar from './share-toolbar';

// ICONS
import FacebookIcon from '../icon19/Facebook';
import TwitterIcon from '../icon19/Twitter';
import MailIcon from '../icon19/Mail';
import LinkIcon from '../icon19/Link';

import README from './README.md';

const stories = storiesOf('4. Components|Share Toolbar', module)
	.addDecorator(withDocs(README));

Object.keys(componentStates).forEach(key => {
	stories.add(componentStates[key].name, () => {
		const summary = (
			<ShareToolbar {...componentStates[key].props}>
				{({ ToolbarItem, ToolbarButton }) => {
					return (
						<React.Fragment>
							<ToolbarItem href='https://facebook.com'>
								<ToolbarButton>
									<FacebookIcon />
								</ToolbarButton>
							</ToolbarItem>
							<ToolbarItem href='https://twitter.com'>
								<ToolbarButton>
									<TwitterIcon />
								</ToolbarButton>
							</ToolbarItem>
							<ToolbarItem href='https://gmail.com'>
								<ToolbarButton>
									<MailIcon />
								</ToolbarButton>
							</ToolbarItem>
							<ToolbarItem onClick={() => {
								alert('copied to clipboard.');
								copy('https://giz.do/824025130');
							}}>
								<ToolbarButton>
									<LinkIcon />
								</ToolbarButton>
							</ToolbarItem>
						</React.Fragment>
					);
				}}
			</ShareToolbar>
		);
		return (
			<Theme blog={blogGroup()}>
				{summary}
			</Theme>
		);
	});
});
