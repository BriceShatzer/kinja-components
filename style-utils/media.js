import { css } from 'styled-components';

import { smallOnly,
	mediumOnly,
	mediumDown,
	mediumUp,
	largeOnly,
	largeDown,
	largeUp,
	xlargeOnly,
	xlargeDown,
	xlargeUp,
	xxlargeOnly,
	xxlargeDown,
	xxlargeUp,
	xxxlargeUp
} from './breakpoints';

export default {

	// Layout breakpoints

	smallOnly: (...args) => css`
		@media only screen and ${smallOnly} { /* <= 597 */
			${css(...args)}
		}
	`,
	mediumOnly: (...args) => css`
		@media only screen and ${mediumOnly} { /* 598-799 */
			${css(...args)}
		}
	`,
	mediumDown: (...args) => css`
		@media only screen and ${mediumDown} { /* <=799 */
			${css(...args)}
		}
	`,
	mediumUp: (...args) => css`
		@media only screen and ${mediumUp} { /* >= 598 */
			${css(...args)}
		}
	`,
	largeOnly: (...args) => css`
		@media only screen and ${largeOnly} { /* 800-1019 */
			${css(...args)}
		}
	`,
	largeDown: (...args) => css`
		@media only screen and ${largeDown} { /* <= 1019 */
			${css(...args)}
		}
	`,
	largeUp: (...args) => css`
		@media only screen and ${largeUp} { /* >= 800 */
			${css(...args)}
		}
	`,
	xlargeOnly: (...args) => css`
		@media only screen and ${xlargeOnly} { /* 1020 - 1363 */
			${css(...args)}
		}
	`,
	xlargeDown: (...args) => css`
		@media only screen and ${xlargeDown} { /* <= 1336 */
			${css(...args)}
		}
	`,
	xlargeUp: (...args) => css`
		@media only screen and ${xlargeUp} { /* >= 1020 */
			${css(...args)}
		}
	`,
	xxlargeOnly: (...args) => css`
		@media only screen and ${xxlargeOnly} { /* 1364 - 1639 */
			${css(...args)}
		}
	`,
	xxlargeDown: (...args) => css`
		@media only screen and ${xxlargeDown} { /* <= 1639 */
			${css(...args)}
		}
	`,
	xxlargeUp: (...args) => css`
		@media only screen and ${xxlargeUp} { /* >= 1364 */
			${css(...args)}
		}
	`,
	xxxlargeUp: (...args) => css`
		@media only screen and ${xxxlargeUp} { /* >= 1640 */
			${css(...args)}
		}
	`
};