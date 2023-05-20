<template>
  <div :style="{paddingTop:'100px'}">
    <table>
			<tr>
				<td>번호</td>
				<td>Subject</td>
				<td>User_ID</td>
        <td>등록 시간</td>
				<td>Hit</td>
			</tr>
				<tr v-for="article in articles" v-bind:key="article">
					<td>{{article.articleno}}</td>
          <td @click="viewArticle(article)">{{article.subject}}</td>
					<td>{{article.userid}}</td>
					<td>{{article.regtime}}</td>
					<td>{{article.hit}}</td>
				</tr>
		</table>
    <button @click="moveWrite()">글쓰기</button>
  </div>
</template>

<script>

import { listArticle } from "../../api/board";
import { useQuasar } from 'quasar'
import { computed } from 'vue'
import { ref, onMounted, onBeforeUnmount } from 'vue'

export default {
  name: "BoardList",
  data() {
    return {
      articles: [],
      fields: [
        { key: "articleno", label: "글번호", tdClass: "tdClass" },
        { key: "subject", label: "제목", tdClass: "tdSubject" },
        { key: "userid", label: "작성자", tdClass: "tdClass" },
        { key: "regtime", label: "작성일", tdClass: "tdClass" },
        { key: "hit", label: "조회수", tdClass: "tdClass" },
      ],
      registTimes: [],
    };
  },
  created() {
    let param = {
      pg: 1,
      spp: 20,
      key: null,
      word: null,
    };
    listArticle(
      param,
      ({ data }) => {
        this.articles = data;
        var j = 0;
        for (j = 0; j < this.articles.length; j++) { 
          this.articles[j].regtime = this.convertTime(this.articles[j].regtime);
        }
      },
      (error) => {
        console.log(error);
      }
      
    );
  },
  methods: {
    moveWrite() {
      this.$router.push({
        name: "boardwrite"
      });
    },
    viewArticle(article) {
      this.$router.push({
        name: "boardview",
        params: { articleno: article.articleno },
      });
    },
    convertTime(regtime) { 
		let time = new Date() - new Date(regtime);
		//59분전
    if (time < 60000) { 
      return "최근";
    }
		else if (time < 3599999) {
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
  },
};
</script>

<style scope>
.tdClass {
  width: 50px;
  text-align: center;
}
.tdSubject {
  width: 300px;
  text-align: left;
  
}


button {
	border: 2px solid grey;
	padding: 3px 8px;
	border-radius: 3px;
	color: black;
	font-weight: bold;
	text-decoration: none;
	height: 30px;
	margin: 0;
	border-radius: 3px;
}

button:hover {
	background-color: black;
	color: white;
}

a {
	text-decoration: none;
	margin: 3px;
	color: black;
}

table {
	background-color: whitesmoke;
	margin: 15px auto;
	border: 1px solid grey;
	border-collapse: collapse;
}

td {
	width: 120px;
  text-align: center;
	margin: auto;
}

tr {
	height: 40px;
}

tr:nth-child(1) {
	background-color: black;
	color: white;
	font-weight: bold;
}

tr:hover {
	background-color: white;
	font-weight: bold;
	color: black;
	cursor: pointer;
}

tr:nth-child(1):hover {
	background-color: black;
	color: white;
}

.login {
	margin-top: 25px;
	margin-right: 10px;
	text-align: right;
}

#trash {
	font-size: 30px;
}

#trash:hover {
	color: red;
}

</style>
