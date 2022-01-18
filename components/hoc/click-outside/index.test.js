// @flow

import React from 'react';
import ReactDOM from 'react-dom';

import clickOutside from './';
import type { ClickOutsideInjectedProps } from './';

function simulateClick(node) {
	const event = document.createEvent('Event');
	event.initEvent('click', true, true);
	node && node.dispatchEvent(event);
	return event;
}

const ExampleComponent = ({ insideReference }: ClickOutsideInjectedProps) => (
	<div>
		<span>Outside</span>
		<article ref={insideReference}>Inside</article>
	</div>
);

const mountNode = document.createElement('div');
document.body && document.body.appendChild(mountNode);

describe('<ClickOutside />', () => {
	afterEach(() => {
		ReactDOM.unmountComponentAtNode(mountNode);
	});

	it('calls handleClickOutside when clicked outside of component', () => {
		const handler = jest.fn();

		const EnhancedComponent = clickOutside(ExampleComponent);

		ReactDOM.render(<EnhancedComponent
			handleClickOutside={handler}
		/>, mountNode);

		simulateClick(mountNode);
		expect(handler).toHaveBeenCalled();
	});

	it('doesn\'t call handleClickOutside when clicked inside the provided ref', () => {
		const handler = jest.fn();

		const EnhancedComponent = clickOutside(ExampleComponent);

		ReactDOM.render(<EnhancedComponent
			handleClickOutside={handler}
		/>, mountNode);

		simulateClick(mountNode.querySelector('article'));
		expect(handler).not.toHaveBeenCalled();
	});
});
