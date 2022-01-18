/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';

import EnsureDefaultTheme from 'kinja-components/components/theme/ensureDefaultTheme';
import ExperimentDetailCard from './experiment-detail-card';
import { Select, Option } from 'kinja-components/components/form/select';
import { Loading } from 'kinja-components/components/elements/loader';
import ArrowLeft from 'kinja-components/components/icon19/ArrowLeft';
import Disabled from 'kinja-components/components/icon19/Disabled';
import Play from 'kinja-components/components/icon19/Play';
import Checkmark from 'kinja-components/components/icon19/Checkmark';
import Pause from 'kinja-components/components/icon19/Pause';
import Information from 'kinja-components/components/icon19/Information';
import Checkbox from 'kinja-components/components/form/checkbox';
import Textfield18 from 'kinja-components/components/form/textfield18';
import Modal from 'kinja-components/components/modal';
import Pencil from 'kinja-components/components/icon19/Pencil';
import Button from 'kinja-components/components/buttons';
import {
	getExperimentById,
	pauseExperiment,
	unpauseExperiment,
	startExperiment,
	stopExperiment,
	archiveExperiment,
	updateExperiment,
	convergeExperiment,
	getScreenName
} from '../../../../kinja-magma/api/experiments';
import TrashcanIcon from '../icon19/Trashcan';

const DetailsContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 970px;
	height: 100%;
	margin-top: 60px;
`;

const LoadingContainer = styled.div`
	width: 100%;
	min-height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const BackNavigationContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 100%;
	height: 40px;
`;

const DetailTitlePauseStop = styled.div`
	align-items: center;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	width: 100%;
	height: 30px;
`;

const DetailsTitle = styled.div`
	height: 100%;
	align-items: center;
	font-size: 26px;
	display: flex;
`;

const DetailsButtons = styled.div`
	display: flex;
	margin-left: auto;
`;

const DetailButtonContainer = styled.div`
	margin-right: 10px;

	&:last-child {
		margin-right: 0;
	}
`;

const SpecsContainer = styled.div`
	margin-top: 30px;
	padding-bottom: 10px;
	display: flex;
	flex-direction: row;
	width: 100%;
	height: 100%;
`;

const SpecsLeft = styled.div`
	display: flex;
	flex-direction: column;
	width: 330px;
	height: 100%;
	font-size: 20px;
`;

const SpecsRight = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	width: 640px;
	height: 100%;
	font-size: 18px;
`;

const SpecHeading = styled.div`
	font-weight: bold;
	display: flex;
	color: ${props => props.theme.color.gray};
	padding-bottom: 5px;
	width: 100%;

	&.top-margin {
		margin-top: 15px;
	}
`;

const SpecData = styled.div`
	display: flex;
	width: 100%;

	&.draft {
		margin-bottom: 15px;
	}
`;

const BucketsContainer = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;

	.bucketHeading {
		width: 110px;
	}

	.bucketData {
		width: 30px;
		margin-left: 10px;
		margin-right: 10px;
	}
`;

const SpecName = styled.div`
	display: flex;
	width: 100%;
	margin-bottom: 15px;
`;

const DetailCardContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 300px;

	&:nth-child(odd) {
		margin-right: 35px;
	}
`;

const ArchiveModalHeading = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	margin-bottom: 10px;
`;

const ArchiveModalText = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	font-size: 20px;
	margin-bottom: 30px;
`;

const ArchiveModalButtonsContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

	.left {
		margin-right: 20px;
	}
`;

const VariantLabel = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	width: 100%;

	.delete {
		height: 25px;
		cursor: pointer;
		margin-left: 10px;
		padding-top: 3px;
	}
`;

const ModalHeading = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	margin-bottom: 10px;
`;

const ModalText = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	font-size: 20px;
	margin-bottom: 30px;
`;

const ModalButtonsContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

	.left {
		margin-right: 20px;
	}
`;

const NewVariant = styled.div`
	display: flex;
	width: 100%;
	height: auto;
	margin-top: 20px;
`;

const SpecSelector = styled.div`
	display: flex;
	width: 60px;
	margin-right: 10px;
`;

const FactsContainer = styled.div`
	display: flex;
	width: 800px;
	overflow: scroll;
`;

const bucketSelector = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'];

const formatDateTime = num => {
	const dateInput = new Date(num);
	const dateOutput = dateInput.toLocaleDateString('en-US');
	const hour = dateInput.getHours();
	const min = dateInput.getUTCMinutes();
	const minOutput = min < 10 ? `0${min}` : min;

	if (!num) {
		return '';
	} else if (hour > 12) {
		return `${dateOutput} - ${hour - 12}:${minOutput} pm`;
	} else if (hour === 12) {
		return `${dateOutput} - ${hour}:${minOutput} pm`;
	} else {
		return `${dateOutput} - ${hour}:${minOutput} am`;
	}
};

const experimentStateLookup = {
	'START': 'Running',
	'DRAFT': 'Draft',
	'STOP': 'Ended',
	'PAUSE': 'Paused'
};

class Details extends Component {
	state = {
		archiveConvergeSuccessful: false,
		updateConvergeSuccessful: false,
		stateChange: false,
		archiveAttempted: false,
		create: false,
		updating: false,
		redirect: false,
		loadingDetails: 'true',
		modal: false,
		confirmArchive: false,
		defaultBuckets: 4,
		override: false,
		details: [],
		createdBy: '',
		modifiedBy: '',
		startedBy: '',
		endedBy: '',
		editedExperimentName: '',
		editedBranches: [],
		apiCallInProgress: false,
		convergenceFail: false,
		errorMessage: null,
		seeFacts: false,
		externalLinks: null
	};

	async componentDidMount() {
		if (typeof this.props.location.state !== 'undefined') {
			if (this.props.location.state.updating) {
				this.setState({ updating: true });
			}
		}

		try {
			const details = await getExperimentById(
				this.props.token,
				this.props.match.params.id
			);
			this.setState({
				details,
				externalLinks: details.experiment.externalLinks,
				loadingDetails: false,
				editedExperimentName: details.experiment.name,
				editedBranches: details.experiment.branches
			});
			this.getUser(this.state.details.experiment.createdBy, 'created');
			this.getUser(this.state.details.experiment.updatedBy, 'modified');
			this.getUser(this.state.details.experiment.startedBy, 'started');
			this.getUser(this.state.details.experiment.stoppedBy, 'ended');
			this.checkBuckets();
		} catch (e) {
			console.log('NO DETAILS');
		}
	}

	async getUser(id, role) {
		if (id) {
			try {
				const user = await getScreenName(id);
				if (role === 'created') {
					this.setState({ createdBy: user.screenName });
				} else if (role === 'modified') {
					this.setState({ modifiedBy: user.screenName });
				} else if (role === 'started') {
					this.setState({ startedBy: user.screenName });
				} else if (role === 'ended') {
					this.setState({ endedBy: user.screenName });
				} else {
					console.log('Role ${role} does not exist.');
				}

			} catch (e) {
				console.log(e);
			}
		}
	}

	validateBranchNames = () => {
		const nameFields = this.state.editedBranches.reduce(
			function (acc, curr) {
				return acc.concat(curr.name);
			},
			[]
		);
		console.log(nameFields.every(Boolean));
		return nameFields.every(Boolean);
	}

	allowFormSubmission = () => {
		if (this.state.editedExperimentName && this.validateBranchNames()) {
			return true;
		} else {
			return false;
		}
	}

	checkBuckets = () => {
		const values = [];
		this.state.details.experiment.branches.map(bucket =>
			values.push(bucket.numGroups)
		);

		const override = values.every((val, i, arr) => val === arr[0]);
		this.setState({ override: !override });

		if (override) {
			this.setState({ defaultBuckets: this.state.details.experiment.branches[0].numGroups });
		}
	};

	openArchiveModal = () => {
		this.setState({ modal: true, confirmArchive: true });
	};

	cancelArchive = () => {
		this.setState({ confirmArchive: false, modal: false, errorMessage: null });
	};

	confirmArchive = () => {
		this.setState({ apiCallInProgress: true, archiveAttempted: true });

		if (
			this.state.details.experiment.convergenceState !== 'SUCCESS' &&
			!this.state.archiveConvergeSuccessful
		) {
			convergeExperiment(this.props.token, this.state.details.experiment.id)
				.then(response => {
					if (response.experiment.convergenceState === 'SUCCESS') {
						this.setState({ convergeSuccessful: true });
						this.confirmArchive();
					}
				})
				.catch(error => {
					this.setState({
						apiCallInProgress: false,
						confirmArchive: false,
						errorMessage: error.message
					});
				});
		} else {
			archiveExperiment(this.props.token, this.state.details.experiment.id)
				.then(response => {
					if (response.experiment.convergenceState === 'SUCCESS') {
						this.setState({ redirect: true });
					} else {
						this.setState({
							apiCallInProgress: false,
							convergenceFail: true,
							confirmArchive: false
						});
					}
				})
				.catch(error => {
					this.setState({
						updating: false,
						apiCallInProgress: false,
						confirmArchive: false,
						errorMessage: error.message
					});
				});
		}
	};

	beginUpdate = () => {
		this.setState({ updating: true, create: true });
	};

	cancelUpdate = () => {
		this.setState({
			modal: false,
			updating: false,
			loadingDetails: true,
			create: false
		});
		this.refreshDetails();
	};

	confirmUpdate = () => {
		this.setState({ apiCallInProgress: true });

		if (
			this.state.details.experiment.convergenceState !== 'SUCCESS' &&
			!this.state.updateConvergeSuccessful
		) {
			convergeExperiment(this.props.token, this.state.details.experiment.id)
				.then(response => {
					if (response.experiment.convergenceState === 'SUCCESS') {
						this.setState({ updateConvergeSuccessful: true });
						this.confirmUpdate();
					}
				})
				.catch(error => {
					this.setState({
						updating: false,
						apiCallInProgress: false,
						errorMessage: error.message
					});
				});
		} else {
			updateExperiment(
				{
					id: this.state.details.experiment.id,
					name: this.state.editedExperimentName,
					branches: this.state.editedBranches
				},
				this.props.token
			)
				.then(response => {
					if (response.experiment.convergenceState === 'SUCCESS') {
						this.setState({
							apiCallInProgress: false,
							modal: false,
							updating: false
						});
						this.refreshDetails();
					} else {
						this.setState({
							apiCallInProgress: false,
							convergenceFail: true,
							updating: false
						});
					}
				})
				.catch(error => {
					this.setState({
						updating: false,
						apiCallInProgress: false,
						confirmArchive: false,
						errorMessage: error.message
					});
				});
		}
	};

	startExperiment = (token, id) => {
		this.setState({ modal: true, apiCallInProgress: true, stateChange: true });
		startExperiment(token, id)
			.then(response => {
				if (response.experiment.convergenceState === 'SUCCESS') {
					this.setState({
						apiCallInProgress: false,
						modal: false,
						stateChange: false
					});
					this.refreshDetails();
				} else {
					this.setState({
						apiCallInProgress: false,
						convergenceFail: true,
						stateChange: false
					});
				}
			})
			.catch(error => {
				console.log('ERROR', error.message.substring(0, 36));

				if (
					'400 Bad Request: Experiment state is' ===
					error.message.substring(0, 36)
				) {
					convergeExperiment(token, id)
						.then(() => {
							startExperiment(token, id)
								.then(() => {
									this.setState({
										apiCallInProgress: false,
										modal: false,
										stateChange: false
									});
									this.refreshDetails();
								})
								.catch(this.setState({ redirect: true }));
						})
						.catch(error => console.log('CONVERGE FAILURE: ', error));
				} else {
					this.setState({ redirect: true });
				}
			});
	}

	stopExperiment = (token, id) => {
		this.setState({ modal: true, apiCallInProgress: true, stateChange: true });
		stopExperiment(token, id)
			.then(() => this.setState({ redirect: true }))
			.catch(e => {
				this.setState({ apiCallInProgress: false, errorMessage: e.message, stateChange: false });
			});
	}

	pauseExperiment = (token, id) => {
		this.setState({ modal: true, apiCallInProgress: true, stateChange: true });
		pauseExperiment(token, id)
			.then(response => {
				if (response.experiment.convergenceState === 'SUCCESS') {
					this.setState({
						apiCallInProgress: false,
						modal: false
					});
					this.refreshDetails();
				} else {
					this.setState({
						apiCallInProgress: false,
						convergenceFail: true
					});
				}
			})
			.catch(error => {
				console.log('ERROR', error.message.substring(0, 36));

				if (
					'400 Bad Request: Experiment state is' ===
					error.message.substring(0, 36)
				) {
					convergeExperiment(token, id)
						.then(() => {
							pauseExperiment(token, id)
								.then(() => {
									this.setState({
										apiCallInProgress: false,
										modal: false
									});
									this.refreshDetails();
								})
								.catch(this.setState({ redirect: true }));
						})
						.catch(error => console.log('CONVERGE FAILURE: ', error));
				} else {
					this.setState({ redirect: true });
				}
			});
	};

	unpauseExperiment = (token, id) => {
		this.setState({ modal: true, apiCallInProgress: true, stateChange: true });
		unpauseExperiment(token, id)
			.then(response => {
				if (response.experiment.convergenceState === 'SUCCESS') {
					this.setState({
						apiCallInProgress: false,
						modal: false
					});
					this.refreshDetails();
				} else {
					this.setState({
						apiCallInProgress: false,
						convergenceFail: true,
						updating: false
					});
				}
			})
			.catch(error => {
				console.log(error);
				this.setState({
					updating: false,
					apiCallInProgress: false,
					errorMessage: error.message
				});
			});
	};

	updateExperimentName = value => {
		this.setState({ editedExperimentName: value });
	};

	updateBranchName = (value, itemNumber) => {
		const newBranches = this.state.editedBranches.map((branch, index) => {
			if (index !== itemNumber) {
				return branch;
			}

			return {
				...branch,
				name: value
			};
		});

		this.setState({ editedBranches: newBranches });
	};

	addFeatureSwitch = (feature, itemNumber) => {
		let newFeatures;
		this.state.editedBranches.map((branch, index) => {
			if (index === itemNumber) {
				newFeatures = branch.features;
			}
		});
		// prevent duplicates
		if (
			this.state.editedBranches[itemNumber].features.indexOf(feature) === -1
		) {
			newFeatures.push(feature);
		} else {
			return;
		}
		this.updateFeatureSwitches(newFeatures, itemNumber);
	};

	removeFeatureSwitch = (feature, itemNumber) => {
		let oldFeatures;
		this.state.editedBranches.map((branch, index) => {
			if (index === itemNumber) {
				oldFeatures = branch.features;
			}
		});

		const newFeatures = oldFeatures.filter(word => word !== feature);

		this.updateFeatureSwitches(newFeatures, itemNumber);
	};

	updateFeatureSwitches = (newFeatures, itemNumber) => {
		const newBranches = this.state.editedBranches.map((branch, index) => {
			if (index !== itemNumber) {
				return branch;
			}

			return {
				...branch,
				features: newFeatures
			};
		});

		this.setState({ editedBranches: newBranches });
	};

	addVariant = () => {
		const variant = [...this.state.editedBranches];

		variant.push({
			name: '',
			numGroups: this.state.defaultBuckets,
			features: []
		});

		this.setState({ editedBranches: variant });
	};

	deleteVariant = index => {
		const variant = [...this.state.editedBranches];

		variant.splice(index, 1);
		this.setState({ editedBranches: variant });
	};

	async refreshDetails() {
		try {
			const details = await getExperimentById(
				this.props.token,
				this.props.match.params.id
			);
			this.setState({
				details,
				loadingDetails: false,
				editedExperimentName: details.experiment.name,
				editedBranches: details.experiment.branches
			});
			this.getUser(this.state.details.experiment.createdBy, 'created');
			this.getUser(this.state.details.experiment.updatedBy, 'modified');
			this.getUser(this.state.details.experiment.startedBy, 'started');
			this.getUser(this.state.details.experiment.stoppedBy, 'ended');
			this.checkBuckets();
		} catch (e) {
			console.log('NO DETAILS');
		}
	}

	openUpdateModal = () => {
		this.setState({ modal: true });
	};

	renderVariantLabel = index => {
		if (this.state.updating) {
			return (
				<React.Fragment>
					{index === 0 ? (
						<VariantLabel>
							<h4>Variant 0, Control</h4>
							<div className="delete" onClick={() => this.deleteVariant(index)}>
								<TrashcanIcon />
							</div>
						</VariantLabel>
					) : (
						<VariantLabel>
							<h4>Variant {index}</h4>
							<div className="delete" onClick={() => this.deleteVariant(index)}>
								<TrashcanIcon />
							</div>
						</VariantLabel>
					)}
				</React.Fragment>
			);
		} else {
			return (
				<React.Fragment>
					{index === 0 ? <h4>Variant 0, Control</h4> : <h4>Variant {index}</h4>}
				</React.Fragment>
			);
		}
	};

	renderArchiveConfirmation = () => {
		if (this.state.apiCallInProgress) {
			return <Loading />;
		} else {
			return (
				<React.Fragment>
					<ArchiveModalHeading>
						<h3>Are you sure you want to archive this experiment?</h3>
					</ArchiveModalHeading>
					<ArchiveModalText>
						Archiving a draft experiment is permanent and cannot be undone.
					</ArchiveModalText>
					<ArchiveModalButtonsContainer>
						<div className="left">
							<Button
								small="true"
								label="Back"
								weight="secondary"
								onClick={() => this.cancelArchive()}
							/>
						</div>
						<Button
							small="true"
							label="Archive"
							variant="error"
							weight="primary"
							onClick={() => this.confirmArchive()}
						/>
					</ArchiveModalButtonsContainer>
				</React.Fragment>
			);
		}
	};

	renderTryConvergeAgain = () => {
		if (this.state.apiCallInProgress) {
			return <Loading />;
		} else {
			return (
				<React.Fragment>
					<ModalHeading>
						<h3>Errors Occurred</h3>
					</ModalHeading>
					<ModalText>Experiment did not converge.</ModalText>
					<ModalButtonsContainer>
						<div className="left">
							<Button
								small="true"
								label="Back"
								weight="secondary"
								onClick={() => this.fixSubmission()}
							/>
						</div>
						<Button
							small="true"
							label="Try Again"
							variant="error"
							weight="primary"
							onClick={() => this.tryConvergeAgain()}
						/>
					</ModalButtonsContainer>
				</React.Fragment>
			);
		}
	};

	tryConvergeAgain = () => {
		this.setState({ apiCallInProgress: true });
		convergeExperiment(this.props.token, this.state.convergenceId)
			.then(() => this.setState({ redirect: true }))
			.catch(e =>
				this.setState({ apiCallInProgress: false, errorMessage: e.message })
			);
	};

	renderErrorMessage = () => {
		if (this.state.apiCallInProgress) {
			return <Loading />;
		} else {
			return (
				<React.Fragment>
					<ModalHeading>
						<h3>Errors Occurred</h3>
					</ModalHeading>
					<ModalText>{this.state.errorMessage}</ModalText>
					{/* <div className="left"><Button small="true" label="Back" weight="secondary" onClick={() => this.cancelArchive()} /></div> */}
					{this.state.archiveAttempted ? (
						<ModalButtonsContainer>
							<div className="left">
								<Button
									small="true"
									label="Cancel"
									weight="secondary"
									onClick={() => this.cancelArchive()}
								/>
							</div>
							<Button
								small="true"
								label="Try Archive Again"
								variant="error"
								weight="primary"
								onClick={() => this.confirmArchive()}
							/>
						</ModalButtonsContainer>
					) : (
						<ModalButtonsContainer>
							<Button
								small="true"
								label="Fix"
								variant="error"
								weight="primary"
								onClick={() => this.fixSubmission()}
							/>
						</ModalButtonsContainer>
					)}
				</React.Fragment>
			);
		}
	};

	fixSubmission = () => {
		this.setState({
			convergenceFail: false,
			modal: false,
			errorMessage: null,
			updating: true
		});
	};

	updateBucketQuantity = (value, itemNumber) => {
		const newBranches = this.state.editedBranches.map((branch, index) => {
			if (index !== itemNumber) {
				return branch;
			}

			return {
				...branch,
				numGroups: value
			};
		});

		this.setState({ editedBranches: newBranches });
	};

	renderStateChangeLoading = () => {
		if (this.state.apiCallInProgress) {
			return <Loading />;
		}
	}

	renderUpdateConfirmation = () => {
		if (this.state.apiCallInProgress) {
			return <Loading />;
		} else {
			return (
				<React.Fragment>
					<ArchiveModalHeading>
						<h3>Are you sure you want to update this experiment?</h3>
					</ArchiveModalHeading>
					<ArchiveModalButtonsContainer>
						<div className="left">
							<Button
								small="true"
								label="Cancel"
								weight="secondary"
								onClick={() => this.cancelUpdate()}
							/>
						</div>
						<Button
							small="true"
							label="Update"
							variant="error"
							weight="primary"
							onClick={() => this.confirmUpdate()}
						/>
					</ArchiveModalButtonsContainer>
				</React.Fragment>
			);
		}
	};

	renderUpdateButtons = () => {
		if (this.state.updating) {
			return (
				<React.Fragment>
					<DetailButtonContainer>
						<Button
							disabled={!this.allowFormSubmission()}
							small="true"
							label="Save"
							variant="error"
							labelPosition="before"
							icon={<Pencil />}
							weight="secondary"
							onClick={() => this.openUpdateModal()}
						/>
					</DetailButtonContainer>
					<DetailButtonContainer>
						<Button
							small="true"
							label="Cancel"
							labelPosition="before"
							icon={<TrashcanIcon />}
							weight="tertiary"
							onClick={() => this.cancelUpdate()}
						/>
					</DetailButtonContainer>
				</React.Fragment>
			);
		} else {
			return (
				<DetailButtonContainer>
					<Button
						small="true"
						label="Update"
						variant="error"
						labelPosition="before"
						icon={<Pencil />}
						weight="secondary"
						onClick={() => this.beginUpdate()}
					/>
				</DetailButtonContainer>
			);
		}
	};

	renderExperimentName = () => {
		if (this.state.create) {
			return (
				<Textfield18
					placeholder="Experiment Name"
					value={this.state.editedExperimentName}
					onChange={this.updateExperimentName}
				/>
			);
		} else {
			return (
				<React.Fragment>{this.state.details.experiment.name}</React.Fragment>
			);
		}
	};

	renderUpdateCards = () => {
		return (
			<React.Fragment>
				{this.state.editedBranches.map((branch, index) => {
					return (
						<DetailCardContainer key={index}>
							{this.renderVariantLabel(index)}
							<ExperimentDetailCard
								key={index}
								bucketOverride={this.state.override}
								create={true}
								name={branch.name}
								features={branch.features}
								buckets={branch.numGroups}
								updating={this.state.updating}
								updateBranchName={this.updateBranchName}
								updateFeatureSwitch={this.updateFeatureSwitch}
								addFeatureSwitch={this.addFeatureSwitch}
								removeFeatureSwitch={this.removeFeatureSwitch}
								updateFeatureSwitches={this.updateFeatureSwitches}
								deleteVariant={this.deleteVariant}
								editedExperimentName={this.state.editedExperimentName}
								editedBranches={this.state.editedBranches}
								editedFeatures={this.state.editedBranches}
								itemNumber={index}
								updateBucketQuantity={this.updateBucketQuantity}
							/>
						</DetailCardContainer>
					);
				})}
				<NewVariant>
					<Button
						small="true"
						label="Add New Variant"
						weight="secondary"
						onClick={() => {
							this.addVariant();
							console.log('VARIANT STATE: ', this.state);
						}}
					/>
				</NewVariant>
			</React.Fragment>
		);
	};

	renderDetailsCards = () => {
		return (
			<React.Fragment>
				{this.state.details.experiment.branches.map((branch, index) => {
					return (
						<DetailCardContainer key={index}>
							<ExperimentDetailCard
								key={index}
								name={branch.name}
								features={branch.features}
								buckets={branch.numGroups}
								updating={this.state.updating}
							/>
						</DetailCardContainer>
					);
				})}
			</React.Fragment>
		);
	};

	updateAllBuckets = value => {
		const newBranches = this.state.editedBranches.map(branch => {
			return {
				...branch,
				numGroups: value
			};
		});
		this.setState({ defaultBuckets: value, editedBranches: newBranches });
	}

	renderUpdatingBuckets = () => {
		if (!this.state.override) {
			return (
				<SpecSelector>
					<Select
						name="buckets"
						value={this.state.defaultBuckets}
						predictive
						onChange={e =>
							this.updateAllBuckets(e)
						}
					>
						{bucketSelector.map(num => {
							return (
								<Option
									key={num}
									value={parseInt(num)}
									stringRepresentation={num}
								/>
							);
						})}
					</Select>
				</SpecSelector>
			);
		}
	}

	renderNotUpdatingBuckets = () => {
		if (this.state.override) {
			return (
				<h4>OVERRIDDEN</h4>
			);
		} else {
			return (
				<SpecData className="bucketData">{this.state.defaultBuckets}</SpecData>
			);
		}
	}

	renderExternalLinks = () => {
		if (this.state.externalLinks) {
			return (
				<>
					<SpecHeading>
						External Links:
					</SpecHeading>

					<SpecData>
						{this.state.externalLinks.map(link => {
							return (
								// eslint-disable-next-line react/jsx-no-target-blank
								<a key={link.linkUrl} href={link.linkUrl} target="_blank">{link.linkName}</a>
							);
						})}
					</SpecData>
				</>
			);
		}
	}

	renderDetails = () => {
		const {
			experiment: {
				createTimeMillis,
				experimentState,
				gaExperimentId,
				id,
				startTimeMillis,
				stopTimeMillis,
				updateTimeMillis
			}
		} = this.state.details;

		return (
			<><DetailsContainer>
				<Modal isOpen={this.state.modal}>
					{this.state.confirmArchive && this.renderArchiveConfirmation()}
					{this.state.updating && this.renderUpdateConfirmation()}
					{this.state.convergenceFail && this.renderTryConvergeAgain()}
					{this.state.errorMessage && this.renderErrorMessage()}
					{this.state.stateChange && this.renderStateChangeLoading()}
				</Modal>
				<BackNavigationContainer>
					<ArrowLeft />
					<Link to="/experiments">Back</Link>
				</BackNavigationContainer>
				<DetailTitlePauseStop>
					<DetailsTitle>{this.renderExperimentName()}</DetailsTitle>
					<DetailsButtons>
						{experimentState === 'DRAFT' && (
							<React.Fragment>
								{this.renderUpdateButtons()}
								<DetailButtonContainer>
									{!this.state.updating && <Button
										small="true"
										label="Start"
										labelPosition="before"
										icon={<Play />}
										weight="secondary"
										onClick={() => this.startExperiment(this.props.token, id)}
									/>}
								</DetailButtonContainer>
								<DetailButtonContainer>
									{!this.state.updating && <Button
										small="true"
										label="Archive"
										labelPosition="before"
										icon={<Checkmark />}
										weight="secondary"
										onClick={() => this.openArchiveModal()}
									/>}
								</DetailButtonContainer>
							</React.Fragment>
						)}
						{experimentState === 'PAUSE' && (
							<React.Fragment>
								<DetailButtonContainer>
									<Button
										small="true"
										label="Unpause"
										labelPosition="before"
										icon={<Play />}
										weight="secondary"
										onClick={() => this.unpauseExperiment(this.props.token, id)}
									/>
								</DetailButtonContainer>
								<DetailButtonContainer>
									<Button
										small="true"
										label="Stop"
										labelPosition="before"
										icon={<Disabled />}
										weight="secondary"
										onClick={() => this.stopExperiment(this.props.token, id)}
									/>
								</DetailButtonContainer>
							</React.Fragment>
						)}
						{experimentState === 'START' && (
							<React.Fragment>
								<DetailButtonContainer>
									<Button
										small="true"
										label="Pause"
										labelPosition="before"
										icon={<Pause />}
										weight="secondary"
										onClick={() => this.pauseExperiment(this.props.token, id)}
									/>
								</DetailButtonContainer>
								<DetailButtonContainer>
									<Button
										small="true"
										label="Stop"
										labelPosition="before"
										icon={<Disabled />}
										weight="secondary"
										onClick={() => this.stopExperiment(this.props.token, id)}
									/>
								</DetailButtonContainer>
							</React.Fragment>
						)}
					</DetailsButtons>
				</DetailTitlePauseStop>
				<SpecsContainer>
					<SpecsLeft>
						<SpecHeading>Status:</SpecHeading>
						<SpecData className="draft">{experimentStateLookup[experimentState]}</SpecData>

						<BucketsContainer>
							<SpecHeading className="bucketHeading">Buckets Each:</SpecHeading>
							{this.state.updating
								? this.renderUpdatingBuckets()
								: this.renderNotUpdatingBuckets()
							}
							{this.state.updating && <Checkbox
								styled
								label="override"
								checked={this.state.override}
								onChange={() => this.setState({ override: !this.state.override })}
							/>}
						</BucketsContainer>

						<SpecHeading className="top-margin">GA Experiment ID:</SpecHeading>
						<SpecData>{gaExperimentId}</SpecData>

						<SpecHeading className="top-margin">Created:</SpecHeading>
						<SpecData>{formatDateTime(createTimeMillis)}</SpecData>
						<SpecName>
							{this.state.createdBy ? `by ${this.state.createdBy}` : 'N/A'}
						</SpecName>

						<SpecHeading>Last Modified:</SpecHeading>
						<SpecData>{formatDateTime(updateTimeMillis)}</SpecData>
						<SpecName>
							{this.state.modifiedBy ? ` by ${this.state.modifiedBy}` : 'N/A'}
						</SpecName>

						{experimentState !== 'DRAFT'
							? <React.Fragment><SpecHeading>Experiment Start:</SpecHeading>
								<SpecData>{formatDateTime(startTimeMillis)}</SpecData>
								<SpecName>
									{this.state.startedBy ? `by ${this.state.startedBy}` : 'N/A'}
								</SpecName>

								{experimentState !== 'START'
									? <React.Fragment><SpecHeading>Experiment End:</SpecHeading>
										<SpecData>{formatDateTime(stopTimeMillis)}</SpecData>
										<SpecName>
											{this.state.endedBy ? `by ${this.state.endedBy}` : 'N/A'}
										</SpecName></React.Fragment>
									: null
								}
							</React.Fragment>
							: null
						}

						{this.renderExternalLinks()}
					</SpecsLeft>
					<SpecsRight>
						{this.state.updating
							? this.renderUpdateCards()
							: this.renderDetailsCards()}
					</SpecsRight>
				</SpecsContainer>
			</DetailsContainer>
				<DetailButtonContainer>
					<Button
						small="true"
						label={this.state.seeFacts ? 'hide facts' : 'see facts'}
						labelPosition="before"
						icon={<Information />}
						weight="secondary"
						onClick={() => this.toggleFacts()}
					/>
				</DetailButtonContainer>
			</>
		);
	};

	toggleFacts = () => {
		this.setState({ seeFacts: !this.state.seeFacts });
	}

	renderFacts = () => {
		if (!this.state.loading && this.state.seeFacts) {
			let facts = JSON.stringify(this.state.details.facts, null, 2);
			if (this.state.details.experiment.recordedFacts) {
				facts = JSON.stringify(this.state.details.experiment.recordedFacts, null, 2);
			}

			return (
				<FactsContainer>
					<pre>
						{facts}
					</pre>
				</FactsContainer>
			);
		}
	}

	render() {
		const { loadingDetails, redirect } = this.state;

		if (redirect) {
			return <Redirect to="/experiments" />;
		}

		return (
			<EnsureDefaultTheme>
				<React.Fragment>
					{loadingDetails ? (
						<LoadingContainer>
							<Loading />
						</LoadingContainer>
					) : (
						this.renderDetails()
					)}
					{this.renderFacts()}
				</React.Fragment>
			</EnsureDefaultTheme>
		);
	}
}

export default Details;
