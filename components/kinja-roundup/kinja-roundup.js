/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import { RoundupItem } from 'postbody/blockNodes/Roundup';
import RoundupComponent from '../postbody/roundup';
import { LinkNode, TextNode } from 'postbody/InlineNode';
import Trashcan from 'kinja-components/components/icon19/Trashcan';
import Textfield from 'kinja-components/components/form/textfield18';
import { unescape as decode } from 'lodash';

import type Post from 'kinja-magma/models/Post';
import type Blog from 'kinja-magma/models/Blog';
import type { BlogId } from 'kinja-magma/models/Id';
import createTranslate from 'kinja-components/components/translator';
import type { TranslateFunction } from '../translator';
import translations from './translations';

import { extractItemId, decodeHTMLEntities, hashFromString, parseHTML } from '../../utils';


type RoundupEditorProps = {
	url?: string,
	text?: string,
	blocknodeText?: Array<TextNode>,
	blog?: string,
	index: number,
	isFilled: boolean,
	error?: string
};

class RoundupEditorItem {
	url: ?string;
	text: ?string;
	blocknodeText: ?Array<TextNode>;
	blog: ?string;
	index: number;
	isFilled: boolean;
	error: ?string;
	constructor(props: RoundupEditorProps) {
		this.url = props.url;
		this.text = props.text;
		this.blocknodeText = props.blocknodeText;
		this.blog = props.blog;
		this.index = props.index;
		this.isFilled = props.isFilled;
		this.error = props.error;
	}
}

type Props = {
	language?: string,
	data: Array<RoundupItem>,
	externalAPI: {
		getPost: ({id: number}) => Promise<Post>,
		getBlog: ({blogId: BlogId}) => Promise<Blog>,
		updatePostModel: (data: Array<RoundupItem>) => void
	}
};

type State = {
	items: Array<RoundupEditorItem>
};

const RoundupWrapper = styled.div`
	border-width: 1px;
	border-color: #7d7d7d;
	border-style: dashed;
	display: flex;
	flex-direction: column;
	color: #7d7d7d;
	font-size: 14px;
	padding-bottom: 50px;
`;

const RoundupHelpText = styled.div`
	color: #7d7d7d;
	font-size: 14px;
	padding-bottom: 50px;
	text-align: center;
`;

const RoundupItems = styled.div`
`;

const RoundupItemRow = styled.div`
	display: flex;
	flex-direction: row;
`;

const RoundupPreviewWrapper = styled.div`
	padding: 25px 125px 50px 125px;
	display: flex;
	flex-direction: column;
`;

const RoundupItemsWrapper = styled.div`
	padding: 50px 75px 25px 75px;
`;

const DeleteItem = styled.div`
	margin-top: 41px;
	margin-bottom: 28px;
	margin-left: 5px;
	cursor: pointer;
`;

const MAX_ITEMS = 6;

class KinjaRoundup extends React.Component<Props, State> {
	static defaultProps = {
		language: 'en-US'
	};

	translate: TranslateFunction;

	constructor(props: Props) {
		super(props);

		this.translate = createTranslate(translations, props.language);

		this.state = {
			items: []
		};
	}

	getRoundupItems(): Array<RoundupItem> {
		return this.state.items.filter(item => item.isFilled).map(item => {
			const text = item.blocknodeText && item.blocknodeText.length ? item.blocknodeText : [];
			return new RoundupItem(
				new LinkNode(text, item.url || ''),
				new TextNode(item.blog || '')
			);
		});
	}

	saveItems() {
		this.props.externalAPI.updatePostModel(
			this.getRoundupItems()
		);
	}

	componentDidMount() {
		const roundupItems =  this.props.data ?  this.props.data : [];
		let editorItems = [];

		// append 1 extra empty item or start with 5 empty items
		if (roundupItems && roundupItems.length) {
			editorItems = roundupItems.map((item, index) => {
				return new RoundupEditorItem({
					blog: item.blog.value,
					url: item.link.reference,
					blocknodeText: item.link.value,
					text: item.link.value.map(item => item.value).join(''),
					index,
					isFilled: true
				});
			});

			if (this.state.items.length < MAX_ITEMS) {
				// add one empty item
				editorItems.push(
					new RoundupEditorItem({
						index: roundupItems.length,
						isFilled: false
					})
				);
			}
		} else {
			// add empty items
			for (let i = 0; i < 5; i++) {
				editorItems.push(
					new RoundupEditorItem({
						index: i,
						isFilled: false
					})
				);
			}
		}

		this.setState({
			items: editorItems
		});
	}

	getPostData(postId: number) {
		return this.props.externalAPI.getPost({id: postId});
	}

	getBlogData(id: BlogId) {
		return this.props.externalAPI.getBlog({blogId: id});
	}

	async updateItem(value: string, target: HTMLTextAreaElement) {
		const updateIndex = Number(target.dataset.index);
		const updateItem = this.state.items[updateIndex];
		const newValue = value;

		if (updateItem.isFilled) {
			this.setState(prevState => ({
				items: prevState.items.map((item, index) => {
					if (index === updateIndex) {
						item.text = newValue;
						item.blocknodeText = [new TextNode(newValue)];
					}

					return item;
				})
			}));
		} else {
			const postId = Number(extractItemId(newValue));
			if (isNaN(postId)) {
				this.setState(prevState => ({
					items: prevState.items.map((item, index) => {
						if (index === updateIndex) {
							if (newValue === '') {
								item.text = '';
								item.error = '';
							} else {
								item.text = newValue;
								item.isFilled = false;
								item.error = 'Enter a Kinja URL';
							}
						}

						return item;
					})
				}));
			} else {
				const postData = await this.getPostData(postId);
				let blogData = await this.getBlogData(postData.defaultBlogId);
				if (blogData.parentId) {
					blogData = await this.getBlogData(blogData.parentId);
				}

				this.setState(prevState => ({
					items: prevState.items.map((item, index) => {
						if (index === updateIndex) {
							const headline = postData.headline ? decode(postData.headline) : '';
							const blocknodeHeadline = [];
							parseHTML('<div>' + headline + '</div>')[0].childNodes.forEach(item => {
								// $FlowFixMe
								if (item.tagName === 'I') {
									blocknodeHeadline.push(new TextNode(item.textContent, ['Italic']));
								} else {
									blocknodeHeadline.push(new TextNode(item.textContent));
								}
							});
							item.blocknodeText = blocknodeHeadline;
							item.text = decodeHTMLEntities(headline);
							item.url = newValue;
							item.blog = blogData.displayName;
							item.isFilled = true;
						}

						return item;
					})
				}));
			}

			// check if all items are filled and a new one needs to be added
			if (this.state.items.every(item => item.isFilled)) {
				if (this.state.items.length < MAX_ITEMS) {
					this.setState(prevState => ({
						items: prevState.items.concat(
							new RoundupEditorItem({
								index: prevState.items.length,
								isFilled: false
							})
						)
					}));
				}
			}

			// save items to Post model
			await this.saveItems();
		}

	}

	clearItem(clearIndex: number) {
		this.setState(prevState => ({
			items: prevState.items.map((item, index) => {
				if (index === parseInt(clearIndex)) {
					item.blog = '';
					item.text = '';
					item.url = '';
					item.error = '';
					item.isFilled = false;
				}

				return item;
			})
		}),
		() => this.saveItems());
	}

	render() {
		const { items } = this.state;
		const listItems = items.map((item, index) => {
			const key = hashFromString(item.url || '') + index;
			return (
				<div key={key}>
					<RoundupItemRow>
						<Textfield
							key={key}
							name={'Roundup Item'}
							label={'Story ' + (index + 1)}
							value={item.text || ''}
							error={item.error || ''}
							onChange={this.updateItem.bind(this)}
							data-index={index}
						/>
						<DeleteItem
							onClick={() => {
								this.clearItem(index);
							}}
							data-index={index}>
							<Trashcan />
						</DeleteItem>
					</RoundupItemRow>
				</div>
			);
		});

		return (
			<React.Fragment>
				<RoundupWrapper borderbottom>
					<RoundupItemsWrapper>
						<RoundupHelpText>
							{this.translate(
								'Paste a Kinja permalink URL into each field to create a Roundup.'
							)}
						</RoundupHelpText>
						<RoundupItems>
							{listItems}
						</RoundupItems>
					</RoundupItemsWrapper>
					<hr />
					<RoundupPreviewWrapper>
						<RoundupComponent hideBlogInfo={false} intro={[]} items={ this.getRoundupItems() } />
					</RoundupPreviewWrapper>
				</RoundupWrapper>
			</React.Fragment>
		);
	}
}

export default KinjaRoundup;
