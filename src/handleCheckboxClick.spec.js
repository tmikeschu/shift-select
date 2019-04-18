const test = require("tape");
const { makeWithMethod } = require("./testUtils");
const handleCheckboxClick = require("./handleCheckboxClick");

const withMethod = makeWithMethod(module);

test(withMethod("does somethign"), t => {
  t.plan(1);
  handleCheckboxClick({});
  t.equal(1, 0);
});
