// @flow

import * as React from 'react';
import styled, { css } from 'styled-components';

import type { ContainerNode } from 'postbody/ContainerNode';
import BlockQuote from '../blockquote';

const List = css`
	position: relative;

	li {
		padding-left: ${p => p.theme.columnGutter};
		margin-bottom: 6px;
	}
`;

export const BulletedList = styled.ul`
	${List};

	li::before {
		position: absolute;
		content: '\\b7';
		margin: -1px 0 0 -29px;
		font-weight: bold;
		font-size: 24px;
	}
`;

export const NumberedList = styled.ol`
	${List};

	counter-reset: item;

	li::before {
		position: absolute;
		width: ${p => p.theme.columnPadding};
		content: counter(item) '. ';
		counter-increment: item;
		margin: 0 0 0 -2rem;
		font-weight: normal;
		white-space: nowrap;
	}
`;

const PreTag = styled.pre`
	white-space: normal;
`;

/**
 * Render a container component, that is a function accepting its children
 */
export default function renderContainer(containerObj: ContainerNode, index: string): React.StatelessFunctionalComponent<{ children: React.Node }> {
	if (containerObj.type === 'BlockQuote') {
		return function BlockQuoteFn({ children }: { children: React.Node }) {
			return <BlockQuote data-type="BlockQuote" key={index}>{children}</BlockQuote>;
		};
	} else if (containerObj.type === 'List') {
		if (containerObj.style === 'Number') {
			return function OrderedList({ children }: { children: React.Node }) {
				return (<NumberedList data-type="List" data-style={containerObj.style} key={index}>
					{React.Children.map(children, child => <li>{child}</li>)}
				</NumberedList>);
			};
		} else if (containerObj.style === 'Bullet') {
			return function UnorderedList({ children }: { children: React.Node }) {
				return (<BulletedList data-type="List" data-style={containerObj.style} key={index}>
					{React.Children.map(children, child => <li>{child}</li>)}
				</BulletedList>);
			};
		} else if (containerObj.style === 'Commerce') {
			return function UnorderedList({ children }: { children: React.Node }) {
				return (<ul data-type="List" data-style={containerObj.style} className="commerce" key={index}>
					{React.Children.map(children, child => <li>{child}</li>)}
				</ul>);
			};
		} else {
			(containerObj.style: empty);
			throw new Error('Unexpected List type');
		}
	} else if (containerObj.type === 'Code') {
		return function Pre({ children }: { children: React.Node}) {
			return <PreTag data-type="Code" key={index}>{children}</PreTag>;
		};
	} else {
		(containerObj.type: empty);
		throw new Error('Unexpected Container type');
	}
}
