import Vue from 'vue'

export const equipmentEventBus = new Vue({
//   data () {
//     return {
//       error: ''
//     }
//   },
  methods: {
    getEquipments (searchQuery) {
      let queryUrl = ''
      if (searchQuery === '') {
        queryUrl = 'https://api-inventory-app.herokuapp.com/inventories'
      } else {
        queryUrl = `https://api-inventory-app.herokuapp.com/inventories/search?name=${searchQuery}`
      }
      return this.$http.get(queryUrl)
        .then(response => response.json())
        .then(json => {
          return json
        })
        .catch(err => {
          if (err.status === 404) {
            this.error = err.body
            return this.error
          }
        })
    },
    getEquipment (id) {
      return this.$http.get(`https://api-inventory-app.herokuapp.com/inventories/${id}`)
    },
    deleteEquipment (id) {
      return this.$http.delete(`https://api-inventory-app.herokuapp.com/inventories/${id}`)
    },
    createEquipment (payload) {
      return this.$http.post('https://api-inventory-app.herokuapp.com/inventories', payload)
    },
    editEquipment (id, payload) {
      return this.$http.put(`https://api-inventory-app.herokuapp.com/inventories/${id}`, payload)
    }
  }
})
