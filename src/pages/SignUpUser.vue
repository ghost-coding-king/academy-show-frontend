<template>
  <div>
    <v-app>
      <v-main>
        <StepOne v-if="step == 1"></StepOne>
        <StepTwo v-if="step == 2"></StepTwo>
        <v-btn @click="next">다음</v-btn>
      </v-main>
      <BasicFooter></BasicFooter>
    </v-app>
  </div>
</template>

<script>
import BasicFooter from '@/components/main-page/BasicFooter.vue';
import StepOne from '@/components/sign-up-user/StepOne.vue';
import StepTwo from '@/components/sign-up-user/StepTwo.vue';
export default {
    components: { BasicFooter, StepOne, StepTwo },
    data: () => ({
      step: 1 
    }),
    methods: {
      next() {
        this.step++
      }
    }
}
</script>

<style>
</style>