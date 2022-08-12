<template>
  <v-carousel cycle hide-delimiter-background hide-delimiters show-arrows="hover" progress="black" height="auto"
    style="min-width: 1000px">
    <v-carousel-item v-for="i in 5" :key="i" :src="require('../../assets/test.png')">
    </v-carousel-item>
  </v-carousel>
  <v-container fluid>
    <v-row no-gutters justify="center" class="pa-8">
      <h1>전국학원자랑에서 학원을 뽐내세요</h1>
    </v-row>
    <v-row no-gutters>
      <v-col cols="3"></v-col>
      <v-text-field variant="outlined" append-inner-icon="mdi-magnify"></v-text-field>
      <v-col cols="3"></v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="1"></v-col>
      <v-card class="mx-auto my-12" max-width="350" min-width="300" v-for="i in 3" :key="i">

        <v-img height="250" src="https://cdn.vuetifyjs.com/images/cards/cooking.png" cover></v-img>

        <v-card-item>
          <v-card-title>Cafe Badilico</v-card-title>

          <v-card-subtitle>
            <span class="mr-1">Local Favorite</span>

            <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
          </v-card-subtitle>
        </v-card-item>

        <v-card-text>
          <v-row align="center" class="mx-0">
            <v-rating :model-value="4.5" color="amber" dense half-increments readonly size="14"></v-rating>

            <div class="text-grey ms-4">
              4.5 (413)
            </div>
          </v-row>

          <div class="my-4 text-subtitle-1">
            $ • Italian, Cafe
          </div>

          <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
        </v-card-text>

        <v-divider class="mx-4 mb-1"></v-divider>

        <v-card-title>Tonight's availability</v-card-title>

        <div class="px-4">
          <v-chip-group>
            <v-chip>5:30PM</v-chip>

            <v-chip>7:30PM</v-chip>

            <v-chip>8:00PM</v-chip>

            <v-chip>9:00PM</v-chip>
          </v-chip-group>
        </div>

        <v-card-actions>
          <v-btn color="deep-purple-lighten-2" text>
            Reserve
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-col cols="1"></v-col>
    </v-row>
    <div class="d-flex justify-space-around">
      </div>
  </v-container>
</template>

<script>
export default {
}
</script>

<style>
</style>