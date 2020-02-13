<template>
    <div class="nav" v-if="isAuth">
      <button class="company" @click="navigateToHome()">Company X</button>
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
      font-size: 1.1rem;
      display: flex;
      justify-content: space-between;
      box-shadow: 0 0 0.8rem .1rem cadetblue;
      height: 6rem;
      & .menu {
        display: flex;
        justify-content: flex-end;
        flex-basis: 90%;
        & button {
            background-color: #fff;
            flex-basis: 10%;
            color: #0c7a7d;
            border: none;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            box-shadow: 0 0 0.8rem -0.3rem cadetblue;
        }
        & button:hover {
            background-color: #eff3f3;
            transform: scale(1.03);
        }
      }
      & .company {
        display: flex;
        color: #0c7a7d;
        padding: 0 3rem;
        align-items: center;
        background-color: #fff;
        border: none;
        cursor: pointer;
        box-shadow: 0 0 0.8rem -0.3rem cadetblue;
      }
      & .company:hover {
        background-color: #eff3f3;
        transform: scale(1.03);
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
