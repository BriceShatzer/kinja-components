import * as React from 'react';
import {
	storiesOf,
	withDocs,
	boolean
} from 'base-storybook';
import defaultLayouts from '../curation-layout/default-layouts-stub';
import layoutToolbarConfig from '../curation-layout/layout-toolbar-config';
import LayoutToolbar from './toolbar-layout';
import AlignLeftIcon from '../icon19/AlignLeft';
import README from './README.md';

storiesOf('4. Components|Layout Toolbar', module)
	.addDecorator(withDocs(README))
	.add('Single', () => {
		const noop = () => {};
		const modularToolBarItems = {
			title: 'Alpha',
			icon: <AlignLeftIcon />,
			onClick: noop,
			active: boolean('active', true),
			children: [
				{
					title: 'Beta',
					active: true,
					icon: <AlignLeftIcon />,
					onClick: noop
				},
				{
					title: 'Gamma',
					active: false,
					icon: <AlignLeftIcon />,
					onClick: noop
				},
				{
					title: 'Delta',
					active: false,
					icon: <AlignLeftIcon />,
					onClick: noop
				}
			]
		};
		return (
			<LayoutToolbar {...modularToolBarItems} />
		);
	})
	.add('Multiple', () => {
		const toolbarItems = layoutToolbarConfig(
			defaultLayouts.filter(val => val.active)[0],
			() => {}
		);
		const headline = { ...toolbarItems.headline, isFirst: true, isBetween: false, isLast: false };
		const modular = { ...toolbarItems.modular, isFirst: false, isBetween: true, isLast: false };
		const equal = { ...toolbarItems.equal, isFirst: false, isBetween: false, isLast: true };
		return (
			<div className='toolbar-container'>
				<LayoutToolbar {...headline} />
				<LayoutToolbar {...modular} />
				<LayoutToolbar {...equal} />
			</div>
		);
	});
