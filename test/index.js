const assert = require("assert");
const { rollup } = require("rollup");
const { string } = require("../");

process.chdir("test");

describe("rollup-plugin-string", () => {
  it("should stringify importing template", () => {
    return rollup({
      input: "fixtures/basic.js",
      plugins: [string({ include: "**/*.html" })]
    })
      .then(bundle => bundle.generate({ format: "iife", moduleName: "tpl" }))
      .then(({ code }) => {
        new Function("assert", code)(assert);
      });
  });

  it("should output empty sourcemap", () => {
    return rollup({
      input: "fixtures/basic.js",
      plugins: [string({ include: "**/*.html" })]
    })
      .then(bundle => bundle.generate({ format: "esm", sourceMap: true }))
      .then(({ output }) => {
        const [{ code, map }] = output;
        assert.ok(code);
        assert.ok(map == null);
      });
  });

  it("throws when include is not specified", () => {
    assert.throws(() => {
      rollup({
        input: "fixtures/basic.js",
        plugins: [string()]
      });
    }, /include option should be specified/);
  });
});
