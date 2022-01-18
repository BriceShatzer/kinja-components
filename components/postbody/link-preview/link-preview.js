/* @flow */

import * as React from 'react';
import NormalLinkPreview from './normal-link-preview';
import CommerceLinkPreview from './link-preview-commerce';
import type { Props } from './normal-link-preview';
import { type KinjaMetaInjectedProps } from '../../hoc/context';

function LinkPreview(props: $Diff<Props, KinjaMetaInjectedProps>) {
	const { style } = props;
	switch (style) {
		case 'Normal':
			return <NormalLinkPreview {...props} style={style} url={props.url} />;
		case 'CommerceList':
			return <CommerceLinkPreview {...props}  style={style} url={props.url} />;
		case 'CommerceCondensed':
			return <CommerceLinkPreview {...props} showDetails  style={style} url={props.url} />;
		default:
			(style: empty);
			throw new Error(`Unexpected LinkPreview style: ${style}`);
	}
}

export default LinkPreview;
