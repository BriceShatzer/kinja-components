// @flow

import feature from 'bulbs-public-ads-manager/src/helpers/Feature';
import { isAutoplay } from './autoplay';

import type Videojs, { VideojsMetadata } from './videojs';
import type { Experiments } from './';

export type Config = {
	contentType: string,
	context?: { ga?: () => void }, // Window
	embedLocation?: string,
	embedTitle?: string,
	position: string,
	postPosition?: string,
	siteSection: string,
	website: string,
	experiments: Experiments
}

type StaticParams = {|
	network?: string,
	contentSource: string,
	contentType: string,
	durationBucket?: string,
	embedId: string,
	embedLocation: string,
	experimentId?: ?string,
	experimentVar?: ?number,
	player: string,
	playType: ?string,
	position: string,
	postPosition: string,
	siteSection: string,
	title?: string,
	type: string,
	videoId?: string,
	website: string,
|}

type CustomParams = {|
	errorMessage?: string,
	playType?: ?string,
	nonInteraction?: boolean
|}

type Params = { ...StaticParams, ...CustomParams, timeWatched: string };

type DimensionMap = {
	[string]: $Keys<Params>
}

const accountId = 'UA-142218-33';

const dimensionMap: DimensionMap = {
	dimension16: 'contentType',
	dimension22: 'errorMessage',
	dimension39: 'experimentId',
	dimension40: 'experimentVar',
	dimension41: 'type',
	dimension42: 'videoId',
	dimension44: 'durationBucket',
	dimension45: 'title',
	dimension50: 'player',
	dimension62: 'embedId',
	dimension63: 'embedLocation',
	dimension65: 'timeWatched',
	dimension83: 'contentType',
	dimension89: 'errorMessage',
	dimension101: 'website',
	dimension105: 'siteSection',
	dimension111: 'postPosition',
	dimension120: 'network',
	dimension121: 'position',
	dimension122: 'playType',
	dimension129: 'contentSource'
};

class VideojsAnalytics {
	autoplay: boolean;
	config: Config;
	eventLabel: string;
	staticParams: StaticParams;
	playerInstance: Videojs;
	videoMetadata: VideojsMetadata;
	timeListeners: { [string]: () => void }
	trackerName: string;
	trackerPrefix: string;
	initialLoad = true;

	constructor(playerInstance: Videojs, config: Config) {
		this.playerInstance = playerInstance;
		this.config = config;

		this.setInitialParams();
		this.setupEvents();
	}

	setInitialParams() {
		const {
			contentType,
			embedLocation,
			experiments,
			position,
			postPosition,
			siteSection,
			website
		} = this.config;

		this.staticParams = {
			contentSource: 'Kinja',
			contentType,
			embedId: 'none',
			embedLocation: embedLocation || `${window.location.hostname}${window.location.pathname}`,
			// Previously this was calling a getter in the video player component,
			// but importing it into mantle code broke amp videos.
			// Let's revert to that after we switch to magma-served amp!
			player: '7.6.0',
			playType: null,
			position,
			postPosition: String(postPosition || 0),
			siteSection,
			type: 'clip',
			website,
			...experiments
		};

		this.setupExperiments();
	}

	getDurationBucket() {
		const bucketBottom = Math.floor((this.playerInstance.duration() - 1) / 5);
		const bucketTop = bucketBottom + 1;
		return `${(bucketBottom * 5) + 1}-${bucketTop * 5}`;
	}

	createTracker() {
		if (!this.trackerName) {
			const trackerName = `kinjavideo${this.videoMetadata.id}`;

			this.trackerName = trackerName;
			this.trackerPrefix = trackerName + '.';

			window.ga('create', accountId, 'auto', trackerName);
		}
	}

	createEventLabel() {
		this.eventLabel = `kinjavideo-${this.videoMetadata.id}`;
	}

	setupExperiments() {
		const { experimentId, experimentVar } = this.config.experiments || {};

		if (experimentId && experimentVar !== null && experimentVar !== undefined && feature.isOn('enable_ga_exps')) {
			window.ga(`${this.trackerPrefix}set`, 'exp', `${experimentId}.${experimentVar}`);
		}
	}

	setupEvents() {
		this.initTimeListeners();

		// We trigger a manual event with video metadata because playerInstance.getMedia()
		// doesn't include video details usch as id or title.
		this.playerInstance.on('loadedmanualmeta', this.onManualMeta);
		// We still need to listen to 'loadedmetadata' to get the video duration, though.
		// The handler gets the duration, collects the previously stored metadata and
		// sends the 'Video Content Initiation' event when the video starts playing.
		this.playerInstance.on('loadedmetadata', this.onMeta);

		this.playerInstance.on('timeupdate', this.onTime);
		this.playerInstance.on('ads-ad-started', this.onAdImpression);
		this.playerInstance.on('adserror', this.onAdError);
		this.playerInstance.on('error', this.onContentError);
	}

	initTimeListeners() {
		this.timeListeners = {};

		// pseudo-start event, after 0.1s
		// this is needed because the video is started and paused before the ad is inserted
		// so the Video Content Start would be triggered before the Preroll Ad Start event
		const pseudoStartTime = 0.1;
		const pseudoStartName = 'Video Content Start';
		this.timeListeners[pseudoStartName] = () => {
			if (pseudoStartTime <= this.playerInstance.currentTime()) {
				this.sendEvent(pseudoStartName);
				delete this.timeListeners[pseudoStartName];
			}
		};

		// second checkers
		[3, 30].forEach(seconds => {
			const name = `${seconds}s`;
			this.timeListeners[name] = () => {
				if (seconds <= this.playerInstance.currentTime()) {
					this.sendEvent(`Video Content ${name}`);
					delete this.timeListeners[name];
				}
			};
		});
		// percentage checkers
		[25, 50, 75, 95, 100].forEach(percentage => {
			const name = `${percentage}%`;
			this.timeListeners[name] = () => {
				if (percentage <= this.playerInstance.currentTime() / this.playerInstance.duration() * 100) {
					this.sendEvent(`Video Content ${name}`);
					delete this.timeListeners[name];
				}
			};
		});
	}

	onPlayerLoad = () => {
		this.sendEvent('Video Load', { nonInteraction: true });
	};

	onManualMeta = (ev, videoMetadata) => {
		this.videoMetadata = videoMetadata;

		if (this.initialLoad) {
			this.createTracker();
		}

		this.createEventLabel();
	}

	onMeta = async () => {
		const { network, title, id } = this.videoMetadata;
		const { embedTitle } = this.config;

		this.staticParams = {
			...this.staticParams,
			network,
			title: title || embedTitle,
			videoId: id,
			durationBucket: this.getDurationBucket()
		};

		// Video Load event - should trigger once per player initiation.
		if (this.initialLoad) {
			this.onPlayerLoad();
			this.initialLoad = false;
		}

		// Now that we have all the metadata needed for our dimensions,
		// we can trigger "Video Content Initiation", but only if/when the player starts playing.
		if (!this.playerInstance.paused()) {
			this.onVideoInitiation();
		} else {
			this.playerInstance.one('play', this.onVideoInitiation);
		}

		this.initTimeListeners();
	}

	onVideoInitiation = () => {
		this.sendEvent('Video Content Initiation');
	}

	onTime = () =>
		Object.keys(this.timeListeners).forEach(key => this.timeListeners[key]());

	onAdImpression = () =>
		this.sendEvent('Preroll Ad Start 0', { nonInteraction: true });

	onAdError = ({ AdError }: { AdError: string }) =>
		this.sendEvent('Video Ad Error', {
			errorMessage: AdError,
			nonInteraction: true
		});

	onContentError = () =>
		this.sendEvent('Video Content Error', {
			errorMessage: this.playerInstance.error(),
			nonInteraction: true
		});

	async sendEvent(action: string, customParams?: CustomParams) {
		window.ga(`${this.trackerPrefix}send`, 'event', 'Video', action, this.eventLabel, await this.getDimensions(customParams));
	}

	async getDimensions(customParams?: CustomParams): {[string]: mixed} {
		const { autoplay, playingIndex } = this.videoMetadata;

		// isAutoplay tells us if an autoplay started with the autoplay() helper was successful
		const autoplayAttempt = await isAutoplay(this.playerInstance);
		// If a video is marked as autoplay but is not present in isAutoplay(), it means
		// playback hasn't begun yet so we can't know if autoplay was successful
		const isAutoplayPending = autoplay && typeof autoplayAttempt === 'undefined';

		if (!isAutoplayPending) {
			this.autoplay = autoplay && autoplayAttempt;
			this.staticParams.playType = `${(playingIndex && playingIndex > 0) ? 'Related ' : ''}${this.autoplay ? 'Autoplay' : 'Click to Play'}`;
		}

		const params: Params = {
			...this.staticParams,
			...customParams,
			timeWatched: String(Math.floor(this.playerInstance.currentTime()))
		};

		const dimensions = {};
		Object.keys(dimensionMap).forEach(dimension => {
			dimensions[dimension] = this.getValueOrDefault(params[dimensionMap[dimension]]);
		});

		// if nonInteraction is explicitly set or autoplaying
		if (customParams && customParams.nonInteraction === true || (this.autoplay && (!customParams || customParams.nonInteraction === undefined))) {
			dimensions.nonInteraction = true;
		}

		// set custom title & location fields so the event is triggered on the correct page in infinite scroll posts
		if (this.config.embedTitle && this.config.embedLocation) {
			dimensions.title = this.config.embedTitle;
			dimensions.location = this.config.embedLocation;
		}

		return dimensions;
	}

	getValueOrDefault(value: ?mixed): string {
		return (value === null || value === undefined) ? 'none' : String(value);
	}
}

const loadGoogleAnalyticsLibrary = (context = window) => {
	if (typeof window.ga === 'function') {
		// GA already loaded
		return;
	} else if (context !== window && typeof context.ga === 'function') {
		// GA is loaded in the parent document
		window.ga = context.ga;
	} else {
		// load GA
		window.ga = function () {
			window.ga.q = window.ga.q || [];
			window.ga.q.push(arguments);
		};
		const el = Object.assign(document.createElement('script'), {
			async: true,
			src: 'https://www.google-analytics.com/analytics.js'
		});

		if (document.body) {
			document.body.appendChild(el);
		}
	}
};

export default (playerInstance: Videojs, config?: Config) => {
	if (config) {
		loadGoogleAnalyticsLibrary(config.context);
		new VideojsAnalytics(playerInstance, config);
	}
};
