<template>
  <div class="dropdown" @click="showDropdown = !showDropdown">
    <span class="dropdown-text">{{ value === 'All' ? 'Filter by region' : value }}</span>
    <font-awesome-icon icon="fa-solid fa-caret-down" />
    <ul class="filter-select" v-show="showDropdown">
      <li v-for="option in options" :key="option" @click="$emit('select', option)">{{ option }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    value: String,
    options: {
      type: Array,
      default: ()=> []
    }
  },
  name: "Dropdown",
  data: () => ({
    showDropdown: false,
  })
}
</script>

<style scoped lang="scss">
.dropdown {
  position: relative;
  width: 180px;
  border-radius: 5px;
  cursor: pointer;
  background-color: var(--color-background-soft);
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px;
  & > ul {
    list-style: none;
    padding-left: 0;
    z-index: 2;
    border-radius: 5px;
    position: absolute;
    top: calc(100% + 2px);
    left: 0;
    right: 0;
    background-color: var(--color-background-soft);
    box-shadow: rgba(0, 0, 0, 0.1) 0 2px 4px;

    & > li {
      padding: 10px 20px;
      cursor: pointer;
      border-radius: 5px;

      &:hover {
        background-color: var(--color-background-mute);
      }
    }
  }
}
</style>