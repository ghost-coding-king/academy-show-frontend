<template>
<v-app>
    <v-main style="min-width: 1000px">
        <Form/>
    </v-main>
</v-app>
</template>

<script>
import Form from '@/components/signin-page/form.vue'

export default {
  name: 'MainPage',
  components: {Form}
};
</script>
<style>
</style>
