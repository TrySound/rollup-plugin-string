var assert = require("assert");
var { rollup } = require("rollup");
var string = require("../");

process.chdir("test");

function makeBundle(options, stringOptions) {
  options.plugins = [string(stringOptions)];
  return rollup(options);
}

describe("rollup-plugin-string", () => {
  it("should stringify importing template", () => {
    return makeBundle(
      { entry: "fixtures/basic.js" },
      { include: "**/*.html" }
    ).then(bundle => {
      const { code } = bundle.generate({ format: "iife", moduleName: "tpl" });
      new Function("assert", code)(assert);
    });
  });

  it("should output empty sourcemap", () => {
    return makeBundle(
      { entry: "fixtures/basic.js" },
      { include: "**/*.html" }
    ).then(bundle => {
      const { code, map } = bundle.generate({ sourceMap: true });
      assert.ok(code);
      assert.ok(map);
    });
  });

  it("throws when include is not specified", () => {
    assert.throws(() => {
      makeBundle({ entry: "fixtures/basic.js" });
    }, /include option should be specified/);
  });
});
