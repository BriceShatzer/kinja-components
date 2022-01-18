// @flow

export function setItem(keyName: string, keyValue: string) {
	window.localStorage.setItem(keyName, keyValue);
}

export function getItem(keyName: string) {
	return window.localStorage.getItem(keyName);
}

export function removeItem(keyName: string) {
	window.localStorage.removeItem(keyName);
}