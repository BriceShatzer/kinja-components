const autoplays = new Map();

export const autoplay = playerInstance => {
	const playAttempt = playerInstance.play();

	if (!autoplays.has(playerInstance)) {
		autoplays.set(
			playerInstance,
			new Promise(resolve =>
				playAttempt
					.then(() => resolve(true))
					.catch(() => resolve(false))
			)
		);
	}

	return playAttempt;
};

export const isAutoplay = playerInstance =>
	autoplays.get(playerInstance);
