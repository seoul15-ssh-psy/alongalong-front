<template>
  <div id="map" class="flex justify-center"></div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Mixins from 'src/api/mixins'

const locationStore = 'locationStore'

export default {
  mixins: [Mixins],
  data() {
    return {
      map: null,
      markers: [],
      overlays: []
    }
  },
  computed: {
    ...mapState(locationStore, [
      'currentLocation',
      'currentRegion',
      'attractionInfoList'
    ]),
    refreshMap() {
      console.log(this.attractionInfoList)
      return this.attractionInfoList
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
    ...mapMutations('locationStore', [
      'SET_CURRENT_LOCATION',
      'SET_IS_DETAIL_MODAL_VISIBLE',
      'SET_MODAL_CONTENTS'
    ]),
    loadScript() {
      const script = document.createElement('script')
      script.src = `${process.env.KAKAO_API}`
      script.onload = () => window.kakao.maps.load(this.loadMap)
      document.head.appendChild(script)
    },
    loadMap() {
      console.log('loadMap')
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
      kakao.maps.event.addListener(this.map, 'dragend', () => {
        //console.log(this.map.getCenter())
        this.SET_CURRENT_LOCATION({
          latitude: this.map.getCenter().Ma,
          longitude: this.map.getCenter().La
        })
      })
    },
    createMarkers() {
      this.attractionInfoList.forEach(attraction => {
        if (attraction.contenttypeid != 38) {
          //console.log(attraction)
          // 마커가 표시될 위치입니다
          const markerPosition = new kakao.maps.LatLng(
            attraction.mapy,
            attraction.mapx
          )

          let imageSrc = ''
          let imageSize = new kakao.maps.Size(40, 40)

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
          const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize)

          // 마커를 생성합니다
          const marker = new kakao.maps.Marker({
            position: markerPosition,
            image: markerImage
          })

          kakao.maps.event.addListener(marker, 'click', () => {
            this.SET_IS_DETAIL_MODAL_VISIBLE(true)
            this.SET_MODAL_CONTENTS(attraction)
          })
          // 마커가 지도 위에 표시되도록 설정합니다
          marker.setMap(this.map)
          this.markers.push(marker)

          var content = `<div class ="label">
              <span class="left"></span>
              <span class="center bg-blue-grey-1 text-grey-9 text-bold q-pa-xs" style="border-radius: 50px; border: solid 2px; border-color: #b0bec5">${attraction.title}</span>
              <span class="right"></span>
              </div>`

          // 커스텀 오버레이가 표시될 위치입니다
          var position = new kakao.maps.LatLng(attraction.mapy, attraction.mapx)

          // 커스텀 오버레이를 생성합니다
          var customOverlay = new kakao.maps.CustomOverlay({
            position: position,
            content: content,
            yAnchor: 3
          })
          customOverlay.setMap(this.map)
          this.overlays.push(customOverlay)
        }
      })
    },
    remove() {
      this.markers.forEach(marker => {
        marker.setMap(null)
      })
      this.overlays.forEach(overlay => {
        overlay.setMap(null)
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
