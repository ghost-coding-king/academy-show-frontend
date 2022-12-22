<template>
  <div
    v-if="this.loading"
    style="
      margin: 0 auto;
      width: 700px;
      height: 500px;
      display: flex;
      justify-content: center;
      align-items: center;
    "
  >
      <v-progress-circular
        indeterminate
        color="#fd9f28"
        size="50"
      ></v-progress-circular>
  </div>

  <div v-else>
  <v-row no-gutters>
    <div style="
      flex: 0 0 12.6%; max-width: 12.6%">
    </div>
    <h1 style="padding-top: 20px;">🔍 인기 있는 읽을거리</h1>
      &nbsp;
    <h2 style="display: flex; align-items: center; padding-top: 20px;">
      <i class="fa-solid fa-chevron-right"></i>
    </h2>
  
  </v-row>

  <v-row no-gutters>
    <div style="flex: 0 0 12.6%; max-width: 12.6%"></div>
    <p style="color: #7b7b7b">요즘 잘나가는 포스팅을 살펴보세요</p>
  </v-row>
  
  <v-row no-gutters>
      <v-col cols="1"></v-col>
      <v-col cols="10">
        <v-sheet class="mx-auto" style="width: 100%">
          <v-slide-group class="pa-4" selected-class="bg-success" show-arrows>
            <v-slide-group-item v-for="(post, i) in this.posts" :key="i">
              <v-card
                link
                style="height: 165px; margin-right: 30px !important"
                class="mx-auto my-12"
                max-width="300"
                min-width="250"
              >
              <div
                style="
                  width: 40px;
                  height: 20px;
                  background-color: #fce6de;
                  margin-top: 12px;
                  margin-left: 15px;
                  border-radius: 15%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: red;
                  font-size: 13px;
                "
              >
                <v-icon icon="fa-solid fa-heart" size="15"></v-icon>
                <span style="color: red; margin-left: 3px; margin-top: 1px">{{post.likes.count}}</span>
              </div>
                <v-card-item>
                  <v-card-title>{{post.title}}</v-card-title>

                  <v-card-subtitle>
                    <span class="mr-1">{{post.nickname}}</span>

                    <v-icon
                      color="error"
                      icon="mdi-fire-circle"
                      size="small"
                    ></v-icon>
                  </v-card-subtitle>
                </v-card-item>

                <!-- <v-card-text>
                  <v-row align="center" class="mx-0">
                    <v-rating
                      :model-value="4.5"
                      color="amber"
                      dense
                      half-increments
                      readonly
                      size="14"
                    ></v-rating>

                    <div class="text-grey ms-4">4.5 (413)</div>
                  </v-row>
                </v-card-text> -->

                <v-divider></v-divider>
                  <v-card-text style="font-size: 15px; font-weight: bold; padding: 8px">
                    <v-avatar
                      v-if="post.profile != '' && post.profile != undefined"
                      :image="post.profile"
                      size="40"
                      style="border: 1px solid grey; margin: 0 3px"
                    ></v-avatar>
                    <v-avatar
                      v-else
                      color="#fd9f28"
                      size="40"
                      style="border: 1px solid grey"
                    >
                      <v-icon color="white" icon="fa-solid fa-user"></v-icon>
                    </v-avatar>
                    {{ post.nickname }}
                  </v-card-text>
              </v-card>
            </v-slide-group-item>
          </v-slide-group>
        </v-sheet>
      </v-col>
      <v-col cols="1"></v-col>
    </v-row>
  </div>
</template>

<script>
import { ApiRequester } from "@/utils";

export default {
  data: () => ({
    loading: true,
    posts: Array
  }),
  mounted() {
    ApiRequester.get("/api/posts?sort=batchLikes.count,desc")
      .then((res) => {
        this.loading = false;
        this.posts = res.data.data.content;
      });
  },
}
</script>

<style>

</style>