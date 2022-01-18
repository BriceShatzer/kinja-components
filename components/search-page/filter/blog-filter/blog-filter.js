// @flow

import React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';
import { isEqual } from 'lodash';

import { Theme } from 'kinja-components/components/theme';
import CollapsibleBox, { ContentWrapper } from 'kinja-components/components/collapsible-box/collapsible-box';
import Checkbox, { Wrapper as CheckboxWrapper } from 'kinja-components/components/form/checkbox/checkbox';
import Reload from 'kinja-components/components/icon19/Reload';
import { KinjaFormFieldWrapper } from 'kinja-components/components/form/textfield18';
import createTranslate from 'kinja-components/components/translator';
import translations from 'kinja-components/components/search-page/translations';

import type Blog from 'kinja-magma/models/Blog';
import type { BlogFilterObject } from 'kinja-components/components/search-page/types';
import type { BlogId } from 'kinja-magma/models/Id';
import type { BlogThemeName } from 'kinja-components/components/theme/theme';
import type { Locale } from 'kinja-magma/models/Locale';


const Reset = styled.div`
	display: flex;
	margin-bottom: 15px;
	color: ${({ theme }) => theme.color.primary};
	transition: color 0.2s ease-in-out;
	cursor: pointer;

	&:hover {
		color: ${({ theme }) => darken(0.1, theme.color.primary)};
	}

	svg {
		margin: 0 14px 0 5px;
	}
`;

const KinjaFringe = styled.div`
	padding-top: 13px;
	margin-top: 16px;
	border-top: 1px solid ${({ theme }) => theme.color.midgray};
`;

const Container = styled.div`
	${ContentWrapper} {
		> ${CheckboxWrapper} {
			margin-bottom: 16px;
		}

		> ${CheckboxWrapper}:last-of-type,
		${CheckboxWrapper}:last-child {
			margin-bottom: 0;
		}
	}

	${KinjaFormFieldWrapper} {
		flex-direction: column;
		align-items: flex-start;
	}
`;


type State = {
	checked: Array<BlogId>,
	isNetwork: boolean
}

type Props = {
	blogTheme: BlogThemeName,
	blogs: Array<Blog>,
	checked: Array<BlogId>,
	defaultBlogId: ?BlogId,
	isNetwork: boolean,
	hasKinjaFringe?: boolean,
	locale: Locale,
	onChange: (state: BlogFilterObject) => void
}

type DefaultProps = {
	blogTheme: BlogThemeName,
	locale: Locale
}

export default class BlogFilter extends React.Component<Props, State> {
	static defaultProps: DefaultProps = {
		blogTheme: 'default',
		hasKinjaFringe: false,
		locale: 'en-US'
	};

	state = {
		checked: this.props.checked,
		isNetwork: this.props.isNetwork
	}

	componentDidUpdate(prevProps: Props, prevState: State) {
		if (!isEqual(this.props.checked, prevProps.checked) && !isEqual(this.props.checked, prevState.checked)) {
			this.setState({
				checked: this.props.checked
			}, () => {
				this.props.onChange(this.state);
			});
		}
	}

	onCheckboxChange = (event: SyntheticInputEvent<HTMLInputElement>, id?: BlogId) => {
		// if Kinja Fringe was clicked we don't have blogId
		if (!id) {
			this.setState({
				checked: [],
				isNetwork: false
			}, () => {
				this.props.onChange(this.state);
			});
			return;
		}

		this.setState({
			checked: event.currentTarget.checked
				? [...this.state.checked, id]
				: this.state.checked.filter(checkedId => checkedId !== id),
			isNetwork: true
		}, () => {
			this.props.onChange(this.state);
		});
	}

	onResetClick = () => {
		this.setState({
			checked: this.props.defaultBlogId ? [this.props.defaultBlogId] : [],
			isNetwork: true
		}, () => {
			this.props.onChange(this.state);
		});
	}

	render() {
		const { blogTheme, blogs, hasKinjaFringe, locale } = this.props;
		const translate = createTranslate(translations, locale);

		return (
			<Theme blog={blogTheme}>
				<Container>
					<CollapsibleBox title={translate('Filter by site')} isStatic >
						<Reset onClick={this.onResetClick}><Reload />{translate('Reset site filter')}</Reset>
						{blogs.map(blog => {
							return <Checkbox
								blogTheme={blogTheme}
								checked={Boolean(this.state.checked.find(id => id === blog.id))}
								key={blog.id}
								label={blog.displayName}
								onChange={event => this.onCheckboxChange(event, blog.id)}
							/>;
						})}
						{hasKinjaFringe &&
							<KinjaFringe>
								<Checkbox
									blogTheme={blogTheme}
									checked={!this.state.isNetwork}
									label={translate('or search Kinja Fringe')}
									inlineHelp={`(${translate('blogs not from G/O Media')})`}
									onChange={this.onCheckboxChange}
								/>
							</KinjaFringe>
						}
					</CollapsibleBox>
				</Container>
			</Theme>
		);
	}
}