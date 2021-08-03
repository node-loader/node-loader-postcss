import assert from "assert";

describe(`basic http / https tests`, () => {
  it(`can load a css file`, async () => {
    const ns = await import("./fixtures/main.css");
    assert.ok(ns.default);
    assert.equal(typeof ns.default, "string");
    assert.equal(ns.default.includes("yoshi"), true);
  });
});
