<template>
  <div>
    <div class="back">
      <router-link :to="{ path:'/'}">
        <font-awesome-icon icon="fa-solid fa-arrow-left" />
        Back To List
      </router-link>
    </div>
    <spin :spinning="loading" size="2xl" min-height="500px">
      <div v-if="country" class="country">
        <img class="country-image" :src="country.flag" alt="country flag">
        <div class="country-content">
          <h2>{{ country.name }}</h2>
          <div class="country-details">
            <div>
              <p class="country-paragraph"><span
                  class="country-paragraph--bold">Native Name: </span>{{ country.nativeName }}</p>
              <p class="country-paragraph"><span class="country-paragraph--bold">Population: </span>{{
                  country.population
                }}</p>
              <p class="country-paragraph"><span class="country-paragraph--bold">Region: </span>{{ country.region }}</p>
              <p class="country-paragraph"><span class="country-paragraph--bold">Sub Region: </span>{{
                  country.subregion
                }}</p>
              <p class="country-paragraph"><span class="country-paragraph--bold">Capital: </span>{{ country.capital }}
              </p>
            </div>
            <div>
              <p class="country-paragraph"><span class="country-paragraph--bold">Top Level Domain: </span><span
                  v-for="(domain, index) in country.topLevelDomain" :key="index">{{ domain }}</span></p>
              <p class="country-paragraph"><span class="country-paragraph--bold">Currencies: </span><span
                  v-for="(currency, index) in country.currencies" :key="index">{{ currency.name }}</span></p>
              <p class="country-paragraph"><span class="country-paragraph--bold">Languages: </span><span
                  v-for="(language, index) in country.languages" :key="index">{{ language.name + ' ' }}</span></p>
            </div>
          </div>
          <div class="country-borders">
            <p class="country-paragraph--bold">Border Countries: </p>
            <div v-if="borders && borders.length" class="country-borders-links">
              <div v-for="border in borders" :key="border.alpha3Code">
                <router-link :to="{ name: 'details', params: { name: border.alpha3Code }}">
                  {{ border.name }}
                </router-link>
              </div>
            </div>
            <div v-else>No border countries</div>
          </div>
        </div>
      </div>
    </spin>
  </div>
</template>

<script>
import {ref, onMounted, watch} from 'vue'
import Spin from "../components/UIEnteties/Spin";

export default {
  components: {Spin},
  // or this.$route.params.name
  props: ['name'],
  setup(props) {
    const country = ref(null)
    const borders = ref(null)
    const loading = ref(false)
    const fetch_country = async ()=>{
      loading.value = true
      try {
        country.value = await (await fetch(`https://restcountries.com/v2/alpha/${props.name}?fields=name,nativeName,population,region,subregion,capital,topLevelDomain,currencies,languages,borders,flag`)).json()
        if (country.value.borders)
          borders.value = await (await fetch(`https://restcountries.com/v2/alpha?codes=${country.value.borders.join(',')}`)).json()
        loading.value = false
      } catch (e) {
        console.log(e)
      }
    }
    fetch_country();
    watch(() => props.name, (oldValue, newValue) => {
      fetch_country()
    });
    return {country, borders, loading}
  }
}
</script>

<style lang="scss" scoped>
.country {
  display: flex;
  flex-direction: column;

  @media (min-width: 1024px) {
    flex-direction: row;
    justify-content: space-between;
  }

  & > * {
    flex: 1;
  }

  &-image {
    width: 100%;

    @media (min-width: 1024px) {
      width: 400px;
    }
  }

  &-content {
    @media (min-width: 1024px) {
      align-self: center;
      margin-left: 50px;
    }
    & > h2{
      color: var(--color-heading);
      font-size: 2.5em;
      line-height: 2.5em;
    }
  }

  &-details {
    & > div {
      margin-bottom: 50px;
    }

    @media (min-width: 660px) {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0;
    }
  }

  &-paragraph {
    font-size: .9rem;
    line-height: 2;

    &--bold {
      font-weight: 600;
      color: var(--color-heading)
    }
  }

  &-borders {
    display: flex;
    flex-direction: column;

    @media (min-width: 1024px) {
      flex-direction: row;
    }

    & p {
      @media (min-width: 1024px) {
        margin: 0 15px 0 0;
      }
    }

    &-links {
      display: flex;
      flex-wrap: wrap;
      gap: 15px 5px;

      & a {
        background-color: var(--color-background-soft);
        box-shadow: rgba(0, 0, 0, 0.1) 0 2px 4px;
        color: var(--color-text);
        padding: 5px 20px;
        text-decoration: none;
      }
    }
  }
}

.back {
  margin-bottom: 20px;
  & a {
    background-color: var(--color-background-soft);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px;
    border-radius: 5px;
    color: var(--color-text);
    padding: 10px 35px;
    text-decoration: none;
  }

  & .fa-arrow-left {
    margin-right: 10px;
  }
}
</style>
