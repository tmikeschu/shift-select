const test = require("tape");
const { makeWithMethod } = require("./testUtils");
const handleCheckboxClick = require("./handleCheckboxClick");

const withMethod = makeWithMethod(module);

test(withMethod("adds and removes simple checks"), t => {
  t.plan(4);

  let selectedItems = [];
  const setSelectedItems = fn => {
    selectedItems = fn(selectedItems);
  };

  let lastChangedItem;
  const setLastChanged = lastChanged => {
    lastChangedItem = lastChanged;
  };

  const checkboxData = {
    isChecked: true,
    item: 2,
    items: [1, 2, 3, 4],
    lastItem: null,
    setLastChanged,
    setSelectedItems,
    shiftKeyUsed: false,
  };

  handleCheckboxClick(checkboxData);

  t.same(selectedItems, [2]);
  t.same(lastChangedItem, 2);

  handleCheckboxClick(Object.assign({}, checkboxData, { isChecked: false }));

  t.same(selectedItems, []);
  t.same(lastChangedItem, 2);
});

test(withMethod("adds a range when shift is used"), t => {
  t.plan(2);

  let selectedItems = [1];
  const setSelectedItems = fn => {
    selectedItems = fn(selectedItems);
  };

  let lastChangedItem;
  const setLastChanged = lastChanged => {
    lastChangedItem = lastChanged;
  };

  const checkboxData = {
    isChecked: true,
    item: 4,
    items: [1, 2, 3, 4, 5],
    lastItem: 1,
    setLastChanged,
    setSelectedItems,
    shiftKeyUsed: true,
  };

  handleCheckboxClick(checkboxData);

  t.same(selectedItems, [1, 2, 3, 4]);
  t.same(lastChangedItem, 4);
});

test(withMethod("removes a range when shift is used and unchecked"), t => {
  t.plan(2);

  let selectedItems = [2, 3, 4];
  const setSelectedItems = fn => {
    selectedItems = fn(selectedItems);
  };

  let lastChangedItem;
  const setLastChanged = lastChanged => {
    lastChangedItem = lastChanged;
  };

  const checkboxData = {
    isChecked: false,
    item: 3,
    items: [1, 2, 3, 4, 5],
    lastItem: 4,
    setLastChanged,
    setSelectedItems,
    shiftKeyUsed: true,
  };

  handleCheckboxClick(checkboxData);

  t.same(selectedItems, [2]);
  t.same(lastChangedItem, 3);
});
