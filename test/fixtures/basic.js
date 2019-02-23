import tpl from "./templates/tpl.html";

assert.equal(typeof tpl, "string");
assert.notEqual(tpl.indexOf("section"), -1);
assert.notEqual(tpl.indexOf("article"), -1);
