<template>
  <div class="px-20 py-24 h-screen flex items-center justify-center">
    <div class="">
      <div>
        <div class="mb-3 text-yellow-400 font-semibold">
          {{ error.statusCode }} error
        </div>

        <h1 class="text-5xl font-semibold text-gray-900 mb-6">
          {{
            error.statusCode === 404 ? 'Sidan hittades inte' : 'Något gick fel'
          }}
        </h1>
      </div>

      <p class="text-lg text-gray-500 mb-12">
        {{
          error.statusCode === 404
            ? 'Sidan du letar efter finns tyvärr inte eller har flyttats.'
            : 'Försök igen senare.'
        }}
      </p>

      <div class="flex space-x-4">
        <button
          class="flex items-center py-4 px-7 font-medium rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50"
          @click="$router.go(-1)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 mr-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span>Gå tillbaka</span>
        </button>

        <NuxtLink
          class="flex items-center py-4 px-7 font-medium rounded-lg bg-yellow-300 text-gray-700 hover:bg-yellow-400"
          to="/"
          >Ta mig hem</NuxtLink
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorPage',
  props: ['error'],
}
</script>
