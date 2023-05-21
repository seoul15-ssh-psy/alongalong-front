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
        <map-contents></map-contents>
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
      locationInfo: {},
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
    ])
  },
  provide() {
    return {
      currentLocation: this.currentLocation,
      currentRegion: this.currentRegion,
      iconButtons: this.iconButtons,
      attractionInfoList: this.attractionInfoList
    }
  },
  created() {
    // data initialization
    this.callCurrentLocation().then(() => {
      this.callLocation2Region(this.currentLocation)
      this.callLocationBasedList(this.currentLocation)
    })
  }
}
</script>

<style></style>
