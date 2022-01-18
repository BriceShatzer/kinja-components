/* @flow */

import * as React from 'react';
import {
	storiesOf,
	withDocs,
	action,
	select
} from 'base-storybook';
import FloatingToolbar from './floating-toolbar';
import ToolbarItem from '../toolbar-item';
import AlignLeftIcon from '../icon19/AlignLeft';
import AlignRightIcon from '../icon19/AlignRight';
import AlignCenterIcon from '../icon19/AlignCenter';
import README from './README.md';

storiesOf('3. Elements|Toolbar/Floating Toolbar/Floating Toolbar', module)
	.addDecorator(withDocs(README))
	.add('FloatingToolbar', () => {
		const leftAlignStatus = select('Left align', {
			normal: 'Normal',
			active: 'Active',
			disabled: 'Disabled'
		}, 'normal');
		const centerAlignStatus = select('Center align', {
			normal: 'Normal',
			active: 'Active',
			disabled: 'Disabled'
		}, 'normal');
		const deleteStatus = select('Delete', {
			normal: 'Normal',
			active: 'Active',
			disabled: 'Disabled'
		}, 'normal');
		return (<FloatingToolbar>
			<ToolbarItem
				title="Left align"
				icon={<AlignLeftIcon />}
				onClick={action('Left align')}
				disabled={leftAlignStatus === 'disabled'}
				active={leftAlignStatus === 'active'}
			/>
			<ToolbarItem
				title="Center align"
				icon={<AlignCenterIcon />}
				onClick={action('Center align')}
				disabled={centerAlignStatus === 'disabled'}
				active={centerAlignStatus === 'active'}
			/>
			<ToolbarItem
				title="Right align"
				icon={<AlignRightIcon />}
				onClick={action('Right align')}
				disabled={deleteStatus === 'disabled'}
				active={deleteStatus === 'active'}
			/>
		</FloatingToolbar>);
	});
