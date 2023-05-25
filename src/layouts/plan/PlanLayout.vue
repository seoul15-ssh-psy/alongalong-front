<template>
  <div style="height: 85px"></div>
  <div>
    <q-layout
      view="hHh Lpr lff"
      container
      class="rounded-borders"
      :style="[{ height: this.windowHeight + 'px' }, { zIndex: 3 }]"
    >
      <!-- 제목 -->
      <div id="tableHeader">
        <p id="upperText" style="">여행계획🚗</p>
        <div id="upperTextBorder"></div>
      </div>
      <drag-and-drop-contents></drag-and-drop-contents>
    </q-layout>
  </div>
</template>

<script>
import Mixins from '../../api/common/mixins'
import DragAndDropContents from 'src/components/plan/DragAndDropContents.vue'
import { mapState, mapActions } from 'vuex'

const memberStore = 'memberStore'
const locationStore = 'locationStore'

export default {
  components: { DragAndDropContents },
  mixins: [Mixins],
  computed: {
    ...mapState(memberStore, ['isLogin', 'userInfo'])
  },
  methods: {
    ...mapActions(locationStore, ['callBookMarked', 'callMyPlans'])
  },
  created() {
    if (this.isLogin) {
      this.callBookMarked(this.userInfo)
      this.callMyPlans(this.userInfo)
    }
  }
}
</script>
<style scoped>
#tableHeader {
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
</style>
