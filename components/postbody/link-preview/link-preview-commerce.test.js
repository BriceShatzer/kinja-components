import * as React from 'react';
import { mount } from 'enzyme';
import CommerceLinkPreview from './link-preview-commerce';
import { KinjaMetaProvider } from '../../hoc/context';

const link = {
	headline: 'Headline',
	url: 'url',
	provider: 'provider',
	meta: {
		promocode: 'promo',
		price: '2',
		priceV2: '2',
		conversions: 82
	},
	images: [{
		id: 'img-id',
		format: 'jpg'
	}]
};

describe('<CommerceLinkPreview />', () => {
	it('should render list item by default', () => {
		const wrapper = mount(
			<CommerceLinkPreview
				style="CommerceList"
				link={{ url: 'url', headline: 'Headline', provider: 'provider', meta: {}, images: [] }}
			/>);
		expect(wrapper.getDOMNode()).toMatchSnapshot();
	});
	it('should render list item with all fields', () => {
		const wrapper = mount(
			<CommerceLinkPreview style="CommerceList" link={link} />);
		expect(wrapper.getDOMNode()).toMatchSnapshot();
	});
	it('should render condensed by default', () => {
		const wrapper = mount(
			<CommerceLinkPreview
				style="CommerceCondensed"
				link={{ url: 'url', headline: 'Headline', provider: 'provider', meta: {}, images: [] }}
				showDetails
			/>);
		expect(wrapper.getDOMNode()).toMatchSnapshot();
	});
	it('should render condensed with all fields', () => {
		const wrapper = mount(
			<CommerceLinkPreview
				style="CommerceCondensed"
				link={link}
				showDetails
			/>);
		expect(wrapper.getDOMNode()).toMatchSnapshot();
	});
	it('should properly decorate amazon urls', () => {
		const kinjaMeta = {
			amazonAffiliateTag: 'amazonAffiliateTag',
			postId: 'postId',
			authorId: 'authorId',
			blogName: 'blogName',
			blogGroup: 'blogGroup',
			permalinkUrl: 'permalinkUrl',
			isGmgBlog: true,
			starterPost: true
		};
		const amazonLink = {
			...link,
			url: 'https://www.amazon.com/dp/B0771P9WWQ/ref=ods_gw_d_h1_tab_sz_btpr?pf_rd_p=0a387cec-3f09-45eb-b2df-b021c86a174d&pf_rd_r=7H96CKCA2G1ZYSD3YR4G',
			meta: {
				...link.meta,
				asin: 'B0771P9WWQ'
			}
		};
		const wrapper = mount(
			<KinjaMetaProvider value={kinjaMeta}>
				<CommerceLinkPreview
					style="CommerceCondensed"
					link={amazonLink}
					showDetails
				/>
			</KinjaMetaProvider>
		);
		expect(wrapper.getDOMNode()).toMatchSnapshot();
	});
});
