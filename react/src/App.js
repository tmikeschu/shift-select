import React, { useState } from "react";
import "./App.css";
import logo from "./logo.svg";
import { handleCheckboxClick } from "shisel";

const App = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [lastItem, setLastItem] = useState(null);

  const items = Array(10)
    .fill()
    .map((_, i) => i + 1);

  const getCheckedAndShift = fn => ({
    target: { checked: isChecked },
    nativeEvent: { shiftKey: shiftKeyUsed },
  }) => {
    return fn({ shiftKeyUsed, isChecked });
  };
  const handleClick = item => checkClickData => {
    const checkboxData = Object.assign({}, checkClickData, {
      item,
      items,
      lastItem,
      setLastChanged: last => {
        setLastItem(last);
      },
      setSelectedItems: fn => {
        setSelectedItems(fn(selectedItems));
      },
    });
    handleCheckboxClick(checkboxData);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <div className="items">
          {items.map(item => (
            <div className="item" key={item}>
              <input
                type="checkbox"
                value={item}
                name={item}
                checked={selectedItems.includes(item)}
                onChange={getCheckedAndShift(handleClick(item))}
              />
              <label htmlFor={item}>Value: {item}</label>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
};

export default App;
