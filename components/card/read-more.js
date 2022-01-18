/* @flow */

import * as React from 'react';
import Permalink from './permalink';

type Props = {
	title: string,
	href: string
};

const ReadMore = (props: Props) => {
	const { title = 'Continue Reading', href } = props;
	return (<Permalink title={title} href={href} withPermalink>{title}</Permalink>);
};

export default ReadMore;
