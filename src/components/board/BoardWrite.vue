<template>
  <div class="container">
    <div class="header"></div>
    <form action="./boardwrite" method="post" @submit="onSubmit">
      <div class="text-h4 text-bold q-py-md">글 작성</div>
      <div>
        <q-separator color="black" />

        <!-- 제목 -->
        <div>
          <q-input
            class="q-pt-lg q-pb-md text-h5"
            v-model="article.subject"
            placeholder="제목을 입력하세요"
            borderless
            dense
          />
        </div>

        <!-- 작성자 -->
        <div class="row q-pb-md">
          <div class="flex col-10 items-center">
            <q-icon name="person" size="30px" class="icon" />
            <div class="text-subtitle1 text-bold q-pl-sm">
              {{ article.userid }}
            </div>
          </div>
        </div>
        <q-separator color="grey-3" />

        <!-- 본문 내용 -->
        <q-editor
          class="q-mt-lg"
          v-model="article.content"
          toolbar-text-color="white"
          toolbar-toggle-color="yellow-8"
          toolbar-bg="blue-10"
          :toolbar="[
            ['bold', 'italic', 'underline'],
            [
              {
                label: $q.lang.editor.formatting,
                icon: $q.iconSet.editor.formatting,
                list: 'no-icons',
                options: ['p', 'h3', 'h4', 'h5', 'h6', 'code']
              }
            ]
          ]"
          style="min-height: 50vh"
        >
        </q-editor>

        <q-separator color="grey-3" class="q-mt-xl q-mb-lg" />
        <!-- 파일 업로드 -->
        <q-file outlined v-model="file">
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
        </q-file>
        <q-separator color="black" class="q-mt-lg" />
      </div>
      <div class="row justify-end">
        <button class="submit-btn bg-blue-10" type="submit">등록</button>
      </div>
    </form>
  </div>
</template>

<script>
import { writeArticle, writeArticle2 } from '../../api/board'
import { useQuasar } from 'quasar'
import { computed } from 'vue'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { mapState, mapActions } from 'vuex'

const memberStore = 'memberStore'

export default {
  name: 'BoardWrite',
  data() {
    return {
      article: {
        articleno: 0,
        userid: '',
        subject: '',
        content: ''
      },
      file: null,
      isUserid: false
    }
  },

  created() {
    this.article.userid = this.userInfo.userid
    console.log(this.userInfo.userid)
  },

  computed: {
    ...mapState(memberStore, ['isLogin', 'isLoginError', 'userInfo']),
    ...mapActions(memberStore, ['userConfirm', 'getUserInfo'])
  },

  methods: {
    onFileChange(event) {
      this.file = event.target.files[0]
      console.log(this.file)
    },
    onSubmit(event) {
      event.preventDefault()
      let err = true
      let msg = ''
      !this.article.subject &&
        ((msg = '제목 입력해주세요'), (err = false), this.$refs.subject.focus())
      err &&
        !this.article.content &&
        ((msg = '내용 입력해주세요'), (err = false), this.$refs.content.focus())

      if (!err) alert(msg)
      else {
        this.registArticle()
      }
    },
    onReset(event) {
      event.preventDefault()
      this.article.articleno = 0
      this.article.subject = ''
      this.article.content = ''
      this.moveList()
    },

    registArticle() {
      let param = {
        userid: this.article.userid,
        subject: this.article.subject,
        content: this.article.content
      }
      if (this.file != null) {
        writeArticle(
          param,
          this.file,
          ({ data }) => {
            let msg = '등록 처리시 문제가 발생했습니다.'
            if (data === 'success') {
              msg = '등록이 완료되었습니다.'
            }
            alert(msg)
            this.moveList()
          },
          error => {
            console.log(error)
          }
        )
      } else {
        writeArticle2(
          param,
          ({ data }) => {
            let msg = '등록 처리시 문제가 발생했습니다.'
            if (data === 'success') {
              msg = '등록이 완료되었습니다.'
            }
            alert(msg)
            this.moveList()
          },
          error => {
            console.log(error)
          }
        )
      }
    },
    moveList() {
      this.$router.replace({
        name: 'boardlist',
        query: { pgno: this.$route.query.pgno }
      })
    }
  }
}
</script>

<style scope>
.container {
  width: 55%;
  margin: 0 auto;
  padding: 20px;
}

.header {
  height: 85px;
}

.title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.submit-btn {
  padding: 10px 20px;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  margin: 15px 5px;
}
</style>
