<template>
  <div :style="{paddingTop:'100px'}" id = "tables">
    <P>Board 작성칸입니다</P>

    <form action="./boardwrite" method="post" @submit="onSubmit">
        <table>
            <tr>
                <td>작성자</td>
                <!--
                  <td><input type="text" name="userId" v-bind:value="userid" readonly="readonly" /></td>
                -->
                <td><input type="text" name="userId"  v-model="article.userid" rquired/></td>
            </tr>
            <tr>
                <td>제목</td>
                <td><input type="text" name="subject" v-model="article.subject" required/></td>
            </tr>
            <tr>
                <td>내용</td>
                <td><textarea rows="10" cols="50" name="content" v-model="article.content"></textarea></td>
            </tr>
            
        </table>
        <button type="submit">글쓰기</button>
    </form>
  </div>
</template>

<script>

import { getArticle, modifyArticle } from "../../api/board";
import { useQuasar } from 'quasar'
import { computed } from 'vue'
import { ref, onMounted, onBeforeUnmount } from 'vue'

export default {
  name: "BoardModify",
  data() {
    return {
      article: {
        articleno: 0,
        userid: "",
        subject: "",
        content: "",
      },
      isUserid: false,
    };
  },

  created() { 
    let param = this.$route.params.articleno;

    getArticle(
        param,
        ({ data }) => {
          this.article = data;
        },
        (error) => {
          console.log(error);
        }
      );
      this.isUserid = true;
  },

  methods: {
    onSubmit(event) {
      event.preventDefault();
      let err = true;
      let msg = "";
      !this.article.userid && ((msg = "작성자 입력해주세요"), (err = false), this.$refs.userid.focus());
      err && !this.article.subject && ((msg = "제목 입력해주세요"), (err = false), this.$refs.subject.focus());
      err && !this.article.content && ((msg = "내용 입력해주세요"), (err = false), this.$refs.content.focus());

      if (!err) alert(msg);
      else this.modifyArticle(); 
    },
    onReset(event) {
      event.preventDefault();
      this.article.articleno = 0;
      this.article.subject = "";
      this.article.content = "";
      this.moveList();
    },
    modifyArticle() {
      let param = {
        articleno: this.article.articleno,
        userid: this.article.userid,
        subject: this.article.subject,
        content: this.article.content,
      };
      modifyArticle(
        param,
        ({ data }) => {
          let msg = "수정 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "수정이 완료되었습니다.";
          }
          alert(msg);
          this.moveList();
        },
        (error) => {
          console.log(error);
        }
      );
    },
    moveList() {
      this.$router.replace({ name: "boardlist" });
    },
  },
};
</script>

<style scope>

#tables h1 {
    margin: 50px auto;
}

#tables button {
    border: 2px solid grey;
    padding: 5px 8px;
    border-radius: 3px;
    color: black;
    font-weight: bold;
    text-decoration: none;
    margin: 0;
    border-radius: 3px;
}

#tables button:hover {
    background-color: black;
    color: white;
}

#tables a {
    color: black;
    font-weight: bold;
    text-decoration: none;
}

#tables p {
    margin: 30px 0px;
}

#tables table {
    background-color: whitesmoke;
    margin: 15px auto;
    border: 1px solid black;
    border-collapse: collapse;
}

#tables td {
    width: 120px;
}

#tables tr {
    height: 40px;
    border: 2px solid black;
}

#tables td:nth-child(1) {
    background-color: #606060;
    color: whitesmoke;
    font-weight: bold;
    border-right: 2px solid black;
}

#tables input {
    width: 100%;
    outline: none;
    background-color: whitesmoke;
    border: none;
    text-align: left;
    padding-left: 12px;
}

#tables textarea {
    background-color: whitesmoke;
    outline: none;
    border: none;
    text-align: left;
    padding-left: 12px;
    padding-top: 3px;
}

#tables .login {
    margin-top: 25px;
    margin-right : 10px;
    text-align : right;
}

</style>
