<template>
  <header class="header">
    <div class="header-content container">
      <h1 class="header-title">Where in the world?</h1>
      <button class="theme-switcher" @click="toggleTheme">
        <font-awesome-icon :icon="theme === 'dark' ? 'fa-regular fa-moon' : 'fa-solid fa-moon'" fixed-width/>
        <span>Dark Mode</span>
      </button>
    </div>
  </header>
</template>

<script>
import {ref, onMounted} from 'vue'

export default {
  setup() {
    const theme = ref(null)

    const toggleTheme = () => {
      if (theme.value === "dark") {
        theme.value = "light"
        document.documentElement.setAttribute("data-theme", "light")
        localStorage.setItem("theme", "light")
      } else {
        theme.value = "dark"
        document.documentElement.setAttribute("data-theme", "dark")
        localStorage.setItem("theme", "dark")
      }
    }

    onMounted(() => {
      theme.value = localStorage.getItem('theme')
      if (theme.value) {
        document.documentElement.setAttribute("data-theme", theme.value)
      }
    })

    return {theme, toggleTheme}
  }
}
</script>

<style lang="scss" scoped>
.header {
  background-color: var(--color-background-soft);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px;
  margin-bottom: 20px;
  color: var(--color-heading);

  &-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &-title {
    margin: 0;
    font-size: 1.2rem;
    @media (min-width: 660px) {
      font-size: 1.7rem;
    }
  }
}

.theme-switcher {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: none;
  background-color: transparent;
  color: inherit;
  margin: 0;
  padding: 0;
  font-size: .9rem;
  cursor: pointer;
  @media (min-width: 660px) {
    font-size: 1rem;
  }
}
</style>