// @flow

import * as React from 'react';
import styled from 'styled-components';

import createTranslate from 'kinja-components/components/translator';
import translations from './translations';
import type { Locale } from 'kinja-magma/models/Locale';
import type VideoSearchResult from 'kinja-magma/models/VideoSearchResult';
import VideoSearchItem from './video-search-item';
import TextField from '../form/textfield18';
import { Loading } from '../elements/loader';
import Search from '../icon19/Search24';

type VideoSearchProps = {
	items: Array<VideoSearchResult>,
	onItemClick: (id: string) => void,
	onSearchForVideos: (value: string) => void,
	locale?: Locale,
	isLoading?: boolean
}

const ItemList = styled.div`
	overflow-y: auto;
	overflow-x: hidden;
	flex: 1;

	> * {
		margin-bottom: 15px;
		border-bottom: 1px solid ${({theme}) => theme.color.lightgray};
	}
	> *:last-child {
		margin-bottom: 0;
		border-bottom: 0;
	}
`;

const ResultContainer = styled.div`
	height: 50vh;
	display: flex;
`;

const NoResultsContainer = styled.div`
	padding: 50px 0;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	flex: 1;

	p {
		margin-top: 1rem;
	}
`;

class VideoSearch extends React.Component<VideoSearchProps> {
	static defaultProps = {
		locale: 'en-US',
		isLoading: false
	};

	render() {
		const { items, locale, isLoading } = this.props;
		const translate = createTranslate(translations, locale);
		const hasResults = items && items.length > 0;

		return <React.Fragment>
			<TextField
				name="term"
				placeholder={translate('Search for videos')}
				onChange={this.props.onSearchForVideos}
			/>
			<ResultContainer>
				{isLoading && <Loading/>}
				{!isLoading && !hasResults && <NoResultsContainer>
					<Search/>
					<p>
						{translate('Sorry, no videos match your search.')}
					</p>
				</NoResultsContainer>}
				{!isLoading && hasResults &&
					<ItemList>
						{items.map(item =>
							<VideoSearchItem
								key={item.id}
								item={item}
								onClick={this.props.onItemClick}
								locale={locale}
							/>
						)}
					</ItemList>
				}
			</ResultContainer>
		</React.Fragment>;
	}
}

export default VideoSearch;
