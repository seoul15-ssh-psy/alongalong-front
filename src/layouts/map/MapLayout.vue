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
        class="fixed z-max q-mt-md"
        style="width: 200px; height: 50px; left: 50%; border-radius: 100px"
        color="indigo-3"
        @click="refreshMap()"
      >
        <q-icon name="refresh" color="white"></q-icon>
        <div class="text-bold q-ml-xs" style="font-size: 1.3em">
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
import { mapState, mapActions } from 'vuex'
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
    ...mapActions(locationStore, [
      'callCurrentLocation',
      'callLocation2Region',
      'callLocationBasedList'
    ]),
    async initialization() {
      await this.callCurrentLocation()
      this.callLocation2Region(this.currentLocation)
      await this.callLocationBasedList(this.currentLocation)
      this.$refs.map.createMarkers()
    },
    async refreshMap() {
      this.callLocation2Region(this.currentLocation)
      await this.callLocationBasedList(this.currentLocation)
      this.$refs.map.removeMarkers()
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
