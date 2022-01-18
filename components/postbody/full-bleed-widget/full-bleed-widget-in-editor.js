// @flow
import * as React from 'react';
import { FullBleedWidget } from './fullBleedWidget';
import type { Props } from './fullBleedWidget';

const FullBleedWidgetInEditor = (props: Props) => (
	<aside className="kinja-full-bleed-image js_full-bleed" contentEditable={false} data-format={props.image.format}>
		<FullBleedWidget {...props} editable isVisible />
	</aside>
);

export default FullBleedWidgetInEditor;
