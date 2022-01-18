/* @flow */

import Lunchbox from './lunchbox';
import LunchboxImage from './lunchbox-image';
import OnScreen from '../../hoc/on-screen';
export default Lunchbox;

const AnimatedLunchbox = OnScreen(Lunchbox, { offset: 400, once: true, partialVisibility: false });

export { LunchboxImage, AnimatedLunchbox };
