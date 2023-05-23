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
          v-if="
            item.contenttypeid != 38 &&
            item.contenttypeid != 15 &&
            item.contenttypeid != 25
          "
          v-bind:attraction="item"
        ></attraction-card>
      </template>
    </q-scroll-area>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Mixins from '../../api/common/mixins'
import AttractionCard from './AttractionCard.vue'

const locationStore = 'locationStore'

export default {
  components: {
    AttractionCard
  },
  mixins: [Mixins],
  computed: {
    ...mapState(locationStore, ['attractionInfoList'])
  }
}
</script>
