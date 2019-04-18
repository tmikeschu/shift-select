const equals = require("ramda/src/equals");
const identity = require("ramda/src/identity");
const shiftSelectRange = require("./shiftSelectRange");

module.exports = ({
  isChecked,
  itemValue,
  shiftKeyUsed,
  lastItem,
  allItems,
  itemsEqual = equals,
  setSelectedItems = identity,
  setLastChanged = identity,
}) => {
  const { action, arg } = isChecked
    ? { action: "concat", arg: [itemValue] }
    : { action: "filter", arg: selected => selected !== itemValue };

  const setter = shiftKeyUsed
    ? selectedItems =>
        shiftSelectRange({
          isChecked,
          item: itemValue,
          items: allItems,
          itemsEqual,
          lastItem,
          selectedItems,
        })
    : selectedItems => selectedItems[action][arg];

  setSelectedItems(setter);
  setLastChanged({ itemValue, isChecked });
};
