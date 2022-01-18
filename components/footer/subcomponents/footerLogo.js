/* @flow */

import React from 'react';
import styled from 'styled-components';
import BlogLogo from '../../blog-logo';
import { EnsureDefaultTheme } from '../../theme';

const FooterLogoWrap = styled.div`
	color: white;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const FooterLogo = ({
	blogGroup
}: {
	blogGroup?: string
}) => (
	blogGroup ? (
		<EnsureDefaultTheme>
			<FooterLogoWrap className="js_footer-logo" name={blogGroup}>
				<BlogLogo name={blogGroup} monochrome scale={0.6} />
			</FooterLogoWrap>
		</EnsureDefaultTheme>
	) : null
);

export default FooterLogo;
