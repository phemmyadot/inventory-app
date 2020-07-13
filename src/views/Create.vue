<template>
  <div class="create-page">
    <app-header></app-header>
    <div class="create-form">
      <form action>
        <div class="form">
          <div class="form-input name">
            <label for="name">Item Name</label>
            <validation-provider rules="required" v-slot="{ errors }">
              <input
                type="text"
                placeholder="Enter Item Name"
                id="name"
                v-model="inventory.name"
                :class="{'error': errors[0]}"
              />
              <span class="error-text">{{ errors[0] }}</span>
            </validation-provider>
          </div>
          <div class="form-input" v-if="!$route.params.id">
            <label for="stockedQuantity">Stocked Quantity</label>
            <validation-provider rules="required" v-slot="{ errors }">
              <input
                type="number"
                id="stockedQuantity"
                placeholder="Enter Stocked Quantity"
                v-model="inventory.stockedQuantity"
                :class="{'error': errors[0]}"
              />
              <span class="error-text">{{ errors[0] }}</span>
            </validation-provider>
          </div>
          <div class="form-input" v-if="$route.params.id">
            <label for="availableQuantity">Available Quantity</label>
            <validation-provider rules="required" v-slot="{ errors }">
              <input
                type="number"
                id="availableQuantity"
                placeholder="Enter Available Quantity"
                v-model="inventory.availableQuantity"
                :class="{'error': errors[0]}"
              />
              <span class="error-text">{{ errors[0] }}</span>
            </validation-provider>
          </div>
          <div class="form-input">
            <label for="price">Price</label>
            <validation-provider rules="required" v-slot="{ errors }">
              <input
                type="number"
                id="price"
                placeholder="Enter Price"
                v-model="inventory.price"
                :class="{'error': errors[0]}"
              />
              <span class="error-text">{{ errors[0] }}</span>
            </validation-provider>
          </div>
          <div class="form-input">
            <label for="model">Model</label>
            <validation-provider rules="required" v-slot="{ errors }">
              <input
                type="text"
                id="model"
                placeholder="Enter Model"
                v-model="inventory.model"
                :class="{'error': errors[0]}"
              />
              <span class="error-text">{{ errors[0] }}</span>
            </validation-provider>
          </div>
        </div>
        <div class="submit-btn">
          <v-app id="inspire">
            <v-btn
              @click.prevent="postInventory()"
              class="ma-2"
              :loading="isLoading"
              :disabled="isLoading || !isComplete"
              color="info"
            >
              Submit
              <template v-slot:loader>
                <span class="custom-loader">
                  <v-icon light>mdi-cached</v-icon>
                </span>
              </template>
            </v-btn>
          </v-app>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss">
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

.error {
  background-color: #fdc8c8;
}
.error-text {
  color: #b00000;
  font-size: 1rem;
  position: absolute;
  left: 0;
  bottom: 0;
}
.create-page {
  & .create-form {
    font-size: 1.1rem;
    width: 70vw;
    margin: 5rem auto;
    & .form {
      display: grid;
      grid-template-rows: auto;
      grid-template-columns: 45% 45%;
      grid-column-gap: 10%;
      & .form-input {
        display: grid;
        flex-basis: 48%;
        margin: 1rem 0;
        position: relative;
        padding-bottom: 0.5rem;
        & label {
          margin: 0.5rem 0;
        }
        & input,
        select {
          height: 3rem;
          padding: 0 2rem;
          border-radius: 0.5rem;
          border: grey 0.1rem solid;
          width: 100%;
          margin-bottom: 1rem;
        }
        & select {
          -webkit-appearance: checkbox;
        }
      }
      & .name {
        grid-column: 1 / span 2;
      }
    }
    & .submit-btn {
      display: grid;
      justify-content: center;
    }
  }
}
</style>

<script>
import { inventoryServices } from '../services/inventory.service'
export default {
  data () {
    return {
      inventory: {
        name: null,
        stockedQuantity: null,
        price: null,
        availableQuantity: null,
        model: null
      },
      isLoading: false,
      error: ''
    }
  },
  created () {
    if (this.$route.params.id) {
      this.isLoading = true
      inventoryServices
        .getInventory(this.$route.params.id)
        .then(inventory => {
          this.inventory.name = inventory.name
          this.inventory.stockedQuantity = inventory.stockedQuantity
          this.inventory.price = inventory.price
          this.inventory.availableQuantity = inventory.availableQuantity
          this.inventory.model = inventory.modelNo
          this.isLoading = false
        })
        .catch(err => {
          if (err.types === 404) {
            this.isLoading = false
          }
        })
    }
  },
  methods: {
    postInventory () {
      this.isLoading = true
      if (this.$route.params.id) {
        const payload = {
          name: this.inventory.name,
          price: +this.inventory.price,
          model: this.inventory.model,
          availableQuantity: +this.inventory.availableQuantity
        }
        inventoryServices
          .editInventory(this.$route.params.id, payload)
          .then(res => {
            this.$router.push('/')
            this.isLoading = true
          })
          .catch(err => {
            this.error = err
            this.isLoading = true
          })
      } else {
        const payload = {
          name: this.inventory.name,
          price: +this.inventory.price,
          model: this.inventory.model,
          stockedQuantity: +this.inventory.stockedQuantity
        }
        inventoryServices
          .createInventory(payload)
          .then(res => {
            this.$router.push('/')
            this.isLoading = true
          })
          .catch(err => {
            this.error = err
            this.isLoading = true
          })
      }
    },
    validate (type) {
      if (
        type === 0 &&
        this.inventory.name &&
        this.inventory.price &&
        this.inventory.model &&
        this.inventory.stockedQuantity
      ) {
        return true
      } else if (
        type === 1 &&
        this.inventory.name &&
        this.inventory.price &&
        this.inventory.model &&
        this.inventory.availableQuantity
      ) {
        return true
      } else {
        return false
      }
    }
  },
  computed: {
    isComplete () {
      if (this.$route.params.id) {
        return this.validate(1)
      } else {
        return this.validate(0)
      }
    }
  }
}
</script>
