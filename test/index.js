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
      .then(({ output }) => {
        assert.equal(output[0].code.match(/(?<=tpl = ").+?(?=;)/g),
          `<section class=\\"section\\">\\n\\t<article class='article'>Article 1</article>` + 
          `\\n\\t<article class='article'>Article 2</article>\\n</section>\\n"`);
      });
  });

  it("should modify importing template", () => {
    return rollup({
      input: "fixtures/basic.js",
      plugins: [string({ include: "**/*.html", modify: s => s.replace(/\\n+(\\t)*/g, '') })]
    })
      .then(bundle => bundle.generate({ format: "iife", moduleName: "tpl" }))
      .then(({ output }) => {
        assert.equal(output[0].code.match(/(?<=tpl = ").+?(?=;)/g),
          `<section class=\\"section\\"><article class='article'>Article 1</article>` + 
          `<article class='article'>Article 2</article></section>"`);
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
