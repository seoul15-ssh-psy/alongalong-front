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
      <q-btn
        class="absolute q-mt-md"
        style="
          width: 200px;
          height: 40px;
          left: 50%;
          border-radius: 100px;
          z-index: 3;
        "
        color="white"
        @click="refresh()"
      >
        <q-icon name="refresh" color="black"></q-icon>
        <div class="text-black text-bold q-ml-xs" style="font-size: 1.3em">
          현 지도에서 검색
        </div>
      </q-btn>
      <!-- 카카오맵 -->
      <div :style="{ height: this.windowHeight + 'px' }">
        <map-contents ref="map"></map-contents>
      </div>
    </q-layout>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import Mixins from '../../api/mixins.js'
import MapDrawer from 'components/map/MapDrawer.vue'
import MapContents from 'components/map/MapContents.vue'

const locationStore = 'locationStore'

export default {
  components: {
    MapDrawer,
    MapContents
  },
  mixins: [Mixins],
  data() {
    return {
      isReady: false,
      iconButtons: [
        {
          iconName: 'o_map',
          bgColor: 'bg-green-3',
          title: '관광지'
        },
        {
          iconName: 'o_restaurant',
          bgColor: 'bg-orange-3',
          title: '음식점'
        },
        {
          iconName: 'o_local_cafe',
          bgColor: 'bg-pink-3',
          title: '카페'
        },
        {
          iconName: 'o_hotel',
          bgColor: 'bg-purple-3',
          title: '숙소'
        }
      ]
    }
  },
  computed: {
    ...mapState(locationStore, [
      'currentLocation',
      'currentRegion',
      'attractionInfoList'
    ])
  },
  methods: {
    ...mapMutations(locationStore, [
      'SET_CURRENT_LOCATION',
      'SET_CURRENT_REGION',
      'SET_ATTRACTION_INFO_LIST',
      'SET_IS_DETAIL_MODAL_VISIBLE',
      'SET_IS_DETAIL_MODAL_UPDATED',
      'SET_MODAL_CONTENTS'
    ]),
    ...mapActions(locationStore, [
      'callCurrentLocation',
      'callLocation2Region',
      'callLocationBasedList'
    ]),
    async initialization() {
      this.SET_CURRENT_LOCATION({})
      this.SET_CURRENT_REGION({})
      this.SET_ATTRACTION_INFO_LIST([])
      this.SET_IS_DETAIL_MODAL_VISIBLE(false)
      this.SET_IS_DETAIL_MODAL_UPDATED(false)
      this.SET_MODAL_CONTENTS({})

      await this.callCurrentLocation()
      await this.refresh()
    },
    async refresh() {
      this.callLocation2Region(this.currentLocation)
      await this.callLocationBasedList(this.currentLocation)
      this.$refs.map.remove()
      this.$refs.map.createMarkers()
    }
  },
  provide() {
    return {
      iconButtons: this.iconButtons
    }
  },
  created() {
    this.initialization()
  }
}
</script>

<style></style>
