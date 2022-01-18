/* @flow */

import * as React from 'react';
import cx from 'classnames';
import styled from 'styled-components';

import type { KalaEvent } from 'kinja-magma/models/Kala';
export type Events = ?Array<Array<?string | {[key: string]: mixed}>>;

/**
 * This is a link element that allows for coordination between server
 * and client, as in order for GA to work properly links need to be
 * hydrated on the former.
 *
 * To allow for this to be done easily, this element is rendered on the
 * server with the GA params passed in as data attributes in the DOM.
 * Then, when calling ReactDOM.hydrate, it will check for these data
 * attributes to turn it into a dynamic link that triggers an onClick.
 */

export const Anchor = styled.a`
	text-decoration: none;
`;
const Link = ({
	// This allows child components to render normally
	// on the server
	children,
	// Optional class prop
	className,
	// The params for the GA event(s) to trigger
	events,
	// This is to retain pre-rendered child elements when
	// hydrating on client
	innerHTML,
	// The params for the kala event to trigger
	kalaEvent,
	// The rest of the props
	...props
}: {
	className?: string,
	children?: React.Node,
	events?: Events,
	innerHTML?: string,
	kalaEvent?: KalaEvent,
	props?: mixed
}) => (
	<Anchor
		className={cx(className, 'js_link')}
		dangerouslySetInnerHTML={innerHTML ? { __html: innerHTML } : null}
		data-ga={events ? JSON.stringify(events) : null}
		data-kala={kalaEvent ? JSON.stringify(kalaEvent) : undefined}
		{...props}
	>
		{innerHTML ? null : children}
	</Anchor>
);

export default Link;
