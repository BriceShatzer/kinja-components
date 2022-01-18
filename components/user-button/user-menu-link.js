/* @flow */
import * as React from 'react';
import { Image } from '../elements/image';
import styled from 'styled-components';
import media from '../../style-utils/media';
import EnsureDefaultTheme from '../theme';
import type { ImageFormat } from 'postbody/Image';

export type Props = {|
	avatar?: {
		id: string,
		format: ImageFormat
	},
	href?: string,
	icon?: React.Node,
	label: React.Node,
	onClick?: () => mixed,
	shouldRender?: boolean
|};


const LinkElement = styled.li`
	align-items: center;
	display: flex;
	-webkit-tap-highlight-color: rgba(0, 0, 0, 0.08);

	svg {
		min-width: 18px;
	}

	/* override .f-dropdown li a */
	&& > a {
		display: flex;
		align-items: center;
		min-width: 0;
	}
`;

const Label = styled.div`
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;

	span {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
`;

const LinkElementUserMenu = styled(LinkElement)`
	img,
	svg {
		margin-right: 1em;
	}

	svg {
		opacity: 1;
	}

	a {
		padding-top: 12px;
		padding-bottom: 12px;
		flex-grow: 1;
		color: ${props => props.theme.color.darksmoke};
		text-decoration: none;
		font-size: 18px;
		line-height: 1rem;

		${media.mediumDown`
			padding-top: 15px;
			padding-bottom: 15px;
		`}

		&:hover {
			text-decoration: none;
			color: ${props => props.theme.color.darksmoke};
		}
	}

	@media (hover: hover) {
		&:hover {
			background-color: ${props => props.theme.color.whitesmoke};
		}
	}

	${Label} {
		max-width: 100%;
	}
`;

const UserMenuLink = (props: Props) => {
	const { href, icon, avatar, label, onClick, shouldRender } = props;

	return (typeof shouldRender === 'undefined' || shouldRender) ? (
		<EnsureDefaultTheme>
			<LinkElementUserMenu>
				<a href={href} onClick={onClick} data-label={label}>
					{avatar ? (
						<Image
							id={avatar.id}
							transform='AvatarSmallAuto'
							format={avatar.format}
							alt={String(label)}
						/>
					) : icon}
					<Label>
						{label}
					</Label>
				</a>
			</LinkElementUserMenu>
		</EnsureDefaultTheme>
	) : null;
};

export default UserMenuLink;