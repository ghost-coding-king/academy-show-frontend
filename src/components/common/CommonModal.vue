<template>
<div class="modal">
    <div class="overlay" @click="$emit('closeModal')"></div>
    <v-card
    class="mx-auto"
    width="500"
    height="690"
    style="z-index: 2000; margin-top: 80px"
    elevation="10"
  >
    <div style="display: flex; justify-content: right;">
        <v-btn icon flat @click="$emit('closeModal')"><i class="fa-solid fa-x"></i></v-btn>
    </div>
  <slot />
  </v-card>
  </div>
</template>

<script>
export default {

}
</script>

<style>

/* Modal */
.modal,
.overlay {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 2000;
}
.overlay {
  opacity: 0.5;
  background-color: black;
}
.modal-card {
  position: relative;
  max-width: 500px;
  margin: auto;
  margin-top: 200px;
  padding: 20px;
  background-color: white;
  min-height: 500px;
  z-index: 2000;
  opacity: 1;
}
</style>