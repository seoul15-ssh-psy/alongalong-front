<template>
  <div :style="{ paddingTop: '100px' }" id="tableList">
    <table>
      <tr>
        <td>번호</td>
        <td>Subject</td>
        <td>User_ID</td>
        <td>등록 시간</td>
        <td>Hit</td>
      </tr>
      <tr v-for="article in articles" v-bind:key="article">
        <td>{{ article.articleno }}</td>
        <td @click="viewArticle(article)">
          <div class="articleContent">
            <p>{{ article.subject }}</p>
            <p v-if="article.isNew" :style="[{ color: 'red' }]">new!!</p>
          </div>
        </td>
        <td>{{ article.userid }}</td>
        <td>{{ article.regtime }}</td>
        <td>{{ article.hit }}</td>
      </tr>
    </table>
    <button @click="moveWrite()">글쓰기</button>
    <div class="q-pa-lg flex flex-center">
      <q-pagination v-model="pg" :min="1" :max="totalPage" ref="hello" direction-links :max-pages="8" boundary-numbers/>
    </div>
  </div>
  <button @click="what">ㅇㅈㅇㅈㅇ</button>

</template>
<script>
import { listArticle, getTotalCount } from '../../api/board'
import { mapMutations } from 'vuex'
import { ref} from 'vue'
import memberStore from 'src/store/modules/memberStore'
import { convertTime } from '../../api/common/timeCal'
export default {
  name: 'BoardList',
  data() {
    return {
      articles: [],
      fields: [
        { key: 'articleno', label: '글번호', tdClass: 'tdClass' },
        { key: 'subject', label: '제목', tdClass: 'tdSubject' },
        { key: 'userid', label: '작성자', tdClass: 'tdClass' },
        { key: 'regtime', label: '작성일', tdClass: 'tdClass' },
        { key: 'hit', label: '조회수', tdClass: 'tdClass' }
      ],
      registTimes: [],
      pg: this.$route.query.pgno,
      spp: 3,
      key: null,
      word: null,
      totalCount: 0,
      totalPage: 1000,
      from: this.$route.query.pgno - ((this.$route.query.pgno-1) % 5),
      to: (Number(this.$route.query.pgno) + (5 - ((this.$route.query.pgno-1) % 5))-1),
      pages: [],
    }
  },
  watch : {
    pg(newpg) { 
      this.$router.push({
			  name: 'boardlist',
			  query: { pgno: this.pg }
		  });
    },
  },
  mounted() {
    this.$refs.hello.set(this.pg);
  },
	
  created() {
    let param = {
      pg: this.pg,
      spp: this.spp,
      key: this.key,
      word: this.word,
      totalCount: this.totalCount,
      totalPage: Math.ceil(this.totalCount / this.ssp),
      from: this.pg - ((this.pg-1) % 5),
      to: (Number(this.pg) + (5 - ((this.pg-1) % 5))-1),
    }

    listArticle(
      param,
      ({ data }) => {
        this.articles = data
        var j = 0
        for (j = 0; j < this.articles.length; j++) {
          this.articles[j].isNew = this.checkIsNew(this.articles[j].regtime)
          this.articles[j].regtime = convertTime(this.articles[j].regtime)
        }
      },
      error => {
        console.log(error)
      }
	  )
	
    getTotalCount(
      param,
      ({ data }) => {
      
        this.totalCount = data.totalCount
        this.totalPage = Math.ceil(this.totalCount / this.spp)

        this.from = this.pg - ((this.pg-1) % 5)
        this.to = (Number(this.pg) + (5 - ((this.pg-1) % 5)))-1
  
        if (this.to > this.totalPage) {
          this.to = this.totalPage
        }
        let j = 0
        for (let i = this.from; i <= this.to; i++) {
          this.pages[j++] = i
        }
      },
      error => {
        console.log(error)
      }
    )
  },
  
  methods: {

    ...mapMutations(memberStore, ['OPEN_LOGIN_MODAL', 'CLOSE_LOGIN_MODAL']),
    
    moveWrite() {
      this.$router
        .push({
          name: 'boardwrite'
          , query: {pgno: this.pg}
        })
        .then(() => {})
        .catch(() => {
          this.$emit('showLogInModal')
        })
    },

    viewArticle(article) {
      this.$router.push({
        name: 'boardview',
        params: { articleno: article.articleno },
        query: {pgno: this.pg}
      })
    }
    ,
    checkIsNew(regtime) {
      let time = new Date() - new Date(regtime)
      if (time < 86400000) {
        return true
      } else {
        return false
      }
	  },
	  what() { 
      console.log("현재 페이지는: " + this.pg);
	  }
	
  }
}
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
.articleContent {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
