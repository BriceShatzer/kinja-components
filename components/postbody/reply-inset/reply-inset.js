// @flow

import * as React from 'react';
import type Link from 'kinja-magma/models/Link';

import {
	withPlatform,
	type PlatformInjectedProps
} from '../../hoc/context';

type Props = {
	link: Link,
	originalLink: string,
	insetPrefix: string
} & PlatformInjectedProps;

function ReplyInset(props: Props) {
	const { link, originalLink, insetPrefix, platform } = props;
	const postId: ?string = link.meta && link.meta.postId;
	if (postId) {
		const src = `${insetPrefix}/embed/thread/${postId}`;

		if (platform === 'amp') {
			return (
				<p>
					<amp-iframe
						src={src}
						width={640}
						height={350}
						scrolling="no"
						layout="responsive"
						sandbox="allow-scripts allow-same-origin allow-popups"
						resizable=""
					>
						<amp-img
							src="https://i.kinja-img.com/gawker-media/image/upload/f5f5f5_f3ytsm.png"
							width="139"
							height="107"
							alt="Embed preview placeholder"
							placeholder=''
							layout="responsive"
						/>
						<span overflow='' tabIndex="0" role="button" aria-label="Read more">Read more</span>
					</amp-iframe>
				</p>
			);
		}

		return (
			<p>
				<iframe src={src} height={350} width={640} scrolling="no" />
			</p>
		);
	}

	return (
		<p>
			<a href={originalLink}>{originalLink}</a>
		</p>
	);
}

export default withPlatform(ReplyInset);
