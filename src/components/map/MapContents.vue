<template>
  <div id="map" class="flex justify-center"></div>
</template>

<script>
import Mixins from 'src/api/mixins'

export default {
  inject: ['currentLocation', 'attractionInfoList'],
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
      this.createMarkers()
      kakao.maps.event.addListener(this.map, 'dragend', () =>
        console.log(this.map.getCenter())
      )
    },
    createMarkers() {
      this.attractionInfoList.forEach(attraction => {
        if (attraction.contenttypeid != 38) {
          //console.log(attraction)
          // 마커가 표시될 위치입니다
          var markerPosition = new kakao.maps.LatLng(
            attraction.mapy,
            attraction.mapx
          )

          let imageSrc = ''
          let imageSize = new kakao.maps.Size(40, 40)
          let imageOption = { offset: new kakao.maps.Point(0, 0) }

          if (attraction.cat3 == 'A05020900') {
            imageSrc = require('../../../public/icons/cafe.png')
          } else if (
            attraction.contenttypeid == 12 ||
            attraction.contenttypeid == 14 ||
            attraction.contenttypeid == 15 ||
            attraction.contenttypeid == 25 ||
            attraction.contenttypeid == 28
          ) {
            imageSrc = require('../../../public/icons/attraction.png')
          } else if (attraction.contenttypeid == 32) {
            imageSrc = require('../../../public/icons/hotel.png')
          } else {
            imageSrc = require('../../../public/icons/restaurant.png')
          }

          //console.log(attraction.contenttypeid + ' ' + imageSrc)
          const markerImage = new kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
            imageOption
          )

          // 마커를 생성합니다
          var marker = new kakao.maps.Marker({
            position: markerPosition,
            image: markerImage
          })

          // 마커가 지도 위에 표시되도록 설정합니다
          marker.setMap(this.map)
        }
      })
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
