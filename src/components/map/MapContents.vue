<template>
  <div id="map"></div>
</template>

<script>
export default {
  setup() {
    return {
      myLocation: {
        latitude: 37.471077623795,
        longitude: 126.93920205178
      }
    }
  },
  data() {
    return {
      map: null
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize)
    if (window.kakao && window.kakao.maps) {
      this.loadMap()
    } else {
      this.loadScript()
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
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
          this.myLocation.latitude,
          this.myLocation.longitude
        ),
        level: 3
      }
      this.map = new window.kakao.maps.Map(container, options)
    },
    handleResize(event) {
      map.relayout()
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
