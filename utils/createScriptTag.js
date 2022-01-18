// @flow
const scripts = {};

export default function (src: string) {
	if (!scripts[src]) {
		const promise = new Promise((resolve, reject) => {
			const script = Object.assign(document.createElement('script'), {
				type: 'text/javascript',
				async: true,
				onload: resolve,
				onerror: reject,
				src
			});

			if (document.body) {
				document.body.appendChild(script);
			}
		});

		scripts[src] = promise;
	}

	return scripts[src];
}