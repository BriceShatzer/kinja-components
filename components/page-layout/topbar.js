// @flow

// A static network nav with no hover state

import * as React from 'react';
import styled, { css } from 'styled-components';
import { EnsureDefaultTheme } from '../theme';
import { BLOG_GROUPS, NETWORK_BLOGS } from '../../config/consts';
import Link from '../elements/link';
import media from '../../style-utils/media';
import Toggle, { type ToggleInjectedProps } from '../hoc/toggle';
import { debounce } from 'lodash';
import ChevronDown from '../icon19/ChevronDown';
import ChevronUp from '../icon19/ChevronUp';
import { IconWrapper } from '../icon19/icon19';
import { gridValue } from '../grid-utils';

const sortByName = (a: { name: string }, b: { name: string }) => a.name.replace(/^the/, '') < b.name.replace(/^the/, '') ? -1 : 1;
const blogsToDisplay = NETWORK_BLOGS.filter(blog => Object.keys(BLOG_GROUPS).includes(blog.name));

const satireBlogs = blogsToDisplay
	.filter(blog => blog.isSatire)
	.sort(sortByName);
const regularBlogs = blogsToDisplay
	.filter(blog => (!blog.isSatire && !blog.isCommerce))
	.sort(sortByName);
const commerceBlogs = blogsToDisplay
	.filter(blog => (blog.isCommerce))
	.sort(sortByName);

const commerceOrder = [commerceBlogs, regularBlogs, satireBlogs];
const satireOrder = [satireBlogs, regularBlogs, commerceBlogs];
const regularOrder = [regularBlogs, satireBlogs, commerceBlogs];

const FullWidthContainer = styled.div`
	display: flex;
	justify-content: center;
	background: ${props => props.theme.color.black};
`;

const TopbarWrapper = styled.ul`
	display: flex;
	align-items: center;
	flex-wrap: nowrap;
	margin: 0;

	> li:first-child {
		margin-left: -8px; /* Align with grid */
	}

	${media.mediumDown`
		width: ${gridValue.small('6c')};
	`}

	${media.largeOnly`
		width: ${gridValue.large('8c')};
	`}

	${media.xlargeOnly`
		width: ${gridValue.xlarge('12c')};
	`}

	${props => props.wideRail ? css`
		${media.xxlargeOnly`
			width: ${gridValue.xxlarge('12c')};
		`}
		${media.xxxlargeUp`
			width: ${gridValue.xxxlarge('12c')};
		`}
	` : css`
		${media.xxlargeUp`
			width: ${gridValue.xxlarge('12c')};
		`}
	`}
`;

const NetworkBlogListItem = styled.li`
	text-transform: uppercase;
	line-height: 24px;
	font-size: 15px;
	user-select: none;
	padding: 0 8px;
	flex-shrink: 0;
	flex-grow: 0;
	color: ${props => props.theme.color.gray};

	&:hover {
		background: ${props => props.theme.color.darksmoke};
		color: ${props => props.theme.color.whitesmoke};

		> a,
		> a:hover,
		> a:active,
		> a:focus,
		> a.focus {
			color: ${props => props.theme.color.whitesmoke};
		}
	}

	> a {
		position: relative;
		top: 1px;
	}

	> a,
	> a:hover,
	> a:active,
	> a:focus,
	> a.focus {
		text-decoration: none;
		color: ${props => props.theme.color.midgray};
	}
`;

const NavSeparator = styled.li`
	display: inline-flex;
	padding: 0 8px;
	flex-shrink: 0;
	flex-grow: 0;

	::after {
		width: 1px;
		height: 14px;
		background-color: ${props => props.theme.color.darkgray};
		content: '';
	}
`;

const MoreButton = styled(NetworkBlogListItem)`
	position: relative;

	> a {
		display: flex;
		align-items: center;
	}

	${IconWrapper} {
		margin-top: -3px;
	}
`;

const Dropdown = styled.ul`
	position: absolute;
	top: 24px;
	right: 0;
	background: ${props => props.theme.color.black};
	z-index: 1;
	display: flex;
	flex-direction: column;
	margin: 0;
	width: max-content;
`;

const getDisplayName = blogName => BLOG_GROUPS[blogName];

const NetworkBlog = ({
	blogName,
	url
}: {
	blogName: string,
	url: string
}) => {
	const displayName =	getDisplayName(blogName);
	const clickEvent = ['Network navigation', 'Network Blog Click', url.replace(/\/\//,''), {metric20: 1}];

	return displayName ? (
		<NetworkBlogListItem key={`blog-list-${blogName}`}>
			<Link href={url} events={[clickEvent]}>{displayName}</Link>
		</NetworkBlogListItem>
	) : null;
};

type Props = {|
	blogName?: ?string,
	wideRail?: boolean
|};

type State = {
	numberOfDisplayableItems: number,
	widths?: Array<number>
};

export class StaticTopbar extends React.Component<Props & ToggleInjectedProps, State> {
	el: { current: ?HTMLUListElement} = React.createRef();
	state = {
		numberOfDisplayableItems: regularBlogs.length + satireBlogs.length + commerceBlogs.length + 2
	};

	/**
	 * Calculates how many items can be displayed with the given screen size, including dividers.
	 * On first render it calculates the sizes of the items, and stores those sizes for later use (since some of them might not be present later)
	 */
	calculateDisplayableItems() {
		if (this.el.current) {
			const container = this.el.current;
			const lis = container.getElementsByTagName('LI');
			const availableWidth = container.getBoundingClientRect().width - 66; // Account for more button
			const widths: Array<number> = this.state.widths || [...lis].map(li => li.getBoundingClientRect().width);
			let sumOfWidths = 0;
			const numberOfDisplayableItems = widths.reduce<number>((acc, current) => {
				sumOfWidths += current;
				if (sumOfWidths <= availableWidth) {
					return acc + 1;
				}
				return acc;
			}, 0);
			this.setState({
				numberOfDisplayableItems,
				widths
			});
		}
	}

	handleResize = debounce(this.calculateDisplayableItems.bind(this), 200)

	componentDidMount() {
		this.calculateDisplayableItems();
		window.addEventListener('resize', this.handleResize);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize);
	}

	shouldComponentUpdate(prevProps: Props & ToggleInjectedProps, prevState: State) {
		if (
			prevProps.isOpen !== this.props.isOpen ||
			prevState.numberOfDisplayableItems !== this.state.numberOfDisplayableItems
		) {
			return true;
		}
		return false;
	}

	render() {
		const currentBlog = NETWORK_BLOGS.find(blog => blog.name === this.props.blogName);
		const currentBlogIsSatire = currentBlog && currentBlog.isSatire;
		const currentBlogIsCommerce = currentBlog && currentBlog.isCommerce;

		let list = regularOrder;
		if (currentBlogIsCommerce) {
			list = commerceOrder;
		} else if (currentBlogIsSatire) {
			list = satireOrder;
		}
		let availableSlots: number = this.state.numberOfDisplayableItems;
		let hiddenItems: Array<React.Node> = []; // The blogs hidden behind a button
		const displayedItems: Array<React.Node> = list.reduce<Array<React.Node>>((acc, currentList) => {
			// Check how many blogs in the current section need to be cut off, and add those to the more items dropdown
			if (currentList.length > availableSlots) {
				hiddenItems = hiddenItems.concat(currentList.slice(-(currentList.length - availableSlots)).map(blog => (
					<NetworkBlog
						blogName={blog.name}
						key={`network-blogs-${blog.name}`}
						url={blog.url}
					/>
				)));
			}
			// Add to the nav as many items of the current section as there is space available, and add a separator if there is space for it
			if (availableSlots > 0) {
				const newAcc = [
					...acc,
					...currentList.slice(0, availableSlots).map(blog => (
						<NetworkBlog
							blogName={blog.name}
							key={`network-blogs-${blog.name}`}
							url={blog.url}
						/>
					)),
					...[availableSlots > currentList.length + 1 ? [<NavSeparator key={`navsep${availableSlots}`} />] : []]
				];
				availableSlots = availableSlots - (newAcc.length - acc.length);
				return newAcc;
			}
			return acc;
		}, []);
		const shouldShowMoreButton = hiddenItems.length > 0;

		return (
			<EnsureDefaultTheme>
				<FullWidthContainer ref={this.el}>
					<TopbarWrapper wideRail={this.props.wideRail}>
						{displayedItems}
						{shouldShowMoreButton && (
							<MoreButton onClick={this.props.toggle} ref={this.props.insideReference}>
								<a>More {this.props.isOpen ? <ChevronUp /> : <ChevronDown />}</a>
								{this.props.isOpen && (
									<Dropdown>
										{hiddenItems}
									</Dropdown>
								)}
							</MoreButton>
						)}
					</TopbarWrapper>
				</FullWidthContainer>
			</EnsureDefaultTheme>
		);
	}
}

export default Toggle(StaticTopbar, { isOutsideClickEnabled: true });
