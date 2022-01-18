/* @flow */

import * as React from 'react';
import { shallow } from 'enzyme';
import LunchboxEditor from './lunchbox-editor';
import Lunchbox from 'kinja-magma/models/Lunchbox';

const noOp = () => {};
describe('<LunchboxEditor />', () => {
	it('should render a textarea and text input', () => {
		const wrapper = shallow(
			<LunchboxEditor
				id={String(Date.now())}
				headerText="headerText"
				paragraphText="paragraphText"
				currentLayout={Lunchbox.Layouts.Text.HeaderParagraph}
				handleUpdateHeader={noOp}
				handleUpdateParagraph={noOp}
				handleMediaUpload={noOp}
				handleUpdateLayout={noOp}
				deleteImage={noOp}
			/>
		);
		expect(wrapper).toMatchSnapshot();
	});
	it('should render an image placeholder', () => {
		const wrapper = shallow(
			<LunchboxEditor
				id={String(Date.now())}
				handleUpdateHeader={noOp}
				handleUpdateParagraph={noOp}
				handleMediaUpload={noOp}
				deleteImage={noOp}
				handleUpdateLayout={noOp}
				currentLayout={Lunchbox.Layouts.Image.Inline}
			/>
		);
		expect(wrapper).toMatchSnapshot();
	});
});
