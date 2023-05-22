<template>
  <div class="flex full-width">
    <!-- 관광지 사진 -->
    <div class="row full-width">
      <q-img
        style="border-radius: 5px"
        :src="attraction.firstimage"
        :ratio="4 / 3"
      />
    </div>
    <!-- 관광지 타입, 관광지 명 -->
    <div class="row q-ma-md">
      <div class="text-subtitle1 text-grey">
        {{ this.contentType[attraction.contenttypeid] }}
      </div>
      <div class="text-h5 text-bold text-black">
        {{ this.attraction.title }}
      </div>
    </div>
    <!-- 관광지 주소 정보 -->
    <div class="row q-mx-md">
      <div class="row text-subtitle1 text-bold text-grey-8">
        {{ this.attraction.addr1 }}
      </div>
      <div class="row text-subtitle2 text-grey-8">
        {{
          this.subwayStation.place_name +
          '에서 ' +
          Math.round((this.subwayStation.distance / 1000) * 100) / 100 +
          'km'
        }}
      </div>
    </div>
    <div class="row"></div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { contentTypeId } from '../../../public/common/global.js'

const locationStore = 'locationStore'

export default {
  props: {
    attraction: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      contentType: contentTypeId
    }
  },
  computed: {
    ...mapState(locationStore, ['subwayStation'])
  },
  methods: {
    ...mapMutations(locationStore, ['SET_IS_DETAIL_MODAL_UPDATED']),
    ...mapActions(locationStore, ['callClosestSubwayStation'])
  }
}
</script>

<style></style>
