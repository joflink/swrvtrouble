<template>
  <div class="w-full flex justify-center py-24 md:py-40 px-4">
    <form class="w-96" @submit.prevent="handleLogin">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-semibold mb-3 text-gray-900">
          Logga in på ditt konto
        </h1>
        <p class="text-lg text-gray-700">Välkommen till EHT-kollen!</p>
      </div>

     
      <div>
        <div v-if="error">{{ error }}</div>
        <div v-if="data === undefined && !error">Loading...</div>
        <div v-if="data">
          <div>{{ data.body }}</div>
        </div>
      </div>


    
    </form>
  </div>
</template>

<script>
import useSWRV from 'swrv'
// const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

// const fetcher = (key) =>
//   fetch(`http://localhost:3001/${key}`).then((res) => res.json())
function fetcher(id) {
  // await sleep(500)
  return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then((res) =>
    res.json()
  )
}

export default {
  name: 'LoginPage',

  setup(props, context) {
    // const { data, error } = useSWRV('ticket', fetcher)

    const { data, error, isValidating } = useSWRV(() => 2, fetcher)

    return {
      data,
      error,
      isValidating,
    }
  },

  data() {
    return {
      login: {
       
      },
    }
  },
  methods: {
    handleLogin() {
      try {
        this.$auth
          .loginWith('local', {
            data: this.login,
          })
          .then((res) => {
            this.$auth.setUserToken(res.data.token)
            this.$auth.setUser(res.data.user)
          })
      } catch (err) {
        console.error(err)
      }
    },
  },
}
</script>
