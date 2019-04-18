<template>
  <div class="App">
    <h1>{{ msg }}</h1>
    <div :class="items">
      <div class="item" v-for="item in items" :key="item.index">
        <input
          type="checkbox"
          :name="item.index"
          :value="item"
          :checked="selectedItems.includes(item)"
          @click="handleCheckboxClick(item, $event)"
        />
        <label :for="item">Value: {{ item.value }}</label>
      </div>
    </div>

    <h3>Essential Vue Links</h3>
    <ul>
      <li>
        <a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a>
      </li>
      <li>
        <a href="https://forum.vuejs.org" target="_blank" rel="noopener"
          >Forum</a
        >
      </li>
      <li>
        <a href="https://chat.vuejs.org" target="_blank" rel="noopener"
          >Community Chat</a
        >
      </li>
      <li>
        <a href="https://twitter.com/vuejs" target="_blank" rel="noopener"
          >Twitter</a
        >
      </li>
      <li>
        <a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a>
      </li>
    </ul>
  </div>
</template>

<script>
import { handleCheckboxClick } from "shisel";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      items: Array(10)
        .fill()
        .map((_, i) => ({ value: i + 1, index: i })),
      selectedItems: [],
      lastItem: null,
    };
  },
  methods: {
    handleCheckboxClick(
      item,
      {
        target: { checked: isChecked },
        shiftKey: shiftKeyUsed,
      },
    ) {
      const checkboxData = {
        isChecked,
        item,
        items: this.items,
        itemsEqual: a => b => a.index === b.index,
        lastItem: this.lastItem,
        setLastChanged: last => {
          this.lastItem = last;
        },
        setSelectedItems: fn => {
          this.selectedItems = fn(this.selectedItems);
        },
        shiftKeyUsed,
      };
      handleCheckboxClick(checkboxData);
    },
  },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
