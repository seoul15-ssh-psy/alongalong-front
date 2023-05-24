<template>
  <div style="padding-top: 100px; " id="tableListDiv">
    <div id="tableHeader">
      <p id="upperText" style="">자유게시판</p>
      <div id="upperTextBorder"></div>
    </div>
    <p id="tableCaption">게시글</p>
    <table id="tableList">
      <tr>
        <td>번호</td>
        <td>Subject</td>
        <td>User_ID</td>
        <td>등록 시간</td>
        <td>Hit</td>
      </tr>
      <tr v-for="article in articles" v-bind:key="article">
        <td>{{ article.articleno }}</td>
        <td @click="viewArticle(article)" class="clickable">
          <div class="articleContent">
            <p>{{ article.subject }}</p>
            <q-badge rounded color="red" label="new" v-if="article.isNew" class="q-ml-xs" />
          </div>
        </td>
        <td>{{ article.userid }}</td>
        <td>{{ article.regtime }}</td>
        <td>{{ article.hit }}</td>
      </tr>
    </table>
    <q-btn unelevated rounded  color="primary" label="글쓰기" @click="moveWrite()" style="float:right; margin-top:10px;"/>
    <div class="q-pa-lg flex flex-center">
      <q-pagination v-model="pg" :min="1" :max="totalPage" ref="hello" direction-links :max-pages="8" boundary-numbers size="md" class="q-mt-lg"/>
    </div>
  </div>

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
      spp: 15,
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

#tableListDiv{
  width:55%;
  min-width:500px;
  margin-left:auto;
  margin-right:auto;
  margin-bottom:200px;
}

.articleContent {
  display: flex;
  flex-direction: row;
  align-items: center;
}

#tableHeader{
  border-width: 0.13rem 0rem 0.13rem 0rem; 
  border-style:solid; 
  border-color:lightgray; 
  margin-top:110px;
}

#upperText{
  margin-top:10px;
  margin-bottom:10px;
  text-align:center; 
  font-weight:600; 
  font-size:30px;
}

#tableCaption{
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 10px;
  margin-top: 50px;
}

#upperTextBorder{
  border-width: 0rem 0rem 0.23rem 0rem; 
  border-style:solid; 
  border-color:rgb(9, 177, 255); 
  margin-left:auto; 
  margin-right:auto; 
  width:70px;
  margin-bottom:2px;
}

#tableList{
  border-width:0.13rem 0rem 0rem 0rem;
  border-style:solid; 
  border-collapse: collapse; 
  text-align: center;
  width:100%;
}

#tableList tr{
  border-width:0rem 0rem 0.08rem 0rem;
  border-style:solid; 
  border-collapse: collapse; 
  border-color: lightgray;
  height: 50px;
}

#tableList tr:first-child{
  color:black;
  font-size: 16px;
  font-weight: 600;
}

#tableList tr:nth-child(n+2){
  color:black;
  background-color:white
}

#tableList tr:nth-child(n+2):hover{
  background-color:rgb(245, 245, 245);
}

#tableList tr:nth-child(n+2) .articleContent:hover{
  color:rgb(163, 163, 163);
}

#tableList tr td:first-child{
  width:8%;
}

#tableList tr td:nth-child(2){
  width:45%;
}

#tableList tr td:nth-child(3){
  width:10%;
}

#tableList tr td:nth-child(4){
  width:15%;
}

#tableList tr td:nth-child(5){
  width:8%;
}

#tableList tr:nth-child(n+2) td:nth-child(2){
  font-size: 16px;
  text-overflow: ellipsis;
}


#tableList tr:nth-child(n+2) td:nth-child(n+3){
  color:rgb(82, 82, 82) !important;
}



.articleContent p{
  margin-top:auto ;
  margin-bottom:auto ;
}

.articleContent{
  padding-left : 10px;
}

</style>
