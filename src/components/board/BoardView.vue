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
          <div class="text-subtitle2">{{ article.userid }}</div>
          <q-separator vertical size="2px" color="grey-5" inset spaced />
          <div class="text-caption">{{ article.regtime }}</div>
        </div>
        <div class="flex col-2 items-center">
          <q-icon class="on-right" name="favorite" color="red" size="18px" />
          <div class="text-subtitle2 q-px-sm">{{ 24 }}</div>
          <q-icon
            class="on-right"
            name="o_visibility"
            color="black"
            size="18px"
          />
          <div class="text-subtitle2 q-px-sm">{{ article.hit }}</div>
        </div>
      </div>
      <q-separator color="grey-5" />

      <!-- 본문 내용 -->
      <div class="q-pa-lg" style="height: 50vh">
        <div v-html="article.content"></div>
        <div id="imgDiv"></div>
      </div>

      <q-separator color="grey-5" class="q-mt-xl q-mb-lg" />

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
      <q-separator color="black" class="q-mt-lg q-mb-md" />
      <div class="flex justify-end">
        <button type="submit" @click="moveModifyArticle" v-if="checkSameUser()">
          수정하기
        </button>
        <button type="submit" @click="deleteArticle" v-if="checkSameUser()">
          삭제하기
        </button>
        <button @click="moveList">목록보기</button>
      </div>
      <board-comment-write
        v-if="isLogin"
        :articleno="this.$route.params.articleno"
      ></board-comment-write>
      <board-comment-list
        :articleno="this.$route.params.articleno"
      ></board-comment-list>
    </div>
  </div>
</template>

<script>
import BoardCommentWrite from 'src/components/board/BoardCommentWrite.vue'
import BoardCommentList from 'src/components/board/BoardCommentList.vue'
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
      src: ''
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
  width: 50%;
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

#imgDiv {
  margin-bottom: 20px;
}

button {
  padding: 10px 20px;
  background-color: $primary;
  color: white;
  border: none;
  cursor: pointer;
  margin-right: 10px;
  border-radius: 10px;
}

button:hover {
  background-color: #45a049;
}
</style>
