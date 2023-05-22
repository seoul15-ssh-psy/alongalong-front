<template>
  <div :style="{paddingTop:'100px'}" id="tableList">
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
          			<td @click="viewArticle(article)">
						<div class="articleContent">
							<p>{{article.subject}}</p>
							<p v-if="article.isNew" :style="[{color:'red'}]">new!!</p>
						</div>
					</td>
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
import { mapMutations } from "vuex";
import memberStore from "src/store/modules/memberStore";


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

	mounted() { 
		
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
			this.articles[j].isNew = this.checkIsNew(this.articles[j].regtime);
			this.articles[j].regtime = this.convertTime(this.articles[j].regtime);
        }
      },
      (error) => {
        console.log(error);
      }
      
    );
  },
	methods: {

		...mapMutations(memberStore, ['OPEN_LOGIN_MODAL', 'CLOSE_LOGIN_MODAL']),
		
		moveWrite() {
			this.$router.push({
				name: "boardwrite"
			}).then(()=>{ 

			}).catch(() => { 
				this.$emit("showLogInModal");
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
		checkIsNew(regtime) { 
			let time = new Date() - new Date(regtime);
			if (time < 86400000) {
				return true;
			} else { 
				return false;
			}
		}
		
  	},
};
</script>

<style scope>
#tableList .tdClass {
  width: 50px;
  text-align: center;
}
#tableList .tdSubject {
  width: 300px;
  text-align: left;
  
}


#tableList button {
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

#tableList button:hover {
	background-color: black;
	color: white;
}

#tableList a {
	text-decoration: none;
	margin: 3px;
	color: black;
}

#tableList table {
	background-color: whitesmoke;
	margin: 15px auto;
	border: 1px solid grey;
	border-collapse: collapse;
}

#tableList td {
	width: 120px;
  	text-align: center;
	margin: auto;
}

#tableList tr {
	height: 40px;
}

#tableList tr:nth-child(1) {
	background-color: black;
	color: white;
	font-weight: bold;
}

#tableList tr:hover {
	background-color: white;
	font-weight: bold;
	color: black;
	cursor: pointer;
}

#tableList tr:nth-child(1):hover {
	background-color: black;
	color: white;
}

#tableList .login {
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
.articleContent{
	display: flex;
	flex-direction: row;
	align-items:center;
}

</style>
