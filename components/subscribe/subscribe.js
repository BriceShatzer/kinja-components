/* @flow */

import * as React from 'react';
import { SubscribeForm } from './forms';
import SubscribeConfirm from './subscribeConfirm';
import subscribeTranslations from './subscribeTranslations';
import type { TranslateFunction } from '../translator';
import createTranslate from '../translator';
import type { Locale } from 'kinja-magma/models/Locale';

import type { BlogId } from 'kinja-magma/models/Id';
import type { MailingListId } from './getMailingLists';

type CampaignMonitorSubscribeParams = {
	newsletters: Array<MailingListId>,
	email: string,
	referralSource: string,
	referralUrl: string,
	sourceId: string,
	doubleOptIn: boolean
};

type SubscribeSourceId = 'left_rail' | 'mobile_stream' | 'footer' | 'outstream_video';

export type SubscribeProps = {
	// The blog's group. Used to get the blog's logo in the form and modal.
	blogGroup: string,
	// The blog's ID.
	blogId: BlogId,
	// Enables blog-based custom subscribe CTAs
	customSubscribeCopyEnabled?: boolean,
	// The blog's display name. Used in the form as a label.
	displayName: string,
	// Optional language for translated messages
	language?: Locale,
	// Callback prop for after a successful subscription
	onSubscribeSuccess?: (doubleOptIn?: boolean) => void,
	// Function that returns the user's country code
	getGeoCC?: () => Promise<?string>,
	// API endpoint for newsletter subscription
	subscriptionsApi?: {
		subscribe: (payload: CampaignMonitorSubscribeParams) => Promise<boolean> // TODO - what dis response
	},
	// Newsletter config var for Campaign Monitor
	campaignMonitorNewsletterName?: ?string,
	// Whether or not single opt-in subscription is enabled
	singleOptIn?: ?boolean,
	// Identifier for Campaign Monitor to track location of subscribe module
	sourceId: SubscribeSourceId
};

type SubscribeState = {
	// The confirmation dialog shown after successful subscribe.
	confirmDialogOpen: boolean,
	// Whether or not the subscription will require double opt-in, controls the success message
	doubleOptIn: boolean,
	// Whether to show or hide the form itself - hidden after successful subscribe.
	formVisible: boolean
};

export default class Subscribe extends React.PureComponent<SubscribeProps, SubscribeState> {
	translate: TranslateFunction;
	adContainer: HTMLElement | null;

	constructor(props: SubscribeProps) {
		super(props);
		this.translate = createTranslate(subscribeTranslations, props.language);

		this.state = {
			confirmDialogOpen: false,
			doubleOptIn: true,
			formVisible: true
		};
	}

	componentWillReceiveProps = (newProps: SubscribeProps) => {
		if (this.props.language !== newProps.language) {
			this.translate = createTranslate(subscribeTranslations, newProps.language);
		}
	};

	/*
	 * Calls onSubscribeSuccess prop in addition to
	 * hiding the subscription form.
	 */
	onSubscribeSuccess = (doubleOptIn?: boolean) => {
		if (this.props.onSubscribeSuccess) {
			this.props.onSubscribeSuccess();
		}
		if (doubleOptIn !== undefined) {
			this.toggleFormVisibility(true,doubleOptIn);
		} else {
			this.toggleFormVisibility();
		}
	};

	/*
	 * Shows or hides the subscribe form.
	 *
	 * Optional prop to also toggle confirm modal visibility, as this
	 * generally occurs after hiding the form.
	 */
	toggleFormVisibility = (toggleConfirmModal: boolean = true, doubleOptIn: boolean = true) => {
		return this.setState(prevState => ({
			...prevState,
			doubleOptIn,
			confirmDialogOpen: toggleConfirmModal ? !prevState.confirmDialogOpen : prevState.confirmDialogOpen,
			formVisible: !prevState.formVisible
		}));
	};

	/*
	 * Shows or hides the confirmation dialog.
	 */
	toggleConfirmModal = () => {
		return this.setState(prevState => ({
			...prevState,
			confirmDialogOpen: !prevState.confirmDialogOpen
		}));
	};

	render() {
		const subscribeConfirmProps = {
			blogGroup: this.props.blogGroup,
			doubleOptIn: this.state.doubleOptIn,
			isOpen: this.state.confirmDialogOpen,
			toggleConfirmModal: this.toggleConfirmModal,
			translate: this.translate
		};

		const subscribeFormProps = {
			...this.props,
			onSubscribeSuccess: this.onSubscribeSuccess,
			translate: this.translate
		};

		return (
			<React.Fragment>
				<SubscribeConfirm {...subscribeConfirmProps} />
				{this.state.formVisible && <SubscribeForm {...subscribeFormProps} />}
			</React.Fragment>
		);
	}
}
