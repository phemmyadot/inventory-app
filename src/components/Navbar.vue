<template>
    <div class="nav" v-if="isAuth">
      <p class="company">Company X</p>
      <div class="menu">
        <button class="home" @click="navigateToHome()" v-if="this.$route.path !== '/'">
               Home
        </button>
        <button class="create" @click="navigateToCreate()" v-if="this.$route.path !== '/create'">
                Create New
        </button>
        <button class="logout" @click="logout()">
               Log Out
        </button>
      </div>
    </div>
</template>

<style lang="scss" scoped>
    .nav {
      display: flex;
      justify-content: space-between;
      box-shadow: 0 0 0.8rem -0.3rem rgba(0, 0, 0, 0.75);
      height: 6rem;
      & .menu {
        display: flex;
        justify-content: flex-end;
        flex-basis: 90%;
        & button {
            flex-basis: 10%;
            border: none;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            box-shadow: 0 0 0.8rem -0.3rem rgba(0, 0, 0, 0.2);
        }
        & button:hover {
            background-color: #e5e6e9;
            transform: scale(1.05);
        }
      }
      & .company {
        margin: auto;
        font-size: 1.5rem;
      }
    }
</style>

<script>
export default {
  data () {
    return {
      isAuth: !!localStorage.getItem('ACCESS_TOKEN')
    }
  },
  methods: {
    navigateToCreate () {
      this.$router.push('/create')
    },
    navigateToHome () {
      this.$router.push('/')
    },
    async logout () {
      await localStorage.removeItem('ACCESS_TOKEN')
      this.$router.push('/auth')
    }
  }
}
</script>
