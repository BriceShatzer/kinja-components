import * as React from 'react';
import {
	storiesOf,
	withDocs,
	action
} from 'base-storybook';
import ToolbarItem from '../toolbar-item';
import README from './README.md';

import AlignLeftIcon from '../icon19/AlignLeft';

storiesOf('3. Elements|Toolbar/Floating Toolbar/Toolbar Item', module)
	.addDecorator(withDocs(README))
	.add('ToolbarItem', () => {
		return (
			<div style={{display: 'flex'}}>
				<ToolbarItem
					title="Left align"
					icon={<AlignLeftIcon />}
					onClick={action('Left align')}
					disabled={false}
					active={false}
				/>
				<ToolbarItem
					title="Disabled"
					showtitle
					icon={<AlignLeftIcon />}
					onClick={() => {}}
					disabled
					active={false}
				/>
				<ToolbarItem
					title="Active"
					showtitle
					icon={<AlignLeftIcon />}
					onClick={() => {}}
					disabled={false}
					active
				/>
				<ToolbarItem
					title="With title"
					showtitle
					icon={<AlignLeftIcon />}
					onClick={() => {}}
				/>
			</div>
		);
	});
