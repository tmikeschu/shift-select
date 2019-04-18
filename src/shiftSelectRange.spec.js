const test = require("tape");
const { makeWithMethod } = require("./testUtils");
const shiftSelectRange = require("./shiftSelectRange");

const withMethod = makeWithMethod(module);

const neverDie = "Goonies never say die";
const andy = "Andy, you Goonie!";
const items = ["rocky road", "hey", "you", "guys", "baby ruth", neverDie, andy];

test(
  withMethod(
    "finds the inner range based on the last selected value and the current value",
  ),
  t => {
    t.plan(1);
    const actual = shiftSelectRange({
      items,
      item: "guys",
      lastItem: "hey",
      isChecked: true,
      selectedItems: ["hey"],
    });

    const expected = ["hey", "you", "guys"];
    t.same(actual, expected);
  },
);

test("finds the inner range based on the last *unselected* value and the current value", t => {
  t.plan(1);
  const actual = shiftSelectRange({
    items,
    item: "hey",
    lastItem: "guys",
    isChecked: false,
    selectedItems: ["hey", "you"],
  });

  const expected = [];
  t.same(actual, expected);
});

test("leaves other selected ranges alone when selecting", t => {
  t.plan(1);
  const actual = shiftSelectRange({
    items,
    item: "Andy, you Goonie!",
    lastItem: "baby ruth",
    isChecked: true,
    selectedItems: ["hey", "you", "baby ruth"],
  });

  const expected = [
    "hey",
    "you",
    "baby ruth",
    "Goonies never say die",
    "Andy, you Goonie!",
  ];
  t.same(actual, expected);
});

test("leaves other selected ranges alone when *unselecting*", t => {
  t.plan(1);
  const actual = shiftSelectRange({
    items,
    item: "baby ruth",
    lastItem: "Andy, you Goonie!",
    isChecked: false,
    selectedItems: [
      "hey",
      "you",
      "baby ruth",
      "Goonies never say die",
      "Andy, you Goonie!",
    ],
  });

  const expected = ["hey", "you"];
  t.same(actual, expected);
});
