/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import InlineNodes from '../inline-node';
import { EnsureDefaultTheme } from '../../theme';
import type { RoundupData } from 'postbody/blockNodes/Roundup';
import { KinjaRoundupClick } from '../../stream/analytics';

const RoundupItems = styled.span`
	font-family: ${props => props.theme.typography.serif.fontFamily};
`;

const Blog = styled.strong`
	color: #000;
`;

const RoundupComponent = (props: RoundupData) => {
	const len = props.items.length;
	const items = props.items.map((item, i) => {
		if (len === i + 1) {
			return (
				<EnsureDefaultTheme key={item.link.reference}>
					<RoundupItems key={item.link.reference}>
						<Blog><InlineNodes nodes={[item.blog]} /></Blog>
						&nbsp;
						<span><InlineNodes nodes={[item.link]} events={[KinjaRoundupClick(item.link.reference)]}  /></span>
					</RoundupItems>
				</EnsureDefaultTheme>
			);
		} else {
			return (
				<EnsureDefaultTheme key={item.link.reference}>
					<RoundupItems key={item.link.reference}>
						<Blog><InlineNodes nodes={[item.blog]} /></Blog>
						&nbsp;
						<span><InlineNodes nodes={[item.link]} events={[KinjaRoundupClick(item.link.reference)]} /></span>
						&nbsp;|&nbsp;
					</RoundupItems>
				</EnsureDefaultTheme>
			);
		}
	});
	return <div>{items}</div>;
};

export default RoundupComponent;
