const { createFilter } = require("rollup-pluginutils");

function string(opts = {}) {
  if (!opts.include) {
    throw Error("include option should be specified");
  }

  const filter = createFilter(opts.include, opts.exclude);

  return {
    name: "string",

    transform(code, id) {
      if (filter(id)) {
        code = JSON.stringify(code);
        if (opts.replacePattern && opts.replacement) {
          code = code.replace(opts.replacePattern, opts.replacement);
        }
        return {
          code: `export default ${code};`,
          map: { mappings: "" }
        };
      }
    }
  };
}

exports.string = string;
