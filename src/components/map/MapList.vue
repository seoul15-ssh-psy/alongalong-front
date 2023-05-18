<template>
  <div class="items-stretch" style="width: 100%">
    <q-scroll-area
      :style="{ height: windowHeight - 360 + 'px' }"
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
        v-for="(item, index) in attractionInfoList"
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
import AttractionCard from './AttractionCard.vue'
export default {
  components: {
    AttractionCard
  },
  setup() {
    return {}
  },
  data() {
    return {
      windowHeight: window.innerHeight,
      attractionInfoList: []
    }
  },
  created() {
    this.getAttractionInfoList()
  },
  mounted() {
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize(event) {
      this.windowHeight = window.innerHeight
    },
    async getAttractionInfoList() {
      // 사용자 위치 기반 주변 여행지 정보 불러오기
      const apiUrl =
        `${process.env.LOCATION_BASED_SEARCH_API}` +
        `&numOfRows=50&pageNo=1&MobileOS=ETC&MobileApp=AlongAlong&_type=json&listYN=Y&arrange=O&mapX=${126.93920205178}&mapY=${37.471077623795}&radius=2000`
      this.attractionInfoList = await fetch(apiUrl)
        .then(result => result.json())
        .then(data => data.response.body.items.item)
    }
  }
}
</script>
