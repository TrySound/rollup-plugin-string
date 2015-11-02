export default function string (opts = {}) {
	if (!Array.isArray(opts.extensions)) {
		throw Error('rollup-plugin-string: `extensions` option should be an array');
	}

	return {
		transform (code, id) {
			let filter = ext => id.indexOf(ext) === id.length - ext.length;

			if (!opts.extensions.filter(filter).length) {
				return null;
			}

			return {
				code: 'export default ' + JSON.stringify(code) + ';',
				map: { mappings: '' }
			};
		}
	};
}
