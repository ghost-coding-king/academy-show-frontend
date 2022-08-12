<template>
  <h2>{{ $route.params.id }}</h2>

  <h2>{{ $store.state.count }}</h2>

  <h2>{{ componentCount }}</h2>

  <h2>{{ $store.state.token }}</h2>

  <v-btn @click="incrementComponent">incrementComponentState</v-btn>
  <v-btn @click="increment">incrementVuexState</v-btn>
  <v-btn @click="setToken">fetch and set vuex state</v-btn>
</template>

<script>
export default {
  name: 'ProjectPage',
  components: {
  },
  data() {
    return {
      componentCount: 0
    }
  },
  created: function () {
    console.log(this)
  },
  methods: {
    increment() {
      this.$store.commit('increment')
    },
    incrementComponent() {
      this.componentCount++;
    },
    setToken() {
      this.$store.dispatch('fetchToken')
    }
  }
}
</script>
