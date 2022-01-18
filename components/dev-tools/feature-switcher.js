// @flow //
import * as React from 'react';
import styled from 'styled-components';
import { Select } from '../form';
import { ToggleOption } from '../form/select';

export type FeatureSwitch = {
	name: string,
	isOn: boolean
};

type Props = {
	onFeatureSwitchChange: FeatureSwitch => void,
	featureSwitches: Array<FeatureSwitch>
};

const FeatureSwitchContainer = styled.div`
	margin-bottom: 32px;
	max-width: 284px;

	.field {
		margin-bottom: 0;
	}

	ul {
		height: 30vh;
		max-height: 200px;
	}
`;

const Label = styled.label`
	margin-bottom: 10px;
`;

const FeatureSwitcher = (props: Props) => {
	const { onFeatureSwitchChange, featureSwitches } = props;
	return (
		<FeatureSwitchContainer>
			<Label for="featureSwitches">Activate/deactivate feature switches</Label>
			<Select name="featureSwitches" onChange={onFeatureSwitchChange} predictive>
				{featureSwitches
					.sort()
					.map((featureSwitch: FeatureSwitch) => (
						<ToggleOption key={featureSwitch.name} checked={featureSwitch.isOn} stringRepresentation={featureSwitch.name} value={featureSwitch} />
					))}
			</Select>
		</FeatureSwitchContainer>
	);
};

export default FeatureSwitcher;
