<template>
  <div style="width: 100%">
    <q-scroll-area
      :style="{ height: windowHeight - 280 + 'px' }"
      :bar-style="{
        borderRadius: '5px',
        background: 'grey',
        width: '7px'
      }"
      :thumb-style="{
        borderRadius: '5px',
        background: 'grey',
        width: '7px',
        opacity: 1
      }"
    >
      <template v-for="(item, index) in this.attractionInfoList" :key="index">
        <attraction-card
          v-if="item.contenttypeid != 38"
          :imageUrl="item.firstimage"
          :title="item.title"
          :category="contentType[item.contenttypeid]"
          :distance="0.1"
        ></attraction-card>
      </template>
    </q-scroll-area>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { contentTypeId } from '../../../public/common/global.js'
import Mixins from 'src/api/mixins'
import AttractionCard from './AttractionCard.vue'

const locationStore = 'locationStore'

export default {
  components: {
    AttractionCard
  },
  mixins: [Mixins],
  data() {
    return {
      contentType: contentTypeId
    }
  },
  computed: {
    ...mapState(locationStore, [
      'currentLocation',
      'currentRegion',
      'attractionInfoList'
    ])
  }
}
</script>
