<template>
  <q-drawer
    v-model="drawer"
    show-if-above
    :mini="!drawer || miniState"
    :width="400"
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
    </div>

    <!-- 상세정보 drawer -->
    <div
      class="attraction-detail flex absolute-right"
      :style="{ width: this.visibility + '%' }"
    >
      <div
        v-if="this.isDetailModalVisible"
        style="width: 100%; height: 100%; background-color: white"
      >
        <!-- 여행지 상세 정보 -->
        <attraction-detail :attraction="this.modalContents"></attraction-detail>
      </div>
      <div
        v-if="this.isDetailModalVisible"
        class="flex absolute-top-right bg-grey-4 flat q-ma-xs"
        style="border-radius: 10px; opacity: 0.6; z-index: 4"
      >
        <q-btn
          flat
          style="width: 37px; height: 23px; z-index: 5"
          @click="closeDetailModal()"
          ><q-icon name="close" size="22px"
        /></q-btn>
      </div>
      <!-- drawer 여닫는 Buttons -->
      <div class="flex absolute-right items-center">
        <div class="q-mini-drawer-only">
          <q-btn
            dense
            flat
            unelevated
            icon="arrow_forward_ios"
            size="20px"
            @click="miniState = false"
            style="left: 100%"
          />
        </div>
        <div class="q-mini-drawer-hide">
          <q-btn
            dense
            flat
            unelevated
            icon="arrow_back_ios"
            size="20px"
            @click="
              () => {
                miniState = true
                closeDetailModal()
              }
            "
            style="left: 100%"
          />
        </div>
      </div>

      <!-- drawer buttons -->
    </div>
  </q-drawer>
</template>

<script>
import { ref } from 'vue'
import IconButton from './IconButton.vue'
import AttractionCard from './AttractionCard.vue'
import AttractionDetail from './AttractionDetail.vue'
import MapList from './MapList.vue'
import { mapState, mapMutations } from 'vuex'

const locationStore = 'locationStore'

export default {
  components: {
    IconButton,
    MapList,
    AttractionCard,
    AttractionDetail
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
  data() {
    return {
      visibility: 0
    }
  },
  computed: {
    ...mapState(locationStore, [
      'isDetailModalVisible',
      'modalContents',
      'currentLocation',
      'currentRegion',
      'attractionInfoList'
    ])
  },
  watch: {
    isDetailModalVisible() {
      if (this.isDetailModalVisible == true) {
        this.miniState = false
        this.visibility = 95
      } else {
        this.visibility = 0
      }
    }
  },
  methods: {
    ...mapMutations(locationStore, [
      'SET_IS_DETAIL_MODAL_VISIBLE',
      'SET_IS_DETAIL_MODAL_UPDATED'
    ]),
    closeDetailModal() {
      this.SET_IS_DETAIL_MODAL_VISIBLE(false)
      this.SET_IS_DETAIL_MODAL_UPDATED(false)
    }
  }
}
</script>

<style lang="scss" scoped>
.attraction-detail {
  height: 100%;
  left: 100%;
  border: solid 1px;
  border-color: $grey-2;
  background-color: white;
}
</style>
