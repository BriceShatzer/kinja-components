/* @flow */
import * as React from 'react';
import Link from '../../elements/link';
import InlineNodes from '../../postbody/inline-node';
import Button from '../../buttons';
import type { LunchboxLinkProps } from '../types';

export default function LunchboxLink({ link, blogId }: LunchboxLinkProps) {
	return (
		<Link
			href={blogId ? `${link.reference}?customKinja=${blogId}` : link.reference}
			target={link.target}
			events={[['Special Sections', 'Post click', `${link.reference}`]]}>
			<Button label={<InlineNodes nodes={link.value} />} weight={'tertiary'} />
		</Link>
	);
}
