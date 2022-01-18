import * as React from 'react';

import { mount } from 'enzyme';
import simulant from 'simulant';

import MultipleAuthors from './MultipleAuthors';
import sampleData from './sample-data.story.js';

const sampleAuthorList = sampleData.slice(0, 3);

const comma = () => simulant.fire(document, 'keydown', { key: ',' });
const arrowRight = () => simulant.fire(document, 'keydown', { key: 'ArrowRight' });
const enter = () => simulant.fire(document, 'keydown', { key: 'Enter' });

const stubElement = ({
	authors,
	authorsList,
	onChange = () => {},
	onClose = () => {}
} = {}) => (
	<MultipleAuthors
		authors={authors}
		authorsList={authorsList}
		onChange={onChange}
		onClose={onClose}
	/>
);

const SEARCH_TERM = 'L';

const sampleAuthor = {
	avatar: {
		id: 'sample',
		format: 'png'
	},
	displayName: 'BoJack Horseman',
	id: '60061e',
	screenName: 'borsejackhorseman'
};

const sampleAuthor2 = {
	avatar: {
		id: 'sample',
		format: 'png'
	},
	displayName: 'Rick Sanchez',
	id: '1d1075',
	screenName: 'ricksanchez'
};

const changeValue = input => {
	input.simulate('focus');
	input.simulate('change', {
		target: {
			value: SEARCH_TERM
		}
	});
};

const optionValueAt = (wrapper, index) =>
	wrapper.find('li').at(index).find('span').props().value;


describe('<MultipleAuthors />', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = mount(stubElement({
			authors: [sampleAuthor],
			authorsList: sampleAuthorList
		}));
	});

	it('should appear with input field, when active', () => {
		expect(wrapper).toMatchSnapshot();
	});

	it('should appear without dropdown when input is empty', () => {
		wrapper.simulate('click');
		const input = wrapper.find('input');
		input.simulate('focus');

		expect(wrapper).toMatchSnapshot();
	});

	it('should appear with dropdown with filtered authors', () => {
		wrapper.simulate('click');
		const input = wrapper.find('input');
		changeValue(input);

		expect(wrapper).toMatchSnapshot();
	});

	it('should delete input value when clicked outside', () => {
		wrapper.simulate('click');
		const input = wrapper.find('input');
		changeValue(input);
		wrapper.setProps({
			isOpen: false
		});

		expect(wrapper).toMatchSnapshot();
	});

	it('should call onClose prop when clicked Outside', () => {
		const handler = jest.fn();
		wrapper = mount(stubElement({
			authors: [sampleAuthor, sampleAuthor2],
			authorsList: sampleAuthorList,
			onClose: handler
		}));
		wrapper.simulate('click');
		wrapper.setProps({
			isOpen: false
		});

		expect(handler).toHaveBeenCalled();
	});

	describe('Add Author', () => {
		it('should add new author, when it is clicked', () => {
			const handler = jest.fn();
			wrapper = mount(stubElement({
				authors: [sampleAuthor],
				authorsList: sampleAuthorList,
				onChange: handler
			}));
			wrapper.simulate('click');
			const input = wrapper.find('input');
			changeValue(input);
			const firstItem = wrapper.find('li').at(0);
			const firstAuthor = optionValueAt(wrapper, 0);
			firstItem.simulate('click');

			expect(handler).toHaveBeenCalledWith([sampleAuthor, firstAuthor]);
		});

		it('should add new author, when there are names in the dropdown and `Enter` is pressed', () => {
			const handler = jest.fn();
			wrapper = mount(stubElement({
				authors: [sampleAuthor],
				authorsList: sampleAuthorList,
				onChange: handler
			}));
			wrapper.simulate('click');
			const input = wrapper.find('input');
			changeValue(input);
			const firstAuthor = optionValueAt(wrapper, 0);
			enter();

			expect(handler).toHaveBeenCalledWith([sampleAuthor, firstAuthor]);
		});

		it('should add new author, when there are names in the dropdown and `,` is pressed', () => {
			const handler = jest.fn();
			wrapper = mount(stubElement({
				authors: [sampleAuthor],
				authorsList: sampleAuthorList,
				onChange: handler
			}));
			wrapper.simulate('click');
			const input = wrapper.find('input');
			changeValue(input);
			const firstAuthor = optionValueAt(wrapper, 0);
			comma();

			expect(handler).toHaveBeenCalledWith([sampleAuthor, firstAuthor]);
		});

		it('should add new author, when there are names in the dropdown and `rightArrow` is pressed', () => {
			const handler = jest.fn();
			wrapper = mount(stubElement({
				authors: [sampleAuthor],
				authorsList: sampleAuthorList,
				onChange: handler
			}));
			wrapper.simulate('click');
			const input = wrapper.find('input');
			changeValue(input);
			const firstAuthor = optionValueAt(wrapper, 0);
			arrowRight();

			expect(handler).toHaveBeenCalledWith([sampleAuthor, firstAuthor]);
		});
	});

	describe('Delete Author', () => {
		it('should delete author when it is clicked', () => {
			const handler = jest.fn();
			wrapper = mount(stubElement({
				authors: [sampleAuthor, sampleAuthor2],
				authorsList: sampleAuthorList,
				onChange: handler
			}));
			const secondAuthor = wrapper.find('span[role="button"]').at(1);
			secondAuthor.simulate('click');

			expect(handler).toHaveBeenCalledWith([sampleAuthor]);
		});

		it('should delete author when input is empty and backspace is pressed', () => {
			const handler = jest.fn();
			wrapper = mount(stubElement({
				authors: [sampleAuthor, sampleAuthor2],
				authorsList: sampleAuthorList,
				onChange: handler
			}));
			wrapper.simulate('click');
			const input = wrapper.find('input');
			input.simulate('keyDown', { key: 'Backspace' });

			expect(handler).toHaveBeenCalledWith([sampleAuthor]);
		});

		it('should not delete first author when it is clicked', () => {
			wrapper.simulate('click');
			const firstAuthor = wrapper.find('span[role="button"]');
			firstAuthor.simulate('click');

			expect(wrapper).toMatchSnapshot();
		});
	});
});
