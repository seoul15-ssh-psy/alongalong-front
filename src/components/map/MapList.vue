<template>
  <div class="items-stretch" style="width: 100%">
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
      <attraction-card
        v-for="(item, index) in this.attractionInfoList"
        :key="index"
        :imageUrl="item.firstimage"
        :title="item.title"
        :category="item.cat1"
        :distance="0.1"
      ></attraction-card>
    </q-scroll-area>
  </div>
</template>
<script>
import Mixins from 'src/api/mixins'
import AttractionCard from './AttractionCard.vue'
export default {
  components: {
    AttractionCard
  },
  mixins: [Mixins],
  inject: ['attractionInfoList']
}
</script>
