import * as React from 'react';
import { shallow } from 'enzyme';

import { SubscribeForm, Form, ErrorMessage, SubscribeButton } from './subscribe';

const stubbedApiProps = {
	subscriptionsApi: {
		subscribe: jest.fn(e => Promise.resolve(e))
	},
	getGeoCC: jest.fn(() => Promise.resolve('us'))
};

const stubbedProps = {
	...stubbedApiProps,
	blogId: 0,
	blogName: '',
	onSubscribeFail: jest.fn(),
	onSubscribeSuccess: jest.fn(),
	translate: jest.fn(() => 'translated message')
};

const validEmail = 'realemail@address.biz';

const campaignMonitorMock = {
	email: validEmail,
	newsletters: ['test'],
	referralSource: '',
	referralUrl: 'http://localhost/',
	sourceId: undefined
};

describe('<SubscribeForm />', () => {
	it('validates email address', done => {
		const wrapper = shallow(<SubscribeForm {...stubbedProps} campaignMonitorNewsletterName='test' />);

		expect(wrapper.find(ErrorMessage).length).toEqual(0);
		expect(wrapper.find(SubscribeButton).prop('disabled')).toEqual(false);

		wrapper.find(Form).simulate('submit');

		expect(stubbedProps.onSubscribeSuccess).not.toHaveBeenCalled();
		expect(wrapper.find(ErrorMessage).length).toEqual(1);
		expect(wrapper.find(SubscribeButton).prop('disabled')).toEqual(true);

		wrapper.setState({ emailAddress: validEmail });
		expect(wrapper.find(SubscribeButton).prop('disabled')).toEqual(false);

		wrapper.find(Form).simulate('submit');

		setImmediate(() => {
			expect(stubbedProps.onSubscribeSuccess).toHaveBeenCalled();
			expect(wrapper.find(ErrorMessage).length).toEqual(0);
			done();
		});
	});

	it('validates mailing lists if present', () => {
		const wrapper = shallow(<SubscribeForm {...stubbedProps} blogGroup='avclub' />);

		wrapper.setState({ emailAddress: validEmail });
		expect(wrapper.find(ErrorMessage).length).toEqual(0);
		expect(wrapper.find(SubscribeButton).prop('disabled')).toEqual(false);

		wrapper.setState({ lists: [], errors: ['error'] });
		expect(wrapper.find(ErrorMessage).length).toEqual(1);
		expect(wrapper.find(SubscribeButton).prop('disabled')).toEqual(true);

		wrapper.setState({ lists: [1] });

		expect(wrapper.find(SubscribeButton).prop('disabled')).toEqual(false);
		expect(wrapper.find(ErrorMessage).length).toEqual(0);
	});

	it('throws error if api has issues', done => {
		const stubbedPropsWithIssues = {
			...stubbedProps,
			subscriptionsApi: {
				subscribe: jest.fn(() => Promise.reject())
			}
		};
		const wrapper = shallow(<SubscribeForm {...stubbedPropsWithIssues} campaignMonitorNewsletterName='test' />);

		wrapper.setState({ emailAddress: validEmail });
		expect(wrapper.find(ErrorMessage).length).toEqual(0);
		expect(wrapper.find(SubscribeButton).prop('disabled')).toEqual(false);

		wrapper.find(Form).simulate('submit');

		setImmediate(() => {
			expect(stubbedPropsWithIssues.onSubscribeFail).toHaveBeenCalled();
			expect(wrapper.find(SubscribeButton).prop('disabled')).toEqual(true);
			done();
		});
	});

	it('sets doubleOptIn to true if getGeoCC is not provided', done => {
		const stubbedProps_noGetGeoCC = {...stubbedProps};
		delete stubbedProps_noGetGeoCC.getGeoCC;
		const wrapper = shallow(
			<SubscribeForm
				{...stubbedProps_noGetGeoCC}
				campaignMonitorNewsletterName='test'
			/>
		);

		wrapper.setState({ emailAddress: validEmail });
		wrapper.find(Form).simulate('submit');

		setImmediate(() => {
			expect(stubbedProps.onSubscribeSuccess).toHaveBeenCalled();
			expect(stubbedProps.subscriptionsApi.subscribe).toBeCalledWith({
				doubleOptIn: true,
				...campaignMonitorMock
			});
			done();
		});
	});

	it('sets doubleOptIn to true if getGeoCC returns no value', done => {
		const mockedGetGeoCC = jest.fn(() => Promise.resolve(undefined));

		const wrapper = shallow(
			<SubscribeForm
				{...stubbedProps}
				getGeoCC={mockedGetGeoCC}
				campaignMonitorNewsletterName='test'
			/>
		);

		wrapper.setState({ emailAddress: validEmail });
		wrapper.find(Form).simulate('submit');

		setImmediate(() => {
			expect(mockedGetGeoCC).toHaveBeenCalled();
			expect(stubbedProps.onSubscribeSuccess).toHaveBeenCalled();
			expect(stubbedProps.subscriptionsApi.subscribe).toBeCalledWith({
				doubleOptIn: true,
				...campaignMonitorMock
			});
			done();
		});
	});

	it('sets doubleOptIn to true if not in the US', done => {
		const mockedGetGeoCC = jest.fn(() => Promise.resolve('hu'));

		const wrapper = shallow(
			<SubscribeForm
				{...stubbedProps}
				getGeoCC={mockedGetGeoCC}
				campaignMonitorNewsletterName='test'
			/>
		);

		wrapper.setState({ emailAddress: validEmail });
		wrapper.find(Form).simulate('submit');

		setImmediate(() => {
			expect(mockedGetGeoCC).toHaveBeenCalled();
			expect(stubbedProps.onSubscribeSuccess).toHaveBeenCalled();
			expect(stubbedProps.subscriptionsApi.subscribe).toBeCalledWith({
				doubleOptIn: true,
				...campaignMonitorMock
			});
			done();
		});
	});

	it('sends correct data to subscriptions api', done => {
		const wrapper = shallow(<SubscribeForm {...stubbedProps} campaignMonitorNewsletterName='test' />);

		wrapper.setState({ emailAddress: validEmail });
		wrapper.find(Form).simulate('submit');

		setImmediate(() => {
			expect(stubbedApiProps.getGeoCC).toHaveBeenCalled();
			expect(stubbedProps.onSubscribeSuccess).toHaveBeenCalled();
			expect(stubbedApiProps.subscriptionsApi.subscribe).toBeCalledWith({
				doubleOptIn: false,
				...campaignMonitorMock
			});
			done();
		});
	});
});
