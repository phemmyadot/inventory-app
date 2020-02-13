<template>
<div class="grid">
    <div class="list" v-for="(equipment, i) in paginatedEquipments" :key="i">
        <div class="data">
            <p class="name">Name: {{ equipment.name }}</p>
            <p class="quantity">Quantity: {{ equipment.quantity }}</p>
            <p class="status">Status: {{ equipment.statusName }}</p>
        </div>
        <div class="actions">
            <button class="edit" @click="editEquipment(equipment)">
                <img src="./../assets/edit.svg" alt="">
            </button>
            <button class="delete" @click="showConfirmModal(equipment)">
                <img src="./../assets/bin.svg" alt="">
            </button>
        </div>
    </div>
    <p class="error" v-if="error !== ''">{{ error }}</p>
    <app-confirmation v-if="showModal" @close="showModal = false" @delete="deleteEquipment()"></app-confirmation>
    <div class="pagination">pagination</div>
    <div class="loading" v-if="isLoading">Loading&#8230;</div>
     <!-- <paginate
      :page-count="pageCount"
      :container-class="'pagination'"
      :prev-text="'prev'"
      :next-text="'next'"
      :click-handler="paginate">
    </paginate> -->
    <div class="center">
      <div class="pagination">
         <button @click="paginate(currentPage-1)" :disabled="currentPage === 1">&laquo;</button>
        <button v-for="(page, i) in pages" :key="i" @click="paginate(page)">{{ page }}</button>
         <button @click="paginate(currentPage+1)" :disabled="currentPage === pages.length">&raquo;</button>
      </div>
    </div>
</div>
</template>

<style lang="scss">
/* Absolute Center Spinner */
.loading {
  position: fixed;
  z-index: 999;
  height: 2em;
  width: 2em;
  overflow: visible;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

/* Transparent Overlay */
.loading:before {
  content: '';
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.3);
}

/* :not(:required) hides these rules from IE9 and below */
.loading:not(:required) {
  /* hide "loading..." text */
  font: 0/0 a;
  color: transparent;
  text-shadow: none;
  background-color: transparent;
  border: 0;
}

.loading:not(:required):after {
  content: '';
  display: block;
  font-size: 10px;
  width: 1em;
  height: 1em;
  margin-top: -0.5em;
  -webkit-animation: spinner 1500ms infinite linear;
  -moz-animation: spinner 1500ms infinite linear;
  -ms-animation: spinner 1500ms infinite linear;
  -o-animation: spinner 1500ms infinite linear;
  animation: spinner 1500ms infinite linear;
  border-radius: 0.5em;
  -webkit-box-shadow: rgba(0, 0, 0, 0.75) 1.5em 0 0 0, rgba(0, 0, 0, 0.75) 1.1em 1.1em 0 0, rgba(0, 0, 0, 0.75) 0 1.5em 0 0, rgba(0, 0, 0, 0.75) -1.1em 1.1em 0 0, rgba(0, 0, 0, 0.5) -1.5em 0 0 0, rgba(0, 0, 0, 0.5) -1.1em -1.1em 0 0, rgba(0, 0, 0, 0.75) 0 -1.5em 0 0, rgba(0, 0, 0, 0.75) 1.1em -1.1em 0 0;
  box-shadow: rgba(0, 0, 0, 0.75) 1.5em 0 0 0, rgba(0, 0, 0, 0.75) 1.1em 1.1em 0 0, rgba(0, 0, 0, 0.75) 0 1.5em 0 0, rgba(0, 0, 0, 0.75) -1.1em 1.1em 0 0, rgba(0, 0, 0, 0.75) -1.5em 0 0 0, rgba(0, 0, 0, 0.75) -1.1em -1.1em 0 0, rgba(0, 0, 0, 0.75) 0 -1.5em 0 0, rgba(0, 0, 0, 0.75) 1.1em -1.1em 0 0;
}

/* Animation */

@-webkit-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-moz-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-o-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

/* Grid */
.grid {
    width: 50%;
    margin: auto;
    padding: 3rem 0;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    & .list {
        flex-basis: 48%;
        border-bottom: .3rem solid #9797bb;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 1.3rem;
        padding: 2rem;
        margin: 1rem 0;
        box-shadow: 0 0 0.8rem -0.3rem rgba(0, 0, 0, 0.75);
        & .actions {
            flex-basis: 10%;
            & .edit, .delete {
                background: none;
                border: none;
                margin: .2rem 0;
                cursor: pointer;
                & img {
                height: 2rem;
                }
            }
             & .edit:hover, .delete:hover {
                transform: scale(1.05);
                background-color: rgb(236, 233, 233);
            }
        }
        & .data{
            flex-basis: 90%;
            & .name, .status, .quantity {
            flex-basis: 30%;
            margin: .5rem 0;
            }
        }
    }
    & .pagination {
        display: flex;
        flex-basis: 100%;
        justify-content: center;
        margin: 2rem 0;
        font-size: 1.3rem;
    }
    & .error {
        text-align: center;
        width: 100%;
        font-size: 1.3rem;
        color: #e60000;
    }
}
</style>

<script>
import { eventBus } from '../main'
export default {
  data: function () {
    return {
      equipment: null,
      equipments: [],
      paginatedEquipments: [],
      searchQuery: '',
      isLoading: true,
      error: '',
      showModal: false,
      pageCount: 0,
      pages: [],
      currentPage: 1
    }
  },
  created () {
    this.getEquipments('').then(res => {
      console.log('resss', res)
      this.equipments = res
      this.paginate(1)
    })
    eventBus.$on('searchQuery', (searchQuery) => {
      this.getEquipments(searchQuery)
    })

    eventBus.$on('resetFilter', (isReset) => {
      this.getEquipments('')
    })
  },
  methods: {
    getEquipments (searchQuery) {
      this.isLoading = true
      if (searchQuery === '') {
        return this.$http.get('http://etestapi.test.eminenttechnology.com/api/Equipment')
          .then(response => response.json())
          .then(json => {
            return json
          })
          .catch(err => {
            if (err.status === 404) {
              this.equipments = []
              this.error = err.body
              this.isLoading = false
            }
          })
      } else {
        return this.$http.get(`http://etestapi.test.eminenttechnology.com/api/Equipment/search?name=${searchQuery}`)
          .then(response => {
            return response.json()
          })
          .then(json => {
            return json
          })
          .catch(err => {
            if (err.status === 404) {
              this.equipments = []
              this.error = err.body
              this.isLoading = false
            }
          })
      }
    },
    editEquipment (equipment) {
      this.$router.push('/create/' + equipment.id)
    },
    showConfirmModal (equipment) {
      this.equipment = equipment
      this.showModal = true
    },
    deleteEquipment () {
      this.isLoading = true
      this.$http.delete(`http://etestapi.test.eminenttechnology.com/api/Equipment/${this.equipment.id}`)
        .then(res => {
          this.isLoading = false
          this.showModal = false
          this.getEquipments('')
        })
        .catch(err => {
          console.log(err)
          this.isLoading = false
          this.showModal = false
        })
    },
    paginate (pageNum) {
      if (Number((this.equipments.length / 3)) > Number((this.equipments.length / 3).toString().split('')[0])) {
        this.pageCount = Number((this.equipments.length / 3).toString().split('')[0]) + 1
      } else {
        this.pageCount = Number((this.equipments.length / 3))
      }
      if (pageNum < 1) {
        pageNum = 1
      } else if (pageNum > this.pageCount) {
        pageNum = this.pageCount
      }
      this.currentPage = pageNum
      console.log('pageNum', pageNum, this.equipments)
      console.log('this.equipments / 3', Number((this.equipments.length / 3).toString().split('')[0]))
      this.paginatedEquipments = this.equipments.slice((pageNum - 1) * 3, pageNum * 3)
      const pageArray = new Array(this.pageCount)
      let newArray = []
      for (var i = 0; i < pageArray.length; i++) {
        newArray.push(i + 1)
      }
      this.pages = newArray
      newArray = []
      this.error = ''
      this.isLoading = false
    }
  },
  computed: {
    filteredEquipments () {
      return this.equipments.filter(equipment => {
        return equipment.name.match('this.searchQuery')
      })
    }
  }
}
</script>
