<template>
    <div class="create-page">
      <app-header></app-header>
       <div class="create-form">
           <form action="" >
               <div class="form">
                    <div class="form-input name">
                        <label for="name">Equipment Name</label>
                        <validation-provider rules="required" v-slot="{ errors }">
                            <input type="text" placeholder="Enter Equipment Name" id="name" v-model="equipment.equipmentName" :class="{'error': errors[0]}">
                            <span class="error-text">{{ errors[0] }}</span>
                        </validation-provider>
                    </div>
                    <div class="form-input">
                        <label for="quantity">Quantity</label>
                        <validation-provider rules="required" v-slot="{ errors }">
                            <input type="number" id="quantity" placeholder="Enter Quantity" v-model="equipment.equipmentQuantity" :class="{'error': errors[0]}">
                            <span class="error-text">{{ errors[0] }}</span>
                        </validation-provider>
                    </div>
                    <div class="form-input">
                        <label for="quantity">Type</label>
                        <validation-provider rules="required" v-slot="{ errors }">
                            <select name="types" id="" v-model="equipment.equipmentTypeName" :class="{'error': errors[0]}">
                                <option v-for="(type, i) in types" :key="i" :selected="type.selected">{{type.name}}</option>
                            </select>
                        <span class="error-text">{{ errors[0] }}</span>
                        </validation-provider>
                    </div>
               </div>
               <button class="submit" @click.prevent="postEquipment()" :disabled='!isComplete'>Submit</button>
           </form>
        <div class="loading" v-if="isLoading">Loading&#8230;</div>
       </div>
    </div>
</template>

<style lang="scss">
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
        width: 50%;
        margin: 5rem auto;
        & .form {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            & .form-input {
                display: grid;
                flex-basis: 48%;
                margin: 1rem 0;
                position: relative;
                padding-bottom: .5rem;
                & label {
                    margin: .5rem 0;
                }
                & input, select {
                    height: 3rem;
                    padding: 0 2rem;
                    border-radius: .5rem;
                    border: grey .1rem solid;
                    width: 100%;
                    margin-bottom: 1rem;
                }
            }
            & .name {
                flex-basis: 100%;
            }
        }
        & .submit {
            height: 4rem;
            border: 0;
            border-radius: .5rem;
            color: #fff;
            background-color: #1d66c1;
            width: 30%;
            margin: 2rem auto;
            display: block;
            cursor: pointer;
        }
        & .submit:hover {
             transform: scale(1.01);
             background-color: #054592;
        }
        & .submit:disabled {
             transform: scale(1);
             background-color: #779dcc;
             cursor: default;
        }
    }
}
</style>

<script>
import { equipmentEventBus } from '../eventBus/equipment'
export default {
  data () {
    return {
      equipment: {
        equipmentName: null,
        equipmentQuantity: null,
        equipmentType: null,
        equipmentTypeName: null,
        equipmentStatus: null,
        equipmentStatusName: null,
        equipmentTypeId: null
      },
      types: [
        {
          name: 'Indoor',
          value: 0
        },
        {
          name: 'Outdoor',
          value: 1
        }
      ],
      isLoading: false
    }
  },
  created () {
    if (this.$route.params.id) {
      this.isLoading = true
      equipmentEventBus.getEquipment(this.$route.params.id)
        .then(response => response.json())
        .then(json => {
          this.equipment.equipmentName = json.name
          this.equipment.equipmentQuantity = json.quantity
          this.equipment.equipmentType = json.type
          this.equipment.equipmentTypeName = this.equipment.equipmentType === 0 ? 'Indoor' : 'Outdoor'
          this.equipment.equipmentStatus = json.status
          this.equipment.equipmentStatusName = json.statusName
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
    postEquipment () {
      this.isLoading = true
      this.equipment.equipmentTypeName === 'Indoor' ? this.equipment.equipmentType = 0 : this.equipment.equipmentType = 1
      console.log(this.equipment)
      let payload = []
      if (this.$route.params.id) {
        payload = {
          id: this.$route.params.id,
          name: this.equipment.equipmentName,
          status: 0,
          statusName: 'Created',
          type: this.equipment.equipmentType,
          quantity: +this.equipment.equipmentQuantity,
          typeName: this.equipment.equipmentTypeName
        }
        equipmentEventBus.editEquipment(this.$route.params.id, payload)
          .then(res => {
            this.$router.push('/')
            this.isLoading = true
          })
          .catch(err => {
            console.log(err)
            this.isLoading = true
          })
      } else {
        payload = {
          name: this.equipment.equipmentName,
          status: 0,
          statusName: 'Created',
          type: this.equipment.equipmentType,
          quantity: +this.equipment.equipmentQuantity,
          typeName: this.equipment.equipmentTypeName
        }
        equipmentEventBus.createEquipment(payload)
          .then(res => {
            this.$router.push('/')
            this.isLoading = true
          })
          .catch(err => {
            console.log(err)
            this.isLoading = true
          })
      }
    }
  },
  computed: {
    isComplete () {
      let res = false
      if (this.equipment.equipmentName && this.equipment.equipmentTypeName && this.equipment.equipmentQuantity) {
        res = true
      }
      return res
    }
  }
}

</script>
