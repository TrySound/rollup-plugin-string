import { createFilter } from 'rollup-pluginutils';

export default function string(opts = {}) {
	if (!opts.include) {
		throw Error('include option should be specified');
	}

	const filter = createFilter(opts.include, opts.exclude);

	return {
		transform(code, id) {
			if (filter(id)) {
				return {
					code: `export default ${JSON.stringify(code)};`,
					map: { mappings: '' }
				};
			}
		}
	};
}
