<template>
  <div :style="{ paddingTop: '100px' }" id="tableWrite">
    <P>Board 작성칸입니다</P>

    <form action="./boardwrite" method="post" @submit="onSubmit">
      <table>
        <tr>
          <td>작성자</td>
          <!--
                  <td><input type="text" name="userId" v-bind:value="userid" readonly="readonly" /></td>
                -->
          <td>
            <input
              type="text"
              name="userId"
              v-model="userInfo.userid"
              rquired
            />
          </td>
        </tr>
        <tr>
          <td>제목</td>
          <td>
            <input
              type="text"
              name="subject"
              v-model="article.subject"
              required
            />
          </td>
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
          <td>
            <input type="file" @change="onFileChange" name="file" />
          </td>
        </tr>
      </table>
      <button type="submit">글쓰기</button>
    </form>
  </div>
</template>

<script>
import { writeArticle , writeArticle2} from '../../api/board'
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
    console.log(this.userInfo.userid);
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
#tableWrite h1 {
  margin: 50px auto;
}

#tableWrite button {
  border: 2px solid grey;
  padding: 5px 8px;
  border-radius: 3px;
  color: black;
  font-weight: bold;
  text-decoration: none;
  margin: 0;
  border-radius: 3px;
}

#tableWrite button:hover {
  background-color: black;
  color: white;
}

#tableWrite a {
  color: black;
  font-weight: bold;
  text-decoration: none;
}

#tableWrite p {
  margin: 30px 0px;
}

#tableWrite table {
  background-color: whitesmoke;
  margin: 15px auto;
  border: 1px solid black;
  border-collapse: collapse;
}

#tableWrite td {
  width: 120px;
}

#tableWrite tr {
  height: 40px;
  border: 2px solid black;
}

#tableWrite td:nth-child(1) {
  background-color: #606060;
  color: whitesmoke;
  font-weight: bold;
  border-right: 2px solid black;
}

#tableWrite input {
  width: 100%;
  outline: none;
  background-color: whitesmoke;
  border: none;
  text-align: left;
  padding-left: 12px;
}

#tableWrite textarea {
  background-color: whitesmoke;
  outline: none;
  border: none;
  text-align: left;
  padding-left: 12px;
  padding-top: 3px;
}

#tableWrite .login {
  margin-top: 25px;
  margin-right: 10px;
  text-align: right;
}
</style>
