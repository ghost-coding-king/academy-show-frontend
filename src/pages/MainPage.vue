<template>
<v-app>
  <BasicHeader :title="'전국학원자랑'"></BasicHeader>
    <v-main style="min-width: 1000px">
      <router-view></router-view>
    </v-main>
  <BasicFooter></BasicFooter>
</v-app>
</template>

<script>
import BasicHeader from '@/components/main-page/BasicHeader.vue'
import BasicFooter from '@/components/main-page/BasicFooter.vue'

export default {
  name: 'MainPage',
  components: {
    BasicHeader,
    BasicFooter,
  },
  data: () => ({
  })
};
</script>
<style>
</style>