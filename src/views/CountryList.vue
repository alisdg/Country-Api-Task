<template>
  <main>

    <div class="filter">
      <div class="filter-search">
        <font-awesome-icon icon="fa-solid fa-search" />
        <input class="filter-search-input" v-model="searchValue" placeholder="Search country ...">
      </div>


      <dropdown :options="options" v-model:value="selectedRegion" @select="selectRegion" >

      </dropdown>

    </div>
    <spin :spinning="loading" minHeight="450px" size="2xl">
      <div class="card-containers">
        <template v-for="country in computedCountries" :key="country.alpha3Code">
          <router-link :to="{path:`/details/${country.alpha3Code}`}" style="color: inherit; text-decoration: none;">
            <card :country="country"></card>
          </router-link>
        </template>
      </div>
    </spin>
  </main>
</template>

<script>
import Spin from "../components/UIEnteties/Spin";
import Card from "../components/UIEnteties/Card";
import Dropdown from "../components/UIEnteties/Dropdown";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

export default {
  name: "CountryList",
  components: {FontAwesomeIcon, Dropdown, Card, Spin},
  data: () => ({
    countries: [],
    searchValue: '',
    selectedRegion: 'All',
    loading: false,
    options: ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania', 'All'],
    showDropdown: false
  }),
  async created() {
    this.loading = true
    try {
      let data = await (await fetch('https://restcountries.com/v2/all?fields=name,capital,region,population,flag,alpha3Code')).json()
      this.countries = data.map(x => {
        let {name, flag, alpha3Code, independent, ...details} = x
        return {
          name, flag, alpha3Code, details
        }
      })
      this.loading = false
    } catch (e) {

    }
  },
  computed:{
    computedCountries(){
      return this.countries.filter(country => country.name.toLowerCase().indexOf(this.searchValue.toLowerCase()) > -1).filter(country => this.selectedRegion === 'All' || country.details.region === this.selectedRegion )
    }
  },
  methods:{
    selectRegion(value){
      this.selectedRegion = value
    }
  }
}
</script>

<style lang="scss" scoped>
.card-containers {
  width: 100%;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  & > a{
    width: fit-content;
    margin: auto;
  }
}
.filter{
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 3px;
  flex-direction: column;
  @media (min-width: 660px) {
    flex-direction: row;
  }
  &-search{
    padding: 10px;
    border-radius: 5px;
    background-color: var(--color-background-soft);
    color: var(--color-heading);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px;
    width: 100%;
    margin-bottom: 10px;
    &-input{
      background-color: transparent;
      border: none;
      outline: none;
      color: var(--color-text);
      margin-left: 10px;
      width: 80%;
    }
    @media (min-width: 660px) {
      width: 400px;
    }
  }
}

</style>