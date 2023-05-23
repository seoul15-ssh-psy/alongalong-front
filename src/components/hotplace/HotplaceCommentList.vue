<template>
  <div id="tableComment">
    <div v-for="comment in commentList" v-bind:key="comment" class="row">
      <p>{{ comment.userid }}</p>
      <p>{{ comment.content }}</p>
      <p>{{ comment.regtime }}</p>

    </div>
  </div>
</template>

<script>
import { getComments } from '../../api/hotplace'
import { useQuasar } from 'quasar'
import { mapState, mapActions } from 'vuex'
import { convertTime} from "../../api/common/timeCal"

const memberStore = 'memberStore'

export default {
  name: 'HotplaceCommentList',
  props: {
    articleno: Number,
  },
  data() {
    return {
      commentList: [],
    }
  },
  created() { 

    getComments(
      this.articleno,
      ({ data }) => {
        this.commentList = data
        var j = 0
        for (j = 0; j < this.commentList.length; j++) {
          this.commentList[j].regtime = convertTime(this.commentList[j].regtime)
        }
        console.log(this.commentList);
        console.log(this.commentList.length);

      },
      error => {
        console.log(error)
      }
	  )

  },


  methods: {
    
  },

  computed: {
    ...mapState(memberStore, ['isLogin', 'isLoginError', 'userInfo']),
    ...mapActions(memberStore, ['userConfirm', 'getUserInfo'])
  },

  
}
</script>

<style scope></style>
