import { createFilter } from 'rollup-pluginutils';

function string(opts) {
	if ( opts === void 0 ) opts = {};

	if (!opts.include) {
		throw Error('include option should be specified');
	}

	var filter = createFilter(opts.include, opts.exclude);

	return {
		name: 'string',

		transform: function transform(code, id) {
			if (filter(id)) {
                code = opts.process ? opts.process(code, id) : code;
				return {
					code: ("export default " + (JSON.stringify(code)) + ";"),
					map: { mappings: '' }
				};
			}
		}
	};
}

export default string;