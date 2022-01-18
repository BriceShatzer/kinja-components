/* @flow */

import * as React from 'react';
import {
	storiesOf,
	blogGroup
} from 'base-storybook';

import Theme from '../theme';
import { Main } from '../page-layout';

import { MidBannerAd } from './ads';

storiesOf('3. Elements|Ads', module)
	.add('MidBannerAd', () => (
		<Theme blog={blogGroup()}>
			<Main>
				<p>Toffee caramels bonbon. Jelly-o I love gummies I love oat cake wafer I love danish gingerbread.</p>
				<MidBannerAd />
				<p>Gummi bears cake donut jelly chocolate bar jelly-o I love.</p>
			</Main>
		</Theme>
	));
