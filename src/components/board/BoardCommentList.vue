<template>
  <div style="margin: 0 auto; width:100%; max-width:900px;" id="tableComment">
    <q-separator color="grey-3" class="q-mb-md" />
    <div v-for="comment in commentList" v-bind:key="comment">
      <div class="row q-pl-xs" style="">
        <p class="q-pr-md text-subtitle2 text-bold" style="margin-bottom:10px;">{{ comment.userid }}</p>
        <p class="text-subtitle2 text-grey-8" style="margin-bottom:10px;">{{ comment.regtime }}</p>
      </div>
      <div class="row q-pb-sm row q-pl-xs" style="font-size:17px; font-weight:00;">{{ comment.content }}</div>
      <q-separator color="grey-3" class="q-mb-md" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

const memberStore = 'memberStore'

export default {
  name: 'BoardCommentList',
  props: {
    articleno: Number,
    commentList: Array
  },

  methods: {},

  computed: {
    ...mapState(memberStore, ['isLogin', 'isLoginError', 'userInfo']),
    ...mapActions(memberStore, ['userConfirm', 'getUserInfo'])
  }
}
</script>

<style scoped>

</style>
