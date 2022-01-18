/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';

import EnsureDefaultTheme from 'kinja-components/components/theme/ensureDefaultTheme';
import ExperimentDetailCard from './experiment-detail-card';
import { Loading } from 'kinja-components/components/elements/loader';
import Checkbox from 'kinja-components/components/form/checkbox';
import { Select, Option } from 'kinja-components/components/form/select';
import Textfield18 from 'kinja-components/components/form/textfield18';
import Play from 'kinja-components/components/icon19/Play';
import ArrowLeft from 'kinja-components/components/icon19/ArrowLeft';
import Trashcan from 'kinja-components/components/icon19/Trashcan';
import Modal from 'kinja-components/components/modal';
import Button from 'kinja-components/components/buttons';
import {
	createExperiment,
	convergeExperiment,
	startExperiment
} from '../../../../kinja-magma/api/experiments';

const DetailsContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: auto;
	margin-top: 60px;
	margin-bottom: 50px;
`;

const BackNavigationContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 100%;
	height: 40px;
	margin-bottom: 15px;
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

const DetailButtonContainer = styled.div``;

const SpecsContainer = styled.div`
	margin-top: 30px;
	display: flex;
	flex-direction: row;
	width: 100%;
	height: auto;
`;

const SpecsLeft = styled.div`
	display: flex;
	flex-direction: column;
	width: 330px;
	height: auto;
	font-size: 20px;
`;

const SpecsRight = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	width: 640px;
	height: auto;
	font-size: 18px;
`;

const SpecHeading = styled.div`
	font-weight: bold;
	display: flex;
	width: 100%;
`;

const SpecData = styled.div`
	display: flex;
	width: 100%;
	margin-bottom: 15px;
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

const SpecSelector = styled.div`
	display: flex;
	width: 60px;
	margin-right: 10px;
`;

const DetailCardContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 300px;
	min-height: 300px;

	&:nth-child(odd) {
		margin-right: 35px;
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

const ModalLoader = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

const NewVariant = styled.div`
	display: flex;
	width: 100%;
	height: auto;
	margin-top: 20px;
`;

const SaveAsDraft = styled.div`
	display: flex;
	width: 100%;
	height: auto;
	margin-top: 50px;
`;

const bucketSelector = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'];

export default class Create extends Component {
	branchName = React.createRef();
	state = {
		startFail: false,
		fixRetry: false,
		redirect: false,
		modal: false,
		savedId: '',
		errorMessage: false,
		convergenceFail: false,
		apiCallInProgress: false,
		bucketOverride: false,
		defaultBuckets: 4,
		experiment: '',
		name: '',
		branches: [
			{
				name: '',
				numGroups: 4,
				features: []
			},
			{
				name: '',
				numGroups: 4,
				features: []
			}
		]
	};

	validateBranchNames = () => {
		const nameFields = this.state.branches.reduce(
			function (acc, curr) {
				return acc.concat(curr.name);
			},
			[]
		);

		return nameFields.every(Boolean);
	}

	allowFormSubmission = () => {
		if (this.state.experiment && this.validateBranchNames()) {
			return true;
		} else {
			return false;
		}
	}

	updateExperimentName = value => {
		this.setState({ experiment: value });
	};

	updateBranchName = (value, itemNumber) => {
		const newBranches = this.state.branches.map((branch, index) => {
			if (index !== itemNumber) {
				return branch;
			}

			return {
				...branch,
				name: value
			};
		});

		this.setState({ branches: newBranches });
	};

	updateFeatureSwitch = value => {
		this.setState({ featureSwitch: value });
	};

	addFeatureSwitch = (feature, itemNumber) => {
		let newFeatures;
		this.state.branches.map((branch, index) => {
			if (index === itemNumber) {
				newFeatures = branch.features;
			}
		});
		// prevent duplicates
		if (this.state.branches[itemNumber].features.indexOf(feature) === -1 || !this.state.branches[itemNumber].features) {
			newFeatures.push(feature);
		} else {
			return;
		}
		this.updateFeatureSwitches(newFeatures, itemNumber);
	};

	updateAllBuckets = value => {
		const newBranches = this.state.branches.map(branch => {
			return {
				...branch,
				numGroups: value
			};
		});
		this.setState({ defaultBuckets: value, branches: newBranches });
	}

	updateBucketQuantity = (value, itemNumber) => {
		const newBranches = this.state.branches.map((branch, index) => {
			if (index !== itemNumber) {
				return branch;
			}

			return {
				...branch,
				numGroups: value
			};
		});

		this.setState({ branches: newBranches });
	};

	removeFeatureSwitch = (feature, itemNumber) => {
		let oldFeatures;
		this.state.branches.map((branch, index) => {
			if (index === itemNumber) {
				oldFeatures = branch.features;
			}
		});

		const newFeatures = oldFeatures.filter(word => word !== feature);

		this.updateFeatureSwitches(newFeatures, itemNumber);
	};

	updateFeatureSwitches = (newFeatures, itemNumber) => {
		const newBranches = this.state.branches.map((branch, index) => {
			if (index !== itemNumber) {
				return branch;
			}

			return {
				...branch,
				features: newFeatures
			};
		});

		this.setState({ branches: newBranches });
	};

	addVariant = () => {
		const variant = [...this.state.branches];

		variant.push({
			name: '',
			numGroups: this.state.defaultBuckets,
			features: []
		});

		this.setState({ branches: variant });
	};

	deleteVariant = index => {
		const variant = [...this.state.branches];

		variant.splice(index, 1);
		this.setState({ branches: variant });
	};

	startExperiment = () => {
		if (this.allowFormSubmission()) {
			this.setState({ apiCallInProgress: true, modal: true, errorMessage: null });
			createExperiment(
				{ name: this.state.experiment, branches: this.state.branches },
				this.props.token
			)
				.then(response => {
					if (response.experiment.convergenceState === 'SUCCESS') {
						startExperiment(this.props.token, response.experiment.id)
							.then(response => {
								if (response.experiment.convergenceState === 'SUCCESS') {
									this.setState({ redirect: true });
								}
							})
							.catch(error => {
								this.setState({
									apiCallInProgress: false,
									errorMessage: error.message,
									startFail: true
								});
							});
					} else {
						this.setState({
							apiCallInProgress: false,
							startFail: true,
							convergenceId: parseInt(response.experiment.id)
						});
					}
				})
				.catch(error => {
					this.setState({
						apiCallInProgress: false,
						errorMessage: error.message,
						startFail: true
					});
				});
		} else {
			this.setState({
				modal: true,
				errorMessage: 'Required Fields Are Missing'
			});
		}
	};

	saveExperimentAsDraft = () => {
		if (this.allowFormSubmission()) {
			this.setState({ apiCallInProgress: true, modal: true, errorMessage: null });
			createExperiment(
				{ name: this.state.experiment, branches: this.state.branches },
				this.props.token
			)
				.then(response => {
					if (response.experiment.convergenceState === 'SUCCESS') {
						this.setState({
							apiCallInProgress: false,
							modal: false,
							savedId: response.experiment.id,
							redirect: true,
							convergenceFail: false
						});
					} else {
						this.setState({
							apiCallInProgress: false,
							modal: true,
							convergenceFail: true,
							convergenceId: response.experiment.id
						});
					}
				})
				.catch(e => {
					this.setState({
						apiCallInProgress: false,
						errorMessage: e.message
					});
				});
		} else {
			this.setState({
				modal: true,
				errorMessage: 'Required Fields Are Missing'
			});
		}
	};

	fixSubmission = () => {
		this.setState({
			errorMessage: false,
			modal: false
		});
	};

	tryConvergeAgain = () => {
		this.setState({ modal: true, apiCallInProgress: true, errorMessage: null });
		convergeExperiment(this.props.token, this.state.convergenceId)
			.then(() => this.setState({ redirect: true }))
			.catch(e =>
				this.setState({ apiCallInProgress: false, errorMessage: e.message })
			);
	};

	tryStartAgain = () => {
		this.setState({ apiCallInProgress: true, errorMessage: null });
		convergeExperiment(this.props.token, this.state.convergenceId)
			.then(() => {
				startExperiment(this.props.token, this.state.convergenceId)
					.then(() => {
						this.setState({ redirect: true });
					})
					.catch(error => {
						this.setState({
							apiCallInProgress: false,
							errorMessage: error.message
						});
					});
			})
			.catch(error => {
				this.setState({
					apiCallInProgress: false,
					errorMessage: error.message
				});
			});
	};

	renderModal = () => {
		if (this.state.apiCallInProgress) {
			return (
				<ModalLoader>
					<Loading />
				</ModalLoader>
			);
		} else if (this.state.convergenceFail) {
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
		} else if (this.state.startFail) {
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
							onClick={() => this.tryStartAgain()}
						/>
					</ModalButtonsContainer>
				</React.Fragment>
			);
		} else {
			return (
				<React.Fragment>
					<ModalHeading>
						<h3>Errors Occurred</h3>
					</ModalHeading>
					<ModalText>{this.state.errorMessage}</ModalText>
					<ModalButtonsContainer>
						<Button
							small="true"
							label="Fix"
							variant="error"
							weight="primary"
							onClick={() => this.fixSubmission()}
						/>
					</ModalButtonsContainer>
				</React.Fragment>
			);
		}
	};

	openModal = () => {
		this.setState({ modal: true, confirmArchive: true });
	};

	bucketOverride = () => {
		this.setState(state => ({
			bucketOverride: !state.bucketOverride
		}));

		if (this.state.bucketOverride) {
			const newBranches = this.state.branches.map(() => {
				return {
					numGroups: this.state.defaultBuckets
				};
			});
			this.setState({ branches: newBranches });
		}
	};

	render() {
		const { redirect } = this.state;
		const nameError = this.state.experiment ? false : 'Required';

		if (redirect) {
			return <Redirect to={`/experiments/${this.state.savedId}`} />;
		}

		return (
			<EnsureDefaultTheme>
				<DetailsContainer>
					<Modal isOpen={this.state.modal}>{this.renderModal()}</Modal>
					<BackNavigationContainer>
						<ArrowLeft />
						<Link to="/experiments">Back</Link>
					</BackNavigationContainer>
					<DetailTitlePauseStop>
						<DetailsTitle>
							<Textfield18
								error={nameError}
								placeholder="Experiment Name"
								value={this.state.experiment}
								onChange={this.updateExperimentName}
							/>
						</DetailsTitle>
						<DetailsButtons>
							<DetailButtonContainer>
								<Button
									small="true"
									label="Start"
									labelPosition="before"
									icon={<Play />}
									weight="secondary"
									onClick={
										this.state.convergenceFail || this.state.startFail
											? this.tryConvergeAgain
											: this.startExperiment
									}
								/>
							</DetailButtonContainer>
						</DetailsButtons>
					</DetailTitlePauseStop>
					<SpecsContainer>
						<SpecsLeft>
							<SpecHeading>Status:</SpecHeading>
							<SpecData>DRAFT</SpecData>
							<BucketsContainer>
								<SpecHeading className="bucketHeading">Buckets Each:</SpecHeading>
								<SpecSelector>
									{!this.state.bucketOverride && <Select
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
									}
								</SpecSelector>
								<Checkbox
									styled
									name="NAME"
									label="override"
									value="VALUE"
									checked={this.state.bucketOverride}
									onChange={() => this.bucketOverride()}
								/>
							</BucketsContainer>
						</SpecsLeft>
						<SpecsRight>
							{this.state.branches.length > 0 &&
								this.state.branches.map((branch, index) => {
									return (
										<DetailCardContainer key={index}>
											{index === 0 ? (
												<VariantLabel>
													<h4>Variant 0, Control</h4>
													<div
														className="delete"
														onClick={() => this.deleteVariant(index)}
													>
														<Trashcan />
													</div>
												</VariantLabel>
											) : (
												<VariantLabel>
													<h4>Variant {index}</h4>
													<div
														className="delete"
														onClick={() => this.deleteVariant(index)}
													>
														<Trashcan />
													</div>
												</VariantLabel>
											)}
											<ExperimentDetailCard
												updateBranchName={this.updateBranchName}
												addFeatureSwitch={this.addFeatureSwitch}
												removeFeatureSwitch={this.removeFeatureSwitch}
												itemNumber={index}
												key={index}
												name={branch.name}
												features={branch.features}
												buckets={branch.numGroups}
												create={true}
												bucketOverride={this.state.bucketOverride}
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
							<SaveAsDraft>
								<Button
									small="true"
									label="Save As Draft"
									weight="secondary"
									onClick={() => {
										this.saveExperimentAsDraft();
									}}
								/>
							</SaveAsDraft>
						</SpecsRight>
					</SpecsContainer>
				</DetailsContainer>
			</EnsureDefaultTheme>
		);
	}
}
