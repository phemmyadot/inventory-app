<template>
<div class="header">
    <div class="menu">
        <app-nav></app-nav>
    </div>
    <div class="top">
        <div class="search" v-if="this.$route.path == '/'">
            <input type="text" class="search-input" placeholder="Enter Search Query" v-model="searchQuery">
            <button class="search-button" @click="filterEquipments()" v-if="searchQuery !== ''">
                <img src="./../assets/search.svg" class="search-icon" alt="">
            </button>
            <button class="reset-button" @click="resetFilter()">
                Reset
            </button>
        </div>
    </div>
</div>
</template>

<style lang="scss">
    .header {
        width: 100%;
        & .top {
            width: 50%;
            margin: auto;
            padding-top: 3rem;
            display: flex;
            justify-content: center;
            & .search {
                flex-basis: 76%;
                position: relative;
                & .search-input {
                    height: 4rem;
                    width: 100%;
                    padding: 0 5rem;;
                    border-radius: .5rem;
                    border: .1rem solid grey;
                    box-shadow: 0 0 0.8rem -0.3rem rgba(0, 0, 0, 0.75);
                }
                & .reset-button {
                    position: absolute;
                    right: 0;
                    top: 0;
                    height: 4rem;
                    width: 5rem;;
                    border: .1rem grey solid;
                    border-radius: 0 .5rem .5rem 0;
                    justify-content: center;
                    display: flex;
                    cursor: pointer;
                    & .reset-icon {
                        width: 2rem;
                        height: 2rem;
                    }
                }
                & .reset-button:hover {
                    background-color: rgb(204, 206, 231);
                    transform: scale(1.05);
                }
                & .search-button {
                    position: absolute;
                    right: 5rem;;
                    top: 0;
                    height: 4rem;
                    width: 5rem;;
                    border: .1rem grey solid;
                    border-right: none;
                    justify-content: center;
                    display: flex;
                    cursor: pointer;
                    & .search-icon {
                        width: 2rem;
                        height: 2rem;
                    }
                }
                & .search-button:hover {
                    background-color: rgb(204, 206, 231);
                    transform: scale(1.05);
                }
            }
        }
    }
</style>
<script>
import { eventBus } from '../main'
export default {
  data () {
    return {
      searchQuery: ''
    }
  },
  methods: {
    filterEquipments () {
      eventBus.$emit('searchQuery', this.searchQuery)
      this.searchQuery = ''
    },
    resetFilter () {
      eventBus.$emit('resetFilter', true)
      this.searchQuery = ''
    }
  }
}
</script>
