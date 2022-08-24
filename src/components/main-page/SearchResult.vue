<template>
  
  {{ $route.query.searchType }}
  
</template>

<script>
export default {
  data: () => ({
  }),
  mounted() {
    this.$emit('onSearchPage', this.$route.query.searchType)
  },
  beforeUnmount() {
    this.$emit('outSearchPage')
  }
}
</script>

<style>

</style>