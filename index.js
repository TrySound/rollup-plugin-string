import { createFilter } from 'rollup-pluginutils';

export default function string(opts = {}) {
	if (!opts.include) {
		throw Error('include option should be specified');
	}

	const filter = createFilter(opts.include, opts.exclude);

	return {
		name: 'string',

		transform(code, id) {
			if (filter(id)) {
                code = opts.process ? opts.process(code, id) : code;
				return {
					code: `export default ${JSON.stringify(code)};`,
					map: { mappings: '' }
				};
			}
		}
	};
}
