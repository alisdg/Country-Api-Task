<template>
  <div class="card">
    <img class="card-avatar" :alt="`${country.name} flag`" :src="country.flag">
    <div class="card-info">
      <div class="card-info-title">{{country.name}}</div>
      <div class="card-info-details">
        <p v-for="(key) in Object.keys(country.details)" :key="key">
          <span class="card-info-details-label">{{ key }}: </span>
          <span class="card-info-details-value">{{ country.details[key]}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props:{
    country: {
      type: Object,
      default: null
    }
  }
}
</script>

<style scoped lang="scss">
  .card{
    width: 300px;
    height: 350px;
    background-color: var(--color-background-soft);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px;
    border-radius: 5px;
    overflow: hidden;
    cursor: pointer;
    transition: all .2s ease-in-out;

    &:hover {
      transform: scale(1.05);
    }

    &-avatar{
      width: 100%;
      min-height: 200px;
      max-height: 200px;
      object-fit: cover;
      border-bottom: 1px solid var(--color-border);
    }

    &-info {
      padding: 0 25px 45px 25px;
      &-title {
        font-size: 1.4rem;
        font-weight: 600;
        color: var(--color-heading);
        margin-bottom: 10px;
      }
      &-details {
        font-size: .9rem;
        line-height: .7;
        font-weight: 900;
        p{
          line-height: 1.5em;
        }
        &-label {
          font-weight: 600;
          color: var(--color-heading);
        }
      }
    }
  }
</style>