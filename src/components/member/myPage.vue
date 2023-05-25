<template>
  <div :style="{ paddingTop: '100px' }" id="myPage">
    <div id="myPageHeader">
      <p id="upperText" style="">마이페이지</p>
      <div id="upperTextBorder"></div>
    </div>
    <div class="row q-mt-md" style="justify-content:space-between;">
    <div style=" width:40%; min-width:300px; max-width:500px;margin:0 auto; min-height:200px; margin-top:30px;">
      <div>
          <p class="inputLabel">아이디</p>
          <q-input
            class="text-h6"
            :model-value="userInfo.userid"
            readonly="readonly"
          />
        </div>
        <div class="q-mt-lg">
          <p class="inputLabel">이름</p>
          <q-input
            class="text-h6"
            :model-value="userInfo.username"
            readonly="readonly"
          />
        </div>
        <div class="q-mt-lg">
          <p class="inputLabel">이메일</p>
          <q-input
            class="text-h6"
            :model-value="userInfo.email"
            readonly="readonly"
          />
        </div>
        <div class="q-mt-lg">
          <p class="inputLabel">가입 일자</p>
          <q-input
            class="text-h6"
            :model-value="convertedTime"
            readonly="readonly"
          />
        </div>
    </div>
    <div style="width:20px;">
    </div>
    <div style="width:40%; min-width:300px; max-width:500px; margin:0 auto; min-height:200px;" >
        <div style=" width:100%; height:50%;">
          <div>
            <p style="margin-bottom:10px; margin-top:30px;" class="inputLabel"> 작성한 게시글 ({{ articles.length }})</p>
            <q-scroll-area style="height: 200px; max-width: 500px;" :visible="visible">
              <div v-for="article in articles" :key="article" class="q-py-xs ellipsis" style="width:300px;">
                <p @click="viewArticle(article.articleno)" class="q-mb-xs clickable linkList">{{article.subject}} </p>
              </div>
            </q-scroll-area>
          </div>
        </div >
        <div style=" width:100%; height:50%; margin-top:30px;">
          <div>
            <p style="margin-bottom:10px;" class="inputLabel"> 작성한 댓글 ({{ comments.length }})</p>
            <q-scroll-area style="height: 200px; max-width: 500px;" :visible="visible">
              <div v-for="comment in comments" :key="comment" class="q-py-xs ellipsis " style="width:300px;" >
                <p @click="viewArticle(comment.articleno)" class="q-mb-xs clickable linkList">{{comment.content}} </p>
              </div>
            </q-scroll-area>
          </div>
        </div>
    </div>
    </div>
    
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { convertTime } from '../../api/common/timeCal'
import { getComments, getArticles} from '../../api/member.js'

const memberStore = 'memberStore'

export default {
  name: 'MyPage',
  data() {
    return {
      comments: [],
      articles: [],
      convertedTime: "",
      regTime:"",
    }
  },
  computed: {
    ...mapState(memberStore, ['isLogin','userInfo']),
    
  },

  
  created() {
    
    getComments(
      this.userInfo.userid,
      ({ data }) => {
        if (data.message == "success") {
          this.comments = data.data;
          console.log(this.comments);
          if (this.comments.length == 0) {
            this.comments[0] = "작성한 댓글이 없습니다.";

          }
        } else {

        }
      },
      error => {
        console.log(error)
      }
    ),
      getArticles(
        this.userInfo.userid,
        ({ data }) => {
          if (data.message == "success") {
            this.articles = data.data;
            if (this.articles.length == 0) {
              this.articles[0] = "작성한 글이 없습니다.";
            }
          } else {

          }
        },
        error => {
          console.log(error)
        }
      ),
      this.convertedTime = this.userInfo.joindate + " (" + convertTime(this.userInfo.joindate) + ")";
  },

  methods: {
    viewArticle(articleno) {
      this.$router.push({
        name: 'boardview',
        params: { articleno: articleno },
        query: { pgno: 1 }
      })
    },
  }

}
</script>

<style scoped>
#myPage{
  width: 75%;
  min-width: 550px;
  margin: 0 auto;
  margin-bottom: 200px;
}

#myPageHeader {
  border-width: 0.13rem 0rem 0.13rem 0rem;
  border-style: solid;
  border-color: lightgray;
  margin-top: 110px;
}

#upperText {
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
  font-weight: 600;
  font-size: 30px;
}

#upperTextBorder {
  border-width: 0rem 0rem 0.23rem 0rem;
  border-style: solid;
  border-color: rgb(9, 177, 255);
  margin-left: auto;
  margin-right: auto;
  width: 70px;
  margin-bottom: 2px;
}

.inputLabel{
  margin:0px;
  font-weight:900;
  font-size:14px;
}

.ellipsis{
  overflow: hidden;
  text-overflow: ellipsis;
}

.linkList{
  text-decoration: underline;
}

.linkList:visited{
  color:rgb(74, 0, 97);
}

.linkList:hover{
  color:rgb(74, 0, 97);
}


</style>
