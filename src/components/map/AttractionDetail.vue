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
      <div
        class="text-h6 text-bold text-grey-8"
        style="text-decoration: underline"
      >
        {{ this.attraction.addr1 }}
      </div>
    </div>
  </div>
</template>

<script>
import { contentTypeId } from '../../../public/common/global.js'

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
  }
}
</script>

<style></style>
