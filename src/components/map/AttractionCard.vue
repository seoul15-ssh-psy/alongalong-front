<template>
  <div
    class="row items-center"
    style="
    width: 100%
      height: 200px;
      border-style: solid;
      border-width: 1px;
      border-color: rgb(228, 228, 228);
    "
  >
    <div class="col-4">
      <a href="#" @click="showDetailModal()"
        ><q-img
          class="q-ma-sm"
          :src="
            attraction.firstimage
              ? attraction.firstimage
              : 'https://www.flaticon.com/kr/free-icon/no-pictures_3875148'
          "
          :ratio="1"
          style="border-radius: 5px"
        ></q-img
      ></a>
    </div>
    <div class="col-7 q-ml-md">
      <div class="row items-center">
        <a href="#" @click="showDetailModal()" class="subtitle1" style=""
          ><div class="text-subtitle1 text-bold text-black">
            {{ attraction.title }}
          </div></a
        >
        <div class="subtitle2 text-subtitle2 text-grey q-ml-xs">
          {{ this.contentType[attraction.contenttypeid] }}
        </div>
      </div>
      <div class="row">
        <div class="text-subtitle2">
          내 위치로부터 {{ attraction.distance }}km
        </div>
      </div>
      <div class="row">
        <q-btn flat round>
          <q-icon name="o_bookmark_add"></q-icon>
        </q-btn>
      </div>
    </div>
    <q-separator size="10px" />
  </div>
</template>

<script>
import { contentTypeId } from '../../../public/common/global.js'
import { mapMutations, mapActions } from 'vuex'

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
  methods: {
    ...mapMutations(locationStore, [
      'SET_IS_DETAIL_MODAL_VISIBLE',
      'SET_IS_DETAIL_MODAL_UPDATED',
      'SET_MODAL_CONTENTS'
    ]),
    ...mapActions(locationStore, ['callClosestSubwayStation']),
    async showDetailModal() {
      if (this.isDetailModalVisible) {
        this.SET_IS_DETAIL_MODAL_VISIBLE(false)
        this.SET_IS_DETAIL_MODAL_UPDATED(false)
      }
      this.SET_IS_DETAIL_MODAL_VISIBLE(true)
      this.SET_MODAL_CONTENTS(this.attraction)
      await this.callClosestSubwayStation({
        longitude: this.attraction.mapx,
        latitude: this.attraction.mapy
      })
      this.SET_IS_DETAIL_MODAL_UPDATED(true)
    }
  }
}
</script>

<style scoped>
.subtitle1 {
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 65%;
  white-space: nowrap;
}
</style>
