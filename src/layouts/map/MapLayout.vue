<template>
  <div style="height: 85px"></div>
  <div>
    <q-layout
      view="hHh Lpr lff"
      container
      class="fixed-bottom shadow-2 rounded-borders"
      :style="[{ height: windowHeight - 85 + 'px' }, { zIndex: 3 }]"
    >
      <!-- 지도 검색 drawer -->
      <map-drawer></map-drawer>
      <!-- 카카오맵 -->
      <div :style="{ height: windowHeight - 85 + 'px' }">
        <map-contents></map-contents>
      </div>
    </q-layout>
  </div>
</template>
<script>
import MapDrawer from 'components/map/MapDrawer.vue'
import MapContents from 'components/map/MapContents.vue'

export default {
  components: {
    MapDrawer,
    MapContents
  },
  data() {
    return {
      windowHeight: window.innerHeight
    }
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
    }
  }
}
</script>

<style></style>
