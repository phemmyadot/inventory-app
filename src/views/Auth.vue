<template>
  <div class="auth">
    <h1 class="title">AUTHENTICATION</h1>
    <p>Login with:</p>
    <div class="actions">
      <button class="google" @click="auth('google')">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1em" height="1em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/><path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"/><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/></svg>
    </button>
    <button class="facebook" @click="auth('facebook')">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1em" height="1em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 256"><path d="M241.871 256.001c7.802 0 14.129-6.326 14.129-14.129V14.129C256 6.325 249.673 0 241.871 0H14.129C6.324 0 0 6.325 0 14.129v227.743c0 7.803 6.324 14.129 14.129 14.129h227.742" fill="#395185"/><path d="M176.635 256.001v-99.137h33.277l4.982-38.635h-38.259V93.561c0-11.186 3.107-18.809 19.148-18.809l20.459-.009V40.188c-3.54-.471-15.684-1.523-29.812-1.523c-29.498 0-49.692 18.005-49.692 51.071v28.493h-33.362v38.635h33.362v99.137h39.897" fill="#FFF"/></svg>
    </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.auth {
  width: 22%;
  margin: 15rem auto;
  & .title {
    font-size: 2rem;
    font-weight: 6000;
    text-align: center;
    margin-bottom: 3rem;
  }
  & p {
    text-align: center;
  }
  & .actions {
    display: flex;
    justify-content: space-around;
    & .facebook, .google {
      padding: 1rem;
      font-size: 2.5rem;
      font-weight: 600;
      border: none;
      border-radius: .5rem;
      box-shadow: 0 1px 4px #888888;
      margin: 1rem;
    }
  }
}
</style>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    auth (network) {
      const hello = this.hello
      hello(network).login().then(() => {
        const authRes = hello(network).getAuthResponse()
        localStorage.setItem('ACCESS_TOKEN', 'Bearer' + ' ' + authRes.access_token)
        return hello(network).api('me').then(function (json) {
          const profile = json
          localStorage.setItem('USER_NAME', profile.name)
          localStorage.setItem('USER_PICTURE', profile.picture)
        })
      })
        .then(res => {
          this.$router.push('/')
        })
    }
  }
}
</script>
