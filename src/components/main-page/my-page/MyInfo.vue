<template>
  <v-row style="margin-top: 50px" no-gutters>
    <v-col cols="1"></v-col>
    <h1>내 정보</h1>
  </v-row>
  <v-row no-gutters>
    <v-col cols="1"></v-col>
    <v-col cols="10">
    <v-table style="width: 100%;">
    <thead>
      <tr>
        <th class="text-left" style="width: 200px">
        </th>
        <th class="text-left">
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>아이디</td>
        <td>
          <v-text-field variant="outlined" style="margin-top: 20px"></v-text-field>
        </td>
      </tr>
      <tr>
        <td>이름</td>
        <td>
          <v-text-field variant="outlined" style="margin-top: 20px"></v-text-field>
        </td>
      </tr>
      <tr>
        <td>생일</td>
        <td>
          <v-text-field variant="outlined" style="margin-top: 20px"></v-text-field>
        </td>
      </tr>
      <tr>
        <td>주소</td>
        <td>
          <v-text-field variant="outlined" style="margin-top: 20px"></v-text-field>
        </td>
      </tr>
      
      <tr>
        <td>전화번호</td>
        <td>
          <v-text-field variant="outlined" style="margin-top: 20px"></v-text-field>
        </td>
      </tr>
    </tbody>
  </v-table>
  </v-col>
  <v-col cols="1"></v-col>
    </v-row>
  <v-row no-gutters style="display: flex; justify-content: right;">
    <v-btn style="background-color: #fd9f28; color: white;">수정하기</v-btn>
    <v-col cols="1"></v-col>
  </v-row>
</template>

<script>
export default {
  
}
</script>

<style>

</style>