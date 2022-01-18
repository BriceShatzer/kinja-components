import { createGlobalStyle } from 'styled-components';

import proxima from './proxima';
import elizabeth from './elizabeth';
import fira from './fira';
import librebaskerville from './librebaskerville';

export default `
	${proxima}
	${elizabeth}
	${fira}
	${librebaskerville}
`;

export const FontFaces = createGlobalStyle`
	${proxima}
	${elizabeth}
	${fira}
	${librebaskerville}
`;