<template>
  <div></div>
</template>

<script>
import {STORE_COMMENDS} from '@/store'
import { ApiRequester } from '@/utils'

export default {
  created() {
    const accessToken = this.$route.query.token
    this.$store.commit(STORE_COMMENDS.MUTATIONS.ACCESS_TOKEN, accessToken)
    this.$router.replace('/')
    
    ApiRequester.post('/auth/user-info')
    .then(res => {
      this.$store.commit(STORE_COMMENDS.MUTATIONS.NAME, res.data.data.name)
      this.$store.commit(STORE_COMMENDS.MUTATIONS.ROLE, res.data.data.role)
      this.$store.commit(STORE_COMMENDS.MUTATIONS.PROFILE, res.data.data.profile)
      if (res.data.data.role == 'ROLE_ACADEMY') {
          this.$store.commit(STORE_COMMENDS.MUTATIONS.MYACADEMYID, res.data.data.myAcademyId)
      }
      if (res.data.data.role == 'ROLE_TUTOR') {
          this.$store.commit(STORE_COMMENDS.MUTATIONS.MY_TUTOR_ID, res.data.data.myTutorId)
      }
    })
  },
  methods: {
  }
}
</script>

<style>

</style>