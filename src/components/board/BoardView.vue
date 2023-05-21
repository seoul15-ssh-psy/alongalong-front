<template>
  <div :style="{paddingTop:'100px'}" id="tables"> 
  <table >
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
			<button type="submit" @click="moveModifyArticle" v-if="checkSameUser()">수정하기</button>
			<button type="submit" @click="deleteArticle" v-if="checkSameUser()">삭제하기</button>
		    <button @click="moveList">목록보기</button>
  	</div>
	
  </div>
</template>

<script>
// import moment from "moment";
import { getArticle, downloadFile } from "../../api/board";
import { mapState } from "vuex";

const memberStore = "memberStore";

export default {
  name: "BoardDetail",
  data() {
    return {
		article: {},
		file: {},
		src:"",
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
		  this.article.regtime = this.convertTime(this.article.regtime);
		  
		  downloadFile(
			this.article.articleno,
			  ({ data }) => {
				  console.log(typeof(data));
				  let a = data;
				  let reader = new FileReader();
				  reader.onload = () => { 
					  this.file = reader.result;
				  }
				  reader.readAsDataURL(a);
				  console.log(data);
			},
			(error) => {
				console.log(error);
			  }
			
		);
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
			this.$router.push({
			name: "boarddelete",
			params: { articleno: this.article.articleno },
			});
		}
	  },
      moveList() {
        this.$router.push({ name: "boardlist" });
	  },
	  convertTime(regtime) { 
		let time = new Date() - new Date(regtime);
		//59분전
		if (time < 3599999) {
			return Math.floor(time / 60000) + " 분 전";
		}
		//23시간 전
		else if (time < 82800000) {
			return Math.floor(time / 3600000) + "시간 전";
		}
		//6일 전
		else if (time < 604799999) {
			return Math.floor(time / 86400000) + "일 전";
		}
		//? 주 전
		else if (time < 2629799999) {
			return Math.floor(time / 604800016) + "주 전";
		}
		//1년 전
		else if (time < 31557599999) {
			return Math.floor(time / 2629800000) + "개월 전";
		}
		else { 
			return Math.floor(time / 31557600000) + "년 전";
		}
	  },
	  checkSameUser() { 
		  if (this.userInfo!=null && this.article.userid == this.userInfo.userid) {
			  return true;
		  } else { 
			  return false;
		  }
	  }
  },
  // filters: {
  //   dateFormat(regtime) {
  //     return moment(new Date(regtime)).format("YY.MM.DD hh:mm:ss");
  //   },
  // },
};
</script>

<style scope>
#tables * {
	text-align: center;
	margin: auto;
	font-family: 'Raleway', sans-serif;
}

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
	font-size: 16px;
}

#tables td {
	width: 400px;
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
	width: 35%;
}

#tables input {
	width: 100%;
	outline: none;
	background-color: whitesmoke;
	border: none;
	text-align: left;
	padding-left: 12px;
}

#tables #tables textarea {
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

#tables .login {
	margin-top: 25px;
	margin-right: 10px;
	text-align: right;
}
</style>
