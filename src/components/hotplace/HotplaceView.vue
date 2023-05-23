<template>
  <div :style="{ paddingTop: '100px' }" id="tableView">
    <table>
      <tr>
        <td>번호</td>
        <td>{{ article.articleno }}</td>
      </tr>
      <tr>
        <td>작성자</td>
        <td>{{ article.userid }}</td>
      </tr>
      <tr>
        <td>제목</td>
        <td>{{ article.subject }}</td>
      </tr>
      <tr>
        <td>좋아요</td>
        <td>{{ article.hit }}</td>
      </tr>
      <tr>
        <td>작성일</td>
        <td>{{ article.regtime }}</td>
      </tr>
      <tr>
        <td>내용</td>
        <td>
          <textarea
            rows="10"
            cols="50"
            name="content"
            v-model="article.content"
          ></textarea>
        </td>
      </tr>
      <img
        :src="'http://localhost:9999/vue/file/' + article.articleno"
        id="fileImg"
        style="display: none"
      />
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
        ><button>다운로드{{ article.originalfile }}</button></a>
    </table>
    <div id="buttons">
      <button type="submit" @click="moveModifyArticle" v-if="checkSameUser()">
        수정하기
      </button>
      <button type="submit" @click="deleteArticle" v-if="checkSameUser()">
        삭제하기
      </button>
      <button @click="moveList">목록보기</button>
    </div>
    <board-comment-write v-if="isLogin" :articleno="this.$route.params.articleno"></board-comment-write>
    <board-comment-list :articleno="this.$route.params.articleno"></board-comment-list>
  </div>
</template>

<script>
import BoardCommentWrite from "src/components/board/BoardCommentWrite.vue"
import BoardCommentList from "src/components/board/BoardCommentList.vue"
import { convertTime } from '../../api/common/timeCal'
import { getArticle } from '../../api/board'
import { mapState } from 'vuex'

const memberStore = 'memberStore'
const imgPrefix = ['jpg', 'png', 'JPG', 'PNG']

export default {
  name: 'BoardDetail',
  components: { BoardCommentWrite , BoardCommentList},
  data() {
    return {
      article: {},
      file: {},
      src: '',
    }
  },
  computed: {
    ...mapState(memberStore, ['isLogin','userInfo']),
    message() {
      if (this.article.content)
        return this.article.content.split('\n').join('<br>')
      return ''
    }
  },
  created() {
    let param = this.$route.params.articleno

    getArticle(
      param,
      ({ data }) => {
        this.article = data
        this.article.regtime = convertTime(this.article.regtime)
        if (
          this.article.originalfile.split('.')[1] != undefined &&
          imgPrefix.includes(this.article.originalfile.split('.')[1])
        ) {
          document.getElementById('fileImg').style.display = 'block'
        } else {
        }
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
        query: {pgno:this.$route.query.pgno}
      })
    },
    deleteArticle() {
      if (confirm('정말로 삭제?')) {
        this.$router.push({
          name: 'boarddelete',
          params: { articleno: this.article.articleno },
          query: {pgno: this.$route.query.pgno} 
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
  // filters: {
  //   dateFormat(regtime) {
  //     return moment(new Date(regtime)).format("YY.MM.DD hh:mm:ss");
  //   },
  // },
}
</script>

<style scope>
#tableView * {
  text-align: center;
  margin: auto;
  font-family: 'Raleway', sans-serif;
}

#tableView h1 {
  margin: 50px auto;
}

#tableView button {
  border: 2px solid grey;
  padding: 5px 8px;
  border-radius: 3px;
  color: black;
  font-weight: bold;
  text-decoration: none;
  margin: 0;
  border-radius: 3px;
}

#tableView button:hover {
  background-color: black;
  color: white;
}

#tableView a {
  color: black;
  font-weight: bold;
  text-decoration: none;
}

#tableView p {
  margin: 30px 0px;
}

#tableView table {
  background-color: whitesmoke;
  margin: 15px auto;
  border: 1px solid black;
  border-collapse: collapse;
  font-size: 16px;
}

#tableView td {
  width: 400px;
}

#tableView tr {
  height: 40px;
  border: 2px solid black;
}

#tableView td:nth-child(1) {
  background-color: #606060;
  color: whitesmoke;
  font-weight: bold;
  border-right: 2px solid black;
  width: 35%;
}

#tableView input {
  width: 100%;
  outline: none;
  background-color: whitesmoke;
  border: none;
  text-align: left;
  padding-left: 12px;
}

#tableView #tableView textarea {
  background-color: whitesmoke;
  outline: none;
  border: none;
  font-size: 16px;
}

#buttons {
  display: flex;
  justify-content: center;
}

#buttons form,
#buttons a {
  margin: 3px;
}

#tableView .login {
  margin-top: 25px;
  margin-right: 10px;
  text-align: right;
}
</style>
