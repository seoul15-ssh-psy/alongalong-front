<template>
  <div v-if="width > 1400" align="center">
    <q-btn-toggle
      v-model="model"
      toggle-color="teal-4"
      flat
      :options="region"
      no-wrap
      spread
    />
  </div>
  <div v-else align="center">
    <q-scroll-area style="height: 50px">
      <div class="row no-wrap">
        <div v-for="n in region.length" :key="n" class="q-pa-sm"></div>
        <q-btn
          v-for="(item, index) in region"
          :key="index"
          flat
          no-wrap
          :label="item.label"
        />
      </div>
    </q-scroll-area>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    return {
      region: [
        { label: '서울', value: 'seoul' },
        { label: '인천', value: 'incheon' },
        { label: '대전', value: 'daejeon' },
        { label: '대구', value: 'daegu' },
        { label: '광주', value: 'gwangju' },
        { label: '부산', value: 'busan' },
        { label: '울산', value: 'ulsan' },
        { label: '경기', value: 'gyeongi' },
        { label: '강원', value: 'gangwon' },
        { label: '충북', value: 'choongbuk' },
        { label: '충남', value: 'choongnam' },
        { label: '경북', value: 'gyeongbuk' },
        { label: '경남', value: 'gyeongnam' },
        { label: '전북', value: 'jeonbuk' },
        { label: '전남', value: 'jeonnam' },
        { label: '제주', value: 'jeju' }
      ],
      handleSwipe({ evt, ...newInfo }) {
        info.value = newInfo
      },
      model: ref('seoul') // 초기값 지정
    }
  },
  data() {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize)
  },
  beeforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize(event) {
      this.width = window.innerWidth
      this.height = window.innerHeight
    }
  }
}
</script>

<style></style>
