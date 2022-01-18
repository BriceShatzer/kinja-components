import React from 'react';

/*
	This needs to be imported by FeedStream, so it's easier to mock in tests.
	It could be replaced by the recent video component itself at some point.
*/
export const RecentVideoContainer = () => (<div className="instream-native-video--frontpage initialized"></div>);
