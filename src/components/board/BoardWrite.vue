<template>
  <div :style="{ paddingTop: '100px' }" id = "tables">
    <P>Board 작성칸입니다</P>

    <form action="./boardwrite" method="post" @submit="onSubmit">
      <table>
        <tr>
          <td>작성자</td>
          <!--
                  <td><input type="text" name="userId" v-bind:value="userid" readonly="readonly" /></td>
                -->
          <td>
            <input type="text" name="userId" v-model="userInfo.userid" rquired />
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
            <input type="file"  @change="onFileChange" name="file">
          </td>
        </tr>
      </table>
      <button type="submit">글쓰기</button>
    </form>
  </div>
</template>

<script>

import { writeArticle, uploadFile } from "../../api/board";
import { useQuasar } from 'quasar'
import { computed } from 'vue'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { mapState, mapActions } from "vuex";

const memberStore = "memberStore";

export default {
  name: "BoardWrite",
  data() {
    return {
      article: {
        articleno: 0,
        userid: "",
        subject: "",
        content: "",
      },
      file:null,
      isUserid: false,
    };
  },

  created() { 
    this.article.userid = this.userInfo.userid;
  },

  computed: {
    ...mapState(memberStore, ["isLogin", "isLoginError", "userInfo"]),
    ...mapActions(memberStore, ["userConfirm", "getUserInfo"]),
  },

  methods: {
    onFileChange(event) { 
      this.file = event.target.files[0];
      console.log(this.file);
    }
    ,
    onSubmit(event) {
      event.preventDefault();
      let err = true;
      let msg = "";
      !this.article.subject && ((msg = "제목 입력해주세요"), (err = false), this.$refs.subject.focus());
      err && !this.article.content && ((msg = "내용 입력해주세요"), (err = false), this.$refs.content.focus());

      if (!err) alert(msg);
      else {
        
        this.registArticle();
      };
    },
    onReset(event) {
      event.preventDefault();
      this.article.articleno = 0;
      this.article.subject = "";
      this.article.content = "";
      this.moveList();
    },

    registFile() { 
      uploadFile(
        this.file,
        ({ data }) => {
          let msg = "등록 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "등록이 완료되었습니다.";
            return "success";
          }
          alert(msg);
        },
        (error) => {
          console.log(error);
          return "fail";
        }
      );
    },
            
    registArticle() {
      let param = {
        userid: this.article.userid,
        subject: this.article.subject,
        content: this.article.content,
      };
      writeArticle(
        param,this.file,
        ({ data }) => {
          let msg = "등록 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "등록이 완료되었습니다.";
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
  margin-right: 10px;
  text-align: right;
}
</style>
