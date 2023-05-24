<template>
  <div class="container">
    <div class="header"></div>
    <div id="tableView">
      <q-separator color="black" class="separator" />
      <!-- 제목 -->
      <div class="row q-pt-sm">
        <div class="col-1">
          <div
            class="full-width text-subtitle1 text-bold text-center text-grey-7"
          >
            {{ 'No. ' + article.articleno }}
          </div>
        </div>
        <div class="col-11 text-h5 text-bold q-px-sm">
          {{ article.subject }}
        </div>
      </div>

      <!-- 글 정보 (작성자, 좋아요수, 조회수) -->
      <div class="row q-py-sm">
        <div class="flex col-10 items-center">
          <q-icon name="person" size="30px" class="icon" />
          <div class="text-subtitle1 text-bold q-pl-sm">
            {{ article.userid }}
          </div>
          <q-separator vertical size="2px" color="grey-5" inset spaced />
          <div class="text-subtitle2 text-grey-7">{{ article.regtime }}</div>
        </div>
        <div class="flex col-2 items-center">
          <q-icon class="on-right" name="favorite" color="red" size="18px" />
          <div class="text-subtitle2 q-px-sm">{{ 3 }}</div>
          <q-icon
            class="on-right"
            name="o_visibility"
            color="black"
            size="18px"
          />
          <div class="text-subtitle2 q-px-sm">{{ article.hit }}</div>
        </div>
      </div>
      <q-separator color="grey-3" />

      <!-- 본문 내용 -->
      <div class="q-pa-lg" style="min-height: 50vh">
        <div v-html="article.content"></div>
        <div id="imgDiv" class="q-my-md"></div>
      </div>

      <q-separator color="grey-3" class="q-mt-xl q-mb-lg" />

      <a
        v-if="article.originalfile"
        :href="
          'http://localhost:9999/vue/file/download/' +
          article.savefolder +
          '/' +
          article.originalfile +
          '/' +
          article.savefile
        "
        style="text-decoration: none; color: grey"
      >
        <div class="row">
          <q-icon name="download" size="20px" color="grey-7" />
          <div
            class="q-ml-sm"
            text-subtitle1
            text-grey-5
            style="text-decoration: underline"
          >
            {{ article.originalfile }}
          </div>
        </div></a
      >
      <q-separator color="black" class="q-mt-lg" />

      <!-- 수정, 삭제, 목록 버튼 -->
      <div class="flex justify-end">
        <button
          class="manage-btn bg-dark"
          type="submit"
          @click="moveModifyArticle"
          v-if="checkSameUser()"
        >
          수정
        </button>
        <button
          class="manage-btn bg-warning"
          type="submit"
          @click="deleteArticle"
          v-if="checkSameUser()"
        >
          삭제
        </button>
        <button class="manage-btn bg-blue-10" @click="moveList">목록</button>
      </div>

      <!-- 댓글 쓰기 -->
      <board-comment-write
        v-if="isLogin"
        :articleno="this.$route.params.articleno"
        :commentCount="this.commentList.length"
      ></board-comment-write>
      <!-- 댓글 리스트 -->
      <board-comment-list
        :articleno="this.$route.params.articleno"
        :commentList="this.commentList"
      ></board-comment-list>
    </div>
  </div>
</template>

<script>
import BoardCommentWrite from 'src/components/board/BoardCommentWrite.vue'
import BoardCommentList from 'src/components/board/BoardCommentList.vue'
import { getComments } from '../../api/board'
import { convertTime } from '../../api/common/timeCal'
import { getArticle } from '../../api/board'
import { mapState } from 'vuex'

const memberStore = 'memberStore'
const imgPrefix = ['jpg', 'png', 'JPG', 'PNG']

export default {
  name: 'BoardDetail',
  components: { BoardCommentWrite, BoardCommentList },
  data() {
    return {
      article: {},
      file: {},
      src: '',
      commentList: []
    }
  },
  computed: {
    ...mapState(memberStore, ['isLogin', 'userInfo']),
    message() {
      if (this.article.content)
        return this.article.content.split('\n').join('<br>')
      return ''
    }
  },
  watch: {
    article: function (newValue) {
      if (
        newValue.originalfile != null &&
        imgPrefix.includes(newValue.originalfile.split('.')[1])
      ) {
        var divElement = document.getElementById('imgDiv')
        var imgElement = document.createElement('img')
        imgElement.src = 'http://localhost:9999/vue/file/' + newValue.articleno
        divElement.appendChild(imgElement)
      } else {
      }
    }
  },
  created() {
    let param = this.$route.params.articleno

    getArticle(
      param,
      ({ data }) => {
        this.article = data
        this.article.regtime = convertTime(this.article.regtime)
        getComments(
          this.article.articleno,
          ({ data }) => {
            console.log(data)
            this.commentList = data
            var j = 0
            for (j = 0; j < this.commentList.length; j++) {
              this.commentList[j].regtime = convertTime(
                this.commentList[j].regtime
              )
            }
            console.log(this.commentList)
            console.log(this.commentList.length)
          },
          error => {
            console.log(error)
          }
        )
      },
      error => {
        console.log(error)
      }
    )
  },

  methods: {
    moveModifyArticle() {
      this.$router.push({
        name: 'boardmodify',
        params: { articleno: this.article.articleno },
        query: { pgno: this.$route.query.pgno }
      })
    },
    deleteArticle() {
      if (confirm('정말로 삭제하시겠습니까?')) {
        this.$router.push({
          name: 'boarddelete',
          params: { articleno: this.article.articleno },
          query: { pgno: this.$route.query.pgno }
        })
      }
    },
    moveList() {
      this.$router.push({
        name: 'boardlist',
        query: { pgno: this.$route.query.pgno }
      })
    },
    checkSameUser() {
      if (
        this.userInfo != null &&
        this.article.userid == this.userInfo.userid
      ) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss">
.container {
  width: 55%;
  margin: 0 auto;
  padding: 20px;
}

.header {
  height: 85px;
}

#tableView {
  margin-top: 20px;
}

.separator {
  margin: 20px 0;
}

.title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.row {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.manage-btn {
  padding: 10px 20px;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  margin: 15px 5px;
}
</style>
