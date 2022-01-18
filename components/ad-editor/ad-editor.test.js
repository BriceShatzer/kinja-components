import React from 'react';
import { AdEditor } from './index';
import { mount } from 'enzyme';


const flushPromises = () => new Promise(resolve => setTimeout(resolve, 0));

describe('AdEditor', () => {
	let editor;

	beforeEach(function removeFromDocument() {
		if (editor) {
			editor.unmount();
			editor = null;
		}
	});

	it('should render 2 panels', () => {
		const PANELS = [
			{
				name: 'Primary Panel',
				resources: []
			},
			{
				name: 'Leave Behind',
				resources: []
			}
		];
		editor = mount(<AdEditor panels={PANELS} />);

		expect(editor.containsMatchingElement(<h6>Primary Panel</h6>)).toBe(true);
		expect(editor.containsMatchingElement(<h6>Leave Behind</h6>)).toBe(true);
	});

	it('should render 0 panels', () => {
		const PANELS = [];
		editor = mount(<AdEditor panels={PANELS} />);

		const panelContainer = editor.find('UnstyledAdEditorSection[title="Panels"]');
		expect(panelContainer.children().length).toBe(1);
	});

	it('should render first panel layouts by default', async () => {
		const PANELS = [
			{
				name: 'Primary Panel',
				resources: [
					{
						name: '16:9 Aspect Ratio',
						resource: 'https://app.specless.tech/api/1/creative/snapshot/ptc8tD/0006/primary-panel.png?q=low'
					},
					{
						name: '1:1 Aspect Ratio',
						resource: 'https://app.specless.tech/api/1/creative/snapshot/ptc8tD/0006/primary-panel/1by1.png?w=450&h=450&q=low'
					},
					{
						name: '3:1 Aspect Ratio',
						resource: 'https://app.specless.tech/api/1/creative/snapshot/ptc8tD/0006/primary-panel/3by1.png?w=1200&h=400&q=low'
					}
				]
			},
			{
				name: 'Leave Behind',
				resources: []
			}
		];
		editor = mount(<AdEditor panels={PANELS} />);

		await flushPromises();
		editor.update();

		expect(editor.containsMatchingElement(<h6>16:9 Aspect Ratio</h6>)).toBe(true);
		expect(editor.containsMatchingElement(<h6>1:1 Aspect Ratio</h6>)).toBe(true);
		expect(editor.containsMatchingElement(<h6>3:1 Aspect Ratio</h6>)).toBe(true);
	});

	it('should render first layout of selected panel by default in preview', async () => {
		const PANELS = [
			{
				name: 'Primary Panel',
				resources: [
					{
						name: '16:9 Aspect Ratio',
						resource: 'https://app.specless.tech/api/1/creative/snapshot/ptc8tD/0006/primary-panel.png?q=low'
					},
					{
						name: '1:1 Aspect Ratio',
						resource: 'https://app.specless.tech/api/1/creative/snapshot/ptc8tD/0006/primary-panel/1by1.png?w=450&h=450&q=low'
					}
				]
			},
			{
				name: 'Leave Behind',
				resources: []
			}
		];
		editor = mount(<AdEditor panels={PANELS} />);

		await flushPromises();
		editor.update();

		const previewContainer = editor.find('UnstyledAdEditorSection[title="Preview"]');
		expect(previewContainer.containsMatchingElement(<h6>16:9 Aspect Ratio</h6>)).toBe(true);
	});
});
