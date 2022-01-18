module.exports = {
	removeItem: function (array, item) {
		const frameworks = array.slice();
		const pos = frameworks.indexOf(item);

		if (pos >= 0) {
			frameworks.splice(pos, 1);
		}

		return frameworks;
	}
}
