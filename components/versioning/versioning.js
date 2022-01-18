// @flow
import React, {Component} from 'react';
import Version from './version';
import CurrentVersion from './current-version';
import RecoverWarning from './recoverWarning';
import type {RawPostVersionList, PostVersionList, VersionId} from './types';
import { map } from 'lodash';
import styled, {css} from 'styled-components';
import Button from '../buttons';
import { EnsureDefaultTheme } from '../theme';

type Props = {
	id: number,
	headline: string,
	onCancel: Event => void,
	fetchVersions: (?number) => Promise<{}>,
	recoverVersion: ?VersionId => void,
	currentUser: string,
	paginator: {
		pageNumber: number,
		pageCount: number,
		isLastPage: boolean,
		collection: RawPostVersionList,
		goToPage: (?number) => Promise<{}>
	}
};

type State = {
	id: ?VersionId,
	versions: PostVersionList,
	warningShown: boolean
};

const Wrapper = styled.div`
	text-align: center;
`;

const Title = styled.h1`
	font-size: 24px;
	line-height: 29px;
	font-weight: normal;
`;

const Headline = styled.p`
	font-weight: bold;
`;

const VersionList = styled.ul`
	margin: 24px 0;
`;

const BottomRow = styled.div`
	align-items: center;
`;

const CancelWrapper = styled.div`
	text-align: center;

	${props => props.leftAligned && css`
		text-align: left;
	`}
`;

const Pagination = styled.div`
	text-align: right;
`;

const PaginationNotLink = styled.span`
	color: ${props => props.theme.color.gray};
	font-size: 14px;
	line-height: 17px;
`;

const PaginationLink = styled(PaginationNotLink)`
	color: ${props => props.theme.color.primary};
	font-weight: bold;
	cursor: pointer;

	${props => props.disabled && css`
		color: ${props => props.theme.color.midgray};
		cursor: not-allowed;
	`}
`;

const PaginationDivider = styled(PaginationNotLink)`
	margin: 0 10px;
`;

export default class Versioning extends Component<Props, State> {
	state: State = {
		id: null,
		versions: [],
		warningShown: false
	}

	componentDidMount() {
		this.props.paginator.goToPage(1).then(() => {
			this.transformVersions();
			window.ga('send', 'event', 'Post Editor', 'Open Version History Modal');
		});
	}

	transformVersions = () => {
		const versions = map(
			this.props.paginator.collection,
			(versionBody, key) => Object.assign({versionId: key}, versionBody.meta || {}, versionBody.data || {})
		).reverse();

		this.setState({versions});
	}

	showWarning = (id: VersionId) => {
		this.setState({id, warningShown: true});
	}

	hideWarning = () => {
		this.setState({warningShown: false});
	}

	recoverVersion = () => {
		this.props.recoverVersion(this.state.id);
	}

	prev = () => {
		this.props.fetchVersions(-1).then(() => {
			this.transformVersions();
			window.ga('send', 'event', 'Post Editor', 'Versioning - Older click', `${this.props.paginator.pageNumber}`);
		});
	}

	next = () => {
		this.props.fetchVersions(1).then(() => {
			this.transformVersions();
			window.ga('send', 'event', 'Post Editor', 'Versioning - Newer click', `${this.props.paginator.pageNumber}`);
		});
	}

	render() {
		const {headline, onCancel, currentUser, paginator} = this.props;
		const {versions, warningShown, id} = this.state;
		const {prev, next} = this;
		const {pageNumber, pageCount, isLastPage} = paginator;

		if (warningShown && id) {
			return (
				<RecoverWarning onCancel={this.hideWarning} onProceed={this.recoverVersion}/>
			);
		}

		return (
			<EnsureDefaultTheme>
				<Wrapper>
					{/* TODO i18n */}
					<Title>Versions</Title>
					<p>Recovering a past version won&apos;t delete other saved versions.</p>
					{/* At this time, it doesn't seem like the EditorPostModel holds the headline as anything other than a string. */}
					{/* If we start to use InlineNodes, we have to use the appropriate method here to extract the headline HTML. */}
					{headline && <Headline dangerouslySetInnerHTML={{ __html: `“${headline}”`}}/>}
					<VersionList>
						{versions && versions.length
							? versions.map((props, index) => {
								if (props.versionId === 'current') {
									return <CurrentVersion key={props.versionId} currentUser={currentUser}/>;
								}

								return <Version {...props} key={props.versionId} recoverVersion={this.showWarning} isLast={index === versions.length - 1}/>;
							})
							: 'Loading...'
						}
					</VersionList>
					<BottomRow className="flex-row flex-row--align-justify">
						<CancelWrapper className="flex-row__column" leftAligned={paginator.pageCount > 1}>
							<Button label="Cancel" weight="tertiary" small onClick={onCancel}/>
						</CancelWrapper>
						{pageCount > 1 && (
							<Pagination className="flex-row__column">
								<PaginationLink onClick={pageNumber !== 1 ? next : undefined} disabled={pageNumber === 1}>Newer</PaginationLink>
								<PaginationDivider>|</PaginationDivider>
								<PaginationNotLink>Page {pageNumber} of {pageCount}</PaginationNotLink>
								<PaginationDivider>|</PaginationDivider>
								<PaginationLink onClick={!isLastPage ? prev : undefined} disabled={isLastPage}>Older</PaginationLink>
							</Pagination>
						)}
					</BottomRow>
				</Wrapper>
			</EnsureDefaultTheme>
		);
	}
}
