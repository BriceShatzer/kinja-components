// @flow
import type { Video } from 'module/video/videoRequest';

export default (video: Video) => `kinjavideo-${video.id}`;