/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import styled from 'styled-components';

import Textfield18 from 'kinja-components/components/form/textfield18';
import { Select, Option } from 'kinja-components/components/form/select';
import Button from 'kinja-components/components/buttons';
import { getAllFeatureSwitches } from 'kinja-magma/api/experiments';

const Card = styled.div`
	display: flex;
	flex-direction: column;
	width: 300px;
	min-height: 180px;
	max-height: 100%;
	margin-top: -10px;
	margin-bottom: 30px;
	border: 1px solid #e1e1e1;
	border-radius: 7px;
	padding: 10px;
`;

const ExperimentName = styled.div`
	margin-bottom: 10px;
`;

const ExperimentBuckets = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
	margin-bottom: 20px;
`;

const FeatureButtonContainer = styled.div`
	width: 100%;
	align-items: center;
	justify-content: center;
	padding-bottom: 5px;
	display: flex;
	flex-grow: 1;
`;

const ButtonContainer = styled.div`
	display: flex;
	width: 100%;
	flex-direction: row;
	flex-wrap: wrap;
	margin-top: 30px;
`;

const BucketQuantity = styled.div`
	display: flex;
	min-width: 100px;
`;

const truncateName = name => {
	const truncated = name.length > 37 ? `${name.slice(0, 37)}...` : name;
	return truncated;
};

const bucketSelector = ['1', '2', '3', '4', '5', '6', '7', '8'];

export default class ExperimentDetailCard extends Component {
	state = {
		featureSwitches: []
	};

	async componentDidMount() {
		try {
			const featureSwitches = await getAllFeatureSwitches();
			const featureNames = [];
			featureSwitches.map(feature => {
				featureNames.push(feature.name);
			});
			const sortedNames = featureNames.sort();
			this.setState({ featureSwitches: sortedNames });
		} catch (e) {
			console.log(e);
		}
	}

	renderCreate = () => {
		const nameError = this.props.name ? false : 'Required';

		return (
			<Card>
				<ExperimentName>
					<Textfield18
						error={nameError}
						placeholder="Branch Name"
						value={this.props.name}
						onChange={e =>
							this.props.updateBranchName(e, this.props.itemNumber)
						}
					/>
				</ExperimentName>
				<ExperimentBuckets>
					<BucketQuantity># of Buckets:</BucketQuantity>{' '}
					{!this.props.bucketOverride ? (
						this.props.buckets
					) : (
						<Select
							name="buckets"
							value={this.props.buckets}
							predictive
							onChange={e =>
								this.props.updateBucketQuantity(e, this.props.itemNumber)
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
					)}
				</ExperimentBuckets>
				<Select
					name="language"
					predictive
					onChange={e => this.props.addFeatureSwitch(e, this.props.itemNumber)}
				>
					{this.state.featureSwitches.map((feature, index) => {
						return (
							<Option
								key={index}
								value={feature}
								stringRepresentation={feature}
							/>
						);
					})}
				</Select>
				{this.props.features && (
					<ButtonContainer>
						{this.props.features.map((feature, index) => {
							return (
								<FeatureButtonContainer key={index} title={feature}>
									<Button
										small="true"
										label={truncateName(feature)}
										weight="tertiary"
										onClick={() =>
											this.props.removeFeatureSwitch(
												feature,
												this.props.itemNumber
											)
										}
									/>
								</FeatureButtonContainer>
							);
						})}
					</ButtonContainer>
				)}
			</Card>
		);
	};

	renderDetails = () => {
		return (
			<Card>
				<ExperimentName>Name: {this.props.name}</ExperimentName>
				<ExperimentBuckets>
					# of Buckets: {this.props.buckets}
				</ExperimentBuckets>
				<ButtonContainer>
					{this.props.features.map((feature, index) => {
						return (
							<FeatureButtonContainer key={index} title={feature}>
								<Button
									small="true"
									label={truncateName(feature)}
									weight="tertiary"
								/>
							</FeatureButtonContainer>
						);
					})}
				</ButtonContainer>
			</Card>
		);
	};

	render() {
		if (this.props.create) {
			return this.renderCreate();
		} else {
			return this.renderDetails();
		}
	}
}
