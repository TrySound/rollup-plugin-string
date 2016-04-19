const rollupPluginutils = require('rollup-pluginutils');

export default function string (opts = {}) {
	if (!Array.isArray(opts.extensions)) {
		throw Error('rollup-plugin-string: `extensions` option should be an array');
	}

	return {
		transform (code, id) {
			let extensionFilter = ext => id.indexOf(ext) === id.length - ext.length;

			if (!opts.extensions.filter(extensionFilter).length) {
				return null;
			}

			let fileFilter = rollupPluginutils.createFilter(opts.include, opts.exclude || 'node_modules/**');

			if (!fileFilter(id)) {
				return null;
			}

			return {
				code: 'export default ' + JSON.stringify(code) + ';',
				map: { mappings: '' }
			};
		}
	};
}
