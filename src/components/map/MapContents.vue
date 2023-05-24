<template>
  <div id="map" class="flex justify-center"></div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import Mixins from '../../api/common/mixins'

const locationStore = 'locationStore'
const memberStore = 'memberStore'

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
      'attractionInfoList',
      'isDetailModalVisible',
      'isDetailModalUpdated',
      'modalContents',
      'modalContentsDetail'
    ]),
    ...mapState(memberStore, ['isLogin', 'userInfo']),
    refreshMap() {
      return this.attractionInfoList
    }
  },
  watch: {
    isDetailModalUpdated(status) {
      if (status == true) {
        this.highlightMarker()
        this.callAttractionDetail(this.modalContents)
        this.callAttractionCategory(this.modalContents)
      } else {
        this.remove()
        this.createMarkers()
      }
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
      'SET_IS_DETAIL_MODAL_UPDATED',
      'SET_MODAL_CONTENTS'
    ]),
    ...mapActions('locationStore', [
      'callClosestSubwayStation',
      'callAttractionDetail',
      'callAttractionCategory',
      'callGetIfBookMarked'
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
    createMarkers(target = null) {
      this.attractionInfoList.forEach(attraction => {
        if (
          attraction.contenttypeid != 38 &&
          attraction.contenttypeid != 15 &&
          attraction.contenttypeid != 25
        ) {
          // 마커가 표시될 위치입니다
          if (target != null && attraction.contentid == target.contentid) {
            this.create(attraction, true)
          } else {
            this.create(attraction, false)
          }
        }
      })
    },
    create(attraction, isHighlighted) {
      this.createMarker(attraction)
      this.createOverlay(attraction, isHighlighted)
    },
    remove() {
      this.markers.forEach(marker => {
        marker.setMap(null)
      })
      this.overlays.forEach(overlay => {
        overlay.setMap(null)
      })
    },
    createMarker(attraction) {
      const markerPosition = new kakao.maps.LatLng(
        attraction.mapy,
        attraction.mapx
      )

      let imageSrc = ''
      let imageSize = new kakao.maps.Size(40, 40)

      if (attraction.cat3 == 'A05020900') {
        // 카페
        imageSrc = require('../../../public/icons/cafe.png')
      } else if (
        // 관광지
        attraction.contenttypeid == 12 ||
        attraction.contenttypeid == 14 ||
        attraction.contenttypeid == 28
      ) {
        imageSrc = require('../../../public/icons/attraction.png')
      } else if (attraction.contenttypeid == 32) {
        // 숙박
        imageSrc = require('../../../public/icons/hotel.png')
      } else {
        // 음식점
        imageSrc = require('../../../public/icons/restaurant.png')
      }

      //console.log(attraction.contenttypeid + ' ' + imageSrc)
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize)

      // 마커를 생성합니다
      const marker = new kakao.maps.Marker({
        position: markerPosition,
        image: markerImage
      })

      kakao.maps.event.addListener(marker, 'click', () =>
        this.markerClickHandler(attraction)
      )
      // 마커가 지도 위에 표시되도록 설정합니다
      marker.setMap(this.map)
      this.markers.push(marker)
    },
    createOverlay(attraction, isHighlighted) {
      var content = isHighlighted
        ? `<div class ="label">
              <span class="left"></span>
              <span class="center bg-indigo-6 text-white text-bold q-px-md q-py-sm" style="border-radius: 50px; border: solid 1px; border-color: #3f51b5;">${attraction.title}</span>
              <span class="right"></span>
              </div>`
        : `<div class ="label">
              <span class="left"></span>
              <span class="center bg-white text-grey-9 text-bold q-pa-xs" style="border-radius: 50px; border: solid 1px; border-color: #3f51b5;">${attraction.title}</span>
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
    },
    async markerClickHandler(attraction) {

      if (this.isDetailModalVisible) {
        this.SET_IS_DETAIL_MODAL_VISIBLE(false)
        this.SET_IS_DETAIL_MODAL_UPDATED(false)
      }
      this.map.setCenter(
        new kakao.maps.LatLng(attraction.mapy, Number(attraction.mapx) - 0.002)
      )
      this.SET_IS_DETAIL_MODAL_VISIBLE(true)
      this.SET_MODAL_CONTENTS(attraction)
      await this.callClosestSubwayStation({
        longitude: attraction.mapx,
        latitude: attraction.mapy
      })

      if (this.isLogin) {
        await this.callGetIfBookMarked({
          contentid: attraction.contentid,
          userid: this.userInfo.userid,
        })
      } else { 
        console.log("not login");
      }
      
      this.SET_IS_DETAIL_MODAL_UPDATED(true)
    },
    highlightMarker() {
      this.remove()
      this.createMarkers(this.modalContents)
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
