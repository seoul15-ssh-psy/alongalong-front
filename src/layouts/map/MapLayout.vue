<template>
  <q-layout
    view="hHh Lpr lff"
    container
    style="height: 100vh"
    class="shadow-2 rounded-borders"
  >
    <!-- 지도 검색 drawer -->
    <map-drawer></map-drawer>
    <!-- 카카오맵 -->
    <map-contents></map-contents>
  </q-layout>
</template>
<script>
import HeaderNav from 'components/HeaderNav.vue'
import MapDrawer from 'components/map/MapDrawer.vue'
import MapContents from 'components/map/MapContents.vue'

export default {
  components: {
    HeaderNav,
    MapDrawer,
    MapContents
  }
}
</script>

<style></style>
