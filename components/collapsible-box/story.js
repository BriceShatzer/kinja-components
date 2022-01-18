/* @flow */

import * as React from 'react';
import {
	select,
	storiesOf,
	withDocs
} from 'base-storybook';
import styled from 'styled-components';
import { noop } from 'lodash';

import CollapsibleBox from './collapsible-box';
import Radio from 'kinja-components/components/form/radio';
import RadioGroup from 'kinja-components/components/form/radio-group';
import Flame from 'kinja-components/components/icon19/Flame';
import Image from 'kinja-components/components/elements/image';
import README from './README.md';

storiesOf('3. Elements|Collapsible Box', module)
	.addDecorator(withDocs(README))
	.add('Collapsible Box', () => {
		const Container = styled.div`
			width: 100%;
			max-width: 301px;
			margin: 0 auto;
		`;

		const renderInside = select('Content Inside', ['text', 'radio', 'image'], 'radio');

		return (
			<Container>
				{renderInside === 'radio' &&
					<CollapsibleBox
						icon={<Flame />}
						title="1980s Sports Cars"
					>
						<RadioGroup
							name="Cars"
							onChange={noop}
						>
							<Radio label="Ferrari F40" checked  value="Ferrari F40"/>
							<Radio label="Porsche 959" value="Porsche 959"/>
							<Radio label="Nissan R32 Skyline GT-R" value="Nissan R32 Skyline GT-R" />
							<Radio label="Ford Thunderbird Super Coupe" value="Ford Thunderbird Super Coupe"/>
						</RadioGroup>
					</CollapsibleBox>
				}

				{renderInside === 'text' &&
					<CollapsibleBox
						icon={<Flame />}
						title="Call of Duty: Modern Warfare"
					>
						<span>Previews for the game have indicated that the new Modern Warfare will attempt to go beyond visual callbacks.</span>
					</CollapsibleBox>
				}

				{renderInside === 'image' &&
					<CollapsibleBox
						icon={<Flame />}
						title="COD: Modern Warfare"
					>
						<Image id="bwzkuqvhcw6feobrn3z3" />
					</CollapsibleBox>
				}
			</Container>
		);
	});
