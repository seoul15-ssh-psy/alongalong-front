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
      this.$router.replace({
        name: "boardmodify",
        params: { articleno: this.article.articleno },
      });
      //   this.$router.push({ path: `/board/modify/${this.article.articleno}` });
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

<style></style>
