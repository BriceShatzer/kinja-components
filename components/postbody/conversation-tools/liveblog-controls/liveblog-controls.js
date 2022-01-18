// @flow

import React from 'react';

import ConversationTool from '../conversation-tool';
import Toggle from 'kinja-components/components/form/toggle';
import createTranslate from 'kinja-components/components/translator';
import translations from '../translations';

import type DiscussionSettings, { DiscussionStatus } from 'kinja-magma/models/DiscussionSettings';
import type { Locale } from 'kinja-magma/models/Locale';


type LiveblogControlsStatus = 'Queued' | 'Live' | 'Ended';
type SortType = 'asc' | 'desc';
type Props = {
	discussionSetting: DiscussionSettings,
	locale: Locale,
	onChange: (status: DiscussionStatus, sort: SortType) => void;
	onReloadClick: () => void,
}

type DefaultProps = {
	locale: Locale
}

type State = {
	hasStatusChanged: boolean,
	sort: SortType,
	status: LiveblogControlsStatus
}

export default class LiveblogControls extends React.Component<Props, State> {
	static defaultProps: DefaultProps = {
		locale: 'en-US'
	}

	state = {
		hasStatusChanged: false,
		sort: this.props.discussionSetting.sort,
		status: this.getLiveblogStatus(this.props.discussionSetting.status)
	}

	onStatusChange = (status: LiveblogControlsStatus) => {
		this.setState({ hasStatusChanged: true, status }, () => {
			this.props.onChange(this.getDiscussionStatus(status), this.state.sort);
		});
	}

	onChronChange = (isToggleOn: boolean) => {
		this.setState({ hasStatusChanged: true, sort: isToggleOn ? 'asc' : 'desc' }, () => {
			this.props.onChange(this.getDiscussionStatus(this.state.status), this.state.sort);
		});
	}

	onReloadClick = () => {
		this.props.onReloadClick();
	}

	getLiveblogStatus(status: DiscussionStatus): LiveblogControlsStatus {
		switch (status) {
			case 'InProgress':
				return 'Live';
			case 'Completed':
				return 'Ended';
			default:
				return 'Queued';
		}
	}

	getDiscussionStatus(status: LiveblogControlsStatus): DiscussionStatus {
		switch (status) {
			case 'Live':
				return 'InProgress';
			case 'Ended':
				return 'Completed';
			default:
				return status;
		}
	}

	render() {
		const { hasStatusChanged, sort, status } = this.state;
		const translate = createTranslate(translations, this.props.locale);
		const statuses: Array<LiveblogControlsStatus> = ['Queued', 'Live', 'Ended'];

		let subtitle = translate('Move status to "Live" to post updates');
		if (status === 'Live') {
			subtitle = translate('Move status to "Ended" when the liveblog is over');
		} else if (status === 'Ended') {
			subtitle = translate('Liveblog is ended or in recap mode');
		}

		const footerContent = status !== 'Queued' ? (
			<React.Fragment>
				<span>{translate('Reverse Chron')}</span>
				<Toggle checked={sort === 'asc'}
					label={translate('Chron')}
					name="Chron Toggle"
					onChange={this.onChronChange}
					small />
			</React.Fragment>
		) : null;

		return (
			<ConversationTool activeStatus={status}
				footerContent={footerContent}
				hasStatusChanged={hasStatusChanged}
				locale="en-US"
				onChange={this.onStatusChange}
				onReloadClick={this.onReloadClick}
				statuses={statuses}
				translatedStatuses={statuses.map(status => translate(status))}
				subtitle={subtitle}
				title={translate('The liveblog status is now')}
			/>
		);
	}
}