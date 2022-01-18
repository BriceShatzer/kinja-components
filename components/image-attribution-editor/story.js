/* @flow */

import * as React from 'react';
import { storiesOf, withDocs } from 'base-storybook';
import { ImageAttributionEditor } from './image-attribution-editor';
import exportInlineNodes from '../../../../public/javascripts/app/editor/postbody/inlineNodeExporter.es6';
import README from './README.md';

const attributionEditorData = [
	{
		label: 'Photo',
		credit: 'John Doe',
		source: 'GIZMODO'
	},
	{
		label: 'Graphic',
		credit: 'Mary Smith',
		source: 'FMG'
	}
];

storiesOf('4. Components|Image Attribution', module)
	.addDecorator(withDocs(README))
	.add('Attribution Card', () => (
		<ImageAttributionEditor
			caption="O Caption, My Caption"
			image={{
				id: 'jqrnrspy5ojdiemoqk5h',
				format: 'jpg'
			}}
			attribution={attributionEditorData}
			exportInlineNodes={exportInlineNodes}
			syndicationRights={false}
			urlValidationOn={false}
			checkUrl={() => Promise.resolve()}
			onComplete={() => {}}
			onCancel={() => { }}
			ga={() => {}}
		/>
	));
