import Vue from 'vue'

export const inventoryServices = new Vue({
  methods: {
    getInventories (searchQuery) {
      let queryUrl = ''
      if (searchQuery === '') {
        queryUrl = 'https://api-inventory-app.herokuapp.com/inventories'
      } else {
        queryUrl = `https://api-inventory-app.herokuapp.com/inventories/search?name=${searchQuery}`
      }
      return this.$http.get(queryUrl)
        .then(response => response.json())
        .then(json => {
          return json.inventories
        })
        .catch(err => {
          if (err.status === 404) {
            this.error = err.body
            return this.error
          }
        })
    },
    getInventory (id) {
      return this.$http.get(`https://api-inventory-app.herokuapp.com/inventories/${id}`)
        .then(response => response.json())
        .then(json => {
          return json.inventory
        })
        .catch(err => {
          if (err.status === 404) {
            this.error = err.body
            return this.error
          }
        })
    },
    deleteInventory (id) {
      return this.$http.delete(`https://api-inventory-app.herokuapp.com/inventories/${id}`)
    },
    createInventory (payload) {
      return this.$http.post('https://api-inventory-app.herokuapp.com/inventories', payload)
    },
    editInventory (id, payload) {
      return this.$http.put(`https://api-inventory-app.herokuapp.com/inventories/${id}`, payload)
    }
  }
})
