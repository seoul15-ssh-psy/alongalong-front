<template>
  <q-drawer
    v-model="drawer"
    show-if-above
    :mini="!drawer || miniState"
    :width="420"
    :mini-width="0"
    :breakpoint="300"
    bordered
    class="shadow-3"
    :style="{ height: windowHeight - 85 + 'px' }"
  >
    <!-- contents -->
    <div class="q-mini-drawer-hide">
      <!-- 카카오 API 이용하여 현재 위치 정보 가져오기  -->
      <div class="text-h5 text-bold q-mx-xl q-my-xl">
        {{
          this.currentRegion.region_1depth_name +
          ' ' +
          this.currentRegion.region_2depth_name
        }}
        <q-separator class="q-mt-xs" color="grey-6" size="2px" />
      </div>
      <div class="row justify-center q-mb-xl">
        <div class="flex q-gutter-lg">
          <icon-button
            v-for="(item, index) in iconButtons"
            :iconName="item.iconName"
            :bgColor="item.bgColor"
            :title="item.title"
            :key="index"
          />
        </div>
      </div>
      <div class="row"><map-list></map-list></div>

      <div class="q-mini-drawer-only">
        <q-btn
          dense
          flat
          unelevated
          icon="arrow_forward_ios"
          size="20px"
          @click="miniState = false"
          style="right: -100%"
        />
      </div>
      <div class="q-mini-drawer-hide">
        <q-btn
          dense
          flat
          unelevated
          icon="arrow_back_ios"
          size="20px"
          @click="miniState = true"
          style="right: -830%"
        />
      </div>
    </div>

    <!-- drawer buttons
    <div class="flex absolute-right items-center">

    </div> -->
  </q-drawer>
</template>

<script>
import { ref } from 'vue'
import IconButton from './IconButton.vue'
import AttractionCard from './AttractionCard.vue'
import MapList from './MapList.vue'
import { mapState } from 'vuex'

const locationStore = 'locationStore'

export default {
  components: {
    IconButton,
    MapList,
    AttractionCard
  },
  inject: ['iconButtons'],
  setup() {
    const miniState = ref(false)

    return {
      drawer: ref(false),
      miniState,

      drawerClick(e) {
        if (miniState.value) {
          miniState.value = false
          e.stopPropagation()
        }
      }
    }
  },
  computed: {
    ...mapState(locationStore, [
      'currentLocation',
      'currentRegion',
      'attractionInfoList'
    ])
  }
}
</script>

<style></style>
