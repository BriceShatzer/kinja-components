/* @flow */

import * as React from 'react';
import styled from 'styled-components';

type Props = {
	children?: *,
	className?: string,
	href: string,
	title?: string,
	unlink?: boolean,
	flexWrapper?: boolean,
	ga?: string,
	gaMobile?: string,
	target?: string
}

const FlexWrapper = styled.section`
	display: ${props => props.flexWrapper ? 'flex' : 'block'};
	a {
		display: block;
	}
	a:hover {
		color: ${props => props.theme.color.black};
	}
`;

const renderSpanOnly = ({ className, title, children }) => {
	return (
		<span className={className} title={title}>{children}</span>
	);
};

const renderLinkWrapper = ({ flexWrapper, className, href, title, target, ga, gaMobile, children }) => {
	return (
		<FlexWrapper className={'content-meta__headline__wrapper'} flexWrapper={flexWrapper}>
			<a className={className} href={href} title={title} target={target} data-ga={ga} data-gamobile={gaMobile}>{children}</a>
		</FlexWrapper>
	);
};

class Permalink extends React.Component<Props> {
	render() {
		const { unlink,
			className,
			title,
			children,
			href,
			flexWrapper,
			ga,
			gaMobile,
			target
		} = this.props;

		return unlink ? renderSpanOnly({ className, title, children })
			: renderLinkWrapper({ flexWrapper, className, href, title, target, ga, gaMobile, children });
	}
}

export default Permalink;
