// @flow

import * as React from 'react';
import styled, { css } from 'styled-components';

import { EnsureDefaultTheme } from 'kinja-components/components/theme';
import media from 'kinja-components/style-utils/media';
import Toggle from 'kinja-components/components/hoc/toggle';
import Icon19, { IconWrapper } from 'kinja-components/components/icon19/icon19';
import ChevronDown from 'kinja-components/components/icon19/ChevronDown';
import ChevronUp from 'kinja-components/components/icon19/ChevronUp';

import type { ToggleInjectedProps } from 'kinja-components/components/hoc/toggle';


const Title = styled.div`
	font-size: 20px;
	line-height: 24px;
`;

const TitleWrapper = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 17px;
	user-select: none;
	cursor: pointer;

	${IconWrapper}:not(:last-of-type) {
		margin-right: 5px;
	}

	${IconWrapper}:last-of-type {
		margin-left: auto;
	}
`;

export const ContentWrapper = styled.div`
	overflow: hidden;
	transition: height 0.2s ease-out;
`;

export const Container = styled.div`
	width: 100%;

	${({ isOpen }) => !isOpen && css`
		${TitleWrapper} {
			margin-bottom: 0;
		}

		${ContentWrapper} {
			height: 0;
		}
	`}

	${media.mediumUp`
		padding: 16px;
		border: 1px solid ${({ theme }) => theme.color.midgray};
	`}
`;


type Props = {
	children: any,
	icon: React.Element<typeof Icon19>,
	isStatic?: boolean,
	title: string
};

const ToggleIcon = ({ isOpen }: { isOpen: boolean }) => {
	return isOpen ? <ChevronUp /> : <ChevronDown />;
};

function CollapsibleBox({
	children,
	icon,
	isOpen,
	isStatic,
	title,
	toggle
}: Props & ToggleInjectedProps) {

	return (
		<EnsureDefaultTheme>
			<Container isOpen={isOpen}>
				<TitleWrapper {...!isStatic ? { onClick: toggle } : null}>
					{icon && icon}
					<Title>{title}</Title>
					{!isStatic && <ToggleIcon isOpen={isOpen} />}
				</TitleWrapper>
				<ContentWrapper>
					{children}
				</ContentWrapper>
			</Container>
		</EnsureDefaultTheme>
	);
}

export default Toggle(CollapsibleBox, { isOutsideClickEnabled: false, isDefaultOpen: true });
