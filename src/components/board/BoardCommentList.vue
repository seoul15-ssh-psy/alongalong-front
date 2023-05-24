<template>
  <div style="margin: 0 auto; padding: 0px 30px" id="tableComment">
    <q-separator color="grey-3" class="q-mb-md" />
    <div v-for="comment in commentList" v-bind:key="comment">
      <div class="row">
        <p class="q-pr-md text-subtitle1 text-bold">{{ comment.userid }}</p>
        <p class="text-subtitle2 text-grey-8">{{ comment.regtime }}</p>
      </div>
      <div class="row q-pb-md">{{ comment.content }}</div>
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

<style scope></style>
