import styled from 'styled-components';

export const StickyContainer = styled.div`
	min-height: ${props => props.minHeight || 0}px;
`;

export const Sticky = styled.div`
	position: sticky;
	top: 0;
	display: flex;
	justify-content: center;
`;