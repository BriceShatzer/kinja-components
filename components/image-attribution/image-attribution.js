/* @flow */

import flatten from 'lodash/flatten';
import uniqBy from 'lodash/uniqBy';
import groupBy from 'lodash/groupBy';

import * as React from 'react';

import { intersperse } from '../../utils';
import { TextNode } from 'postbody/InlineNode';
import InlineNodes from '../postbody/inline-node';

import createTranslate from '../translator';
import translations from './translations';

import type { InlineNode } from 'postbody/InlineNode';
import type { ImageAttributionType } from 'postbody/Image';
import type { Locale } from 'kinja-magma/models/Locale';

type TokenProps = {
	children: React.Node,
	className?: string,
	tokenize: boolean
}
/**
 * Wrap children in a span if tokenize is true.
 * If wrapping applies all additional props to the span.
 */
function Token(props: TokenProps): React.Node {
	const { children, tokenize, ...rest } = props;
	return tokenize ? <span {...rest}>{children}</span> : children;
}

type AttributionItemProps = {
	credit: Array<InlineNode>,
	source: Array<InlineNode>,
	tokenize: boolean
};
/**
 * Render a single attribution with tokens if tokenize is true.
 */
function AttributionItem({ credit, source, tokenize }: AttributionItemProps): React.Node {
	if (credit.length && source.length) {
		const wrappedSource: Array<InlineNode> = [new TextNode(' (')].concat(source, new TextNode(')'));
		return <React.Fragment>
			<Token className="credit" tokenize={tokenize}>
				<InlineNodes nodes={credit} renderer={tokenize ? 'editor' : undefined} />
			</Token>
			<Token className="source" tokenize={tokenize}>
				<InlineNodes nodes={wrappedSource} renderer={tokenize ? 'editor' : undefined} />
			</Token>
		</React.Fragment>;
	}

	if (credit.length && !source.length) {
		return <Token className="credit" tokenize={tokenize}>
			<InlineNodes nodes={credit} renderer={tokenize ? 'editor' : undefined} />
		</Token>;
	}

	if (!credit.length && source.length) {
		return <Token className="source" tokenize={tokenize}>
			<InlineNodes nodes={source} renderer={tokenize ? 'editor' : undefined} />
		</Token>;
	}

	return null;
}

type Props = {
	attributions: Array<ImageAttributionType>,
	// Render a tokenized output with spans. Editor needs this to be able to parse output.
	tokenize?: boolean,
	language?: Locale
};

/**
 * Renders the copyright info, which is a combination of the credits and sources of the image.
 */
export default function ImageAttributionComponent({ attributions, tokenize = false, language }: Props) {
	const translate = createTranslate(translations, language);
	const groupedAttributions = groupBy(attributions, 'label');
	const attributionLabels = Object.keys(groupedAttributions);

	const labels = {
		Graphic: translate('Graphic'),
		Gif: translate('Gif'),
		Illustration: translate('Illustration'),
		Image: translate('Image'),
		Photo: translate('Photo'),
		Screenshot: translate('Screenshot')
	};

	const copyrights = attributionLabels.map(label => {
		const group = groupedAttributions[label];
		const copyrights =
			group.reduce((memo, { credit, source }, index) => {
				if (credit.length || source.length) {
					memo.push(
						<Token className="item" tokenize={tokenize} key={index.toString()}>
							<AttributionItem credit={credit} source={source} key={index.toString()} tokenize={tokenize} />
						</Token>
					);
				}
				return memo;
			}, []);

		return (
			<React.Fragment key={label.toLowerCase()}>
				<Token data-label={label} tokenize={tokenize}>
					{labels[label]}: {intersperse(copyrights, ', ')}
				</Token>
			</React.Fragment>
		);
	});

	return <React.Fragment>{intersperse(copyrights, ', ')}</React.Fragment>;
}

/**
 * Renders the licensor info, which is a combination of the sources o the image.
 */
export function Licensors({ attributions }: Props): Array<React.Node> {
	const sources = uniqBy(flatten(attributions.map(({ source }) => source)), 'value');
	const renderedSources = sources.map((source, index) => <InlineNodes key={index} nodes={[source]} />); // eslint-disable-line react/no-array-index-key

	return intersperse(renderedSources, ', ');
}
