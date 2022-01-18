// @flow

import * as React from 'react';
import styled from 'styled-components';

import VideoSearch from '../video-search';
import Modal from '../modal';
import Button from '../buttons';
import type VideoSearchResult from 'kinja-magma/models/VideoSearchResult';
import type { Locale } from 'kinja-magma/models/Locale';
import createTranslate from 'kinja-components/components/translator';
import translations from './translations';
import Close from '../icon19/Close';
import Reload from '../icon19/Reload';
import media from '../../style-utils/media';
import { throttle } from 'lodash';

type Props = {
	videoSearch: (string) => Promise<Array<VideoSearchResult>>,
	onVideoSelected: (?string) => void,
	onClose: () => void,
	locale?: Locale,
	alreadyHasSelectedVideo: boolean
};

type State = {
	items: Array<VideoSearchResult>,
	isLoading: boolean
};

const CloseButton = styled.a`
	position: absolute;
	right: 0;
	top: 0;
	padding: 20px;
`;

const Title = styled.h2`
	font-size: 1.5rem;
	margin: 0 auto 2rem;
	font-weight: normal;
`;

const SearchContainer = styled.div`
	margin-bottom: 20px;
	width: 75vw;
	${media.mediumUp`
		width: ${({theme}) => theme.postContentMaxWidth};
	`};
`;

class InArticleSelector extends React.Component<Props, State> {
	static defaultProps = {
		locale: 'en-US',
		alreadyHasSelectedVideo: false
	};

	state = {
		items: [],
		isLoading: false
	}

	componentDidMount() {
		this.searchForVideos('');
	}

	searchForVideos = (value: string) => {
		this.setState({
			isLoading: true
		}, () => this.throttledSearch(value));
	}

	throttledSearch = throttle((value: string) => {
		this.props.videoSearch(value)
			.then(items => this.setState({items, isLoading: false}))
			.catch(() => this.setState({items: [], isLoading: false}));
	}, 500)

	setInArticleVideo = (id?: string) => {
		this.props.onVideoSelected(id);
		this.props.onClose();
	}

	render() {
		const { locale, alreadyHasSelectedVideo, onClose } = this.props;
		const { items, isLoading } = this.state;
		const translate = createTranslate(translations, locale);

		return <Modal isOpen>
			<CloseButton onClick={() => onClose()}>
				<Close/>
			</CloseButton>
			<Title>
				{translate('Change in-article video')}
			</Title>
			<SearchContainer>
				<VideoSearch
					items={items}
					onSearchForVideos={this.searchForVideos}
					onItemClick={this.setInArticleVideo}
					isLoading={isLoading}
				/>
			</SearchContainer>
			{alreadyHasSelectedVideo &&
				<Button
					icon={<Reload/>}
					labelPosition="after"
					small
					weight="tertiary"
					label={translate('Reset to default')}
					onClick={() => this.setInArticleVideo()}
				/>
			}
		</Modal>;
	}
}

export default InArticleSelector;
