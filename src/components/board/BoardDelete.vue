<template>
  <div :style="[{paddingTop:'100px'},{height:'100%'}]">
  </div>
</template>

<script>
import { deleteArticle } from "../../api/board";
import { useQuasar, QSpinnerFacebook } from 'quasar'
import { onBeforeUnmount } from 'vue'

export default {
  name: "BoardDelete",
  
  created() {
    let param = this.$route.params.articleno;

    deleteArticle(
      param,
      ({ data }) => {
        let msg = "삭제 처리시 문제가 발생했습니다.";
        if (data === "success") {
          msg = "삭제가 완료되었습니다.";
        }
        alert(msg);
        // 현재 route를 /list로 변경.
        this.$router.push({ name: "boardlist" ,query:{pgno: 1}});
      },
      (error) => {
        console.log(error);
      }
    );
  },

};
</script>


<style scoped>


</style>
