const { createFilter } = require("rollup-pluginutils");

function string(opts = {}) {
  if (!opts.include) {
    throw Error("include option should be specified");
  }

  const filter = createFilter(opts.include, opts.exclude, opts.modify);

  return {
    name: "string",

    transform(code, id) {
      if (filter(id)) {
        code = JSON.stringify(code);
        code = opts.modify ? opts.modify(code) : code;
        return {
          code: `export default ${code};`,
          map: { mappings: "" }
        };
      }
    }
  };
}

exports.string = string;
