<template>
  <div id="map"></div>
</template>

<script>
import { kakaoAppKey } from 'boot/key.js'
export default {
  data() {
    return {
      map: null
    }
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.loadMap()
    } else {
      this.loadScript()
    }
  },
  methods: {
    loadScript() {
      const script = document.createElement('script')
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoAppKey}&autoload=false`
      script.onload = () => window.kakao.maps.load(this.loadMap)
      document.head.appendChild(script)
    },
    loadMap() {
      const container = document.getElementById('map')
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3
      }
      this.map = new window.kakao.maps.Map(container, options)
    }
  }
}
</script>

<style>
#map {
  width: 100%;
  height: 100vh;
}
</style>
