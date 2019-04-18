const equals = require("ramda/src/equals");
const identity = require("ramda/src/identity");
const shiftSelectRange = require("./shiftSelectRange");

module.exports = ({
  isChecked,
  item,
  items,
  itemsEqual = equals,
  lastItem,
  setLastChanged = identity,
  setSelectedItems = identity,
  shiftKeyUsed,
}) => {
  const { action, arg } = isChecked
    ? { action: "concat", arg: [item] }
    : { action: "filter", arg: selected => selected !== item };

  const setter = shiftKeyUsed
    ? selectedItems =>
        shiftSelectRange({
          isChecked,
          item,
          items,
          itemsEqual,
          lastItem,
          selectedItems,
        })
    : selectedItems => selectedItems[action](arg);

  setSelectedItems(setter);
  setLastChanged(item);
};
