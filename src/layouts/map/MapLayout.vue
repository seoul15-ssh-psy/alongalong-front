<template>
  <div style="height: 85px"></div>
  <div>
    <q-layout
      view="hHh Lpr lff"
      container
      class="fixed-bottom shadow-2 rounded-borders"
      :style="[{ height: this.windowHeight + 'px' }, { zIndex: 3 }]"
    >
      <!-- 지도 검색 drawer -->
      <map-drawer></map-drawer>
      <!-- 카카오맵 -->
      <div :style="{ height: this.windowHeight + 'px' }">
        <map-contents v-bind="myLocation"></map-contents>
      </div>
    </q-layout>
  </div>
</template>
<script>
import axios from 'axios'
import Mixins from '../../api/mixins.js'
import MapDrawer from 'components/map/MapDrawer.vue'
import MapContents from 'components/map/MapContents.vue'

export default {
  components: {
    MapDrawer,
    MapContents
  },
  mixins: [Mixins],
  methods: {
    async getCurrentPosition() {
      if (!navigator.geolocation) {
        console.warn('위치 정보를 찾을 수 없습니다.')
      } else {
        navigator.geolocation.getCurrentPosition(
          this.getPositionValue,
          this.getlocationError
        )
      }
    },
    getPositionValue(val) {
      this.myLocation.latitude = val.coords.latitude
      this.myLocation.longitude = val.coords.longitude
      this.getCurrentRegion()
    },
    getlocationError() {
      console.warn('위치 정보를 찾을 수 없습니다.')
    },
    async getCurrentRegion() {
      axios({
        method: 'GET',
        url: 'https://dapi.kakao.com/v2/local/geo/coord2regioncode.json',
        params: {
          x: this.myLocation.longitude,
          y: this.myLocation.latitude
        },
        headers: {
          Authorization: 'KakaoAK ' + process.env.KAKAO_APP_KEY
        }
      }).then(result => {
        this.myRegion = result.data.documents[0]
        console.log(this.myRegion)
      })
    }
  },
  data() {
    return {
      myLocation: {},
      myRegion: {}
    }
  }
}
</script>

<style></style>
