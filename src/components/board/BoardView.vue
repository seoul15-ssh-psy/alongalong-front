<template>
  <div :style="{paddingTop:'100px'}"> 
  <table>
		<tr>
			<td>번호</td>
			<td>{{article.articleno}}</td>
		</tr>
		<tr>
			<td>작성자</td>
			<td>{{article.userid}}</td>
		</tr>
		<tr>
			<td>제목</td>
			<td>{{article.subject}}</td>
		</tr>
		<tr>
			<td>좋아요</td>
			<td>{{article.hit}}</td>
		</tr>
		<tr>
			<td>작성일</td>
			<td>{{article.regtime}}</td>
		</tr>
		<tr>
			<td>내용</td>
			<td><textarea rows="10" cols="50" name="content" v-model="article.content"></textarea></td>
		</tr>
	  
	</table>
  <div id="buttons">
			<button type="submit" @click="moveModifyArticle">수정하기</button>
			<button type="submit" @click="deleteArticle">삭제하기</button>
		  <button>목록보기</button>
      <button>글쓰기</button>
  </div>
  </div>
</template>

<script>
// import moment from "moment";
import { getArticle } from "../../api/board";
import { mapState } from "vuex";

const memberStore = "memberStore";

export default {
  name: "BoardDetail",
  data() {
    return {
      article: {},
    };
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
    message() {
      if (this.article.content) return this.article.content.split("\n").join("<br>");
      return "";
    },
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
  },
  methods: {
	  moveModifyArticle() {
      this.$router.push({
        name: "boardmodify",
        params: { articleno: this.article.articleno  },
      });
    },
    deleteArticle() {
      if (confirm("정말로 삭제?")) {
        this.$router.replace({
          name: "boarddelete",
          params: { articleno: this.article.articleno },
        });
      }
    },
    moveList() {
      this.$router.push({ name: "boardlist" });
    },
  },
  // filters: {
  //   dateFormat(regtime) {
  //     return moment(new Date(regtime)).format("YY.MM.DD hh:mm:ss");
  //   },
  // },
};
</script>

<style scope>
* {
	text-align: center;
	margin: auto;
	font-family: 'Raleway', sans-serif;
}

h1 {
	margin: 50px auto;
}

button {
	border: 2px solid grey;
	padding: 5px 8px;
	border-radius: 3px;
	color: black;
	font-weight: bold;
	text-decoration: none;
	margin: 0;
	border-radius: 3px;
}

button:hover {
	background-color: black;
	color: white;
}

a {
	color: black;
	font-weight: bold;
	text-decoration: none;
}

p {
	margin: 30px 0px;
}

table {
	background-color: whitesmoke;
	margin: 15px auto;
	border: 1px solid black;
	border-collapse: collapse;
	font-size: 16px;
}

td {
	width: 400px;
}

tr {
	height: 40px;
	border: 2px solid black;
}

td:nth-child(1) {
	background-color: #606060;
	color: whitesmoke;
	font-weight: bold;
	border-right: 2px solid black;
	width: 35%;
}

input {
	width: 100%;
	outline: none;
	background-color: whitesmoke;
	border: none;
	text-align: left;
	padding-left: 12px;
}

textarea {
	background-color: whitesmoke;
	outline: none;
	border: none;
	font-size: 16px;
}

#buttons {
	display: flex;
	justify-content: center;
}

#buttons form, #buttons a {
	margin: 3px;
}

.login {
	margin-top: 25px;
	margin-right: 10px;
	text-align: right;
}
</style>
