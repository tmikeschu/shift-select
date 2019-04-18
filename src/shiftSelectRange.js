const compose = require("ramda/src/compose");
const dropLastWhile = require("ramda/src/dropLastWhile");
const dropWhile = require("ramda/src/dropWhile");
const concat = require("ramda/src/concat");
const without = require("ramda/src/without");
const uniq = require("ramda/src/uniq");
const equals = require("ramda/src/equals");
const anyPass = require("ramda/src/anyPass");
const not = require("ramda/src/not");

module.exports = ({
  isChecked,
  item,
  items,
  itemsEqual = equals,
  lastItem,
  selectedItems,
}) => {
  const isNotCurrentOrMostRecent = compose(
    not,
    anyPass([itemsEqual(item), itemsEqual(lastItem)]),
  );

  const trimWhile = fn =>
    compose(
      dropLastWhile(fn),
      dropWhile(fn),
    );
  const range = trimWhile(isNotCurrentOrMostRecent)(items);

  if (isChecked) {
    return compose(
      uniq,
      concat(selectedItems),
    )(range);
  }
  return without(range, selectedItems);
};
