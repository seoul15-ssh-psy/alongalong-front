<template>
  <div id="map"></div>
</template>

<script>
import Mixins from 'src/api/mixins'
export default {
  inject: ['currentLocation'],
  mixins: [Mixins],
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
      script.src = `${process.env.KAKAO_API}`
      script.onload = () => window.kakao.maps.load(this.loadMap)
      document.head.appendChild(script)
    },
    loadMap() {
      const container = document.getElementById('map')
      const options = {
        center: new window.kakao.maps.LatLng(
          this.currentLocation.latitude,
          this.currentLocation.longitude
        ),
        level: 3
      }
      this.map = new window.kakao.maps.Map(container, options)
      kakao.maps.event.addListener(this.map, 'dragend', () =>
        console.log(this.map.getCenter())
      )
    }
  }
}
</script>

<style>
#map {
  width: 100%;
  height: 100%;
}
</style>
