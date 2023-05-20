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
