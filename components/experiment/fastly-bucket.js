import React, { Component } from 'react';
import styled from 'styled-components';

import { Loading } from 'kinja-components/components/elements/loader';

import { getExperimentById } from '../../../../kinja-magma/api/experiments';

const FastlyLabel = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	width: ${props => props.width}px;
	color: ${props => props.color};
`;

const BucketListItemContainer = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	border-bottom: 1px solid gray;
	width: 100%;
	min-height: 40px;
`;

const formatDateTime = num => {
	const dateInput = new Date(num);
	const dateOutput = dateInput.toLocaleDateString('en-US');
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

const retrieveStartTime = state => {
	if (state.experiment && state.experiment.experiment && state.experiment.experiment.startTimeMillis) {
		return formatDateTime(state.experiment.experiment.startTimeMillis);
	} else {
		return 'n/a';
	}
};

class FastlyBucket extends Component {
	state = {
		experiment: [],
		loading: true
	}

	async componentDidMount() {
		if (this.props.getMoreInfo) {
			try {
				if (this.props.bucket[1].experimentId !== 'None') {
					const experiment = await getExperimentById(this.props.token, this.props.bucket[1].experimentId);
					console.log('SUCCESS!', experiment);
					this.setState({ experiment, loading: false });
				} else {
					const experiment = {
						'experiment': {
							'name': this.props.bucket[1].gaExperimentId,
							'startTimeMillis': null
						}
					};
					this.setState({ experiment, loading: false });
				}
			} catch (e) {
				console.log(e);
			}
		} else {
			this.setState({ loading: false });
		}
	}

	render() {
		return (
			<BucketListItemContainer>
				<FastlyLabel width={110} color={this.props.getMoreInfo ? 'black' : 'green'}>
					{this.props.bucket[0]}
				</FastlyLabel>
				{this.state.loading && <Loading />}
				{!this.state.loading && <><FastlyLabel width={210} color={this.props.getMoreInfo ? 'black' : 'green'}>
					{this.props.getMoreInfo ? this.state.experiment.experiment.name : 'AVAILABLE'}
				</FastlyLabel>
					<FastlyLabel width={110} color={'black'}>
						{this.props.getMoreInfo ? `Variant ${this.props.bucket[1].variant}` : null}
					</FastlyLabel>
					<FastlyLabel width={180} color={'black'}>
						{this.props.getMoreInfo ? retrieveStartTime(this.state) : null}
					</FastlyLabel></>
				}
			</BucketListItemContainer>
		);
	}
}

export default FastlyBucket;
