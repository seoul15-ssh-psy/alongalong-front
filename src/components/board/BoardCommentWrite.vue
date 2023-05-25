<template>
  <div style="margin: 0 auto; padding: 30px width:100%; max-width:900px;" id="tableComment">
    <p class="text-subtitle1 text-bold">
      총 {{ commentCount }}개의 댓글이 있습니다.
    </p>

    <form action="./CommentWrite" method="post" @submit="onSubmit">
      <textarea
        :style="[
          { borderRadius: 5 + 'px', borderColor: 'blue-4', resize: 'none' }
        ]"
        class="full-width q-pa-sm"
        rows="5"
        cols="50"
        name="content"
        v-model="writeComment.content"
        ref="content"
        v-if="isLogin"
      ></textarea>
      <div class="row justify-end">
        <button class="submit-btn bg-blue-10 q-mt-md" type="submit">
          댓글쓰기
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { writeComment } from '../../api/board'
import { mapState, mapActions } from 'vuex'

const memberStore = 'memberStore'

export default {
  name: 'BoardCommentWrite',
  props: {
    articleno: Number,
    commentCount: Number
  },
  data() {
    return {
      writeComment: {
        articleno: 0,
        userid: '',
        content: ''
      }
    }
  },

  methods: {
    onSubmit(event) {
      console.log(this.writeComment)
      event.preventDefault()
      let err = true
      let msg = ''
      !this.writeComment.content &&
        ((msg = '내용을 입력해주세요'),
        (err = false),
        this.$refs.content.focus())
      if (!err) alert(msg)
      else {
        this.registComment()
      }
    },

    registComment() {
      let param = {
        userid: this.writeComment.userid,
        articleno: this.writeComment.articleno,
        content: this.writeComment.content
      }
      writeComment(
        param,
        ({ data }) => {
          let msg = '등록 처리시 문제가 발생했습니다.'
          if (data === 'success') {
            msg = '등록이 완료되었습니다.'
          }
          alert(msg)
          location.reload()
        },
        error => {
          console.log(error)
        }
      )
    }
  },
  created() {
    this.writeComment.articleno = this.articleno
    this.writeComment.userid = this.userInfo.userid
  },

  computed: {
    ...mapState(memberStore, ['isLogin', 'isLoginError', 'userInfo']),
    ...mapActions(memberStore, ['userConfirm', 'getUserInfo'])
  }
}
</script>

<style lang="scss" scoped>
.submit-btn {
  padding: 7px 20px;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  margin: 10px 5px;
}
</style>
