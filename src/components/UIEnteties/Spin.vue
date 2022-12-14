<template>
  <div class="spin" :style="`min-height: ${minHeight}`">
    <div class="spin-mask" v-if="spinning">
      <span class="spin-mask-spinner">
      <font-awesome-icon icon="fa-solid fa-spinner" spin :size="size" />
      </span>
    </div>
    <div class="spin-content" v-else>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Spin",
  props:{
    spinning: Boolean,
    size:{
      type: String,
      default: () => 'xl'
    },
    minHeight: {
      type: String,
      default: () => '0px'
    },
  }
}
</script>

<style scoped lang="scss">
  .spin{
    width: 100%;
    position: relative;
    &-mask{
      position: absolute;
      right: 0;
      left: 0;
      top: 0;
      bottom: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: .6;
    }
    &-spinner{
      color: var(--color-spinner);
    }
  }
</style>