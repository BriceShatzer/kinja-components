/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-no-target-blank */
import React, { Component } from 'react';
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';

import EnsureDefaultTheme from 'kinja-components/components/theme/ensureDefaultTheme';
import { Loading } from 'kinja-components/components/elements/loader';
import Modal from 'kinja-components/components/modal';
import FolderSelector from 'kinja-components/components/folder-selector';
import Play from 'kinja-components/components/icon19/Play';
import Disabled from 'kinja-components/components/icon19/Disabled';
import Pause from 'kinja-components/components/icon19/Pause';
import Checkmark from 'kinja-components/components/icon19/Checkmark';
import BlogAvatar from 'kinja-components/components/blog-avatar';
import Button19 from 'kinja-components/components/button19';
import {
	getExperimentBlogs,
	pauseExperiment,
	startExperiment,
	unpauseExperiment,
	stopExperiment,
	getFastlyState,
	getCurrentExperiments,
	getDraftExperiments,
	getFinishedExperiments
} from 'kinja-magma/api/experiments';
import { getBlogs } from 'kinja-magma/api/profile';
import { BLOG_GROUPS } from 'kinja-components/config/consts';
import FastlyBucket from './fastly-bucket';
import PencilIcon from '../icon19/Pencil';

const NavigationContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: row;
	width: 100%;
	z-index: 1;
	position: absolute;
	left: 0;
	top: 0;
	height: 120px;
`;

const NavLabelContainer = styled.div`
	display: flex;
	height: 120px;
	width: 860px;
	border-bottom: 1px solid gray;
`;

const NavLabelPadding = styled.div`
	display: flex;
	flex-grow: 1;
	height: 120px;
	border-bottom: 1px solid gray;
`;

const NavLabelName = styled.div`
	display: flex;
	align-items: flex-end;
	height: 120px;
	width: ${props => props.width}px;
	font-size: 20px;
	color: ${props => props.color};
	border-bottom: solid ${props => props.border};
	cursor: pointer;
	justify-content: center;
	padding-bottom: 10px;
`;

const NavLink = styled.div`
	display: flex;
	flex-grow: 1;
	align-items: flex-end;
	justify-content: flex-end;
	height: 120px;
	padding-bottom: 10px;
`;

const ActiveBlogsContainer = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	height: 100%;
	min-height: 70px;
	width: 860px;
	margin-top: 160px;
`;

const BlogsCurrentlyBeingUsed = styled.div`
	height: 100%;
	width: 860px;
	display: flex;
	flex-direction: row;
	align-content: center;
	margin-bottom: 10px;
`;

const BlogsCurrentlyBeingUsedTitle = styled.div`
	font-weight: bold;
	font-size: 18px;
	margin-right: 10px;
`;

const IndividualActiveBlog = styled.div`
	align-items: center;
	display: flex;
	flex-direction: row;
	font-size: 20px;
	height: 25px;
	margin-right: 10px;
	margin-top: 10px;
	width: 275px;
`;

const ActiveBlogsAvatar = styled.div`
	height: 25px;
	margin-right: 10px;
	width: 25px;
`;

const ExperimentsContainer = styled.div`
	margin-bottom: 30px;
`;

const ExperimentsFilterContainer = styled.div`
	display: flex;
	flex-direction: row;
	margin-top: 50px;
	margin-bottom: 30px;
	width: 860px;
`;

const FilterName = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 46px;
	width: 100px;
	font-size: 20px;
	color: ${props => props.color};
	border-bottom: solid ${props => props.border};
	cursor: pointer;
`;

const CreateNewExperimentButton = styled.div`
	display: flex;
	justify-content: flex-end;
	width: 110px;
	border-bottom: solid 1px gray;
	padding-bottom: 5px;
`;

const ExperimentsCalendar = styled.div`
	display: flex;
	flex: 1;
	justify-content: flex-end;
	align-items: center;
	padding-right: 25px;
	width: 100%;
	border-bottom: solid 1px gray;
`;

const ExperimentsLabelContainer = styled.div`
	display: flex;
	flex-direction: row;
	width: 860px;
	margin-bottom: 20px;
`;

const ExperimentsTableStatusLabel = styled.div`
	display: flex;
	padding-top: 10px;
	font-style: italic;
	justify-content: center;
`;

const ExperimentsLabel = styled.div`
	height: 100%;
	width: ${props => props.width}px;
	font-size: 20px;
	color: #0092ec;
`;

const IndividualExperimentContainer = styled.div`
	align-items: center;
	border-bottom: solid #eee 1px;
	display: flex;
	flex-direction: row;
	height: 100%;
	min-height: 40px;
	width: 860px;
`;

const IndividualExperimentName = styled.div`
	align-items: center;
	display: flex;
	flex-direction: row;
	width: ${props => props.width}px;
	padding-right: 5px;
`;

const NotConvergedExperimentName = styled.div`
	align-items: center;
	display: flex;
	flex-direction: row;
	width: ${props => props.width}px;
	padding-right: 5px;

	a {
		color: red;
	}
`;

const IndividualExperimentStatus = styled.div`
	align-items: center;
	display: flex;
	flex-direction: row;
	width: ${props => props.width}px;
`;

const IndividualExperimentTrafficUse = styled.div`
	align-items: center;
	display: flex;
	flex-direction: row;
	width: ${props => props.width}px;
`;

const IndividualExperimentBuckets = styled.div`
	align-items: center;
	display: flex;
	flex-direction: row;
	width: ${props => props.width}px;
`;

const IndividualExperimentVariants = styled.div`
	display: flex;
	align-content: center;
	flex-wrap: wrap;
	padding-right: 50px;
	height: 100%;
	min-width: 1%;
	width: ${props => props.width}px;
`;

const IndividualExperimentCreated = styled.div`
	align-items: center;
	display: flex;
	flex-direction: row;
	width: ${props => props.width}px;
`;

const IndividualExperimentIconLeft = styled.div`
	align-items: center;
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	width: 25px;
`;

const IndividualExperimentIconRight = styled.div`
	align-items: center;
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	width: 25px;
`;

const Variant = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: ${props => props.width}%;
	height: auto;
	position: relative;
	cursor: zoom-in;

	.tooltipText {
		display: inline-flex;
		flex-direction: column;
		visibility: hidden;
		background-color: #fff;
		border-radius: 3px;
		padding: 10px;
		position: absolute;
		z-index: 1;
		box-shadow: 0 0 5px 2px rgba(207, 207, 207, 1);
		bottom: 100%;
		left: 50%;
		margin-left: -100px;
	}

	&:hover {
		.tooltipText {
			visibility: visible;
		}
	}
`;

const TooltipName = styled.div`
	margin-bottom: 3px;
`;

const TooltipDetails = styled.div`
	color: #9e9e9e;
`;

const FastlyState = styled.div`
	width: 600px;
	font-size: 20px;
	display: flex;
	flex-direction: column;
	height: 100%;
	justify-content: center;
	align-items: center;
	margin-top: 120px;
`;

const FastlyLabelsContainer = styled.div`
	display: flex;
	margin-top: 40px;
	width: 100%;
	height: 30px;
	flex-direction: row;
	flex-wrap: no-wrap;
`;

const FastlyLabel = styled.div`
	display: flex;
	align-items: center;
	width: ${props => props.width}px;
	color: ${props => props.color};
`;

const FastlyBucketsContainer = styled.div`
	width: 600px;
	height: 600px;
	margin-top: 20px;
`;

const PaginationContainer = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: no-wrap;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 40px;
	margin-top: 20px;
	cursor: pointer;
`;

const PaginationLeft = styled.div`
	width: 50%;
	height: 40px;
	justify-content: flex-start;
	display: flex;
	align-items: center;
`;

const PaginationRight = styled.div`
	width: 50%;
	height: 40px;
	justify-content: flex-end;
	display: flex;
	align-items: center;
`;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const ModalButtonsContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 50px;

	.left {
		margin-right: 20px;
	}
`;

function updateWithCurrentSelection(levels, selection) {
	return levels.map((level, index) =>
		Object.assign({}, level, { selection: selection && selection[index] })
	);
}

function getDate(dateInput) {
	return dateInput.toLocaleDateString('en-US');
}

function groupBlogs(blogs) {
	const groupings = {};
	Object.keys(BLOG_GROUPS).map(blog => {
		groupings[blog] = {
			'activeBlogs': [],
			'parentActive': false
		};
	});
	groupings.kinja = {'activeBlogs': []};
	blogs.map(blog => {
		if (blog.name in groupings) {
			groupings[blog.name].activeBlogs.push(blog);
			groupings[blog.name].parentActive = true;
		} else if (blog.blogGroup in groupings) {
			groupings[blog.blogGroup].activeBlogs.push(blog);
		} else {
			groupings.kinja.activeBlogs.push(blog);
		}
	});
	return groupings;
}

const calculateBuckets = branches => {
	const buckets = Object.values(branches).reduce((previous, current) => {
		return parseInt(previous) + parseInt(current.numGroups);
	}, 0);

	return buckets;
};

const calculateTrafficUse = buckets => {
	return `${(buckets / 16) * 100}%`;
};

const formatDateTime = num => {
	const dateInput = new Date(num);
	const dateOutput = getDate(dateInput);
	const hour = dateInput.getHours();
	const min = dateInput.getUTCMinutes();
	const minOutput = min < 10 ? `0${min}` : min;

	if (hour > 12) {
		return `${dateOutput} - ${hour - 12}:${minOutput} pm`;
	} else if (hour === 12) {
		return `${dateOutput} - ${hour}:${minOutput} pm`;
	} else {
		return `${dateOutput} - ${hour}:${minOutput} am`;
	}
};

const activeBlogsMessage = currentExperiments => {
	if (currentExperiments.length === 0) {
		return 'Blogs eligible for experiments:';
	} else {
		return 'Blogs with active experiments:';
	}
};

const blogAvatar = blog => {
	if (blog.name in BLOG_GROUPS) {
		return blog.name;
	} else if (blog.blogGroup in BLOG_GROUPS) {
		return blog.blogGroup;
	} else {
		return 'kinja';
	}
};

const keycapNumbers = [
	'0️⃣',
	'1️⃣',
	'2️⃣',
	'3️⃣',
	'4️⃣',
	'5️⃣',
	'6️⃣',
	'7️⃣',
	'8️⃣',
	'9️⃣',
	'🔟'
];

const experimentStateLookup = {
	'START': 'Running',
	'DRAFT': 'Draft',
	'STOP': 'Ended',
	'PAUSE': 'Paused'
};

class Experiment extends Component {
	state = {
		initialLoad: true,
		loadingExperiments: true,
		loadingCurrent: true,
		loadingDrafts: true,
		loadingFinished: true,
		loadingFastly: true,
		loadingActiveBlogs: true,
		activeBlogs: [],
		groupedActiveBlogs: {},
		currentExperiments: [],
		currentPagination: null,
		draftExperiments: [],
		draftPagination: null,
		finishedExperiments: [],
		finishedPagination: null,
		fastlyState: [],
		currentView: true,
		draftsView: false,
		finishedView: false,
		experimentsView: true,
		fastlyView: false,
		groupedBlogsView: true,
		message: '[empty]',
		cancelMessage: '',
		stateChange: false,
		redirect: false,
		modal: false,
		confirmation: false,
		action: null,
		token: null,
		id: null,
		index: null
	};

	async componentDidMount() {
		try {
			const blogs = await getExperimentBlogs(this.props.token);
			const blogsMeta = await getBlogs(blogs.experimentBlogs.blogIds);
			const groupedBlogs = groupBlogs(blogsMeta);
			this.setState({
				activeBlogs: blogsMeta,
				groupedActiveBlogs: groupedBlogs,
				loadingActiveBlogs: false
			});
		} catch (e) {
			console.log(e);
		}

		try {
			const fastlyState = await getFastlyState(this.props.token);
			this.setState({
				fastlyState: fastlyState.fastly,
				loadingFastly: false
			});
		} catch (e) {
			console.log(e);
		}

		try {
			const currentExperiments = await getCurrentExperiments(
				this.props.token,
				0
			);
			console.log(currentExperiments);
			this.setState({
				currentExperiments: currentExperiments.items,
				currentPagination: currentExperiments.pagination,
				loadingCurrent: false
			});
		} catch (e) {
			console.log(e);
		}

		try {
			const draftExperiments = await getDraftExperiments(this.props.token, 0);
			this.setState({
				draftExperiments: draftExperiments.items,
				draftPagination: draftExperiments.pagination,
				loadingDrafts: false
			});
		} catch (e) {
			console.log(e);
		}

		try {
			const finishedExperiments = await getFinishedExperiments(
				this.props.token,
				0
			);
			this.setState({
				finishedExperiments: finishedExperiments.items,
				finishedPagination: finishedExperiments.pagination,
				loadingFinished: false
			});
		} catch (e) {
			console.log(e);
		}
	}

	async paginationControl(view, direction) {
		if (view === 'current') {
			this.setState({ loadingCurrent: true });
			if (direction === 'next') {
				try {
					const nextPage = await getCurrentExperiments(
						this.props.token,
						this.state.currentPagination.next.startIndex
					);
					this.setState({
						currentExperiments: nextPage.items,
						currentPagination: nextPage.pagination,
						loadingCurrent: false
					});
				} catch (e) {
					console.log(e);
				}
			} else {
				try {
					const previousPage = await getCurrentExperiments(
						this.props.token,
						this.state.currentPagination.prev.startIndex
					);
					this.setState({
						currentExperiments: previousPage.items,
						currentPagination: previousPage.pagination,
						loadingCurrent: false
					});
				} catch (e) {
					console.log(e);
				}
			}
		} else if (view === 'drafts') {
			if (direction === 'next') {
				getDraftExperiments(
					this.props.token,
					this.state.draftPagination.next.startIndex
				);
			} else {
				getDraftExperiments(
					this.props.token,
					this.state.draftPagination.prev.startIndex
				);
			}
		} else {
			this.setState({ loadingFinished: true });
			if (direction === 'next') {
				try {
					const nextPage = await getFinishedExperiments(
						this.props.token,
						this.state.finishedPagination.next.startIndex
					);
					this.setState({
						finishedExperiments: nextPage.items,
						finishedPagination: nextPage.pagination,
						loadingFinished: false
					});
				} catch (e) {
					console.log(e);
				}
			} else {
				try {
					const previousPage = await getFinishedExperiments(
						this.props.token,
						this.state.finishedPagination.prev.startIndex
					);
					this.setState({
						finishedExperiments: previousPage.items,
						finishedPagination: previousPage.pagination,
						loadingFinished: false
					});
				} catch (e) {
					console.log(e);
				}
			}
		}
	}

	pagination = view => {
		const {
			finishedPagination,
			finishedExperiments,
			draftPagination,
			draftExperiments,
			currentPagination,
			currentExperiments
		} = this.state;

		if (!this.state.loadingCurrent && view === 'current') {
			if (this.state.currentPagination.prev) {
				return (
					<PaginationContainer>
						<PaginationLeft>
							<span onClick={() => this.paginationControl(view, 'previous')}>
								PREVIOUS
							</span>
						</PaginationLeft>
						<PaginationRight>
							<span>
								{currentPagination.curr.startIndex + 1} -{' '}
								{currentExperiments.length + currentPagination.curr.startIndex}{' '}
								| {currentPagination.total} Total
							</span>
							<span onClick={() => this.paginationControl(view, 'next')}>
								&nbsp; &nbsp; &nbsp;MORE
							</span>
						</PaginationRight>
					</PaginationContainer>
				);
			} else if (this.state.currentExperiments.length === 14) {
				return (
					<PaginationContainer>
						<PaginationLeft />
						<PaginationRight>
							<span>
								{currentPagination.curr.startIndex + 1} -{' '}
								{currentExperiments.length + currentPagination.curr.startIndex}{' '}
								| {currentPagination.total} Total
							</span>
							<span onClick={() => this.paginationControl(view, 'next')}>
								&nbsp; &nbsp; &nbsp;MORE
							</span>
						</PaginationRight>
					</PaginationContainer>
				);
			}
		} else if (!this.state.loadingDrafts && view === 'draft') {
			if (this.state.draftPagination.prev) {
				return (
					<PaginationContainer>
						<PaginationLeft>
							<span onClick={() => this.paginationControl(view, 'previous')}>
								PREVIOUS
							</span>
						</PaginationLeft>
						<PaginationRight>
							<span>
								{draftPagination.curr.startIndex + 1} -{' '}
								{draftExperiments.length + draftPagination.curr.startIndex} |{' '}
								{draftPagination.total} Total
							</span>
							<span onClick={() => this.paginationControl(view, 'next')}>
								&nbsp; &nbsp; &nbsp;MORE
							</span>
						</PaginationRight>
					</PaginationContainer>
				);
			} else if (this.state.draftExperiments.length === 14) {
				return (
					<PaginationContainer>
						<PaginationLeft />
						<PaginationRight>
							<span>
								{draftPagination.curr.startIndex + 1} -{' '}
								{draftExperiments.length + draftPagination.curr.startIndex} |{' '}
								{draftPagination.total} Total
							</span>
							<span onClick={() => this.paginationControl(view, 'next')}>
								&nbsp; &nbsp; &nbsp;MORE
							</span>
						</PaginationRight>
					</PaginationContainer>
				);
			}
		} else if (!this.state.loadingFinished && view === 'finished') {
			if (this.state.finishedPagination.prev) {
				return (
					<PaginationContainer>
						<PaginationLeft>
							<span onClick={() => this.paginationControl(view, 'previous')}>
								PREVIOUS
							</span>
						</PaginationLeft>
						<PaginationRight>
							<span>
								{finishedPagination.curr.startIndex + 1} -{' '}
								{finishedExperiments.length +
									finishedPagination.curr.startIndex}{' '}
								| {finishedPagination.total} Total
							</span>
							<span onClick={() => this.paginationControl(view, 'next')}>
								&nbsp; &nbsp; &nbsp;MORE
							</span>
						</PaginationRight>
					</PaginationContainer>
				);
			} else if (this.state.finishedExperiments.length === 14) {
				return (
					<PaginationContainer>
						<PaginationLeft />
						<PaginationRight>
							<span>
								{finishedPagination.curr.startIndex + 1} -{' '}
								{finishedExperiments.length +
									finishedPagination.curr.startIndex}{' '}
								| {finishedPagination.total} Total
							</span>
							<span onClick={() => this.paginationControl(view, 'next')}>
								&nbsp; &nbsp; &nbsp;MORE
							</span>
						</PaginationRight>
					</PaginationContainer>
				);
			}
		}
	};

	displayExperiments = () => {
		this.setState({
			experimentsView: true,
			fastlyView: false
		});
	};

	displayFastly = () => {
		this.setState({
			experimentsView: false,
			fastlyView: true
		});
	};

	displayCurrent = () => {
		this.setState({
			currentView: true,
			draftsView: false,
			finishedView: false
		});
	};

	displayDrafts = () => {
		this.setState({
			currentView: false,
			draftsView: true,
			finishedView: false
		});
	};

	displayFinished = () => {
		this.setState({
			currentView: false,
			draftsView: false,
			finishedView: true
		});
	};

	updateState = action => {
		this.setState({ modal: false, confirmation: false });
		const { token, id, index } = this.state;

		this.setState({ stateChange: true });
		switch (action) {
			case 'pause':
				{
					console.log('PAUSE');
					pauseExperiment(token, id)
						.then(response => {
							console.log(response.experiment);
							this.replaceExperiment(response, index);
						})
						.catch(e => console.log(e));
				}
				break;
			case 'unpause':
				{
					console.log('UNPAUSE');
					unpauseExperiment(token, id)
						.then(response => {
							console.log(response.experiment);
							this.replaceExperiment(response, index);
						})
						.catch(e => console.log(e));
				}
				break;
			case 'stop':
				{
					console.log('STOP');
					stopExperiment(token, id)
						.then(response => {
							console.log(response.experiment);
							this.replaceExperiment(response, index);
						})
						.catch(e => console.log(e));
				}
				break;
			case 'start':
				{
					console.log('START');
					startExperiment(token, id)
						.then(response => {
							console.log(response.experiment);
							this.replaceExperiment(response, index);
						})
						.catch(e => console.log(e));
				}
				break;
			default:
				return;
		}
	};

	replaceExperiment = (response, itemNumber) => {
		const newCurrents = this.state.currentExperiments.map(
			(experiment, index) => {
				if (index !== itemNumber) {
					return experiment;
				}
				return response;
			}
		);
		this.setState({ currentExperiments: newCurrents, stateChange: false });
	};

	renderFastlyState = () => {
		const { fastlyState, loadingFastly } = this.state;

		return (
			<FastlyState>
				<FastlyLabelsContainer>
					<FastlyLabel width={110}>Buckets</FastlyLabel>
					<FastlyLabel width={210}>Experiments</FastlyLabel>
					<FastlyLabel width={110}>Variants</FastlyLabel>
					<FastlyLabel width={180}>Experiment Start Time</FastlyLabel>
				</FastlyLabelsContainer>
				<FastlyBucketsContainer>
					{loadingFastly ? (
						<Loading />
					) : (
						this.renderIndividualBucket(fastlyState)
					)}
				</FastlyBucketsContainer>
			</FastlyState>
		);
	};

	renderIndividualBucket = buckets => {
		console.log(buckets);
		const lineItems = Object.entries(buckets).map((bucket, index) => {
			console.log(bucket);
			return (
				<FastlyBucket
					bucket={bucket}
					key={index}
					getMoreInfo={Boolean(bucket[1].active)}
					token={this.props.token}
				/>
			);
		});

		return lineItems;
	};

	renderBlogSelector = () => {
		return (
			<Wrapper>
				<FolderSelector
					levels={this.state.levelsForMultipleSelection}
					multipleSelection={true}
					placeholder="Choose Target Blogs"
					onSelect={this.onSelect}
					onCancel={this.onCancel}
				/>
			</Wrapper>
		);
	};

	onSelect = selection => {
		return Promise.resolve(() => {
			this.setState({
				message: selection.length
					? selection.map(level => level.selection).join(' > ')
					: '[empty]',
				cancelMessage: '',
				levels: updateWithCurrentSelection(
					this.state.levels,
					selection.map(level => level.selection && level.selection)
				)
			});
		});
	};

	onCancel = () => {
		this.setState({ cancelMessage: ' Last selection was canceled.' });
	};

	renderActiveBlogs = () => {
		const blogsToDisplay = this.state.activeBlogs;
		if (this.state.loadingCurrent) {
			return (
				<ActiveBlogsContainer>
					<Loading />
				</ActiveBlogsContainer>
			);
		} else if (blogsToDisplay.length === 0) {
			return (
				<ActiveBlogsContainer>
					<BlogsCurrentlyBeingUsed>
						<BlogsCurrentlyBeingUsedTitle>
							{activeBlogsMessage(this.state.currentExperiments)}
						</BlogsCurrentlyBeingUsedTitle>
					</BlogsCurrentlyBeingUsed>
					{this.renderKinjaActiveBlogs('All of Kinja')}
				</ActiveBlogsContainer>
			);
		} else if (this.state.groupedBlogsView) {
			return (
				this.renderActiveBlogsGroupedByVertical()
			);
		} else {
			return (
				this.renderActiveBlogsList(blogsToDisplay)
			);
		}
	};

	renderActiveBlogsGroupedByVertical = () => {
		const groupings = this.state.groupedActiveBlogs;
		return (
			<ActiveBlogsContainer>
				<BlogsCurrentlyBeingUsed>
					<BlogsCurrentlyBeingUsedTitle>
						{activeBlogsMessage(this.state.currentExperiments)}
					</BlogsCurrentlyBeingUsedTitle>
					<a onClick={this.changeActiveBlogsView}>
						{this.state.groupedBlogsView ? 'See all blogs' : 'See grouped blogs'}
					</a>
				</BlogsCurrentlyBeingUsed>
				{this.renderActiveBlogGroup(groupings)}
			</ActiveBlogsContainer>
		);
	};

	changeActiveBlogsView = () => {
		this.setState({groupedBlogsView: !this.state.groupedBlogsView});
	}

	renderActiveBlogGroup = blogGroupings => {
		const blogsToRender = [];
		for (const blogGroup in blogGroupings) {
			if (blogGroupings.hasOwnProperty(blogGroup)) {
				const totalBlogs = blogGroupings[blogGroup].activeBlogs.length;
				const parentActive = blogGroupings[blogGroup].parentActive;
				if (totalBlogs > 0) {
					// Community site blog group
					if (blogGroup === 'kinja') {
						const msg = totalBlogs === 1 ? ' community site' : ' community sites';
						blogsToRender.push(this.renderKinjaActiveBlogs(totalBlogs.toString() + msg));
					// Only parent site
					} else if (totalBlogs === 1 && parentActive) {
						blogsToRender.push(this.renderIndividualActiveBlog(blogGroupings[blogGroup].activeBlogs[0]));
					// Parent site with verticals
					} else if (parentActive) {
						const totalVerticals = totalBlogs - 1;
						const msg = totalVerticals === 1 ? ' vertical' : ' verticals';
						blogsToRender.push(
							<IndividualActiveBlog key={blogGroup}>
								<ActiveBlogsAvatar>
									<BlogAvatar name={blogAvatar(blogGroupings[blogGroup].activeBlogs[0])} />
								</ActiveBlogsAvatar>
								{BLOG_GROUPS[blogGroup]} + {totalVerticals + msg}
							</IndividualActiveBlog>
						);
					// Only single vertical (non-community)
					} else if (totalBlogs === 1) {
						blogsToRender.push(this.renderIndividualActiveBlog(blogGroupings[blogGroup].activeBlogs[0]));
					// Multiple verticals w/o parent site
					} else {
						const totalVerticals = totalBlogs - 1;
						const msg = totalVerticals === 1 ? ' other vertical' : ' other verticals';
						blogsToRender.push(
							<IndividualActiveBlog key={blogGroup}>
								<ActiveBlogsAvatar>
									<BlogAvatar name={blogAvatar(blogGroupings[blogGroup].activeBlogs[0])} />
								</ActiveBlogsAvatar>
								{blogGroupings[blogGroup].activeBlogs[0].displayName} + {totalVerticals + msg}
							</IndividualActiveBlog>
						);
					}
				}
			}
		}
		return blogsToRender;
	};

	renderActiveBlogsList = blogsToDisplay => {
		return (
			<ActiveBlogsContainer>
				<BlogsCurrentlyBeingUsed>
					<BlogsCurrentlyBeingUsedTitle>
						{activeBlogsMessage(this.state.currentExperiments)}
					</BlogsCurrentlyBeingUsedTitle>
					<a onClick={this.changeActiveBlogsView}>
						{this.state.groupedBlogsView ? 'See all blogs' : 'See grouped blogs'}
					</a>
				</BlogsCurrentlyBeingUsed>
				{blogsToDisplay.map(blog => {
					return this.renderIndividualActiveBlog(blog);
				})}
			</ActiveBlogsContainer>
		);
	};

	renderIndividualActiveBlog = blog => {
		return (
			<IndividualActiveBlog key={blog.name}>
				<ActiveBlogsAvatar>
					<BlogAvatar name={blogAvatar(blog)} />
				</ActiveBlogsAvatar>
				{blog.displayName}
			</IndividualActiveBlog>
		);
	};

	renderKinjaActiveBlogs = title => {
		return (
			<IndividualActiveBlog key={'kinja'}>
				<ActiveBlogsAvatar>
					<BlogAvatar name={'kinja'} />
				</ActiveBlogsAvatar>
				{title}
			</IndividualActiveBlog>
		);
	};

	renderAllExperiments = () => {
		const { currentView, draftsView, finishedView } = this.state;
		return (
			<ExperimentsContainer>
				<ExperimentsFilterContainer>
					<FilterName
						color={currentView ? 'black' : 'gray'}
						border={currentView ? '3px #0092EC' : '1px gray'}
						onClick={() => this.displayCurrent()}
					>
						Current
					</FilterName>
					<FilterName
						color={draftsView ? 'black' : 'gray'}
						border={draftsView ? '3px #0092EC' : '1px gray'}
						onClick={() => this.displayDrafts()}
					>
						Drafts
					</FilterName>
					<FilterName
						color={finishedView ? 'black' : 'gray'}
						border={finishedView ? '3px #0092EC' : '1px gray'}
						onClick={() => this.displayFinished()}
					>
						Finished
					</FilterName>
					<ExperimentsCalendar>
						<a
							target="_blank"
							// eslint-disable-next-line max-len
							href="https://calendar.google.com/calendar/embed?src=fusion.net_da58cqgjj28dmlnjl47da2pq7s%40group.calendar.google.com&ctz=America%2FNew_York"
						>
							See Calendar
						</a>
					</ExperimentsCalendar>
					<CreateNewExperimentButton>
						<Link to="/experiments/create">
							<Button19 small={true} label="+ Create" type="primary" />
						</Link>
					</CreateNewExperimentButton>
				</ExperimentsFilterContainer>
				<ExperimentsLabelContainer>
					{this.renderViewLabels()}
				</ExperimentsLabelContainer>
				{this.state.currentView && this.renderCurrentView()}
				{this.state.currentView && this.pagination('current')}
				{this.state.draftsView && this.renderDraftView()}
				{this.state.draftsView && this.pagination('draft')}
				{this.state.finishedView && this.renderFinishedView()}
				{this.state.finishedView && this.pagination('finished')}
			</ExperimentsContainer>
		);
	};

	renderViewLabels = () => {
		if (this.state.currentView) {
			return (
				<React.Fragment>
					<ExperimentsLabel width={220}>Experiments</ExperimentsLabel>
					<ExperimentsLabel width={110}>Status</ExperimentsLabel>
					<ExperimentsLabel width={115}>Traffic Use</ExperimentsLabel>
					<ExperimentsLabel width={80}>Buckets</ExperimentsLabel>
					<ExperimentsLabel width={140}>Variants</ExperimentsLabel>
					<ExperimentsLabel width={145}>Start Time</ExperimentsLabel>
				</React.Fragment>
			);
		} else if (this.state.draftsView) {
			return (
				<React.Fragment>
					<ExperimentsLabel width={220}>Experiments</ExperimentsLabel>
					<ExperimentsLabel width={110}>Status</ExperimentsLabel>
					<ExperimentsLabel width={115}>Proposed Traffic Use</ExperimentsLabel>
					<ExperimentsLabel width={80}>Buckets</ExperimentsLabel>
					<ExperimentsLabel width={140}>Variants</ExperimentsLabel>
					<ExperimentsLabel width={145}>Created</ExperimentsLabel>
				</React.Fragment>
			);
		} else if (this.state.finishedView) {
			return (
				<React.Fragment>
					<ExperimentsLabel width={220}>Experiments</ExperimentsLabel>
					<ExperimentsLabel width={110}>Status</ExperimentsLabel>
					<ExperimentsLabel width={115}>Traffic Use</ExperimentsLabel>
					<ExperimentsLabel width={80}>Buckets</ExperimentsLabel>
					<ExperimentsLabel width={140}>Variants</ExperimentsLabel>
					<ExperimentsLabel width={100}>Start</ExperimentsLabel>
					<ExperimentsLabel width={100}>End</ExperimentsLabel>
				</React.Fragment>
			);
		}
	};

	renderCurrentView = () => {
		if (this.state.loadingCurrent) {
			return <Loading />;
		} else if (this.state.currentExperiments.length > 0) {
			return this.state.currentExperiments.map((experiment, index) => {
				return this.renderIndividualExperiment(experiment, index);
			});
		} else {
			return <ExperimentsTableStatusLabel>
				There are currently no experiments in progress or paused.
			</ExperimentsTableStatusLabel>;
		}
	};

	renderDraftView = () => {
		if (this.state.loadingDrafts) {
			return <Loading />;
		} else if (this.state.draftExperiments.length > 0) {
			return this.state.draftExperiments.map(experiment => {
				return this.renderIndividualExperiment(experiment);
			});
		} else {
			return <ExperimentsTableStatusLabel>
				There are currently no draft experiments.
			</ExperimentsTableStatusLabel>;
		}
	};

	renderFinishedView = () => {
		if (this.state.loadingFinished) {
			return <Loading />;
		} else if (this.state.finishedExperiments.length > 0) {
			return this.state.finishedExperiments.map(experiment => {
				return this.renderIndividualExperiment(experiment);
			});
		} else {
			return <ExperimentsTableStatusLabel>
				There are currently no completed experiments.
			</ExperimentsTableStatusLabel>;
		}
	};

	renderIndividualExperiment = (experiment, index) => {
		const {
			experiment: {
				branches,
				convergenceState,
				createTimeMillis,
				startTimeMillis,
				stopTimeMillis,
				experimentState,
				id,
				name
			}
		} = experiment;

		const isConverged = convergenceState === 'SUCCESS';

		if (this.state.currentView || this.state.draftsView) {
			return (
				<IndividualExperimentContainer key={id}>
					{isConverged && (
						<IndividualExperimentName width={220}>
							<Link to={`/experiments/${id}`}>{name}</Link>
						</IndividualExperimentName>
					)}
					{!isConverged && (
						<NotConvergedExperimentName width={220}>
							<Link to={`/experiments/${id}`}>{`⚠️ ${name}`}</Link>
						</NotConvergedExperimentName>
					)}
					<IndividualExperimentStatus width={110}>
						{experimentStateLookup[experimentState]}
					</IndividualExperimentStatus>
					<IndividualExperimentTrafficUse width={115}>
						{calculateTrafficUse(calculateBuckets(branches))}
					</IndividualExperimentTrafficUse>
					<IndividualExperimentBuckets width={80}>
						{calculateBuckets(branches)}
					</IndividualExperimentBuckets>
					<IndividualExperimentVariants width={140}>
						{branches.map((branch, index) => {
							const details = branch.features.map((feature, index) => (
								<div key={index}>?{feature}</div>
							));
							const name = branch.name;

							return (
								<React.Fragment key={index}>
									<Variant width={25} key={index}>
										{keycapNumbers[index]}
										<div className="tooltipText">
											<TooltipName>{name}</TooltipName>
											<TooltipDetails>{details}</TooltipDetails>
										</div>
									</Variant>
								</React.Fragment>
							);
						})}
					</IndividualExperimentVariants>
					<IndividualExperimentCreated width={145}>
						{this.state.currentView
							? formatDateTime(startTimeMillis)
							: formatDateTime(createTimeMillis)}
					</IndividualExperimentCreated>
					{experimentState === 'DRAFT' && (
						<React.Fragment>
							{this.state.stateChange &&
							this.state.experimentStateUpdating === index ? (
								// eslint-disable-next-line indent
								<Loading />
								) : (
									<React.Fragment>
										<IndividualExperimentIconLeft
											onClick={() => {
												this.setState({ experimentStateUpdating: index });
												this.promptConfirmation('start', this.props.token, id, index);
											}}
										>
											<Play />
										</IndividualExperimentIconLeft>
										<IndividualExperimentIconRight>
											<Link
												to={{
													pathname: `/experiments/${id}`,
													state: {
														updating: true
													}
												}}
											>
												<PencilIcon />
											</Link>
										</IndividualExperimentIconRight>
									</React.Fragment>
								)}
						</React.Fragment>
					)}
					{experimentState === 'START' && (
						<React.Fragment>
							{this.state.stateChange &&
							this.state.experimentStateUpdating === index ? (
								// eslint-disable-next-line indent
								<Loading />
								) : (
									<React.Fragment>
										<IndividualExperimentIconLeft
											onClick={() => {
												this.setState({ experimentStateUpdating: index });
												this.promptConfirmation('pause', this.props.token, id, index);
											}}
										>
											<Pause />
										</IndividualExperimentIconLeft>
										<IndividualExperimentIconRight
											onClick={() => {
												this.setState({ experimentStateUpdating: index });
												this.promptConfirmation('stop', this.props.token, id);
											}}
										>
											<Disabled />
										</IndividualExperimentIconRight>
									</React.Fragment>
								)}
						</React.Fragment>
					)}
					{experimentState === 'PAUSE' && (
						<React.Fragment>
							{this.state.stateChange &&
							this.state.experimentStateUpdating === index ? (
								// eslint-disable-next-line indent
								<Loading />
								) : (
									<React.Fragment>
										<IndividualExperimentIconLeft
											onClick={() => {
												this.setState({ experimentStateUpdating: index });
												this.promptConfirmation('unpause', this.props.token, id);
											}}
										>
											<Play />
										</IndividualExperimentIconLeft>
										<IndividualExperimentIconRight
											onClick={() => {
												this.setState({ experimentStateUpdating: index });
												this.promptConfirmation('stop', this.props.token, id);
											}}
										>
											<Disabled />
										</IndividualExperimentIconRight>
									</React.Fragment>
								)}
						</React.Fragment>
					)}
				</IndividualExperimentContainer>
			);
		} else {
			return (
				<IndividualExperimentContainer key={id}>
					<IndividualExperimentName width={220}>
						<Link to={`/experiments/${id}`}>{name}</Link>
					</IndividualExperimentName>
					<IndividualExperimentStatus width={110}>
						{experimentStateLookup[experimentState]}
					</IndividualExperimentStatus>
					<IndividualExperimentTrafficUse width={115}>
						{calculateTrafficUse(calculateBuckets(branches))}
					</IndividualExperimentTrafficUse>
					<IndividualExperimentBuckets width={80}>
						{calculateBuckets(branches)}
					</IndividualExperimentBuckets>
					<IndividualExperimentVariants width={140}>
						{branches.map((branch, index) => {
							const details = branch.features.map((feature, index) => (
								<div key={index}>?{feature}</div>
							));
							const name = branch.name;

							return (
								<React.Fragment key={index}>
									<Variant width={25} key={index}>
										{keycapNumbers[index]}
										<div className="tooltipText">
											<TooltipName>{name}</TooltipName>
											<TooltipDetails>{details}</TooltipDetails>
										</div>
									</Variant>
								</React.Fragment>
							);
						})}
					</IndividualExperimentVariants>
					<IndividualExperimentCreated width={100}>
						{getDate(new Date(startTimeMillis))}
					</IndividualExperimentCreated>
					<IndividualExperimentCreated width={100}>
						{getDate(new Date(stopTimeMillis))}
					</IndividualExperimentCreated>
				</IndividualExperimentContainer>
			);
		}
	};

	promptConfirmation = (action, token, id, index) => {
		this.setState({
			modal: true,
			confirmation: true,
			action,
			token,
			id,
			index
		});
	}

	cancelConfirmation = () => {
		this.setState({
			modal: false,
			confirm: false,
			action: null,
			id: null,
			index: null
		});
	}

	renderModal = () => {
		if (this.state.confirmation) {
			return (
				<Modal isOpen={this.state.modal}>
					Are you sure you want to {this.state.action} this experiment?
					<ModalButtonsContainer>
						<div className="left">
							<Button19
								label="Cancel"
								icon={<Disabled />}
								onClick={() => this.cancelConfirmation()}
							/>
						</div>
						{this.renderConfirmationButton()}
					</ModalButtonsContainer>
				</Modal>
			);
		}
	}

	renderConfirmationButton = () => {
		if (this.state.action === 'pause') {
			return (
				<Button19
					label="Pause"
					icon={<Checkmark />}
					variant="error"
					onClick={() => this.updateState('pause')}
				/>
			);
		}

		if (this.state.action === 'unpause') {
			return (
				<Button19
					label="Unpause"
					icon={<Checkmark />}
					variant="error"
					onClick={() => this.updateState('unpause')}
				/>
			);
		}

		if (this.state.action === 'stop') {
			return (
				<Button19
					label="Stop"
					icon={<Checkmark />}
					variant="error"
					onClick={() => this.updateState('stop')}
				/>
			);
		}

		if (this.state.action === 'start') {
			return (
				<Button19
					label="Start"
					icon={<Checkmark />}
					variant="error"
					onClick={() => this.updateState('start')}
				/>
			);
		}
	}

	render() {
		console.log(this.state);
		const { renderAllExperiments, renderActiveBlogs, renderFastlyState } = this;
		const { experimentsView, fastlyView, redirect } = this.state;

		if (redirect) {
			return <Redirect to="/experiments" />;
		}

		return (
			<EnsureDefaultTheme>
				<React.Fragment>
					{this.renderModal()}
					<NavigationContainer>
						<NavLabelPadding />
						<NavLabelContainer>
							<NavLabelName
								color={experimentsView ? 'black' : 'gray'}
								border={experimentsView ? '3px #0092EC' : '1px gray'}
								width={130}
								onClick={() => this.displayExperiments()}
							>
								Experiments
							</NavLabelName>
							<NavLabelName
								color={fastlyView ? 'black' : 'gray'}
								border={fastlyView ? '3px #0092EC' : '1px gray'}
								width={100}
								onClick={() => this.displayFastly()}
							>
								Fastly
							</NavLabelName>
							<NavLink>
								<a target="_blank" href="https://kinja.com/features">
									See Feature Switches
								</a>
							</NavLink>
						</NavLabelContainer>
						<NavLabelPadding />
					</NavigationContainer>
					{experimentsView ? (
						<React.Fragment>
							{renderActiveBlogs()}
							{renderAllExperiments()}
						</React.Fragment>
					) : (
						renderFastlyState()
					)}
				</React.Fragment>
			</EnsureDefaultTheme>
		);
	}
}

export default Experiment;
