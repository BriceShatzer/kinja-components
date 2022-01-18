// @flow

import * as React from 'react';
import CurationBlockComponent from './standard-curation-block';
import Placeholder from './placeholder';
import VideoBlock from './video';
import { HomepageAd } from 'kinja-components/components/ad-slot/ads';
import type { ResolvedCurationBlockList } from 'kinja-magma/controllers/front-page/getCurationBlockData';
import AdPlaceholder from './ad-placeholder';
import type Post from 'kinja-magma/models/Post';
import EditorContext from './editor-context';
import { Provider as StandardBlockDataContextProvider } from './standard-block-data-context';
import EditableLayout from './editable-layout';
import styled from 'styled-components';
import { SpaceBetweenBlocks } from './layouts/layout-styles';
import LayoutSelector, { type LayoutString } from '../homepage-edit-toolbar/layout-selector';
import createNewBlock from '../homepage-edit-toolbar/create-new-block';
import Plus from '../icon19/Plus';

type Props = { ...ResolvedCurationBlockList, ...{| isSatire: boolean |} };

const AddNewBlock = styled.div`
	display: flex;
	margin-bottom: ${SpaceBetweenBlocks};
	padding: ${SpaceBetweenBlocks};
	border: 1px dashed ${props => props.theme.color.midgray};
	justify-content: center;
`;

export default function CurationBlockList(props: Props) {
	const { curationBlocks = [], videos, autofillIdsByBlock, posts, postCategorization, authors, isSatire } = props;
	const { editMode, dispatch } = React.useContext(EditorContext);
	const AdComponent = editMode ? AdPlaceholder : HomepageAd;
	const BlockWrapper = editMode ? EditableLayout : React.Fragment;
	const AddBlockCallback = React.useCallback((blockType: LayoutString) => {
		dispatch({
			type: 'AddBlockAction',
			block: createNewBlock(blockType),
			toEnd: true
		});
		dispatch({
			type: 'SelectBlockAction',
			index: curationBlocks.length // List length hasn't updated yet, so no need to subtract 1
		});
	}, [dispatch, curationBlocks]);
	// If first block is CompactHorizontalList (it's very small), don't lazyload images in 2 first blocks,
	//	otherwise, just in the first block
	const indexesForNonLazyloadedImages = curationBlocks.length > 0 && curationBlocks[0].layout && curationBlocks[0].layout.type === 'CompactHorizontalList'
		? [0, 1] : [0];

	return ([
		...curationBlocks.map<React.Node>((block, index) => {
			if (block.type === 'Video') {
				return (
					<BlockWrapper {...(editMode ? { index } : undefined)} key={block.id}>
						<VideoBlock videos={videos} editMode={Boolean(editMode)} />
					</BlockWrapper>
				);
			}
			if (block.type === 'Podcast') {
				return (
					<BlockWrapper {...(editMode ? { index } : undefined)} key={block.id}>
						<Placeholder>Podcast Module</Placeholder>
					</BlockWrapper>
				);
			}
			if (block.type === 'Ad') {
				if (editMode) {
					return (
						<EditableLayout index={index} key={block.id} isAd={true}>
							<AdComponent />
						</EditableLayout>
					);
				} else {
					return (
						<React.Fragment key={block.id}>
							<AdComponent />
						</React.Fragment>
					);
				}
			}
			const postList: Array<Post | void> = block.autofill ?
				autofillIdsByBlock[block.id].map(id => posts.find(post => post.id === id)) :
				block.cards.map(card => posts.find(post => card !== null && post.id === card.postId));
			const data = {
				categorizedPosts: postCategorization,
				block,
				isSatire,
				authors,
				indexesForNonLazyloadedImages
			};
			// TODO: blog, tag information
			return (
				<BlockWrapper {...(editMode ? { index } : undefined)} key={block.id}>
					<StandardBlockDataContextProvider value={data}>
						<CurationBlockComponent
							index={index}
							layout={block.layout}
							posts={postList}
						/>
					</StandardBlockDataContextProvider>
				</BlockWrapper>
			);
		}),
		editMode === 'BlockEditing' && (
			<AddNewBlock key="add-new-block">
				<LayoutSelector
					icon={<Plus />}
					label="Add block"
					onSelect={AddBlockCallback}
					variant="primary"
					upwards
				/>
			</AddNewBlock>
		)
	]);
}