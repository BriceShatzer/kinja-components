/* @flow */

import type { CurationProps } from 'kinja-components/components/curation/curation';

/* Checks to a see if a a set of curation properties are valid
 * and will result in something being render in the curation module
 */
export default function hasValidCuration(curationProps?: ?CurationProps): boolean {
	return Boolean(curationProps &&
		curationProps.layoutProps.gridConfig &&
		curationProps.layoutProps.gridConfig.layout &&
		curationProps.layoutProps.gridConfig.layout.cardinality > 1);
}