/* @flow */
import User from 'kinja-magma/models/User';
import type { BlogId, StoryTypeId, CategoryId } from 'kinja-magma/models/Id';
import type { ImageFormat } from 'postbody/Image';
import CurationItem, { type CurationItemProps, type CurationItemJSON } from 'kinja-magma/models/CurationItem';
import type { BlogThemeName } from 'kinja-components/components/theme/theme';

export type IconDefinitions =
	| 'actions'
	| 'commerce'
	| 'crucial'
	| 'discussion'
	| 'editor'
	| 'essential'
	| 'gmgavatars'
	| 'places';

export type PostStatus =
	| 'DELETED'
	| 'DRAFT'
	| 'PUBLISHED'
	| 'REDIRECT';

export type RecircGroup =
	| 'fmgSatire'
	| 'fmgNonSatire'
	| 'fmgBusiness'
	| 'partnerEditorial';

export type Variant =
	| 'PresentableApproval'
	| 'PresentableMembershipResponse'
	| 'PresentableMessage'
	| 'PresentablePendingMembership'
	| 'PresentablePostLikeGroup'
	| 'PresentableReply'
	| 'PresentableRepost'
	| 'PresentableUserFollow';

export type BlogProperties = {
	avclub: 1636027099,
	clickhole: 1636577167,
	deadspin: 11,
	default: 0,
	earther: 1636390014,
	gizmodo: 4,
	jalopnik: 12,
	jezebel: 39,
	kotaku: 9,
	lifehacker: 17,
	splinter: 1635895473,
	theinventory: 1458353822,
	theonion: 1636079510,
	theroot: 1635821517,
	trackrecord: 1635984514
};

export type BlogNames =
	| 'avclub'
	| 'clickhole'
	| 'deadspin'
	| 'earther'
	| 'fusion'
	| 'gizmodo'
	| 'jalopnik'
	| 'jezebel'
	| 'kotaku'
	| 'lifehacker'
	| 'theinventory'
	| 'theonion'
	| 'theroot'
	| 'trackrecord';

export type BlogIds =
	| 1636027099
	| 1636577167
	| 11
	| 1636390014
	| 4
	| 12
	| 39
	| 9
	| 17
	| 1635895473
	| 1636079510
	| 1635821517
	| 1635984514
	| 1458353822;

export type Thumbnail = {
	id: string,
	format: ImageFormat
};

export type Image = {
	id: string,
	format: ImageFormat,
	height?: number,
	width?: number,
	url?: string,
	caption?: string,
	thumbnail?: Thumbnail,
	src?: string
};

export type Avatar = {
	id: string,
	format: ImageFormat,
	url?: string
};

export type Author = {
	avatar: Avatar,
	displayName: string,
	userId?: string,
	id?: string,
	screenName: string
};

// this type is temporary until we create a new API getting authors
// of an exact blog in the kinja editor
export type AuthorEditor = {
	avatar: Avatar,
	displayName: string,
	id: string,
	screenName: string
};

export type Blog = {
	aboutPostId?: string,
	blogGroup: string,
	canonicalHost: string,
	displayName: string,
	facebookScreenName: string,
	id: string,
	instagramScreenName: string,
	isCommerce: boolean,
	isGmgBlog: boolean,
	language: string,
	locale: string,
	name: string,
	parentId?: string,
	properties?: {
		aboutPostId: string,
		autoRepostToParent?: boolean,
		isLiveCustomKinja?: ?boolean,
		blogGroup?: BlogNames;
		recircGroup?: RecircGroup,
	},
	timezone: string,
	twitterScreenName: string,
	youtubeUrl: string
};

export type BlogProperty = {
	key: string,
	value: boolean,
	id?: number,
	blogId: number
};

export type StoryType = {
	blogId: number,
	canonical: string,
	content: string,
	id: StoryTypeId,
	title: string
};

export type AboveHeadline = {
	format: ImageFormat,
	frozenFormat: ImageFormat,
	height: number,
	id: string,
	isAnimated: boolean,
	src: string,
	type: string,
	width: number
};

export type Post = {
	aboveHeadline: ?AboveHeadline,
	allowReplies?: boolean,
	approved?: boolean,
	author?: ?User,
	authors?: ?Array<User>,
	authorId?: string,
	defaultBlog?: ?Blog,
	byline?: string,
	defaultBlogId?: string,
	blogGroup?: ?string,
	images?: Array<Image>,
	display?: string,
	headline?: string,
	id?: string,
	isStarter?: boolean,
	lastUpdateTimeMillis?: number,
	lastEditedBy?: string,
	parentAuthorId?: string,
	parentId?: string,
	permalink?: string,
	permalinkHost?: string,
	permalinkPath?: string,
	plaintext?: string,
	properties?: string,
	publishTime?: string,
	publishTimeMillis?: number,
	replyCount?: string | number,
	salesAvatar?: Avatar,
	salesAvatarMap?: Array<Avatar>,
	securePermalink?: string,
	showByline?: boolean,
	sponsored?: boolean,
	starterId?: string,
	status?: string,
	timezone?: string,
	sharingMainImage?: Image,
	featuredMedia?: Image,
	storyType?: StoryType,
	defaultBlogHost?: string,
	permalinkHost?: string,
	vertical?: string,
	viewCount?: string | number,
};

export type PostData = {
	display: string,
	excerpt: string,
	headline: string,
	id: string,
	isStarter: boolean,
	permalink: string,
	plaintext: string,
	status: PostStatus
};

export type InvitedData = {
	displayName: string,
	avatar: Avatar
};

export type InviteeData = {
	displayName: string,
	avatar: Avatar
};

export type OriginalData = Post;

export type SourceBlogData = {
	avatar: Avatar,
	displayName: string,
	canonicalHost: string
};

export type Notification = {
	$variant: Variant,
	createdAt: string,
	invitedByData: InvitedData,
	inviteeData: InviteeData,
	originalData: OriginalData,
	parentPostData: PostData,
	postData: PostData,
	seen: boolean,
	sourceAuthorData: Author,
	sourceAuthorsData: Array<Author>,
	sourceBlogData: SourceBlogData
};

export type Toggle = {
	isOpen?: boolean
};

export type ToggleProps = {
	blogTheme?: BlogThemeName,
	checked?: boolean,
	label?: string | React.Node,
	name: string,
	onChange: boolean => void,
	small?: boolean
};

export type InvitationResultFunction = ({invitationId: string}, {acceptingInvite: boolean}) => string;

export type API = {
	getNavigationItems(): mixed,
	getNotificationCount(): mixed,
	getNotifications(): mixed,
	getSections(): mixed,
	getMostPopularPosts(): mixed,
	acceptMembershipInvitation(): InvitationResultFunction,
	rejectMembershipInvitation(): InvitationResultFunction,
};

export type TFN = {
	imageUrl?: (id?: string, size?: string, format?: string) => string,
	getRelativeTime?: () => mixed,
	displayLogin?: () => mixed
};

export type MantleProps = {
	currentBlog: Blog,
	currentUser: User,
	postId: ?string,
	API: API,
	FN: TFN
};

export type HTMLProps = {
	__html?: string,
	networkNavHTML?: string,
	possiblyDangerousHTML?: string
};

export type FeatureIsOnFunction = ((name: string) => boolean);

export type Feature = { isOn: FeatureIsOnFunction };

export type NotificationButtonProps = {
	acceptMembershipInvitation: InvitationResultFunction,
	feature: Feature,
	getRelativeTime: () => string,
	hasUnreadNotifications?: boolean,
	imageUrl: (id?: string, size?: string, format?: string) => string,
	notificationCount?: number,
	notifications: Array<Notification>,
	notificationsIsLoading?: boolean,
	rejectMembershipInvitation: InvitationResultFunction,
};

type Error = {
	message: string,
	code: string,
	uid: string
};

type Warning = {
	message: string,
	code: string
};

// https://github.com/gawkermedia/guidebook/blob/4f2726ff3c8ac1a68276cdd638c2b0652501a045/Guides/API/API%20Interface.md#response-format-enveloping
export type ErrorResponse = {
	meta: {
		error: ?Error,
		warnings: ?Array<Warning>
	},
	data: null
};


// Curation module
export type Zone = {
	dimension: string,
	numberOfItems: number
};

export type LayoutString = 'Modular3' | 'Modular4' | 'Headline1' | 'Equal3' | 'Equal4' | 'Equal6';
export type LayoutCardinality = 1 | 3 | 4 | 6;
export type LayoutGroup = 'Modular' | 'Headline' | 'Equal';

export type CurationLayout = {
	cardinality: LayoutCardinality,
	group: LayoutGroup,
	zones: Array<Zone>
};

export type GridConfig = {
	layout?: CurationLayout,
	items?: ?Array<CurationItemProps>
};

export type CurationApiItem = {
	itemType: string,
	itemData: CurationItemProps
};

export type GridConfigForApi = {
	layout?: CurationLayout,
	items?: ?Array<CurationApiItem>
};

export type CurationBlogSaveApiParams = {
	blogId: BlogId,
} & GridConfigForApi;

export type CurationCategorySaveApiParams = {
	categoryId: CategoryId,
} & GridConfigForApi;

export type CurationStoryTypeSaveApiParams = {
	storyTypeId: StoryTypeId,
} & GridConfigForApi;

export type CurationTagSaveApiParams = {
	blogId: BlogId,
	tagCanonical: string
} & GridConfigForApi;

export type CurationCustomOptions = {
	firstRender?: boolean,
	hideAuthorInfo?: boolean,
	isOnion?: boolean,
	isSatire?: boolean,
	curationType?: string
};

export type CurationExternalAPI = {
	imageUploader: (target: string | File) => Promise<*>,
	resolveItem: (url: string) => Promise<*>,
	returnValidCurationModel: (model: CurationItemJSON) => CurationItem,
	getParentBlog: (blogId: BlogId) => Promise<*>,
	deleteLayoutAndItems: () => Promise<boolean>,
	saveLayoutAndItems: ({
		gridConfig: GridConfig,
		toolbarItems: *
	}) => ?Promise<*>
};

export type CurationDefaultLayouts = Array<CurationLayout>;

export type CurationSettings = {
	defaultLayouts: CurationDefaultLayouts,
	gridConfig: GridConfig,
	externalAPI?: CurationExternalAPI
};
