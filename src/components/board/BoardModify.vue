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
          <template v-slot:append>
            <q-icon
              v-if="file !== null"
              name="close"
              @click.stop.prevent="file = null"
              class="cursor-pointer"
            />
          </template>
        </q-file>
        <q-separator color="black" class="q-mt-lg" />
      </div>
      <div class="row justify-end">
        <button class="submit-btn bg-dark" type="button" @click="moveList">
          취소
        </button>
        <button class="submit-btn bg-blue-10" type="submit">수정</button>
      </div>
    </form>
  </div>
</template>

<script>
import { getArticle, modifyArticle, getFile } from '../../api/board'
import { useQuasar } from 'quasar'
import { computed } from 'vue'
import { ref, onMounted, onBeforeUnmount } from 'vue'

export default {
  name: 'BoardModify',
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
    let param = this.$route.params.articleno

    getArticle(
      param,
      ({ data }) => {
        this.article = data
      },
      error => {
        console.log(error)
      }
    )
    this.isUserid = true
  },

  methods: {
    onSubmit(event) {
      event.preventDefault()
      let err = true
      let msg = ''
      !this.article.userid &&
        ((msg = '작성자 입력해주세요'),
        (err = false),
        this.$refs.userid.focus())
      err &&
        !this.article.subject &&
        ((msg = '제목 입력해주세요'), (err = false), this.$refs.subject.focus())
      err &&
        !this.article.content &&
        ((msg = '내용 입력해주세요'), (err = false), this.$refs.content.focus())

      if (!err) alert(msg)
      else this.modifyArticle()
    },
    onReset(event) {
      event.preventDefault()
      this.article.articleno = 0
      this.article.subject = ''
      this.article.content = ''
      this.moveList()
    },
    modifyArticle() {
      let param = {
        articleno: this.article.articleno,
        userid: this.article.userid,
        subject: this.article.subject,
        content: this.article.content
      }
      modifyArticle(
        param,
        ({ data }) => {
          let msg = '수정 처리시 문제가 발생했습니다.'
          if (data === 'success') {
            msg = '수정이 완료되었습니다.'
          }
          alert(msg)
          this.moveList()
        },
        error => {
          console.log(error)
        }
      )
    },
    moveList() {
      this.$router.replace({ name: 'boardlist' })
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
